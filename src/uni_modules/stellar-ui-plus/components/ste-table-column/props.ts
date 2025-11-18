import type { ExtractPropTypes, PropType } from 'vue';
import type { AlignType } from '../../types';
import type { SelectColType } from '../ste-table/types';

const tableColumnProps = {
    type: { type: String as PropType<SelectColType>, default: '' },
    customKey: { type: String, default: '' },
    label: { type: String, default: '' },
    prop: { type: String, default: '' },
    width: { type: [String, Number], default: '' },
    minWidth: { type: [String, Number], default: '' },
    align: { type: String as PropType<AlignType>, default: 'left' },
    headerAlign: { type: String as PropType<AlignType>, default: 'left' },
    /** 是否显示 popover（列级别配置，优先级高于表格级别的 isPopover） */
    showPopover: { type: Boolean, default: undefined },
    /** popover 显示行数（列级别配置，优先级高于表格级别的 popoverLine） */
    popoverLine: { type: Number, default: undefined },
};

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

export default tableColumnProps;
