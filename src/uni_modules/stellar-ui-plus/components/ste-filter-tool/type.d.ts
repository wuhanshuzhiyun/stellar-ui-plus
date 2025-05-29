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

export type FilterType = 'button' | 'checkbox';
