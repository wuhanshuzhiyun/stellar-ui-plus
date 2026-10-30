const path = require('node:path');
const fs = require('node:fs');
const { getDir } = require('./utils');

/** 四类条目的输出标题（固定顺序，便于文档站按 h3 标题切分） */
const SECTION_TITLES = {
    props: 'Props',
    events: 'Events',
    methods: 'Methods',
    slots: 'Slots',
};

const SECTION_HEADERS = {
    props: '| 属性名 | 说明  | 类型 | 默认值  | 可选值 | 支持版本 |\n| ----- | ----- | --- | ------- | ------ | -------- |',
    events: '| 事件名 | 说明  | 事件参数 | 支持版本 |\n| ----- | ----- | ------- | -------- |',
    methods: '| 方法名 | 说明  | 参数 | 返回值 | 支持版本 |\n| ----- | ----- | --- | ------ | -------- |',
    slots: '| 插槽名 | 说明  | 参数 | 支持版本 |\n| ----- | ----- | --- | -------- |',
};

/** ste-scroll-to -> ScrollTo（标题用大驼峰组件名，嵌套组件引用时可区分属性归属） */
function toPascalCase(component) {
    return component
        .replace(/^ste-/, '')
        .split('-')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

function formatType(type) {
    return `\`${type}\``;
}

function formatDefault(item) {
    if (item.default === undefined) return '-';
    if (typeof item.default === 'object') return `\`${JSON.stringify(item.default)}\``;
    if (item.type === '-') return `${item.default}`;
    return `\`${item.default}\``;
}

function formatValues(values) {
    return values?.length ? values.map(value => `\`${value.name}\`：${value.description}`).join('<br/>') : '-';
}

function formatParams(params) {
    return params?.length ? params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-';
}

function formatVersion(version) {
    return version ? `\`${version}\`` : '-';
}

/**
 * 将 .easycom.json 的 attributes（props / [event] / [method] / [slot] 四类混排）
 * 编译为 ATTRIBUTES.md 文本。纯函数、无副作用，便于单测与复用。
 *
 * 输出格式（无顶层 ## API，四类标题升级为 ## 并携带大驼峰组件名）：
 *   ## ScrollTo Props
 *   ## ScrollTo Events
 *   ## ScrollTo Methods
 *   ## ScrollTo Slots
 *
 * @param {{ attributes?: Array<Record<string, any>> }} data
 * @param {string} component 组件目录名，如 ste-scroll-to
 * @returns {string}
 */
function buildAttributesMd(data, component) {
    const rows = { props: [], events: [], methods: [], slots: [] };

    (data.attributes || []).forEach(item => {
        if (!item || !item.name) return;

        const description = item.description || '-';
        const version = formatVersion(item.version);

        if (item.name.indexOf('[event]') === 0) {
            rows.events.push(`| \`${item.name.replace('[event]', '')}\` | ${description} | ${formatParams(item.params)} | ${version} |`);
        } else if (item.name.indexOf('[method]') === 0) {
            const returnValue = item.returnValue ? `\`${item.returnValue}\`` : '-';
            rows.methods.push(
                `| \`${item.name.replace('[method]', '')}\` | ${description} | ${formatParams(item.params)} | ${returnValue} | ${version} |`,
            );
        } else if (item.name.indexOf('[slot]') === 0) {
            rows.slots.push(`| \`${item.name.replace('[slot]', '')}\` | ${description} | ${formatParams(item.params)} | ${version} |`);
        } else {
            rows.props.push(
                `| \`${item.name}\` | ${description} | ${formatType(item.type)} | ${formatDefault(item)} | ${formatValues(item.values)} | ${version} |`,
            );
        }
    });

    const pascalName = toPascalCase(component || '');
    let result = '';
    for (const key of Object.keys(SECTION_TITLES)) {
        if (!rows[key].length) continue;
        result += `## ${pascalName} ${SECTION_TITLES[key]}\n${SECTION_HEADERS[key]}\n${rows[key].join('\n')}\n\n`;
    }
    return result;
}

/**
 * 读取单个组件的 .easycom.json（带容错），返回解析后的对象。
 * 说明：源文件中的 `|` 会被统一替换为 `/`，避免破坏 Markdown 表格。
 */
function readEasycomJson(component) {
    const filePath = path.join(getDir(), '/components', `${component}/${component}.easycom.json`);
    const configFilePath = path.join(getDir(), '/components', `${component}/config.json`);

    if (!fs.existsSync(filePath)) {
        if (fs.existsSync(configFilePath)) console.error(`组件【${component}】没有定义.easycom.json说明文件`);
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content) {
        console.error(`组件【${component}】的说明文件内容为空`);
        return null;
    }

    try {
        return JSON.parse(content.replaceAll('|', '/'));
    } catch (error) {
        console.error(`组件【${component}】的 .easycom.json 解析失败：${error.message}`);
        return null;
    }
}

module.exports = function (components) {
    components.forEach(component => {
        const data = readEasycomJson(component);
        if (!data) return;

        if (!data.attributes?.length) {
            console.warn(`组件【${component}】的 .easycom.json 未定义任何 attributes（props/event/method/slot），已跳过 ATTRIBUTES.md 生成`);
            return;
        }

        const mdFile = path.join(getDir(), '/components', `${component}/ATTRIBUTES.md`);
        fs.writeFileSync(mdFile, buildAttributesMd(data, component), 'utf-8');
    });
};

module.exports.buildAttributesMd = buildAttributesMd;
module.exports.readEasycomJson = readEasycomJson;
