import { computed, reactive, ref, watch } from 'vue';
import System from '../utils/System';

const storageKey = 'stellar-font-size-config';

const config = {
    min: 12,
    max: 100,
    scale: 1,
};

class FontSize {
    private _changes: (() => void)[] = [];

    /**
     * 字体缩放比例
     */
    set scale(scale: number) {
        config.scale = scale;
        this._changes.forEach(fn => fn());
    }
    get scale() {
        return config.scale;
    }

    /**
     * 最小字体数值
     */
    set min(min: number) {
        config.min = min;
        this._changes.forEach(fn => fn());
    }
    get min() {
        return config.min;
    }

    /**
     * 最大字体数值
     */
    set max(max: number) {
        config.max = max;
        this._changes.forEach(fn => fn());
    }
    get max() {
        return config.max;
    }
    constructor() {
        const storage = uni.getStorageSync(storageKey) ? JSON.parse(uni.getStorageSync(storageKey)) : null;
        if (storage && storage.min) config.min = storage.min;
        if (storage && storage.max) config.max = storage.max;
        if (storage && storage.scale) config.scale = storage.scale;
    }

    onChange(fn: () => void) {
        this._changes.push(fn);
    }
}

export default function useFontSize() {
    const style = reactive<{ [key: string]: string }>({});
    function setFontSize() {
        const vw = System.getWindowWidth();
        for (let i = config.min; i <= config.max; i++) style[`--font-size-${i}`] = `${Number(((vw * i * config.scale) / 750).toFixed(4))}px`;
        uni.setStorageSync(storageKey, JSON.stringify(config));
    }

    const fontSize = new FontSize();

    setTimeout(setFontSize);
    fontSize.onChange(setFontSize);

    return { config: fontSize, style };
}
