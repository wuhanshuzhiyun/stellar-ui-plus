#!/usr/bin/env node
/**
 * .easycom.json 四类条目校验 / 补全脚本
 *
 * 扫描每个组件目录下 ste-xxx.vue 源码，提取：
 *   - 事件：defineEmits([...]) / defineEmits<{...}>() / emit('x') / $emit('x')
 *   - 方法：defineExpose({ ... })
 *   - 插槽：<slot name="x"> / <slot>（默认插槽）
 * 与 ste-xxx.easycom.json 中已有的 [event] / [method] / [slot] 条目对比，报告缺失。
 *
 * 用法：
 *   node scripts/validate-easycom.js               仅报告（有缺失时退出码 1，可用于 CI）
 *   node scripts/validate-easycom.js --fix         自动向 .easycom.json 追加骨架条目（description 留空待人工补）
 *   node scripts/validate-easycom.js ste-button    仅校验指定组件（可多个）
 *   node scripts/validate-easycom.js --fix ste-tabs ste-table
 */
const fs = require('node:fs');
const path = require('node:path');

const COMPONENTS_DIR = path.resolve(__dirname, '../src/uni_modules/stellar-ui-plus/components');

const argv = process.argv.slice(2);
const FIX = argv.includes('--fix');
const only = argv.filter(item => !item.startsWith('--'));

const PREFIX = {
    event: '[event]',
    method: '[method]',
    slot: '[slot]',
};

/** 从源码中提取事件名 */
function extractEvents(code) {
    const names = new Set();
    const collect = block => {
        const quoted = block.match(/['"]([\w:.-]+)['"]/g) || [];
        quoted.forEach(item => names.add(item.slice(1, -1)));
    };

    // defineEmits(['a', 'b'])
    let match;
    const arrayRe = /defineEmits\s*\(\s*\[([\s\S]*?)\]\s*\)/g;
    while ((match = arrayRe.exec(code))) collect(match[1]);

    // defineEmits<{ (e: 'a'): void }>()
    const typeRe = /defineEmits\s*<([\s\S]*?)>\s*\(\s*\)/g;
    while ((match = typeRe.exec(code))) collect(match[1]);

    // emit('a') / $emit('a')
    const callRe = /(?:\$?emit)\s*\(\s*['"]([\w:.-]+)['"]/g;
    while ((match = callRe.exec(code))) names.add(match[1]);

    return names;
}

/** 从 defineExpose 中提取暴露的方法名 */
function extractMethods(code) {
    const names = new Set();
    const exposeRe = /defineExpose\s*\(\s*\{([\s\S]*?)\}\s*\)/g;
    let match;
    while ((match = exposeRe.exec(code))) {
        const block = match[1];
        const keyRe = /(?:^|[,{])\s*([A-Za-z_$][\w$]*)\s*(?=[:,}(])/g;
        let keyMatch;
        while ((keyMatch = keyRe.exec(block))) names.add(keyMatch[1]);
    }
    return names;
}

/** 从模板中提取插槽名（无 name 视为 default） */
function extractSlots(code) {
    const names = new Set();
    const slotRe = /<slot\b([^>]*)>/g;
    let match;
    while ((match = slotRe.exec(code))) {
        const attrs = match[1];
        // 跳过动态插槽 :name
        if (/:(name|v-bind:name)\s*=/.test(attrs)) continue;
        const nameMatch = attrs.match(/\bname\s*=\s*["']([^"']+)["']/);
        names.add(nameMatch ? nameMatch[1] : 'default');
    }
    return names;
}

/** 读取 .easycom.json 中已声明的四类名称 */
function readDeclared(easycom) {
    const declared = { event: new Set(), method: new Set(), slot: new Set() };
    (easycom.attributes || []).forEach(item => {
        if (!item?.name) return;
        for (const kind of Object.keys(PREFIX)) {
            const prefix = PREFIX[kind];
            if (item.name.indexOf(prefix) === 0) declared[kind].add(item.name.slice(prefix.length));
        }
    });
    return declared;
}

function createSkeleton(kind, name) {
    const skeleton = { name: `${PREFIX[kind]}${name}`, description: '' };
    if (kind === 'event') skeleton.params = [{ name: 'data', description: '' }];
    if (kind === 'method') skeleton.returnValue = '';
    if (kind === 'slot') skeleton.params = [];
    return skeleton;
}

const results = [];
let totalMissing = 0;
let totalFixed = 0;

const dirs = fs
    .readdirSync(COMPONENTS_DIR)
    .filter(name => name.startsWith('ste-') && fs.statSync(path.join(COMPONENTS_DIR, name)).isDirectory())
    .filter(name => !only.length || only.includes(name))
    .sort();

for (const component of dirs) {
    const vuePath = path.join(COMPONENTS_DIR, component, `${component}.vue`);
    const easycomPath = path.join(COMPONENTS_DIR, component, `${component}.easycom.json`);

    if (!fs.existsSync(vuePath) || !fs.existsSync(easycomPath)) continue;

    const code = fs.readFileSync(vuePath, 'utf-8');
    const easycom = JSON.parse(fs.readFileSync(easycomPath, 'utf-8'));
    const declared = readDeclared(easycom);

    const actual = {
        event: extractEvents(code),
        method: extractMethods(code),
        slot: extractSlots(code),
    };

    const missing = { event: [], method: [], slot: [] };
    for (const kind of Object.keys(PREFIX)) {
        for (const name of actual[kind]) {
            if (!declared[kind].has(name)) missing[kind].push(name);
        }
    }

    const count = missing.event.length + missing.method.length + missing.slot.length;
    if (!count) continue;

    totalMissing += count;
    results.push({ component, missing });

    if (FIX) {
        easycom.attributes = easycom.attributes || [];
        for (const kind of Object.keys(PREFIX)) {
            for (const name of missing[kind]) {
                easycom.attributes.push(createSkeleton(kind, name));
            }
        }
        fs.writeFileSync(easycomPath, `${JSON.stringify(easycom, null, 4)}\n`, 'utf-8');
        totalFixed += count;
    }
}

if (!results.length) {
    console.log('✅ 所有组件的 .easycom.json 四类条目均已与源码对齐');
    process.exitCode = 0;
} else {
    console.log(`\n发现 ${results.length} 个组件、共 ${totalMissing} 处四类条目缺失：\n`);
    for (const { component, missing } of results) {
        const lines = [];
        for (const kind of Object.keys(PREFIX)) {
            for (const name of missing[kind]) lines.push(`    ${PREFIX[kind]}${name}`);
        }
        console.log(`  ${component}（${lines.length}）\n${lines.join('\n')}`);
    }

    if (FIX) {
        console.log(`\n🛠  已自动向 .easycom.json 追加 ${totalFixed} 条骨架条目（description 待人工补充），请 review 后提交。`);
        process.exitCode = 0;
    } else {
        console.log('\n提示：加 --fix 可自动追加骨架条目；或按上述清单人工补充。');
        process.exitCode = 1;
    }
}
