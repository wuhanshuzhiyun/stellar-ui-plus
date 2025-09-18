import type { PropType } from 'vue';

export interface GuideQaItem {
    question: string;
    answer: string;
    [key: string]: any;
}

export type ClickType = 'q' | 'a';

export default {
    data: { type: Array as PropType<GuideQaItem[]>, default: () => [] },
    mode: { type: String as PropType<'1' | '2'>, default: '1' },
    title: { type: String, default: '常见问题' },
    actionTitle: { type: String, default: '全部' },
    showNum: { type: Boolean, default: true },
};

export interface GuideQaEmits {
    (e: 'click-item', type: ClickType, item: GuideQaItem): void;
    (e: 'click-all'): void;
}
