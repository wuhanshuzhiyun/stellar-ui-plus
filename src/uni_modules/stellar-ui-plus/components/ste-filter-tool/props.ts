import type { PropType } from 'vue';
import type { FilterItem, FilterType } from './type';

const props = {
    value: { type: [String, Number, Array] as unknown as PropType<string | number | (string | number)[]>, default: '' },
    activeColor: { type: String, default: '#0275FF' },
    inactiveColor: { type: String, default: '#555A61' },
    filterType: { type: String as PropType<FilterType>, default: 'button' },
    data: {
        type: Array as PropType<FilterItem[]>,
        default: () => [],
    },
};

export const filterToolEmits = {
    // itemClick: (items: FilterItem[]) => typeof items === 'object',
    // menuChange: (_items: FilterItem[]) => true,
    confirm: (items: FilterItem[]) => typeof items === 'object',
    reset: () => true,
};

export default props;
