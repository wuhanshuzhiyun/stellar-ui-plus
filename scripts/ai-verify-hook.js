#!/usr/bin/env node

/**
 * ai-verify-hook.js  ——  第二道代码审查（AI / LLM 深度审查）
 *
 * 作为 stellar-ui 的 pre-commit 第二道关卡：先由 compat-check.js 做本地规则校验，
 * 本脚本再把「git 暂存的 diff」发送给 verify-server 的 /api/verify/review，
 * 由其实行「规则引擎 + 可选 LLM 深度审查」。当 verify-server 在 .env 中配置了
 * VERIFY_LLM_BASE_URL / VERIFY_LLM_API_KEY 时，LLM 深度审查才会真正生效。
 *
 * 依赖：verify-server 已启动（由 stellar-server 的 main.ts fork 拉起，默认端口 3002）。
 *       零三方依赖，使用 Node 内置 http/https 发送请求。
 *
 * 配置来源（优先级从高到低）：
 *   1. 环境变量（见下方列表，可临时覆盖）
 *   2. scripts/ai-verify.config.local.json  （私人覆盖，已被 gitignore，不入库）
 *   3. scripts/ai-verify.config.json        （入库默认，默认指向本地 http://localhost:3002/api/verify/review）
 *   4. 代码内置兜底默认值
 *
 * 想「一劳永逸」设置：直接改 scripts/ai-verify.config.json（或建一个 .local.json
 * 私有覆盖），写一次即可，之后提交无需再管——该文件连同本脚本一起复制到其它前端
 * 项目即可复用（只需改 serverUrl / platforms）。
 *
 * 环境变量（均可选，仍可用于临时覆盖）：
 *   VERIFY_SERVER_URL         默认 http://localhost:3002/api/verify/review（须为完整接口地址，含 /api/verify/review 路径）
 *   VERIFY_API_TOKEN          若 verify-server 设置了 VERIFY_API_TOKEN，须填一致
 *   AI_VERIFY_PLATFORMS       逗号分隔的目标平台，覆盖配置文件，如 MP-WEIXIN,H5,APP-PLUS,APP,IOS
 *   AI_VERIFY_BLOCK           默认 1 —— AI 发现 error 级问题时阻断提交（0 = 仅警告）
 *   AI_VERIFY_REQUIRE_SERVER  默认 0 —— 服务器不可达时仅警告放行（1 = 强制阻断）
 *   AI_VERIFY_TIMEOUT         默认 90000 (ms)
 *   AI_VERIFY_MAX_DIFF        默认 200000 (字符) —— 超过则截断，避免超出模型上下文
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const http = require('http');
const https = require('https');

/**
 * 加载客户端持久化配置。
 * 优先级：环境变量 > .local.json（私有） > .json（入库默认） > 兜底。
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
      // 文件不存在或 JSON 非法：忽略，继续用下一来源/兜底
    }
  }
  return merged;
}

const CLIENT = loadClientConfig();

const SERVER_URL = process.env.VERIFY_SERVER_URL || CLIENT.serverUrl || 'http://localhost:3002/api/verify/review';
const API_TOKEN = process.env.VERIFY_API_TOKEN || (CLIENT.apiToken != null ? CLIENT.apiToken : '');
const BLOCK_ON_ERROR = (process.env.AI_VERIFY_BLOCK || String(CLIENT.blockOnError != null ? CLIENT.blockOnError : 1)) !== '0';
const REQUIRE_SERVER = (process.env.AI_VERIFY_REQUIRE_SERVER || String(CLIENT.requireServer != null ? CLIENT.requireServer : 0)) === '1';
const TIMEOUT = parseInt(process.env.AI_VERIFY_TIMEOUT || String(CLIENT.timeout != null ? CLIENT.timeout : 90000), 10);
const MAX_DIFF = parseInt(process.env.AI_VERIFY_MAX_DIFF || String(CLIENT.maxDiff != null ? CLIENT.maxDiff : 200000), 10);

// 目标平台：环境变量 AI_VERIFY_PLATFORMS（逗号分隔）> 配置文件 platforms > 代码兜底
const RAW_PLATFORMS = process.env.AI_VERIFY_PLATFORMS || (Array.isArray(CLIENT.platforms) ? CLIENT.platforms.join(',') : '');
const PLATFORMS = RAW_PLATFORMS
  ? RAW_PLATFORMS.split(',').map((s) => s.trim()).filter(Boolean)
  : ['MP-WEIXIN', 'H5', 'APP-PLUS', 'APP'];

// 送审排除：构建/工具脚本、依赖与产物目录不进入 AI 审查。
// 与 compat-check.js 的 scripts 豁免保持一致——这些 Node 工具脚本里出现的
// document./window./wx. 是规则引擎要匹配的「模式字符串」，并非真实跨端调用。
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
  red: COLORS ? '\x1b[31m' : '',
  yellow: COLORS ? '\x1b[33m' : '',
  cyan: COLORS ? '\x1b[36m' : '',
  gray: COLORS ? '\x1b[90m' : '',
  bold: COLORS ? '\x1b[1m' : '',
};

function log(msg) {
  console.log(c.bold + '[ai-verify] ' + c.reset + msg);
}

function runGit(args) {
  try {
    return execSync('git ' + args, { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch (e) {
    return null;
  }
}

function getStagedDiff() {
  return runGit('diff --cached');
}

// 收集暂存区中可审查文件的完整内容（partial=false），让 LLM 看到完整上下文，
// 避免基于 diff 片段误报「缺少 require / 未定义 / 缺括号」等问题。
const REVIEWABLE_EXT = /\.(vue|js|jsx|mjs|cjs|ts|tsx|css|scss|less)$/;
function getStagedFiles() {
  const out = runGit('diff --cached --name-only');
  const paths = out ? out.split('\n').filter(Boolean) : [];
  const files = [];
  let total = 0;
  for (const p of paths) {
    if (!REVIEWABLE_EXT.test(p)) continue;
    if (isExcluded(p)) continue;
    let content = null;
    try {
      content = execSync('git show :' + p, { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });
    } catch (e) {
      content = null;
    }
    if (content == null) continue;
    if (total + content.length > MAX_DIFF) {
      // 单文件超限则跳过；整体超额则停止收集（避免截断文件导致误报）
      if (files.length === 0 && content.length > MAX_DIFF) continue;
      break;
    }
    files.push({ path: p, content });
    total += content.length;
  }
  return files;
}

function hasReviewableFiles(diff) {
  // 只看是否包含代码类文件的改动（与 verify-server 的 isReviewable 对齐）
  return /\+\+\+ b\/.+\.(vue|js|jsx|mjs|cjs|ts|tsx|css|scss|less)(\s|$)/.test(diff);
}

// 是否存在「既可审查、又未被排除」的文件改动。
// 用于在无完整文件可取时，判断应回退到 diff 审查，还是直接跳过（改动全在排除目录）。
function hasReviewableNonExcludedFiles(diff) {
  const re = /\+\+\+ b\/(.+?)(?:\s|$)/g;
  let m;
  while ((m = re.exec(diff))) {
    const p = m[1].trim();
    if (REVIEWABLE_EXT.test(p) && !isExcluded(p)) return true;
  }
  return false;
}

function getBranch() {
  return runGit('rev-parse --abbrev-ref HEAD') || '';
}

function getCommit() {
  return runGit('rev-parse HEAD') || '';
}

function postReview(payload) {
  return new Promise((resolve, reject) => {
    // SERVER_URL 即完整接口地址（含 /api/verify/review 路径），由配置/环境变量直接提供，脚本不再拼接
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
            const json = JSON.parse(data);
            resolve({ status: res.statusCode, json });
          } catch (e) {
            reject(new Error('响应解析失败: ' + e.message + ' | raw=' + data.slice(0, 200)));
          }
        });
      }
    );

    req.on('timeout', () => req.destroy(new Error('请求超时 (' + TIMEOUT + 'ms)')));
    req.on('error', (e) => reject(e));
    req.write(body);
    req.end();
  });
}

function sevLabel(severity) {
  if (severity === 'error') return c.red + '[ERROR]' + c.reset;
  if (severity === 'warning') return c.yellow + '[WARN] ' + c.reset;
  return c.cyan + '[INFO] ' + c.reset;
}

function printResult(result) {
  console.log('');
  console.log(c.bold + '========== AI 代码审查结果 ==========' + c.reset);
  if (result.llmEnabled) {
    console.log('AI 深度审查: ' + c.cyan + '已启用（LLM 生效）' + c.reset);
  } else {
    console.log(
      'AI 深度审查: ' +
        c.yellow +
        '未启用（verify-server 未配置 VERIFY_LLM_*，仅规则引擎生效）' +
        c.reset
    );
    console.log(
      c.gray + '  → 启用 AI 核查：在 stellar-server 的 .env 填 VERIFY_LLM_BASE_URL + VERIFY_LLM_API_KEY，并启动 stellar-server。' + c.reset
    );
  }
  if (result.summary) console.log(result.summary);

  const issues = result.issues || [];
  if (!issues.length) return;

  console.log('');
  console.log('问题清单（' + issues.length + '）：');
  for (const it of issues) {
    const loc = it.file ? (it.line ? it.file + ':' + it.line : it.file) : '(全局)';
    console.log('  ' + sevLabel(it.severity) + ' ' + c.bold + loc + c.reset);
    if (it.message) console.log('      ' + it.message);
    if (it.rule) console.log('      ' + c.gray + '规则: ' + it.rule + c.reset);
    if (it.suggestion) console.log('      ' + c.gray + '建议: ' + it.suggestion + c.reset);
  }
  console.log('');
}

async function main() {
  const stagedDiff = getStagedDiff();
  if (!stagedDiff || !stagedDiff.trim()) {
    log('无暂存改动，跳过 AI 核查。');
    process.exit(0);
  }
  if (!hasReviewableFiles(stagedDiff)) {
    log('暂存改动不含可审查的代码文件，跳过 AI 核查。');
    process.exit(0);
  }

  // 优先发送完整文件内容（partial=false）：LLM 看到完整上下文，避免基于 diff 片段误报
  // 「缺少 require / 未定义 / 缺括号」等；收集不到可审查文件时回退到 diff（截断），保证不漏审。
  // 但若暂存改动全在排除目录（如 scripts/），则直接跳过，避免对构建脚本做审查而产生误报。
  const stagedFiles = getStagedFiles();
  const ctx = { repo: 'stellar-ui-plus', branch: getBranch(), commit: getCommit() };

  let payload;
  if (stagedFiles.length) {
    payload = { files: stagedFiles, platforms: PLATFORMS, notify: false, context: ctx };
  } else if (hasReviewableNonExcludedFiles(stagedDiff)) {
    let d = stagedDiff;
    if (d.length > MAX_DIFF) {
      log('diff 过大 (' + d.length + ' > ' + MAX_DIFF + ')，已截断前 ' + MAX_DIFF + ' 字符。');
      d = d.slice(0, MAX_DIFF);
    }
    payload = { diff: d, platforms: PLATFORMS, notify: false, context: ctx };
  } else {
    log('暂存改动均在排除目录（如 scripts/），无需 AI 核查，跳过。');
    process.exit(0);
  }

  log('连接 verify-server (' + SERVER_URL + ') 进行 AI 深度审查...');

  let resp;
  try {
    resp = await postReview(payload);
  } catch (e) {
    if (REQUIRE_SERVER) {
      log('verify-server 不可达，已设置 AI_VERIFY_REQUIRE_SERVER=1，提交被阻断：' + e.message);
      log('  如需继续：临时设为 0，或 git commit --no-verify 跳过本次 AI 核查。');
      process.exit(1);
    }
    log(c.yellow + '⚠ verify-server 不可达，跳过 AI 核查：' + e.message + c.reset);
    log(c.gray + '  提示：启动 stellar-server 使其 fork 出 verify-server；或在 .env 配置 VERIFY_LLM_* 后重启。' + c.reset);
    log(c.gray + '  如需强制要求服务器在线：设置 AI_VERIFY_REQUIRE_SERVER=1。' + c.reset);
    process.exit(0);
  }

  const { status, json } = resp;
  if (status !== 200 || !json || json.code !== 0) {
    if (REQUIRE_SERVER) {
      log('verify-server 返回错误 (HTTP ' + status + ')：' + (json && json.message ? json.message : '') + '，提交被阻断。');
      process.exit(1);
    }
    log(c.yellow + '⚠ verify-server 返回异常 (HTTP ' + status + ')：' + (json && json.message ? json.message : '') + '，跳过 AI 核查。' + c.reset);
    process.exit(0);
  }

  const result = json.data || {};
  printResult(result);

  const errorCount = (result.stats && result.stats.errorCount) || 0;
  if (errorCount > 0 && BLOCK_ON_ERROR) {
    log(c.red + '发现 ' + errorCount + ' 个 error 级 AI 审查问题，提交被阻断。' + c.reset);
    log('  修复后重新提交，或使用 git commit --no-verify 跳过本次 AI 核查（AI_VERIFY_BLOCK=0 可改为仅警告）。');
    process.exit(1);
  }

  log('AI 核查通过，未阻断提交。');
  process.exit(0);
}

main().catch((e) => {
  log(c.yellow + '⚠ AI 核查脚本异常，放行提交（不阻断）：' + (e && e.message ? e.message : e) + c.reset);
  process.exit(0);
});
