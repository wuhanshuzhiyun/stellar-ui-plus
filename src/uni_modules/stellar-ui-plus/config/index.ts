import useFontSize from './font-size';

const { config, style } = useFontSize();

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
    rootStyle: style,
    options: new Options(),
    setConfig(options: Partial<{ minSize?: number; maxSize?: number; fontScale?: number }> = {}) {
        if (options.minSize) config.min = options.minSize;
        if (options.maxSize) config.max = options.maxSize;
        if (options.fontScale) config.scale = options.fontScale;
    },
};
