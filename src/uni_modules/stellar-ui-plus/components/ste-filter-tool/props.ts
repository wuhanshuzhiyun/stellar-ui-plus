import type { PropType, ExtractPropTypes } from 'vue';
import type { FilterItem, FilterType, FilterValue } from './type';

// 简化的值类型 - 对应每个筛选项的选中值

const props = {
    // 当前选中值 - 数组格式
    value: {
        type: Array as PropType<FilterValue[]>,
        default: () => [],
    },

    // 主题色配置
    activeColor: { type: String, default: '#0275FF' },
    inactiveColor: { type: String, default: '#555A61' },

    // 筛选类型
    filterType: { type: String as PropType<FilterType>, default: 'button' },

    // 筛选数据
    data: {
        type: Array as PropType<FilterItem[]>,
        default: () => [],
    },
    showCategory: { type: Boolean, default: true },
};

export const filterToolEmits = {
    // 确认选择 - 返回 FilterValue[] 格式
    confirm: (values: FilterValue[]) => Array.isArray(values),
    // 重置
    reset: () => true,
    // 值变化（实时）
    'update:value': (values: FilterValue[]) => Array.isArray(values),
    itemClick: (item: FilterValue) => item instanceof Object,
};

export type FilterToolProps = ExtractPropTypes<typeof props>;
export type FilterToolEmits = typeof filterToolEmits;

export default props;
