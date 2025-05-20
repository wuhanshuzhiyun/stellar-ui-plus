import type { PropType } from 'vue';

export default {
    /** 商品数据 */
    data: {
        type: Object as PropType<{ image: string; title: string; tag?: string; barCode: string; code: string; price: string | number; originalPrice?: string | number }>,
        default: () => ({}),
    },
    /** 标签背景色 */
    tagBg: {
        type: String,
    },
    /** 单选框位置 */
    checkboxPositions: {
        type: String as PropType<'left' | 'right' | 'none'>,
        default: () => 'right',
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
    /** 数量 */
    number: {
        type: Number,
    },
    /** 是否显示步进器 */
    stepper: {
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
};
