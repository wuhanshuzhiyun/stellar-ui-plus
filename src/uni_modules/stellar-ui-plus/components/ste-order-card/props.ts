import type { PropType } from 'vue';

export interface OrderGoods {
    image?: string;
    title?: string;
    subTitle?: string;
}

export type Props = {
    background?: string;
    contentBg?: string;
    image?: string;
    title?: string;
    statusText?: string;
    tagText?: string;
    helperText?: string;
    data?: OrderGoods[];
    count?: number;
    price?: string;
    mainBtnText?: string;
    mainBtnBg?: string;
    mainBtnTextColor?: string;
    subBtnText?: string;
    showDetail?: boolean;
    showMore?: boolean;
};

export default {
    /** 背景色 */
    background: { type: String, default: () => '#fff' },
    /** 内容区域背景,默认跟随背景色 */
    contentBg: { type: String },
    /** 头部标题图片 */
    image: { type: String, default: () => '' },
    /** 头部标题 */
    title: { type: String, default: () => '' },
    /** 头部状态文本 */
    statusText: { type: String, default: () => '' },
    /** 标签文本 */
    tagText: { type: String, default: () => '' },
    /** 辅助文本 */
    helperText: { type: String, default: () => '' },
    /** 商品信息 */
    data: { type: Array as PropType<OrderGoods[]>, default: () => [] },
    /** 总数 */
    count: { type: Number, default: () => 0 },
    /** 订单金额（分） */
    price: { type: String, default: () => 0 },
    /** 主要功能按钮文本 */
    mainBtnText: { type: String, default: () => '' },
    /** 主要功能按钮背景 */
    mainBtnBg: { type: String, default: () => '#EC3E1A' },
    /** 主要功能按钮文本颜色 */
    mainBtnTextColor: { type: String, default: () => '#fff' },
    /** 次功能按钮文本 */
    subBtnText: { type: String, default: () => '' },
    /** 是否显示详情 */
    showDetail: { type: Boolean, default: () => false },
    /** 是否显示更多 */
    showMore: { type: Boolean, default: () => false },
};
