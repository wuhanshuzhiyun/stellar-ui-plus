import type { ExtractPropTypes } from 'vue';
import type Watermark from './ste-watermark.vue';

export interface WatermarkFontType {
    color?: string;
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
    textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
    textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}

export const watermarkProps = {
    /**
     * @description The z-index of the appended watermark element
     */
    zIndex: {
        type: Number,
        default: 9,
    },
    /**
     * @description The rotation angle of the watermark
     */
    rotate: {
        type: Number,
        default: -22,
    },
    /**
     * @description The width of the watermark
     */
    width: Number,
    /**
     * @description The height of the watermark
     */
    height: Number,
    /**
     * @description Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)
     */
    image: String,
    /**
     * @description Watermark text content
     */
    content: {
        type: [String, Array],
        default: 'ste-watermark',
    },
    /**
     * @description Text style
     */
    font: {
        type: Object,
    },
    /**
     * @description The spacing between watermarks
     */
    gap: {
        type: Array<number>,
        default: () => [50, 50],
    },
    /**
     * @description The offset of the watermark from the upper left corner of the container. The default is gap/2
     */
    offset: {
        type: Array<number>,
    },
};

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>;
export type WatermarkInstance = InstanceType<typeof Watermark>;
