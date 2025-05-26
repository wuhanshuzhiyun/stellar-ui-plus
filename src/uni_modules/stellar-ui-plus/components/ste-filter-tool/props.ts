import type { PropType } from 'vue';

export interface FilterItem {
    title: string;
    children?: FilterItem[];
    multiple?: boolean;
    [key: string]: any;
}

const props = {
    value: { type: [String, Number, Array] as unknown as PropType<string | number | (string | number)[]>, default: '' },
    multiple: { type: Boolean, default: false },
    activeColor: { type: String, default: '#0275FF' },
    inactiveColor: { type: String, default: '#555A61' },
    filterText: { type: String, default: '筛选' },
    menuData: {
        type: Array as PropType<FilterItem[]>,
        default: () => [],
    },
    filterData: {
        type: Array as PropType<FilterItem[]>,
        default: () => [],
    },
};

export const filterToolEmits = {
    itemClick: (items: FilterItem[]) => typeof items === 'object',
    menuChange: (_items: FilterItem[]) => true,
};

export default props;
