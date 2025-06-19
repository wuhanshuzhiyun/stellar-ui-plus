import ComponentGroups from './componentGroups.json';

const groupsData: { [key: string]: { group: string; key: string; sort: number } } = ComponentGroups as any;

interface Com {
    group: string;
    key: string;
    name: string;
    title: string;
    icon: string;
    code: string;
}
export default function viewPages() {
    // 动态获取src/subPackages_pages_view/下的所有目录
    const jsons: { [key: string]: { group: string; title: string; icon: string } } = import.meta.glob(`../../../subPackages_pages_view/*/config.json`, { eager: true });
    const codes: { [key: string]: { code: string } } = import.meta.glob(`../../../subPackages_pages_view/*/page_code.json`, { eager: true });
    const result: { group: string; key: string; sort: number; lock?: boolean; contents: Com[] }[] = [];
    const map: { [key: string]: { group: string; key: string; sort: number; lock?: boolean; contents: Com[] } } = {};
    Object.keys(jsons).forEach(k => {
        // 获取目录名
        const dir = k.split('/')[4];
        const json = jsons[k];
        const { code } = codes[`../../../subPackages_pages_view/${dir}/page_code.json`];
        const com: Com = {
            key: `page_${dir}`,
            name: dir,
            title: json.title,
            icon: json.icon,
            group: json.group,
            code: code,
        };
        if (map[json.group]) {
            map[json.group].contents.push(com);
        }

        if (!map[json.group]) {
            const g = groupsData[json.group];
            map[json.group] = {
                group: json.group,
                key: g?.key || json.group,
                sort: g?.sort || 0,
                contents: [com],
            };
        }
    });

    Object.keys(map).forEach(group => {
        result.push(map[group]);
    });
    return result.sort((a, b) => a.sort - b.sort);
}
