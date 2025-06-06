import type { PropType } from 'vue';

export type Props = {};

export default {
    /** 背景色 */
    background: { type: String, default: () => '#fff' },
    /** 内容区域背景 */
    contentBg: { type: String, default: () => '#f9f9f9' },
};
