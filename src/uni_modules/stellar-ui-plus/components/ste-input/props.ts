import type { InputConfirmType } from '@uni-helper/uni-app-types';
import type { ExtractPropTypes, PropType } from 'vue';
import type { SteInputType } from '../../types';

const inputProps = {
    value: { type: [String, Number], default: '' },
    // 当前值（支持v-model双向绑定）
    modelValue: { type: String, default: '' },
    type: { type: String as PropType<SteInputType>, default: 'text' },
    placeholder: { type: String, default: '' },
    placeholderStyle: { type: String, default: 'color: #BBBBBB' },
    placeholderClass: { type: String, default: 'ste-input-placeholder' },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    maxlength: { type: Number, default: -1 },
    showWordLimit: { type: Boolean, default: false },
    confirmType: { type: String as PropType<InputConfirmType>, default: 'done' },
    focus: { type: Boolean, default: false },
    inputAlign: { type: String, default: 'left' },
    fontSize: { type: [String, Number], default: 24 },
    fontColor: { type: String, default: '#000000' },
    readonly: { type: Boolean, default: false },
    shape: { type: String, default: 'square' },
    border: { type: Boolean, default: false },
    borderColor: { type: String, default: '' },
    background: { type: String, default: '' },
    rootClass: { type: String, default: '' },
    cursorSpacing: { type: Number, default: 20 },
    allowSpace: { type: Boolean, default: true },
    cursor: { type: [Number] as PropType<number | undefined>, default: 999 },
    password: { type: Boolean, default: false },
    // 新增过滤器函数，用于在输入时对值进行预处理
    filter: {
        type: Function as PropType<(value: string | number | undefined) => string>,
        default: undefined,
    },
};

export default inputProps;

export type InputProps = ExtractPropTypes<typeof inputProps>;

export interface InputEmits {
    (e: 'input', value: string | number | undefined): void;
    (e: 'clear'): void;
    (e: 'update:focus', v: boolean): void;
    (e: 'update:modelValue', value: string | number | undefined): void;
    (e: 'blur'): void;
    (e: 'focus', value: string | number | undefined): void;
    (e: 'confirm', value: string | number | undefined): void;
}
