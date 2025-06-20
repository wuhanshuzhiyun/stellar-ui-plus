import ComponentGroups from './componentGroups.json';

// 定义类型
interface GroupData {
    group: string;
    key: string;
    sort: number;
}

interface ConfigJson {
    group: string;
    title: string;
    icon: string;
}

interface PageCodeJson {
    code: string;
}

interface Com {
    group: string;
    key: string;
    name: string;
    title: string;
    icon: string;
    code: string;
}

interface GroupResult {
    group: string;
    key: string;
    sort: number;
    lock?: boolean;
    contents: Com[];
}

// Base64 解码（支持中文）
function base64Decode(base64Str: string): string {
    if (!base64Str) return '';

    try {
        // 使用 atob 解码 Base64 字符串
        const binaryString = atob(base64Str);
        // 将解码后的字符串转换为字节数组
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        // 使用 TextDecoder 将字节数组转换为 UTF-8 字符串
        return new TextDecoder('utf-8').decode(bytes);
    } catch (error) {
        console.error('Base64解码失败:', error);
        return '';
    }
}

const groupsData: Record<string, GroupData> = ComponentGroups;

/**
 * 获取视图页面配置
 * @returns 分组排序后的页面配置数组
 */
export default function viewPages(): GroupResult[] {
    // 动态获取src/subPackages_pages_view/下的所有目录
    const jsons: Record<string, ConfigJson> = import.meta.glob('../../../subPackages_pages_view/*/config.json', { eager: true });

    const codes: Record<string, PageCodeJson> = import.meta.glob('../../../subPackages_pages_view/*/page_code.json', { eager: true });

    const result: GroupResult[] = [];
    const groupMap: Record<string, GroupResult> = {};

    Object.entries(jsons).forEach(([path, json]) => {
        try {
            // 获取目录名
            const dir = path.split('/')[4];
            if (!dir) return;

            const codePath = `../../../subPackages_pages_view/${dir}/page_code.json`;
            const codeData = codes[codePath];
            if (!codeData || !codeData.code) return;

            // 将base64字符串转为utf-8字符串
            const com: Com = {
                key: `page_${dir}`,
                name: json.title,
                title: json.title,
                icon: json.icon,
                group: json.group,
                code: base64Decode(codeData.code),
            };

            if (groupMap[json.group]) {
                groupMap[json.group].contents.push(com);
            } else {
                const groupInfo = groupsData[json.group] || {
                    key: json.group,
                    sort: 0,
                };

                groupMap[json.group] = {
                    group: json.group,
                    key: groupInfo.key,
                    sort: groupInfo.sort,
                    contents: [com],
                };
            }
        } catch (error) {
            console.error(`处理路径 ${path} 时出错:`, error);
        }
    });

    // 将map转换为数组并按sort排序
    return Object.values(groupMap).sort((a, b) => a.sort - b.sort);
}
