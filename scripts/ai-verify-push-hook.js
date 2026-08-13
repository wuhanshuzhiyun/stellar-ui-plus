#!/usr/bin/env node

/**
 * ai-verify-push-hook.js  ——  pre-push 通知钩子（不阻塞 push）
 *
 * 聚合本次 push 的全部 commit，将合并后的 diff 发送给 verify-server 做代码质量评审，
 * 再由后端（配置 VERIFY_WECOM_* 后）把评审结果作为「一条」消息推送到企业微信群机器人。
 *
 * 与 pre-commit（ai-verify-hook.js，发现 error 会阻断提交）不同：本钩子**永远不阻断 push**。
 * 任何异常（服务器不可达、推送失败、stdin 读取失败等）仅告警并放行，确保开发者推送不被卡住。
 *
 * 依赖：verify-server 已启动；企微 webhook 在 stellar-server 的 .env 配置。
 * 安装：由 scripts/setup-compat-hook.js 在 npm install 时自动装入 .git/hooks/pre-push。
 * 跳过：git push --no-verify
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const http = require('http');
const https = require('https');

/**
 * 加载客户端持久化配置（与 ai-verify-hook.js 同优先级）。
 */
function loadClientConfig() {
  const dir = __dirname;
  const files = ['ai-verify.config.json', 'ai-verify.config.local.json'];
  let merged = {};
  for (const name of files) {
    const p = path.join(dir, name);
    try {
      const parsed = JSON.parse(fs.readFileSync(p, 'utf-8'));
      if (parsed && typeof parsed === 'object') merged = Object.assign(merged, parsed);
    } catch (e) {
      // 文件不存在或 JSON 非法：忽略
    }
  }
  return merged;
}

const CLIENT = loadClientConfig();
const SERVER_URL = process.env.VERIFY_SERVER_URL || CLIENT.serverUrl || 'http://localhost:3002/api/verify/review';
const API_TOKEN = process.env.VERIFY_API_TOKEN || (CLIENT.apiToken != null ? CLIENT.apiToken : '');
const TIMEOUT = parseInt(process.env.AI_VERIFY_TIMEOUT || String(CLIENT.timeout != null ? CLIENT.timeout : 90000), 10);
const MAX_DIFF = parseInt(process.env.AI_VERIFY_MAX_DIFF || String(CLIENT.maxDiff != null ? CLIENT.maxDiff : 200000), 10);

// 送审排除：构建/工具脚本、依赖与产物目录不进入 AI 审查（与 compat-check 的 scripts 豁免一致）。
// 配置优先级：ai-verify.config.json 的 exclude > 内置默认。
function getExcludePrefixes() {
  const fromConfig = Array.isArray(CLIENT.exclude) ? CLIENT.exclude : null;
  const defaults = ['scripts/', 'node_modules/', 'dist/', 'unpackage/', '.workbuddy/'];
  const list = fromConfig && fromConfig.length ? fromConfig : defaults;
  return list.map((s) => String(s).replace(/\\/g, '/')).filter(Boolean);
}
const EXCLUDE_PREFIXES = getExcludePrefixes();
function isExcluded(p) {
  const norm = String(p).replace(/\\/g, '/');
  return EXCLUDE_PREFIXES.some((pre) => norm === pre || norm.startsWith(pre));
}

const COLORS = !!process.stdout.isTTY;
const c = {
  reset: COLORS ? '\x1b[0m' : '',
  cyan: COLORS ? '\x1b[36m' : '',
  yellow: COLORS ? '\x1b[33m' : '',
  gray: COLORS ? '\x1b[90m' : '',
  bold: COLORS ? '\x1b[1m' : '',
};
function log(msg) {
  console.log(c.bold + '[ai-verify-push] ' + c.reset + msg);
}

function runGit(args) {
  try {
    return execSync('git ' + args, { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch (e) {
    return null;
  }
}

// git 空树哈希，用于新建分支（remote-sha 全 0）时 diff 的基准
const EMPTY_TREE = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';

/**
 * pre-push 从 stdin 读取推送的 ref 列表，每行：
 *   <local-ref> <local-sha> <remote-ref> <remote-sha>
 */
function readStdinRefs() {
  let input = '';
  try {
    input = fs.readFileSync(0, 'utf-8');
  } catch (e) {
    return [];
  }
  return input
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\s+/);
      return { localRef: parts[0], localSha: parts[1], remoteRef: parts[2], remoteSha: parts[3] };
    });
}

function isZero(sha) {
  return !sha || /^0+$/.test(sha);
}

function combinedDiff(localSha, remoteSha) {
  const base = isZero(remoteSha) ? EMPTY_TREE : remoteSha;
  return runGit(`diff ${base} ${localSha}`);
}

function commitList(localSha, remoteSha) {
  const range = isZero(remoteSha) ? localSha : `${remoteSha}..${localSha}`;
  const out = runGit(`log ${range} --oneline`);
  return out ? out.split('\n').filter(Boolean) : [];
}

function hasReviewableFiles(diff) {
  return /\+\+\+ b\/.+\.(vue|js|jsx|mjs|cjs|ts|tsx|css|scss|less)(\s|$)/.test(diff);
}

const REVIEWABLE_EXT = /\.(vue|js|jsx|mjs|cjs|ts|tsx|css|scss|less)$/;

// 取本次 push 区间内的变更文件路径（仅文件名，避免物化巨大 diff）
function changedPaths(localSha, remoteSha) {
  const base = isZero(remoteSha) ? EMPTY_TREE : remoteSha;
  const out = runGit(`diff --name-only ${base} ${localSha}`);
  return out ? out.split('\n').filter(Boolean) : [];
}

