import type { TableColumnProps } from '../ste-table-column/props';
import { toRaw } from 'vue';

type StyleOrClassFunction<T> = (params: object) => T;
type StyleOrClass<T> = T | StyleOrClassFunction<T> | undefined;
interface ColumnItem extends TableColumnProps {
    [key: string]: any;
}

/**
 * 根据对象的 key 值将数组分组
 * @param arr 要分组的数组
 * @returns 分组后的二维数组
 */
function groupByKeys(arr: ColumnItem[]): ColumnItem[][] {
    // 如果数组为空，直接返回空数组
    if (!arr.length) return [];

    const result: ColumnItem[][] = [];
    const usedIndices = new Set<number>();

    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
        // 如果当前元素已经被分组，则跳过
        if (usedIndices.has(i)) continue;

        const currentItem = toRaw(arr[i]);
        const group: ColumnItem[] = [currentItem];
        usedIndices.add(i);

        // 查找与当前元素匹配的其他元素
        for (let j = i + 1; j < arr.length; j++) {
            if (usedIndices.has(j)) continue;

            const compareItem = toRaw(arr[j]);
            let isMatch = true;

            // 比较两个对象的所有属性
            for (const key in currentItem) {
                // 如果属性值都为空，认为它们相等
                const currentValue = currentItem[key] || '';
                const compareValue = compareItem[key] || '';

                if (currentValue !== compareValue) {
                    isMatch = false;
                    break;
                }
            }

            // 确保两个对象的属性数量相同
            if (isMatch && Object.keys(currentItem).length === Object.keys(compareItem).length) {
                group.push(compareItem);
                usedIndices.add(j);
            }
        }

        result.push(group);
    }

    return result;
}

function getStyleOrClass<T extends string | object>(fun: StyleOrClass<T>, params: object = {}): T | undefined {
    if (typeof fun === 'function' && fun instanceof Function) return (fun as StyleOrClassFunction<T>)(params);
    else return fun;
}

export { getStyleOrClass, groupByKeys };
