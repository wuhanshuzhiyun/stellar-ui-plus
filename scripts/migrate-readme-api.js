#!/usr/bin/env node
/**
 * README API 表格迁移脚本
 *
 * 将各组件 README.md 中手写的 Props / Events / Methods / Slots 表格迁移到 .easycom.json：
 *   1. 扫描 README 中标题含 Props/Events/Methods/Slots 的表格块（如 "## Tab Props"、"## CheckboxGroup 组件属性(Props)"）
 *   2. 按标题归属解析出目标组件（PascalCase -> kebab -> ste-xxx），解析表格为四类条目
 *   3. 合并进目标组件的 .easycom.json（同名条目跳过，缺失条目追加；附属组件无文件则新建）
 *   4. README 重写：本组件表格块删除（由 <!-- props --> 注入）；子组件表格块替换为
 *      <!-- ste-xxx/props+events+methods+slots --> 跨组件占位符；api 段缺 <!-- props --> 的补上
 *   5. 附属组件（无 config.json）若有 README：迁移后直接删除 README（附属组件不编译文档）
 *
 * 用法：
 *   node scripts/migrate-readme-api.js            dry-run，仅输出报告
 *   node scripts/migrate-readme-api.js --apply    执行写入（含删除附属组件 README）
 *   node scripts/migrate-readme-api.js ste-tabs   仅处理指定组件（可多个）
 */
const fs = require('node:fs');
const path = require('node:path');

const COMPONENTS_DIR = path.resolve(__dirname, '../src/uni_modules/stellar-ui-plus/components');
const APPLY = process.argv.includes('--apply');
const only = process.argv.slice(2).filter(item => !item.startsWith('--'));

const KIND_PREFIX = { props: '', events: '[event]', methods: '[method]', slots: '[slot]' };
const TYPE_MAP = { props: 'props', prop: 'props', events: 'events', event: 'events', methods: 'methods', method: 'methods', slots: 'slots', slot: 'slots' };

/** 标题中的组件简称 -> 实际组件（去 ste- 前缀），按 kebab 匹配 */
const OWNER_ALIASES = {
    menu: 'dropdown-menu',
    'menu-item': 'dropdown-menu-item',
};

/** PascalCase / 驼峰 -> kebab-case：CheckboxGroup -> checkbox-group */
function pascalToKebab(text) {
    return text
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();
}

/** 解析标题："Tab Props" / "### Props"（无归属，归本组件）/ "CheckboxGroup 组件属性(Props)" / "组件事件(Events)" -> { owner, type } */
function parseHeading(text) {
    const cleaned = text
        .replace(/组件属性|组件方法|组件事件|组件插槽/g, ' ')
        .replace(/[（(]([a-z]+)[）)]/gi, ' $1')
        .replace(/\s+/g, ' ')
        .trim();
    const match = cleaned.match(/^(.*?)\s*(props|events?|methods?|slots?)$/i);
    if (!match) return null;
    const owner = (match[1] || '').trim();
    const type = TYPE_MAP[match[2].toLowerCase()];
    if (!type) return null;
    return { owner, type };
}

function splitCells(line) {
    let text = line.trim();
    if (text.startsWith('|')) text = text.slice(1);
    if (text.endsWith('|')) text = text.slice(0, -1);
    return text
        .replace(/\\\|/g, '\u0000')
        .split('|')
        .map(cell => cell.trim().replace(/\u0000/g, '\\|'));
}

function cleanCell(cell) {
    return (cell || '').replace(/^`+|`+$/g, '').trim();
}

function parseValue(cell) {
    const value = cleanCell(cell);
    if (!value || /^-+$/.test(value)) return undefined;
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
    return value;
}

