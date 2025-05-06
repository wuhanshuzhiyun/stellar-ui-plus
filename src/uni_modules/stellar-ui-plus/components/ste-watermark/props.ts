import type { ExtractPropTypes, PropType } from 'vue';

export interface WatermarkFontType {
    color?: string;
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
    textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
}

export const defaultWatermarkFont: WatermarkFontType = {
    color: 'rgba(0, 0, 0, 0.15)',
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
};

export const watermarkProps = {
    /**
     * @description 水印元素的 z-index 值
     */
    zIndex: {
        type: Number,
        default: 9,
    },
    /**
     * @description 水印的旋转角度
     */
    rotate: {
        type: Number,
        default: -22,
    },
    /**
     * @description 单个水印宽度
     */
    width: { type: Number, default: 120 },
    /**
     * @description 单个水印高度
     */
    height: { type: Number, default: 64 },
    /**
     * @description 图片链接
     */
    image: String,
    /**
     * @description 水印文字内容
     */
    content: {
        type: [String, Array],
        default: 'ste-watermark',
    },
    /**
     * @description 文字样式
     */
    font: {
        type: Object as PropType<WatermarkFontType>,
        default: () => defaultWatermarkFont,
    },
    /**
     * @description 水印之间的水平间距
     */
    gapX: {
        type: Number,
        default: 50,
    },
    /**
     * @description 水印之间的垂直间距
     */
    gapY: {
        type: Number,
        default: 50,
    },
    /**
     * @description 使用图片水印时图片的宽度
     */
    imageWidth: {
        type: Number,
        default: 120,
    },
    /**
     * @description 使用图片水印时图片的高度
     */
    imageHeight: {
        type: Number,
        default: 64,
    },
    /**
     * @description 是否覆盖整个页面
     */
    fullPage: { type: Boolean, default: true },
};

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>;
