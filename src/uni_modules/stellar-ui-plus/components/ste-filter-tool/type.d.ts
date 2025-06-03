export interface FilterItem {
    title: string;
    children?: FilterItem[];
    multiple?: boolean;
    value?: string | number;
    id?: string | number;
    rowCount?: number;
    expand?: boolean;
    expandCount?: number;
    [key: string]: any;
}

export interface CategoryItem {
    title: string;
    value: string | number | boolean | undefined;
    id?: string | number;
    [key: string]: any;
}

export type FilterType = 'button' | 'checkbox' | 'calendar';

export interface FilterValue {
    title: string; // 筛选项标题
    key: string; // 筛选项key
    values: string[]; // 选中的值数组（单选也用数组，只有一个元素）
}