/** "`100`：小<br/>`200`：中" -> [{ name: '100', description: '小' }, ...] */
function parseList(cell) {
    const value = (cell || '').trim();
    if (!value || /^-+$/.test(value)) return [];
    return value
        .split(/<br\s*\/?>/i)
        .map(part => {
            const match = part.trim().match(/^`([^`]*)`\s*[:：]?\s*(.*)$/);
            if (match) return { name: match[1].trim(), description: match[2].trim() };
            return { name: part.trim(), description: '' };
        })
        .filter(item => item.name);
}

function isSeparatorRow(cells) {
    return cells.length > 0 && cells.every(cell => /^:?-{2,}:?$/.test(cell));
}

/** 按表头首列判定四类（标题类型优先，表头判定兜底），再按类型解析行 */
function parseTableRows(headerCells, rows, typeOverride) {
    const head = cleanCell(headerCells[0]);
    let type = 'props';
    if (head.includes('事件名')) type = 'events';
    else if (head.includes('方法名')) type = 'methods';
    else if (head.includes('插槽名')) type = 'slots';
    // 源文档表头偶有写错（如 Slots 表写成"方法名"），标题中的类型更可靠
    if (typeOverride) type = typeOverride;

    const hasVersionCol = /支持版本/.test(headerCells[headerCells.length - 1] || '');

    const entries = rows.map(cells => {
        const name = cleanCell(cells[0]);
        const description = (cells[1] || '').trim() || '-';
        const entry = { name, description };
        const version = hasVersionCol ? cleanCell(cells[cells.length - 1]) : '';
        if (version && version !== '-') entry.version = version;

        if (type === 'props') {
            entry.type = cleanCell(cells[2]).replace(/ \/ /g, ' | ') || '-';
            const def = parseValue(cells[3]);
            if (def !== undefined) entry.default = def;
            const values = parseList(cells[4]);
            if (values.length) entry.values = values;
        } else if (type === 'methods') {
            const params = parseList(cells[2]);
            if (params.length) entry.params = params;
            const returnValue = cleanCell(cells[3]);
            if (returnValue && returnValue !== '-') entry.returnValue = returnValue;
        } else {
            const params = parseList(cells[2]);
            if (params.length) entry.params = params;
        }
        return entry;
    });

    return { type, entries };
}

/** 扫描 README 中的 API 表格块与老的 ## API 标题 */
function scanApiBlocks(readme) {
    const lines = readme.split('\n');
    const blocks = [];
    let index = 0;
    while (index < lines.length) {
        const headingMatch = lines[index].match(/^(#{2,4})\s+(.+?)\s*$/);
        if (headingMatch) {
            if (/^#{1,4}\s*API\s*$/i.test(headingMatch[2])) {
                blocks.push({ start: index, end: index, kind: 'apiTitle' });
                index += 1;
                continue;
            }
            const parsed = parseHeading(headingMatch[2]);
            if (parsed) {
                let cursor = index + 1;
                const tableLines = [];
                let blankStreak = 0;
                while (cursor < lines.length) {
                    const trimmed = lines[cursor].trim();
                    if (trimmed.startsWith('|')) {
                        tableLines.push(lines[cursor]);
                        blankStreak = 0;
                        cursor += 1;
                    } else if (trimmed === '' && (tableLines.length ? blankStreak === 0 : true)) {
                        // 标题与表格之间的空行、表格内允许的一个空行，都跳过
                        if (tableLines.length) blankStreak += 1;
                        cursor += 1;
                    } else {
                        break;
                    }
                }
                while (tableLines.length && lines[cursor - 1].trim() === '') cursor -= 1;
                blocks.push({ start: index, end: cursor - 1, kind: 'table', headingText: headingMatch[2], tableLines, ...parsed });
                index = cursor;
                continue;
            }
        }
        index += 1;
    }
    return { lines, blocks };
}

/** 合并条目进 .easycom.json（同名跳过） */
function mergeEntries(easycom, type, entries) {
    easycom.attributes = easycom.attributes || [];
    const prefix = KIND_PREFIX[type];
    let added = 0;
    let skipped = 0;
    const addedNames = [];

    for (const entry of entries) {
        const fullName = `${prefix}${entry.name}`;
        if (easycom.attributes.some(item => item && item.name === fullName)) {
            skipped += 1;
            continue;
        }
        const item = { name: fullName, description: entry.description === '-' ? '' : entry.description };
        if (type === 'props') {
            if (entry.type !== undefined) item.type = entry.type;
            if (entry.default !== undefined) item.default = entry.default;
            if (entry.values?.length) item.values = entry.values;
        } else if (type === 'methods') {
            if (entry.params?.length) item.params = entry.params;
            if (entry.returnValue) item.returnValue = entry.returnValue;
        } else {
            item.params = entry.params || [];
        }
        if (entry.version) item.version = entry.version;
        easycom.attributes.push(item);
        added += 1;
        addedNames.push(fullName);
    }
    return { added, skipped, addedNames };
}

function readEasycom(component) {
    const filePath = path.join(COMPONENTS_DIR, component, `${component}.easycom.json`);
    if (!fs.existsSync(filePath)) return { filePath, data: null };
    try {
        return { filePath, data: JSON.parse(fs.readFileSync(filePath, 'utf-8')) };
    } catch (error) {
        console.error(`  ⚠ ${component}.easycom.json 解析失败：${error.message}`);
        return { filePath, data: null };
    }
}

// ============ 主流程 ============
const dirs = fs
    .readdirSync(COMPONENTS_DIR)
    .filter(name => name.startsWith('ste-') && fs.statSync(path.join(COMPONENTS_DIR, name)).isDirectory());
const dirSet = new Set(dirs);

const targets = dirs.filter(name => !only.length || only.includes(name)).sort();

const report = [];
const pendingWrites = new Map(); // component -> easycom data（待写回）
const dirtySet = new Set(); // 内容有实际变化的 .easycom.json
let createdFiles = 0;
let unknownOwners = [];

for (const component of targets) {
    const readmePath = path.join(COMPONENTS_DIR, component, 'README.md');
    if (!fs.existsSync(readmePath)) continue;

    const readme = fs.readFileSync(readmePath, 'utf-8');
    const { lines, blocks } = scanApiBlocks(readme);
    if (!blocks.length) continue;

    const isAuxiliary = !fs.existsSync(path.join(COMPONENTS_DIR, component, 'config.json'));
    const selfKey = component.replace(/^ste-/, '');
    const item = { component, isAuxiliary, merged: [], readmeChanged: false, deleteReadme: false };

    // 归属 & 解析
    const replacements = []; // { start, end, text|null }
    const seenPlaceholders = new Set(); // 同一 target/type 只保留第一个占位符，重复块直接删除
    for (const block of blocks) {
        if (block.kind === 'apiTitle') {
            replacements.push({ start: block.start, end: block.end, text: null });
            item.merged.push({ target: '(标题)', action: '删除老的 ## API 标题' });
            continue;
        }

        // 归属解析：owner 为空或含中文（如"组件事件(Events)"）视为本组件；否则 PascalCase -> kebab -> ste-xxx
        const isSelfRef = !block.owner || /[^\x00-\xff]/.test(block.owner);
        let kebab = isSelfRef ? component.replace(/^ste-/, '') : pascalToKebab(block.owner);
        if (OWNER_ALIASES[kebab]) kebab = OWNER_ALIASES[kebab];
        const target = isSelfRef ? component : dirSet.has(`ste-${kebab}`) ? `ste-${kebab}` : dirSet.has(`ste-${block.owner.toLowerCase()}`) ? `ste-${block.owner.toLowerCase()}` : null;

        if (!target) {
            unknownOwners.push(`${component}: "${block.headingText}"`);
            continue;
        }

        // 解析表格（标题中的类型优先于表头判定）
        const tableRows = block.tableLines.map(splitCells).filter(cells => !isSeparatorRow(cells));
        const headerCells = tableRows.shift() || [];
        const { type, entries } = parseTableRows(headerCells, tableRows, block.type);
        if (!entries.length) continue;

        // 合并进目标 .easycom.json
        if (!pendingWrites.has(target)) {
            const existing = readEasycom(target).data;
            pendingWrites.set(target, existing || { name: target, description: '', attributes: [] });
            if (!existing) createdFiles += 1;
        }
        const data = pendingWrites.get(target);
        const before = JSON.stringify(data);
        const { added, skipped, addedNames } = mergeEntries(data, type, entries);
        if (JSON.stringify(data) !== before) dirtySet.add(target);
        item.merged.push({ target, action: added ? `新增 ${added} 条（${addedNames.join(', ')}${skipped ? `；跳过已有 ${skipped} 条` : ''}）` : `全部已存在（跳过 ${skipped} 条）` });

        // README 中的替换：本组件表格由 <!-- props --> 注入；子组件统一一个 <!-- ste-xxx/props -->（整份引入，同 target 去重）
        if (target === component) {
            replacements.push({ start: block.start, end: block.end, text: null });
        } else {
            if (seenPlaceholders.has(target)) {
                replacements.push({ start: block.start, end: block.end, text: null });
            } else {
                seenPlaceholders.add(target);
                replacements.push({ start: block.start, end: block.end, text: `<!-- ${target}/props -->` });
            }
        }
    }

    // 重写 README（从后往前替换）
    if (replacements.length) {
        const newLines = [...lines];
        replacements.sort((a, b) => b.start - a.start);
        for (const rep of replacements) {
            const removed = newLines.splice(rep.start, rep.end - rep.start + 1, ...(rep.text === null ? [] : [rep.text, '']));
        }
        item.readmeChanged = true;

        // api 段补 <!-- props -->
        const text = newLines.join('\n');
        const sepIndexes = [];
        const sepRe = /^---\$\s*$/gm;
        let sepMatch;
        while ((sepMatch = sepRe.exec(text))) sepIndexes.push(sepMatch.index);
        if (sepIndexes.length >= 3) {
            const apiStart = text.indexOf('\n', sepIndexes[1]) + 1;
            const apiEnd = sepIndexes[2];
            const apiSection = text.slice(apiStart, apiEnd);
            if (!apiSection.includes('<!-- props -->')) {
                const patched = `${text.slice(0, apiStart)}<!-- props -->\n${text.slice(apiStart)}`;
                item.apiPatched = true;
                pendingWrites.set(`__readme__${component}`, patched);
            } else {
                pendingWrites.set(`__readme__${component}`, text);
            }
        } else {
            console.warn(`  ⚠ 组件【${component}】README 缺少完整的 ---$ 分段，未做 api 段补丁`);
            pendingWrites.set(`__readme__${component}`, text);
        }

        if (isAuxiliary) item.deleteReadme = true;
    }

    if (item.merged.length || item.readmeChanged) report.push(item);
}

// ============ 输出报告 ============
console.log(`\n扫描 ${targets.length} 个组件，${report.length} 个组件需要迁移：\n`);
for (const item of report) {
    console.log(`■ ${item.component}${item.isAuxiliary ? '（附属组件）' : ''}`);
    for (const merge of item.merged) console.log(`    -> ${merge.target}: ${merge.action}`);
    if (item.readmeChanged) console.log(`    -> README.md: ${item.deleteReadme ? '迁移后删除（附属组件不编译文档）' : '表格块替换为占位符'}${item.apiPatched ? ' + api 段补 <!-- props -->' : ''}`);
}
if (unknownOwners.length) {
    console.log(`\n⚠ 未识别归属的标题（保持原样，请人工确认）：`);
    unknownOwners.forEach(line => console.log(`    ${line}`));
}
const newEasycoms = [...pendingWrites.keys()].filter(key => !key.startsWith('__readme__') && !fs.existsSync(path.join(COMPONENTS_DIR, key, `${key}.easycom.json`)));

console.log(`\n统计：涉及组件 ${report.length} 个；待写 README ${[...pendingWrites.keys()].filter(key => key.startsWith('__readme__')).length} 个；新建 .easycom.json ${newEasycoms.length} 个`);

if (!APPLY) {
    console.log('\n（dry-run 模式，未写入任何文件。确认无误后加 --apply 执行）');
    process.exitCode = 0;
} else {
    let readmeCount = 0;
    let easycomCount = 0;
    let deletedCount = 0;
    for (const [key, value] of pendingWrites) {
        if (key.startsWith('__readme__')) {
            const component = key.slice('__readme__'.length);
            const info = report.find(item => item.component === component);
            const readmePath = path.join(COMPONENTS_DIR, component, 'README.md');
            if (info?.deleteReadme) {
                fs.unlinkSync(readmePath);
                deletedCount += 1;
                console.log(`🗑  已删除附属组件 README：${component}/README.md`);
            } else {
                fs.writeFileSync(readmePath, value, 'utf-8');
                readmeCount += 1;
            }
        } else {
            const filePath = path.join(COMPONENTS_DIR, key, `${key}.easycom.json`);
            const exists = fs.existsSync(filePath);
            if (exists && !dirtySet.has(key)) continue; // 无实际变化，不写回
            const data = { ...pendingWrites.get(key) };
            delete data.__dirty;
            fs.writeFileSync(filePath, `${JSON.stringify(data, null, 4)}\n`, 'utf-8');
            easycomCount += 1;
        }
    }
    console.log(`\n✅ 完成：写回 .easycom.json ${easycomCount} 个（含新建），重写 README ${readmeCount} 个，删除附属 README ${deletedCount} 个。`);
}
