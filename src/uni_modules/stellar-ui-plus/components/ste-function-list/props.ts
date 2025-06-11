import type { PropType } from 'vue';

export type FunctionListItem = {
    title: string;
    subhead?: string;
    statusText?: string;
    image?: string;
    buttonText?: string;
    buttonIcon?: string;
    buttonBg?: string;
    buttonColor?: string;
};

export type Props = {
    background: string;
    contentBg: string;
    title: string;
    subhead: string;
    data: (FunctionListItem & { [key: string]: any })[];
    buttonBg: string;
    buttonColor: string;
    emptyImage: string;
    emptyText: string;
    emptyButtonText: string;
    fontFamily: string;
};

export default {
    /** 背景色 */
    background: { type: String, default: () => '#fff' },
    /** 内容区域背景 */
    contentBg: { type: String, default: () => '#f9f9f9' },
    /** 标题 */
    title: { type: String, default: () => '' },
    /** 副标题 */
    subhead: { type: String, default: () => '' },
    /** 列表数据 */
    data: { type: Array as PropType<(FunctionListItem & { [key: string]: any })[]>, default: () => [] },
    /** 按钮背景颜色 */
    buttonBg: { type: String, default: () => '#EC3E1A' },
    /** 按钮字体颜色 */
    buttonColor: { type: String, default: () => '#fff' },
    /** 列表操作按钮文字 */
    buttonText: { type: String, default: () => '' },
    /** 列表操作按钮图标 */
    buttonIcon: { type: String, default: () => '' },
    /** 列表为空时显示的图片 */
    emptyImage: { type: String, default: () => '' },
    /** 列表为空时显示的文字 */
    emptyText: { type: String, default: () => '' },
    /** 列表为空时显示的按钮文字 */
    emptyButtonText: { type: String, default: () => '' },
    /** icon的字体名 */
    fontFamily: { type: String, default: () => 'ste-iconfont-1709689042473' },
};
