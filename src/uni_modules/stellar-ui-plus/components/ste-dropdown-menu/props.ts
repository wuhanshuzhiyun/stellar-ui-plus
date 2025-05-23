import type { ExtractPropTypes, PropType } from 'vue';

export const DEOP_DOWN_MENU_KEY = Symbol('ste-dropdown-menu');

const dropDownMenuProps = {
    title: { type: String, default: '' },
    value: { type: [String, Number, Array] as PropType<string | number | Array<any> | undefined>, default: undefined },
    modelValue: { type: [String, Number, Array] as PropType<string | number | Array<any> | undefined>, default: undefined },
    inactiveColor: { type: String, default: '#000000' },
    activeColor: { type: String, default: '' },
    direction: { type: String, default: 'down' },
    duration: { type: [Number, String], default: 0.2 },
    showMask: { type: Boolean, default: true },
    isMaskClick: { type: Boolean, default: true },
    zIndex: { type: Number, default: 1000 },
    type: { type: String, default: 'block' },
    max: { type: Number, default: 1 },
    dropDownIconColor: { type: String, default: '#bbbbbb' },
};

export type DropDownMenuProps = ExtractPropTypes<typeof dropDownMenuProps>;

export default dropDownMenuProps;

export const dropDownMenuEmits = {
    close: () => true,
    open: () => true,
    change: (value: Array<any>) => Array.isArray(value),
    'item-choose': (item: any) => item,
    'update:modelValue': (value: Array<any>) => Array.isArray(value),
};
