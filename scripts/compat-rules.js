/**
 * compat-rules.js
 *
 * stellar-ui uni-app 跨平台兼容性检查规则定义
 *
 * 每条规则结构:
 * {
 *   id:        规则编号 (R1, R2, ...)
 *   name:      规则名称
 *   severity:  'error' | 'warning'
 *   platforms: 受影响的平台列表 (['H5', 'MP-WEIXIN', 'APP', 'MP-ALIPAY', ...])
 *   blockTypes: 该规则适用于哪些 SFC 块 ('script' | 'template' | 'style')
 *   pattern:   正则表达式，匹配问题代码
 *   exempt:    受保护的上下文 — 如果当前条件编译上下文包含这些平台之一，则不报错
 *   message:   报错消息模板，{match} 会被替换为实际匹配内容
 * }
 *
 * exempt 逻辑: 如果当前条件编译上下文只覆盖 H5 平台，则 document.* 不报错。
 */

'use strict';

// ─── 受保护平台常量 ────────────────────────────────────────────

// H5 系列平台标识 — 在这些平台上下文中，DOM API 是安全的
const H5_SAFE = ['H5', 'WEB', 'MP-360'];

// App 系列平台标识 — renderjs 在 H5 和 APP 上都运行
const APP_SAFE = ['APP', 'APP-PLUS'];

// 小程序系列平台标识
const MP_SAFE = ['MP', 'MP-WEIXIN', 'MP-ALIPAY', 'MP-BAIDU', 'MP-TOUTIAO'];

// ─── 规则列表 ──────────────────────────────────────────────────

const rules = [
    {
        id: 'R1',
        name: 'DOM API 裸露',
        severity: 'error',
        platforms: ['MP-WEIXIN', 'MP-ALIPAY', 'APP'],
        blockTypes: ['script', 'template'],
        // 匹配 document.xxx, window.xxx, navigator.xxx (排除注释和字符串内的)
        pattern: /(?<!\/\/\s*)(?<!['"`])\b(document|window|navigator)\.\w+/g,
        exempt: [...H5_SAFE, ...APP_SAFE], // 在 H5 或 renderjs(在 APP 也运行) 上下文中安全
        message: '{match} 是 DOM API，仅在 H5/APP 平台可用，需包裹在 #ifdef H5 条件编译中',
    },
    {
        id: 'R2',
        name: 'wx.* API 裸露',
        severity: 'error',
        platforms: ['H5', 'APP', 'MP-ALIPAY'],
        blockTypes: ['script'],
        pattern: /\bwx\.\w+/g,
        exempt: ['MP-WEIXIN', 'MP'], // 在微信小程序上下文中安全
        message: '{match} 是微信小程序专有 API，需包裹在 #ifdef MP-WEIXIN 条件编译中',
    },
    {
        id: 'R3',
        name: '条件编译指令不配对',
        severity: 'error',
        platforms: ['H5', 'MP-WEIXIN', 'MP-ALIPAY', 'APP'],
        blockTypes: ['script', 'template', 'style'],
        // 此规则不使用 pattern 匹配，而是在指令追踪阶段单独检测
        pattern: null,
        exempt: [],
        message: '条件编译指令不配对: {match} 缺少匹配的 #endif',
    },
    {
        id: 'R4',
        name: 'addEventListener 裸露',
        severity: 'error',
        platforms: ['MP-WEIXIN', 'MP-ALIPAY', 'APP'],
        blockTypes: ['script', 'template'],
        pattern: /\.(addEventListener|removeEventListener)\s*\(/g,
        exempt: [...H5_SAFE, ...APP_SAFE],
        message: '{match} 是 DOM 事件 API，仅在 H5/APP 平台可用，需包裹在条件编译中',
    },
    {
        id: 'R5',
        name: 'renderjs 缺失平台守护',
        severity: 'error',
        platforms: ['MP-WEIXIN', 'MP-ALIPAY'],
        blockTypes: ['template'], // renderjs script 块在 SFC 中被解析为 template 的一部分
        pattern: null, // 此规则在 SFC 解析阶段单独检测
        exempt: [],
        message: 'renderjs script 块缺少 #ifdef H5 || APP-PLUS 条件编译守护',
    },
    {
        id: 'R6',
        name: 'CSS 固定定位使用',
        severity: 'warning',
        platforms: ['MP-WEIXIN', 'MP-ALIPAY'],
        blockTypes: ['style'],
        pattern: /position\s*:\s*fixed/gi,
        exempt: [], // 固定定位在哪都需要人工审查
        message: 'CSS fixed 定位在微信小程序 scroll-view 内可能失效，请确认使用场景',
    },
    {
        id: 'R7',
        name: '事件绑定拼写错误',
        severity: 'warning',
        platforms: ['H5', 'MP-WEIXIN', 'MP-ALIPAY', 'APP'],
        blockTypes: ['template'],
        // 常见拼写错误: mosueleave -> mouseleave, clic -> click, tuchstart -> touchstart
        pattern: /@(mosueleave|mosuemove|mosueup|mosuedown|clic|tuchstart|tuchmove|tuchend|tuchcancel)\b/gi,
        exempt: [], // 拼写错误在任何上下文都应报告
        message: '事件绑定可能有拼写错误: {match}，请检查是否为正确的 Vue/uni-app 事件名',
    },
    {
        id: 'R8',
        name: '平台覆盖缺失',
        severity: 'warning',
        platforms: ['H5', 'MP-WEIXIN', 'APP'],
        blockTypes: ['script', 'template'],
        // 此规则在条件编译追踪阶段检测: 如果一组 #ifdef 覆盖了部分平台但遗漏了其他平台
        pattern: null,
        exempt: [],
        message: '条件编译仅覆盖 {match}，未覆盖的平台可能需要单独处理',
    },
    {
        id: 'R9',
        name: 'window.open 使用',
        severity: 'warning',
        platforms: ['MP-WEIXIN', 'MP-ALIPAY', 'APP'],
        blockTypes: ['script'],
        pattern: /window\.open\s*\(/g,
        exempt: [...H5_SAFE],
        message: 'window.open() 仅在 H5 环境可用，非 H5 平台需使用 uni.navigateTo 或其他替代方案',
    },
];

module.exports = { rules, H5_SAFE, APP_SAFE, MP_SAFE };
