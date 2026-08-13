#!/usr/bin/env node

/**
 * compat-check.js
 *
 * stellar-ui uni-app 跨平台兼容性检查器
 * 在 git pre-commit 阶段运行，检测提交代码中的跨平台兼容性问题
 *
 * 用法:
 *   node scripts/compat-check.js              # 检查 staged 文件 (pre-commit 默认)
 *   node scripts/compat-check.js --all        # 检查全项目 .vue/.js 文件
 *   node scripts/compat-check.js --file <path> # 检查指定文件
 *   node scripts/compat-check.js --verbose    # 显示详细输出（含通过文件）
 *
 * 退出码: 0 = 通过(无 error), 1 = 有 error 需修复
 */

'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { rules, H5_SAFE, APP_SAFE } = require('./compat-rules');

// ─── 常量 ──────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');

// 所有 uni-app 支持的平台标识
const ALL_PLATFORMS = [
    'H5', 'WEB', 'MP-360',
    'MP', 'MP-WEIXIN', 'MP-ALIPAY', 'MP-BAIDU', 'MP-TOUTIAO', 'MP-QQ', 'MP-LARK', 'MP-KUAISHOU',
    'APP', 'APP-PLUS', 'APP-ANDROID', 'APP-IOS', 'APP-NVUE',
    'QUICKAPP-WEBVIEW', 'QUICKAPP-WEB',
];

// 排除的目录/文件模式（不检查）
const EXCLUDE_PATTERNS = [
    /node_modules[\\/]/,
    /unpackage[\\/]/,
    /[\\/]\.git[\\/]/,
    /[\\/]\.workbuddy[\\/]/,
];

// 允许检查的文件扩展名
const ALLOWED_EXTENSIONS = ['.vue', '.js'];

// 文件级别豁免（这些文件内的 DOM API / wx API 是封装层或 H5 专属代码）
const FILE_EXEMPTS = [
    /utils[\\/]System\.js$/,         // 系统信息封装层
    /utils[\\/]querySelector/,      // DOM 查询封装层
    /test[\\/]/,                     // 测试文件（jsdom 环境）
    /scripts[\\/]/,                 // 构建脚本
    /[\\/]sensors[\\/]/,             // 第三方 SDK（sensors 神策）
    /\.min\.js$/,                   // 第三方压缩库
    /^pc[\\/]/,                      // PC 端 H5 专属页面
    /^html[\\/]/,                    // H5 静态资源
    /^common[\\/]account\.js$/,     // 账号工具（含 H5 登录逻辑）
];

// ─── 条件编译上下文追踪 ────────────────────────────────────────

/**
 * 判断一段"注释文本"是否为纯粹的条件编译指令（而非文档说明）。
 *
 * 判别依据: 去掉注释 opener/closer 以及续行 `* ` 后，整段内容必须是
 *   #ifdef <平台表达式>   或   #ifndef <平台表达式>   或   #endif
 * 若含有中文或无关文本（如"支持 // 中的 #ifdef"这类说明），一律返回 null，
 * 避免检查器把自身文档/报错文案误判为未闭合的指令。
 *
 * @param {string} text - 注释内部文本（已去除注释 opener 与 closer，如 // <!-- 等）
 * @returns {object|null}
 */
