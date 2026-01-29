import type { PropType } from 'vue';

export interface NumberKeyboardProps {
    mode: 'popup' | 'page';
    // 数值、折扣、身份证
    type: 'number' | 'discount' | 'idcard';
    modelValue: string;
    maxlength: number | string;
    show: boolean;
    discounts: number[];
    rightKeys: boolean;
    customKeys: string[];
    randomKeys: boolean;
    confirmText: string;
    confirmDisabled: boolean;
    showClear: boolean;
    textColor: string;
    textSize: string | number;
    confirmBg: string;
    confirmColor: string;
    keyBg: string;
    background: string;
    activeInputRef: string;
    inputValues: Record<string, string>;
}

export default {
    mode: { type: String as PropType<'popup' | 'page'>, default: () => 'popup' },
    type: { type: String as PropType<'number' | 'discount' | 'idcard'>, default: () => 'number' },
    modelValue: { type: String, default: () => '' },
    maxlength: { type: [Number, String], default: () => null },
    show: { type: Boolean, default: () => false },
    discounts: { type: Array as PropType<number[]>, default: () => [] },
    rightKeys: { type: Boolean, default: () => true },
    customKeys: { type: Array as PropType<string[]>, default: () => [] },
    randomKeys: { type: Boolean, default: () => false },
    confirmText: { type: String, default: () => '确定' },
    confirmDisabled: { type: Boolean, default: () => false },
    showClear: { type: Boolean, default: () => true },
    textColor: { type: String, default: () => '#000' },
    textSize: { type: [Number, String], default: () => 48 },
    backspaceSize: { type: [Number, String], default: () => 48 },
    confirmBg: { type: String, default: () => '' },
    confirmColor: { type: String, default: () => '#fff' },
    // 按键背景颜色
    keyBg: { type: String, default: () => '#fff' },
    // 背景颜色
    background: { type: String, default: () => '#f9f9f9' },
    // 多输入框支持 - 当前激活的输入引用名称
    activeInputRef: { type: String, default: '' },
    // 所有输入框的值对象，键为inputRef，值为对应输入值
    inputValues: { type: Object as PropType<Record<string, string>>, default: () => ({}) },
};
