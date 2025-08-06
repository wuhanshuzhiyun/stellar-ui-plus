type FilterToolType = 'button' | 'input';
interface FilterToolProps {
    value?: string; // 控件默认值
    placeholder?: string;
    maxLength?: number;
    [key: string]: any;
}

interface BaseFilterItem {
    title: string;
    value?: string | number;
    [key: string]: any;
}

export interface FilterItem extends BaseFilterItem {
    children?: BaseFilterItem[];
    multiple?: boolean;
    id?: string | number;
    rowCount?: number;
    expand?: boolean;
    expandCount?: number;
    type?: FilterToolType;
    config?: FilterToolProps; // 控件额外配置
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
    title?: string; // 筛选项标题
    key: string; // 筛选项key
    values: string[]; // 选中的值数组（单选也用数组，只有一个元素）
}
