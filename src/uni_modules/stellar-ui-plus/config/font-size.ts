import { reactive } from 'vue';
import System from '../utils/System';

const storageKey = 'stellar-font-size-config';

type ResNum<T extends boolean> = T extends true ? number : string;

class FontSize {
    static config = {
        min: 12,
        max: 80,
        scale: 1,
    };

    static rpx2px<T extends boolean>(rpx: number, num?: T): ResNum<T> {
        const vw = System.getWindowWidth();
        const px = Number(((vw * rpx * FontSize.config.scale) / 750).toFixed(4));
        const result = num ? px : `${px}px`;
        return result as ResNum<T>;
    }

    private _changes: (() => void)[] = [];

    /**
     * 字体缩放比例
     */
    set scale(scale: number) {
        FontSize.config.scale = scale;
        this._changes.forEach(fn => fn());
    }
    get scale() {
        return FontSize.config.scale;
    }

    /**
     * 最小字体数值
     */
    set min(min: number) {
        FontSize.config.min = min;
        this._changes.forEach(fn => fn());
    }
    get min() {
        return FontSize.config.min;
    }

    /**
     * 最大字体数值
     */
    set max(max: number) {
        FontSize.config.max = max;
        this._changes.forEach(fn => fn());
    }
    get max() {
        return FontSize.config.max;
    }
    constructor() {
        if (process.env.NODE_ENV == 'test') {
            return;
        }
        const storage = uni.getStorageSync(storageKey) ? JSON.parse(uni.getStorageSync(storageKey)) : null;
        if (storage && storage.min) FontSize.config.min = storage.min;
        if (storage && storage.max) FontSize.config.max = storage.max;
        if (storage && storage.scale) FontSize.config.scale = storage.scale;
    }

    onChange(fn: () => void) {
        this._changes.push(fn);
    }
}

export function normalizeFontSize<T extends boolean>(rpx: number, num?: T): ResNum<T> {
    return FontSize.rpx2px(rpx, num);
}

const fontSizeStyle = reactive<{ [key: string]: string }>({});
function setFontSize() {
    if (process.env.NODE_ENV == 'test') {
        return;
    }
    for (let i = FontSize.config.min; i <= FontSize.config.max; i++) fontSizeStyle[`--font-size-${i}`] = FontSize.rpx2px(i, false);
    uni.setStorageSync(storageKey, JSON.stringify(FontSize.config));
}

const fontSize = new FontSize();

setTimeout(setFontSize);
fontSize.onChange(setFontSize);
export default function useFontSize() {
    return { config: fontSize, fontSizeStyle };
}