function parseDirectiveInComment(text) {
    let t = text.replace(/^\s*\*/, '').trim(); // 去掉 block comment 续行符 `*`
    const m = t.match(/^#(ifdef|ifndef|endif)\b([\s\S]*)$/);
    if (!m) return null;

    const directive = m[1];
    const rest = m[2];

    if (directive === 'endif') {
        // #endif 必须是纯闭合指令（仅允许空白或闭合残留），带中文/说明的视为文档注释
        if (rest.trim() !== '' && !/^[-*/\s]*$/.test(rest)) return null;
        return { directive: 'endif', platforms: [], isNegated: false, rawPlatforms: '' };
    }

    // ifdef/ifndef: 关键字之后必须"紧跟"一个合法平台 token（ASCII 标识符），
    // 之后允许任意尾随注释（中文说明等）。若关键字后直接是中文/无关文本，
    // 说明这是文档说明而非真实指令，忽略。
    const lead = rest.match(/^\s*([A-Za-z0-9_.()-]+(?:\s*(?:\|\||\|+|&&?|\bor\b)\s*[A-Za-z0-9_.()-]+)*)/);
    if (!lead) return null;

    const rawPlatforms = lead[1].trim();
    const platforms = rawPlatforms
        .split(/\s*(?:\|\||\|+|&&?|\bor\b)\s*/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

    return {
        directive,
        platforms,
        isNegated: directive === 'ifndef',
        rawPlatforms,
    };
}

/**
 * 逐字符扫描一行，跨行追踪块注释、HTML 注释与字符串状态，
 * 仅在"注释区间"内提取纯粹的条件编译指令。
 *
 * @param {string} line - 行文本
 * @param {{inStr:?string, inBlock:boolean, inHtml:boolean}} state - 跨行状态
 * @returns {{directives: Array, state: object}}
 */
function scanForDirectives(line, state) {
    const directives = [];
    const n = line.length;
    let i = 0;
    let inStr = state.inStr;
    let inBlock = state.inBlock;
    let inHtml = state.inHtml;

    const tryComment = (start, end) => {
        const d = parseDirectiveInComment(line.slice(start, end));
        if (d) directives.push(d);
    };

    while (i < n) {
        const ch = line[i];

        // 字符串区间：跳过，直到匹配的非转义引号
        if (inStr) {
            if (ch === '\\') {
                i += 2;
                continue;
            }
            if (ch === inStr) {
                inStr = null;
                i++;
                continue;
            }
            i++;
            continue;
        }

        // 跨行 block comment 续行
        if (inBlock) {
            const close = line.indexOf('*/', i);
            if (close === -1) {
                tryComment(i, n);
                i = n;
                break;
            }
            tryComment(i, close);
            inBlock = false;
            i = close + 2;
            continue;
        }

        // 跨行 html comment 续行
        if (inHtml) {
            const close = line.indexOf('-->', i);
            if (close === -1) {
                tryComment(i, n);
                i = n;
                break;
            }
            tryComment(i, close);
            inHtml = false;
            i = close + 3;
            continue;
        }

        // 普通代码区间 —— 识别注释/字符串触发符
        if (ch === '/' && line[i + 1] === '/') {
            tryComment(i + 2, n); // 行注释：本行余下皆为注释
            break;
        }
        if (ch === '/' && line[i + 1] === '*') {
            const close = line.indexOf('*/', i + 2);
            if (close === -1) {
                tryComment(i + 2, n);
                inBlock = true;
                i = n;
                break;
            }
            tryComment(i + 2, close);
            i = close + 2;
            continue;
        }
        if (ch === '<' && line[i + 1] === '!' && line[i + 2] === '-' && line[i + 3] === '-') {
            const close = line.indexOf('-->', i + 4);
            if (close === -1) {
                tryComment(i + 4, n);
                inHtml = true;
                i = n;
                break;
            }
            tryComment(i + 4, close);
            i = close + 3;
            continue;
        }
        if (ch === "'" || ch === '"' || ch === '`') {
            inStr = ch;
            i++;
            continue;
        }
        i++;
    }

    return { directives, state: { inStr, inBlock, inHtml } };
}

/**
 * 计算条件编译上下文中的有效平台集合
 * @param {Array} contextStack - 上下文栈
 * @returns {Set<string>} 有效平台集合
 */
function getEffectivePlatforms(contextStack) {
    if (contextStack.length === 0) {
        return new Set(ALL_PLATFORMS);
    }

    let result = null;
    for (const ctx of contextStack) {
        let ctxPlatforms;
        if (ctx.isNegated) {
            ctxPlatforms = new Set(ALL_PLATFORMS.filter((p) => !ctx.platforms.has(p)));
        } else {
            ctxPlatforms = new Set(ctx.platforms);
        }

        if (result === null) {
            result = ctxPlatforms;
        } else {
            result = new Set([...result].filter((p) => ctxPlatforms.has(p)));
        }
    }

    return result || new Set();
}

/**
 * 检查当前上下文是否使代码"安全"
 * @param {Set<string>} effectivePlatforms
 * @param {string[]} exemptList
 * @returns {boolean}
 */
function isExempt(effectivePlatforms, exemptList) {
    if (exemptList.length === 0) return false;
    if (effectivePlatforms.size === 0) return true;
    for (const platform of effectivePlatforms) {
        if (!exemptList.includes(platform)) return false;
    }
    return true;
}

// ─── SFC 块检测 ────────────────────────────────────────────────

/**
 * 检测行是否是 SFC 块开始标签
 * @returns {string|null} 'template' | 'script' | 'style' | null
 */
function getBlockStart(trimmed) {
    if (/^<template(\s|>)/.test(trimmed)) return 'template';
    if (/^<script(\s|>)/.test(trimmed)) return 'script';
    if (/^<style(\s|>)/.test(trimmed)) return 'style';
    return null;
}

/**
 * 检测行是否是 SFC 块结束标签
 */
function isBlockEnd(trimmed) {
    return /^<\/(template|script|style)>/.test(trimmed);
}

/**
 * 检测 script 标签是否是 renderjs
 */
function isRenderjsScript(trimmed) {
    return /lang=["']renderjs["']/.test(trimmed) || /module=/.test(trimmed);
}

// ─── 文件检查 ──────────────────────────────────────────────────

/**
 * 检查单个文件 — 逐行扫描，跨块追踪条件编译上下文
 * @param {string} filePath - 文件绝对路径
 * @returns {Array} 问题列表
 */
function checkFile(filePath) {
    const relativePath = path.relative(ROOT, filePath).replace(/\\/g, '/');

    // 检查文件扩展名
    if (!ALLOWED_EXTENSIONS.some((ext) => filePath.endsWith(ext))) return [];

    // 检查排除模式
    for (const pattern of EXCLUDE_PATTERNS) {
        if (pattern.test(filePath)) return [];
    }

    // 检查文件级别豁免
    const fileExempt = FILE_EXEMPTS.some((pattern) => pattern.test(relativePath));

    let content;
    try {
        content = fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
        return [];
    }

    const lines = content.split('\n');
    const issues = [];

    // 条件编译上下文栈 — 跨块追踪
    const contextStack = [];

    // 跨行注释/字符串状态 — 供 scanForDirectives 使用
    const directiveState = { inStr: null, inBlock: false, inHtml: false };

    // 当前 SFC 块类型
    let currentBlock = null;
    let currentIsRenderjs = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNum = i + 1;
        const trimmed = line.trim();

        // ── 1. 检测 SFC 块边界 ──
        if (!currentBlock) {
            const blockType = getBlockStart(trimmed);
            if (blockType) {
                currentBlock = blockType;
                currentIsRenderjs = blockType === 'script' && isRenderjsScript(trimmed);

                // R5: renderjs 块必须在 H5 || APP-PLUS 条件编译内
                if (currentIsRenderjs && !fileExempt) {
                    const effective = getEffectivePlatforms(contextStack);
                    const renderjsExempt = [...H5_SAFE, ...APP_SAFE];
                    if (!isExempt(effective, renderjsExempt) && contextStack.length === 0) {
                        issues.push({
                            ruleId: 'R5',
                            severity: 'error',
                            file: relativePath,
                            line: lineNum,
                            message: 'renderjs script 块缺少 #ifdef H5 || APP-PLUS 条件编译守护',
                            match: 'renderjs',
                        });
                    }
                }
                continue;
            }
        }

        if (currentBlock && isBlockEnd(trimmed)) {
            currentBlock = null;
            currentIsRenderjs = false;
            continue;
        }

        // ── 2. 检测条件编译指令（跨行追踪注释/字符串状态，仅在纯指令注释中判定） ──
        const scanResult = scanForDirectives(line, directiveState);
        directiveState.inStr = scanResult.state.inStr;
        directiveState.inBlock = scanResult.state.inBlock;
        directiveState.inHtml = scanResult.state.inHtml;

        for (const directive of scanResult.directives) {
            if (directive.directive === 'ifdef' || directive.directive === 'ifndef') {
                contextStack.push({
                    platforms: new Set(directive.platforms),
                    isNegated: directive.isNegated,
                    line: lineNum,
                    rawPlatforms: directive.rawPlatforms,
                });
            } else if (directive.directive === 'endif') {
                if (contextStack.length === 0) {
                    issues.push({
                        ruleId: 'R3',
                        severity: 'error',
                        file: relativePath,
                        line: lineNum,
                        message: '条件编译指令不配对: #endif 缺少匹配的 #ifdef/#ifndef',
                        match: '#endif',
                    });
                } else {
                    contextStack.pop();
                }
            }
        }
        if (scanResult.directives.length > 0) continue;

        // ── 3. 应用规则（仅在块内且文件未豁免时） ──
        if (!currentBlock || fileExempt) continue;

        // 跳过纯注释行
        const isComment = trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('<!--') || trimmed.startsWith('*');
        if (isComment) continue;

        // 计算当前有效平台
        const effectivePlatforms = getEffectivePlatforms(contextStack);

        // 应用每条 pattern-based 规则
        for (const rule of rules) {
            if (!rule.blockTypes.includes(currentBlock)) continue;
            if (!rule.pattern) continue;

            rule.pattern.lastIndex = 0;

            let match;
            while ((match = rule.pattern.exec(line)) !== null) {
                // 检查豁免上下文
                if (isExempt(effectivePlatforms, rule.exempt)) break;

                // 检查是否在字符串内（简单启发式）
                const beforeMatch = line.substring(0, match.index);
                const sq = (beforeMatch.match(/'/g) || []).length;
                const dq = (beforeMatch.match(/"/g) || []).length;
                const bt = (beforeMatch.match(/`/g) || []).length;
                if (sq % 2 === 1 || dq % 2 === 1 || bt % 2 === 1) continue;

                const matchText = match[0];
                issues.push({
                    ruleId: rule.id,
                    severity: rule.severity,
                    file: relativePath,
                    line: lineNum,
                    message: rule.message.replace('{match}', matchText),
                    match: matchText,
                });
            }
        }
    }

    // ── 4. 检查未关闭的条件编译块 ──
    for (const ctx of contextStack) {
        issues.push({
            ruleId: 'R3',
            severity: 'error',
            file: relativePath,
            line: ctx.line,
            message: `条件编译指令不配对: #${ctx.isNegated ? 'ifndef' : 'ifdef'} ${ctx.rawPlatforms} 缺少匹配的 #endif`,
            match: `#${ctx.isNegated ? 'ifndef' : 'ifdef'}`,
        });
    }

    return issues;
}

// ─── 文件列表获取 ──────────────────────────────────────────────

function getStagedFiles() {
    try {
        const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
            cwd: ROOT,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe'],
        });
        return output.trim().split('\n').filter((f) => f.length > 0).map((f) => path.resolve(ROOT, f));
    } catch (e) {
        return [];
    }
}

function getAllFiles() {
    try {
        const output = execSync('git ls-files "*.vue" "*.js"', {
            cwd: ROOT,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe'],
        });
        return output.trim().split('\n').filter((f) => f.length > 0).map((f) => path.resolve(ROOT, f));
    } catch (e) {
        return [];
    }
}

// ─── 主流程 ────────────────────────────────────────────────────

function main() {
    const args = process.argv.slice(2);
    const verbose = args.includes('--verbose');
    const checkAll = args.includes('--all');
    const fileArgIdx = args.indexOf('--file');

    let files;
    if (fileArgIdx !== -1 && args[fileArgIdx + 1]) {
        files = [path.resolve(ROOT, args[fileArgIdx + 1])];
    } else if (checkAll) {
        files = getAllFiles();
    } else {
        files = getStagedFiles();
    }

    files = files.filter((f) => {
        const ext = path.extname(f);
        if (!ALLOWED_EXTENSIONS.includes(ext)) return false;
        return !EXCLUDE_PATTERNS.some((p) => p.test(f));
    });

    if (files.length === 0) {
        console.log('[compat-check] 没有需要检查的文件');
        process.exit(0);
    }

    console.log(`[compat-check] 检查 ${files.length} 个文件...\n`);

    let allIssues = [];
    let checkedCount = 0;

    for (const file of files) {
        const issues = checkFile(file);
        checkedCount++;
        if (issues.length === 0) {
            if (verbose) console.log(`  OK  ${path.relative(ROOT, file)}`);
        } else {
            allIssues.push(...issues);
        }
    }

    const errors = allIssues.filter((i) => i.severity === 'error');
    const warnings = allIssues.filter((i) => i.severity === 'warning');

    if (allIssues.length > 0) {
        const byFile = {};
        for (const issue of allIssues) {
            if (!byFile[issue.file]) byFile[issue.file] = [];
            byFile[issue.file].push(issue);
        }

        for (const [file, fileIssues] of Object.entries(byFile)) {
            console.log(`\n  ${file}`);
            for (const issue of fileIssues) {
                const icon = issue.severity === 'error' ? 'ERROR' : 'WARN ';
                console.log(`    ${icon} [${issue.ruleId}] L${issue.line}: ${issue.message}`);
            }
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`  检查文件: ${checkedCount}`);
    console.log(`  问题总数: ${allIssues.length} (error: ${errors.length}, warning: ${warnings.length})`);

    if (errors.length > 0) {
        console.log('\n  [compat-check] 提交被阻断，请修复上述 ERROR 后重新提交。');
        console.log('  跳过检查(不推荐): git commit --no-verify\n');
        process.exit(1);
    } else if (warnings.length > 0) {
        console.log('\n  [compat-check] 有警告但不阻断提交，请确认上述 WARNING。');
        process.exit(0);
    } else {
        console.log('  [compat-check] 通过，无兼容性问题。');
        process.exit(0);
    }
}

main();
