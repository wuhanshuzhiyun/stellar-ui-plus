// 走马灯组件 Props 类型定义

export interface MarqueeItem {
    /** 唯一标识 */
    id: string | number;
    /** 显示文本 */
    text: string;
    /** 图标URL（可选） */
    icon?: string;
    /** 文本颜色（可选） */
    color?: string;
    /** 背景色（可选） */
    background?: string;
    /** 自定义数据（可选） */
    data?: any;
}

export interface MarqueeProps {
    /** 数据列表 */
    list: MarqueeItem[];
    /** 滚动速度(px/s) */
    speed: number;
    /** 悬停是否暂停 */
    pauseOnHover: boolean;
    /** 是否循环播放 */
    loop: boolean;
    /** 消息间隔(px) */
    gap: number;
    /** 容器高度 */
    height: string;
    /** 是否填满屏幕 */
    fillScreen: boolean;
    /** 是否可点击 */
    clickable: boolean;
    /** 容器背景色 */
    containerBg: string;
    /** 容器内边距 */
    containerPadding: string;
    /** 容器圆角 */
    containerRadius: string;
    /** 消息项背景色 */
    itemBg: string;
    /** 消息项内边距 */
    itemPadding: string;
    /** 消息项圆角 */
    itemRadius: string;
}

export default {
    list: {
        type: Array as () => MarqueeItem[],
        default: () => [],
    },
    speed: {
        type: Number,
        default: 50,
    },
    pauseOnHover: {
        type: Boolean,
        default: true,
    },
    loop: {
        type: Boolean,
        default: true,
    },
    gap: {
        type: Number,
        default: 20,
    },
    height: {
        type: String,
        default: 'auto',
    },
    fillScreen: {
        type: Boolean,
        default: false,
    },
    clickable: {
        type: Boolean,
        default: true,
    },
    containerBg: {
        type: String,
        default: 'transparent',
    },
    containerPadding: {
        type: String,
        default: '0rpx',
    },
    containerRadius: {
        type: String,
        default: '0rpx',
    },
    itemBg: {
        type: String,
        default: 'transparent',
    },
    itemPadding: {
        type: String,
        default: '0rpx 20rpx',
    },
    itemRadius: {
        type: String,
        default: '0rpx',
    },
} satisfies Record<keyof MarqueeProps, any>;
