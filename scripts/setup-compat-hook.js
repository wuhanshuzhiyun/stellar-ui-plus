#!/usr/bin/env node

/**
 * setup-compat-hook.js
 *
 * 安装 pre-commit hook，在 git commit 时自动运行兼容性检查
 * 幂等执行: 如果 hook 已存在且内容相同则跳过
 *
 * 用法: node scripts/setup-compat-hook.js
 * 也可通过 npm install 后自动执行 (package.json prepare 脚本)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOOK_DIR = path.join(ROOT, '.git', 'hooks');
const HOOK_FILE = path.join(HOOK_DIR, 'pre-commit');

const HOOK_CONTENT = `#!/bin/sh
# stellar-ui pre-commit hook: 第一道跨平台兼容性检查 (本地规则) + 第二道 AI 代码审查 (verify-server)
# 由 scripts/setup-compat-hook.js 自动生成，请勿手动修改
# 跳过: git commit --no-verify

echo "[pre-commit] 第一道：运行跨平台兼容性检查 (本地规则)..."
node scripts/compat-check.js
RESULT=$?

if [ $RESULT -ne 0 ]; then
    echo ""
    echo "[pre-commit] 兼容性检查未通过，提交已阻断。"
    echo "[pre-commit] 修复上述 ERROR 后重新提交，或使用 git commit --no-verify 跳过。"
    exit 1
fi

echo "[pre-commit] 第二道：运行 AI 代码审查 (verify-server)..."
node scripts/ai-verify-hook.js
RESULT=$?

if [ $RESULT -ne 0 ]; then
    echo ""
    echo "[pre-commit] AI 代码审查未通过，提交已阻断。"
    echo "[pre-commit] 修复上述问题后重新提交，或使用 git commit --no-verify 跳过。"
    exit 1
fi

exit 0
`;

const HOOK_PREPUSH_CONTENT = `#!/bin/sh
# stellar-ui pre-push hook: 聚合本次 push 的提交，调用 verify-server 做代码质量评审并推送企微（不阻塞 push）
# 由 scripts/setup-compat-hook.js 自动生成，请勿手动修改
# 跳过: git push --no-verify

echo "[pre-push] 聚合本次 push 的提交并推送代码质量评审到企微..."
node scripts/ai-verify-push-hook.js
exit 0
`;

const HOOK_PREPUSH_FILE = path.join(HOOK_DIR, 'pre-push');

function ensureHook() {
    // 检查 .git/hooks 目录是否存在
    if (!fs.existsSync(HOOK_DIR)) {
        console.log('[setup-hook] .git/hooks 目录不存在，跳过 (可能不是 git 仓库)');
        return;
    }

    // 检查 hook 是否已存在
    if (fs.existsSync(HOOK_FILE)) {
        const existing = fs.readFileSync(HOOK_FILE, 'utf-8');
        if (existing.includes('compat-check.js')) {
            // 内容已匹配，更新为最新版本
            if (existing.trim() === HOOK_CONTENT.trim()) {
                console.log('[setup-hook] pre-commit hook 已是最新，跳过');
                return;
            }
            console.log('[setup-hook] 更新 pre-commit hook...');
        } else {
            // 已存在但不是我们的 hook，不覆盖
            console.log('[setup-hook] pre-commit hook 已存在且非兼容性检查，跳过 (请手动检查)');
            console.log('[setup-hook] 现有 hook:', HOOK_FILE);
            return;
        }
    } else {
        console.log('[setup-hook] 安装 pre-commit hook...');
    }

    fs.writeFileSync(HOOK_FILE, HOOK_CONTENT);

    // 设置可执行权限 (Unix)
    try {
        fs.chmodSync(HOOK_FILE, 0o755);
    } catch (e) {
        // Windows 上 chmod 无效，忽略
    }

    console.log('[setup-hook] pre-commit hook 安装完成:', HOOK_FILE);
    console.log('[setup-hook] 提交代码时将自动检查跨平台兼容性');
    console.log('[setup-hook] 跳过检查: git commit --no-verify');
}

function ensurePrePushHook() {
  if (!fs.existsSync(HOOK_DIR)) return;
  if (fs.existsSync(HOOK_PREPUSH_FILE)) {
    const existing = fs.readFileSync(HOOK_PREPUSH_FILE, 'utf-8');
    if (existing.includes('ai-verify-push-hook.js')) {
      if (existing.trim() === HOOK_PREPUSH_CONTENT.trim()) {
        console.log('[setup-hook] pre-push hook 已是最新，跳过');
        return;
      }
      console.log('[setup-hook] 更新 pre-push hook...');
    } else {
      console.log('[setup-hook] pre-push hook 已存在且非本工具生成，跳过 (请手动检查):', HOOK_PREPUSH_FILE);
      return;
    }
  } else {
    console.log('[setup-hook] 安装 pre-push hook...');
  }
  fs.writeFileSync(HOOK_PREPUSH_FILE, HOOK_PREPUSH_CONTENT);
  try {
    fs.chmodSync(HOOK_PREPUSH_FILE, 0o755);
  } catch (e) {
    // Windows 上 chmod 无效，忽略
  }
  console.log('[setup-hook] pre-push hook 安装完成:', HOOK_PREPUSH_FILE);
  console.log('[setup-hook] push 代码时会聚合提交并推送代码质量评审到企微（不阻塞 push）');
}

ensureHook();
ensurePrePushHook();
