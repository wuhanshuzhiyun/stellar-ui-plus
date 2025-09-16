import type { PropType } from 'vue';

export interface CommentType extends Record<string, any> {
    evaluateText: string;
    imgList: string[];
    type: 1 | 2;
    date: string;
    userName: string;
    userAvatar: string;
}

export default {
    /** 标签数据 */
    tags: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    /** 总数 */
    total: {
        type: Number,
        default: 0,
    },
    /** 评论数据 */
    comments: {
        type: Array as PropType<CommentType[]>,
        default: () => [],
    },
};
