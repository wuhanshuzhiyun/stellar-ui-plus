import type { ExtractPropTypes, PropType } from 'vue';
import type { TableColumnProps } from '../ste-table-column/props';

const DEFAULT_SUM_TEXT = '合计';
export const CHECK_ICON_SIZE = 36;
export const TABLE_KEY = Symbol('ste-table');

export const SELECTION_COLOR_CONFIG = {
    main: '#3491FA',
    unSelected: '#BBBBBB',
    disabled: '#E6E6E6',
    readonly: 'rgba(52, 145, 250, 0.4)',
};

const tableProps = {
    data: { type: Array, default: () => [] },
    sticky: Boolean,
    offsetTop: { type: [Number, String], default: 0 },
    border: Boolean,
    stripe: { type: Boolean, default: true },
    emptyText: String,
    // 表尾显示合计行
    showSummary: Boolean,
    sumText: { type: String, default: DEFAULT_SUM_TEXT },
    summaryMethod: { type: Function, default: () => {} },
    selectable: { type: [Function], default: null },
    readable: { type: [Function], default: null },
    fixed: Boolean,
    formatter: { type: [Function], default: null },
    header: { type: [Function, String], default: null },
    height: [Number, String],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    highlightSelectionRow: Boolean,
    showHeader: { type: Boolean, default: true },
    maxHeight: [Number, String],
    selectionIconColor: {
        type: Object as PropType<typeof SELECTION_COLOR_CONFIG>,
        default: () => SELECTION_COLOR_CONFIG,
    },
    isPopover: [Boolean, null], // 单元格是否开启内容超长时省略显示并长按显示提示
    popoverLine: { type: [Number, String], default: 1 }, // 单元格开启isPopover时，超过多少行才显示省略提示
};

export type TableProps = ExtractPropTypes<typeof tableProps>;

export const tableEmits = {
    selectAll: (selectionList: object[]) => Array.isArray(selectionList),
    select: (selectionList: object[], row: object) => Array.isArray(selectionList) && row instanceof Object,
    cellClick: (row: object, column: TableColumnProps, event: any) => row instanceof Object && column instanceof Object && event,
    rowClick: (row: object, event: any) => row instanceof Object && event,
    headerClick: (column: TableColumnProps, event: any) => column instanceof Object && event,
    scrollToLower: () => true,
};

export type TableEmits = typeof tableEmits;

export default tableProps;
