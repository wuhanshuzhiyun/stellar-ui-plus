import type { CSSProperties, PropType } from 'vue';

export interface GoodsInfoType extends Record<string, any> {
    image?: string;
    title?: string;
    subTitle?: string;
    tag?: string;
    barCode?: string;
    code?: string;
    price?: string | number;
    originalPrice?: string | number;
}

export interface SuggestData {
    title?: string;
    number?: number;
    applyForText?: string;
    applyForNumber?: number;
    items: { label: string; value: number }[];
}

export const defaultSuggestData: () => SuggestData = () => ({ title: '建议', number: 0, items: [] });

export default {
    /** 商品数据 */
    data: {
        type: Object as PropType<GoodsInfoType>,
        default: () => ({}),
    },
    /** 模式：more-(门店)数据多的，less-(食堂)数据少的 */
    mode: {
        type: String as PropType<'more' | 'less'>,
        default: () => 'more',
    },
    /** 组件背景色 */
    background: {
        type: String,
        default: () => '#fff',
    },
    /** image大小 */
    imageSize: {
        type: [Number, String],
        default: () => 160,
    },
    /** 图片圆角 */
    imageRadius: {
        type: [String, Number],
        default: () => 4,
    },
    /** 是否隐藏价格 */
    hidePrice: {
        type: Boolean,
        default: () => false,
    },
    /** 价格文本大小 */
    priceSize: {
        type: [Number, String],
        default: () => 28,
    },
    /** 价格文本颜色 */
    priceColor: {
        type: String,
        default: () => '#ea4335',
    },
    /** 标签背景色 */
    tagBg: {
        type: String,
    },
    /** 标题样式 */
    titleStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({}),
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
        type: Object as PropType<CSSProperties>,
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
    /** 步进器只读 */
    readonlyStepper: {
        type: Boolean,
        default: () => false,
    },
    /** 步进器输入框只读 */
    readonlyStepperInput: {
        type: Boolean,
        default: () => false,
    },
    /** 禁用步进器 */
    disabledStepper: {
        type: Boolean,
        default: () => false,
    },
    /** 禁用步进器输入框 */
    disableInput: {
        type: Boolean,
        default: () => false,
    },
    /** 禁用步进器加号 */
    disablePlus: {
        type: Boolean,
        default: () => false,
    },
    /** 禁用步进器减号 */
    disableMinus: {
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
    /** 建议右侧的申请输入框只读 */
    readonlySuggestInput: {
        type: Boolean,
        default: () => false,
    },
};
