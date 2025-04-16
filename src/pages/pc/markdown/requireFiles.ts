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
        const html = formatHtml(assembleTemplate(markdowns[k].html), { enableDebugButton: false });
        const group = k.replace(deg, '$1');
        const sort = k.replace(deg, '$2');
        const name = k.replace(deg, '$3');
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
        // let html = markdowns[k].html;
        let { html, desc, demo, api, guide } = markdowns[k];
        const name = k.replace(deg, '$1');
        if (propsData[name] && api?.includes('<!-- props -->')) api = api.replace('<!-- props -->', propsData[name]);
        else console.error(`组件【${name}】Props文档异常，请严格按照规范编写文档`);

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
