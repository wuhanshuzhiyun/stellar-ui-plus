import type { PropType } from 'vue';

export type FunctionListItem = {
    id: string | number;
    title: string;
    subhead?: string;
    statusText?: string;
    image?: string;
    buttonText: string;
    buttonIcon: string;
};

export type Props = {
    background: string;
    contentBg: string;
    title: string;
    subhead: string;
    data: (FunctionListItem & { [key: string]: any })[];
    emptyImage: string;
    emptyText: string;
    emptyButtonText: string;
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
    /** 列表为空时显示的图片 */
    emptyImage: { type: String, default: () => '' },
    /** 列表为空时显示的文字 */
    emptyText: { type: String, default: () => '' },
    /** 列表为空时显示的按钮文字 */
    emptyButtonText: { type: String, default: () => '' },
};
