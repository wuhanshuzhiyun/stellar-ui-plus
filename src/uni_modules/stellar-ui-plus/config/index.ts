import useFontSize from './font-size';

const { config, fontSizeStyle } = useFontSize();

// 防御性检查：确保 config 存在
if (!config) {
    throw new Error('FontSize config initialization failed');
}

class Options {
    get minSize() {
        return config.min;
    }

    set minSize(value: number) {
        config.min = value;
    }

    get maxSize() {
        return config.max;
    }

    set maxSize(value: number) {
        config.max = value;
    }

    get fontScale() {
        return config.scale;
    }

    set fontScale(value: number) {
        config.scale = value;
    }
}

export default {
    rootStyle: fontSizeStyle,
    options: new Options(),
    setConfig(options: Partial<{ minSize?: number; maxSize?: number; fontScale?: number }> = {}) {
        if (options.minSize) config.min = options.minSize;
        if (options.maxSize) config.max = options.maxSize;
        if (options.fontScale) config.scale = options.fontScale;
    },
};
