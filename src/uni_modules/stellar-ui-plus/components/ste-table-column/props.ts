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
};

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

export default tableColumnProps;
