import type { Group, Markdown } from '../types.js';
import ComponentGroups from './componentGroups.json';
import { formatHtml } from './MdHtmlFormatter';

function templateFiles() {
    const deg = /.+\/(\w+)\.(md|json)$/;
    const map: Obj = {};
    const mds: { [key: string]: Markdown } = import.meta.glob('../../../uni_modules/stellar-ui-plus/template/*.md', { eager: true });
    for (const k in mds) {
        const name = k.replace(deg, '$1');
        map[name] = mds[k].html;
    }
    return map;
}

const templates = templateFiles();

function assembleTemplate(html: string) {
    const kReg = /\<p\>\{\{(\w+)\}\}\<\/p\>/;
    let result = html;
    let key = result.match(kReg);
    while (key) {
        if (!templates[key[1]]) {
            console.error(`模板 ${key[1]} 不存在`);
            break;
        }
        result = result.replace(kReg, templates[key[1]]);
        key = result.match(kReg);
    }
    return result;
}

export function restsFiles() {
    const deg = /\.\/(\w+)\/(\d+)?\-?(.+)\.(md|json)$/;
    const groupJson: Obj = import.meta.glob('./**/*.json', { eager: true });
    const groupData: Obj = {};
    for (const k in groupJson) {
        const groupKey = k.replace(deg, '$1');
        groupData[groupKey] = groupJson[k].default;
    }
    const markdowns: { [key: string]: Markdown } = import.meta.glob('./**/*.md', { eager: true });

    const map: Obj = {};
    for (const k in markdowns) {
        const group = k.replace(deg, '$1');
        const sort = k.replace(deg, '$2');
        const name = k.replace(deg, '$3');

        // 使用文件本身的内容
        const html = formatHtml(assembleTemplate(markdowns[k].html), { enableDebugButton: false });

        if (!map[group]) map[group] = {};
        map[group][name] = { html, sort: sort || 100 };
    }
    const datas: Group[] = Object.keys(map).map(group => {
        const contents = Object.keys(map[group]).map(name => {
            return {
                name,
                key: `${group}-${name}`,
                ...map[group][name],
            };
        });

        contents.sort((a, b) => a.sort - b.sort);

        return {
            key: group,
            ...groupData[group],
            contents,
        };
    });
    datas.sort((a, b) => a.sort - b.sort);

    return datas;
}

/**
 * 只识别两种占位符，避免误伤 README 中的其他 HTML 注释：
 * - <!-- props -->           本组件 ATTRIBUTES.md 完整内容
 * - <!-- ste-xxx/props -->   目标组件 ATTRIBUTES.md 完整内容（如 <!-- ste-tab/props -->）
 */
const API_PLACEHOLDER_RE = /<!--\s*(props|ste-[a-z][a-z0-9-]*\/props)\s*-->/gi;

function resolveApiPlaceholders(api: string, selfName: string, propsData: Obj): { api: string; missing: string[] } {
    const missing: string[] = [];
    const result = api.replace(API_PLACEHOLDER_RE, raw => {
        const name = raw.replace(/^<!--\s*/, '').replace(/\s*-->$/, '');
        // props -> 本组件；ste-xxx/props -> 目标组件
        const key = name === 'props' ? selfName : name.replace(/^ste-/, '').replace(/\/props$/, '');
        const target = propsData[key];
        if (!target) {
            missing.push(raw);
            return '';
        }
        return target;
    });
    return { api: result, missing };
}

export function componentFiles() {
    const deg = /.*components\/ste-([\w\-]+)\/[\w\-]+\.(md|json)$/;

    const props: { [key: string]: Markdown } = import.meta.glob('../../../uni_modules/stellar-ui-plus/components/**/ATTRIBUTES.md', { eager: true });

    const propsData: Obj = {};
    for (const k in props) {
        const html = props[k].html;
        const name = k.replace(deg, '$1');
        propsData[name] = html;
    }

    const markdowns: { [key: string]: Markdown } = import.meta.glob('../../../uni_modules/stellar-ui-plus/components/**/README.md', { eager: true });

    const markdownsData: Obj = {};

    for (const k in markdowns) {
        let { html, desc, demo, api, guide } = markdowns[k];
        const name = k.replace(deg, '$1');

        if (api) {
            const resolved = resolveApiPlaceholders(api, name, propsData);
            api = resolved.api;
            if (resolved.missing.length) {
                console.warn(
                    `组件【${name}】API 占位符解析失败：${resolved.missing.join(', ')}，请检查目标组件是否存在 ATTRIBUTES.md 或对应分节`,
                );
            }
        }

        markdownsData[name] = {
            html: formatHtml(assembleTemplate(html)),
            htmlDesc: desc,
            htmlDemo: demo ? formatHtml(assembleTemplate(demo)) : '',
            htmlApi: api ? formatHtml(assembleTemplate(api)) : '',
            htmlGuide: guide ? formatHtml(assembleTemplate(guide)) : '',
        };
    }

    const groupData: { [key: string]: Group } = {};

    const componentJson: Obj = import.meta.glob('../../../uni_modules/stellar-ui-plus/components/**/config.json', { eager: true });
    const componentData: Obj = {};
    for (const k in componentJson) {
        const name = k.replace(deg, '$1');
        const component: { group: keyof typeof ComponentGroups; html: string; title: string; sort: number } = componentJson[k].default;
        componentData[name] = component;
        const { html, htmlDesc, htmlDemo, htmlApi, htmlGuide } = markdownsData[name];
        componentData[name].html = html;
        componentData[name].htmlDesc = htmlDesc;
        componentData[name].htmlDemo = htmlDemo;
        componentData[name].htmlApi = htmlApi;
        componentData[name].htmlGuide = htmlGuide;

        if (!groupData[component.group]) groupData[component.group] = Object.assign({ contents: [] }, ComponentGroups[component.group]);
        groupData[component.group].contents.push({ ...component, name: component.title, key: name });
    }

    const datas: Group[] = Object.keys(groupData).map(k => {
        const group = groupData[k];
        group.contents.sort((a, b) => a.sort - b.sort);
        return group;
    });

    datas.sort((a, b) => a.sort - b.sort);
    return datas;
}
