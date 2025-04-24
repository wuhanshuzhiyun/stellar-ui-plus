import type { PropType } from 'vue';

export interface NumberKeyboardProps {
    mode: string;
    modelValue: string;
    maxlength: number | string;
    show: boolean;
    rightKeys: boolean;
    randomKeys: boolean;
    confirmText: string;
    confirmDisabled: boolean;
    customKeys: string[];
    showClear: boolean;
    textColor: string;
    textSize: string | number;
    confirmBg: string;
    confirmColor: string;
    activeInputRef: string;
    inputValues: Record<string, string>;
}

export default {
    mode: { type: String, default: () => 'popup' },
    modelValue: { type: String, default: () => '' },
    maxlength: { type: [Number, String], default: () => null },
    show: { type: Boolean, default: () => false },
    rightKeys: { type: Boolean, default: () => true },
    randomKeys: { type: Boolean, default: () => false },
    confirmText: { type: String, default: () => '确定' },
    confirmDisabled: { type: Boolean, default: () => false },
    customKeys: { type: Array as PropType<string[]>, default: () => [] },
    showClear: { type: Boolean, default: () => true },
    textColor: { type: String, default: () => '#000' },
    textSize: { type: [Number, String], default: () => 48 },
    confirmBg: { type: String, default: () => '' },
    confirmColor: { type: String, default: () => '#fff' },
    // 多输入框支持 - 当前激活的输入引用名称
    activeInputRef: { type: String, default: '' },
    // 所有输入框的值对象，键为inputRef，值为对应输入值
    inputValues: { type: Object as PropType<Record<string, string>>, default: () => ({}) },
};
