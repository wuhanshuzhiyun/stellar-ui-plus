import type { PropType } from 'vue';

export interface GoodsInfoType extends Record<string, any> {
    image?: string;
    title?: string;
    tag?: string;
    barCode?: string;
    code?: string;
    price?: string | number;
    originalPrice?: string | number;
}

export interface SuggestData {
    title?: string;
    number?: string | number;
    applyForText?: string | null;
    applyForNumber?: string | number;
    items: { label: string; value: string | number }[];
}

export const defaultSuggestData: () => SuggestData = () => ({ title: '建议', number: 0, applyForText: '申请', applyForNumber: 0, items: [] });

export default {
    /** 商品数据 */
    data: {
        type: Object as PropType<GoodsInfoType>,
        default: () => ({}),
    },
    /** image大小 */
    imageSize: {
        type: [Number, String],
        default: () => 160,
    },
    /** 是否隐藏价格 */
    hidePrice: {
        type: Boolean,
        default: () => false,
    },
    /** 标签背景色 */
    tagBg: {
        type: String,
    },
    /** 选择框位置 */
    checkbox: {
        type: String as PropType<'left' | 'right' | 'none'>,
        default: () => 'none',
    },
    /** 是否禁用选择框 */
    checkboxDisabled: {
        type: Boolean,
        default: () => false,
    },
    /** 是否选中 */
    checked: {
        type: Boolean,
        default: () => false,
    },
    /** 水印URL */
    watermark: {
        type: String,
        default: () => '',
    },
    /** 水印样式 */
    watermarkStyle: {
        type: Object,
        default: () => ({}),
    },
    /** 数量 */
    number: {
        type: Number,
        default: () => 1,
    },
    /** 是否显示步进器 */
    stepper: {
        type: Boolean,
        default: () => false,
    },
    /** 是否显示步进器 */
    disableInput: {
        type: Boolean,
        default: () => false,
    },

    /** 数值精度 */
    precision: {
        type: Number,
        default: () => 0,
    },
    /** 步进器步长 */
    step: {
        type: Number,
        default: () => 1,
    },
    /** 最小值 */
    min: {
        type: Number,
        default: () => 1,
    },
    /** 最大值 */
    max: {
        type: Number,
        default: () => 9999,
    },
    /** 建议数据 */
    suggestData: {
        type: Object as PropType<SuggestData>,
    },
};