// 读取变更文件在 localSha 时的完整内容，作为 partial=false 的审查输入；
// 总内容超过 MAX_DIFF 时停止收集（按整文件取舍，避免截断文件导致误报）。
function collectReviewFiles(localSha, paths) {
  const files = [];
  let total = 0;
  for (const p of paths) {
    if (!REVIEWABLE_EXT.test(p)) continue;
    if (isExcluded(p)) continue;
    let content = null;
    try {
      content = execSync(`git show ${localSha}:${p}`, { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });
    } catch (e) {
      content = null;
    }
    if (content == null) continue;
    if (total + content.length > MAX_DIFF) {
      if (files.length === 0 && content.length > MAX_DIFF) continue;
      break;
    }
    files.push({ path: p, content });
    total += content.length;
  }
  return files;
}

function getBranch() {
  return runGit('rev-parse --abbrev-ref HEAD') || '';
}

// 操作人：优先取 git 提交身份（git config user.name），回退到 OS 登录名
function getPusher() {
  const name = runGit('config user.name');
  return name || process.env.USER || process.env.USERNAME || '';
}

function postReview(payload) {
  return new Promise((resolve, reject) => {
    const lib = /^https:/i.test(SERVER_URL) ? https : http;
    const body = JSON.stringify(payload);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    };
    if (API_TOKEN) headers['x-verify-token'] = API_TOKEN;

    const req = lib.request(
      SERVER_URL,
      { method: 'POST', headers, timeout: TIMEOUT },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const data = Buffer.concat(chunks).toString('utf-8');
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error('HTTP ' + res.statusCode + ' 服务端返回错误'));
            return;
          }
          try {
            resolve({ status: res.statusCode, json: JSON.parse(data) });
          } catch (e) {
            reject(new Error('响应解析失败: ' + (e instanceof Error ? e.message : e)));
          }
        });
      }
    );
    req.on('timeout', () => req.destroy(new Error('请求超时')));
    req.on('error', (e) => reject(e));
    req.write(body);
    req.end();
  });
}

async function main() {
  // 只处理分支推送，跳过 tag / 删除分支等噪声
  const refs = readStdinRefs().filter((r) => r.localRef && r.localRef.startsWith('refs/heads/'));
  if (!refs.length) {
    process.exit(0);
  }
  const branch = getBranch();
  const platformsRaw =
    process.env.AI_VERIFY_PLATFORMS ||
    (Array.isArray(CLIENT.platforms) ? CLIENT.platforms.join(',') : '') ||
    'MP-WEIXIN,H5,APP-PLUS,APP';
  const platforms = platformsRaw.split(',').map((s) => s.trim()).filter(Boolean);
  let requested = 0;
  let failed = 0;
  for (const r of refs) {
    const paths = changedPaths(r.localSha, r.remoteSha);
    if (!paths.length) continue;
    if (!paths.some((p) => REVIEWABLE_EXT.test(p))) continue;
    const files = collectReviewFiles(r.localSha, paths);
    if (!files.length) continue;

    const commits = commitList(r.localSha, r.remoteSha).map((line) => {
      const sp = line.indexOf(' ');
      return sp === -1 ? { hash: line, message: '' } : { hash: line.slice(0, sp), message: line.slice(sp + 1) };
    });
    const ctx = {
      repo: 'stellar-ui-plus',
      branch,
      commitRange:
        (isZero(r.remoteSha) ? 'init' : r.remoteSha.slice(0, 8)) + '..' + r.localSha.slice(0, 8),
      commits,
      pusher: getPusher(),
    };

    const payload = { files, notify: true, platforms, context: ctx };
    log(`分支 ${branch} 本次 push ${commits.length} 个提交，调用 verify-server 做评审并推送企微...`);
    try {
      const { json } = await postReview(payload);
      requested++;
      if (json && json.data && json.data.queued) {
        // notify 模式下企微消息由服务端异步发出，钩子无从同步感知是否成功
        log('已请求服务端异步评审推送（企微消息由服务端发出，详情见企微群）。');
      } else {
        log(`评审请求已完成（llmEnabled=${json && json.data ? json.data.llmEnabled : '?'}）。`);
      }
    } catch (e) {
      failed++;
      log(
        c.yellow +
          '⚠ 评审请求发送失败（服务器不可达或返回非 JSON 响应，不阻塞 push）：' +
          (e && e.message ? e.message : e) +
          c.reset
      );
      log(
        c.yellow +
          '   若服务端已收到请求，企微推送仍可能由服务端异步发出，请留意企微群消息。' +
          c.reset
      );
    }
  }

  let tail;
  if (requested === 0 && failed === 0) {
    tail = '本次 push 处理完成：无代码文件变更，未发起评审请求。';
  } else if (failed > 0) {
    tail =
      `本次 push 处理完成：已发出 ${requested} 次请求，${failed} 次失败` +
      `（服务端若已接收，企微推送仍可能异步发出，详情见企微群）。`;
  } else {
    tail = `本次 push 处理完成：已发出 ${requested} 次评审请求，企微消息由服务端异步推送（详情见企微群）。`;
  }
  log(tail);
  process.exit(0);
}

main().catch((e) => {
  log(c.yellow + '⚠ pre-push 通知异常，放行 push（不阻断）：' + (e && e.message ? e.message : e) + c.reset);
  process.exit(0);
});
