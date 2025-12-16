import type { PropType } from "vue";

export interface PropData {
    title: string;
    desc?: string;
    image: string;
    price: string | number;
    constraint?: string;
    footers?: string[]
}

export default {
    /** 基础数据 */
    data: {
        type: Object as PropType<PropData>,
        default: () => ({}),
    },
    /** 结束时间 倒计时时间*/
    endTime: {
        type: [Date, String, Number],
        default: () => null,
    },
    /** 剩余数量 */
    residue: {
        type: Number,
        default: () => -1,
    },
    /** 进度条百分比 */
    progress: {
        type: Number,
        default: () => -1,
    },
    progressText: {
        type: String,
        default: () => ''
    },
    /** 按钮文字 */
    buttonText: {
        type: String,
        default: () => '购买',
    },
    buttonDisabled: {
        type: Boolean,
        default: () => false
    },
    backgroundColor: {
        type: String,
        default: () => '#fff',
    },
};
