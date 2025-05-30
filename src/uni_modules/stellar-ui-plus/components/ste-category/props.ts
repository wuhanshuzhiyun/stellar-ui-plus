import type { PropType } from 'vue';

export interface CategoryItem {
    title: string;
    value: string | number | boolean | undefined;
    [key: string]: any;
}

const categoryProps = {
    // 当前选择的分类对应的数据值
    value: { type: [String, Number], default: '' },
    data: {
        type: Array as PropType<CategoryItem[]>,
        default: () => [],
    },
};

export const categoryEmits = {
    'update:value': (value: string | number) => typeof value === 'string' || typeof value === 'number',
    change: (value: string | number) => typeof value === 'string' || typeof value === 'number',
};

export default categoryProps;
