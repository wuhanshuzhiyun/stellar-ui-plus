import type { PropType } from 'vue';

export interface SelectOption {
    label?: string;
    value: string | number;
    disabled?: boolean;
    [key: string]: any;
}

export type SelectValue = string | number | null | undefined;

export interface SteSelectOrderProps {
    modelValue: SelectValue;
    list: SelectOption[];
    placeholder: string;
    labelKey: string;
    valueKey: string;
    disabled: boolean;
    maskClose: boolean;
}

export default {
    modelValue: { type: [String, Number, null, undefined] as PropType<SelectValue>, default: undefined },
    list: { type: Array as PropType<SelectOption[]>, default: () => [] },
    placeholder: { type: String, default: '请选择' },
    labelKey: { type: String, default: 'label' },
    valueKey: { type: String, default: 'value' },
    disabled: { type: Boolean, default: false },
    maskClose: { type: Boolean, default: true },
};
