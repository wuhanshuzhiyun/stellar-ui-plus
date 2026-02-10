const colorValue = {
    steThemeColor: '#0090FF',
    defaultColor: '#0090FF',
};

// 模块级缓存，避免重复读取 storage
let cachedColor: typeof colorValue | null = null;

export function useColorStore() {
    const getColor = () => {
        // 测试环境判断
        if (process.env.NODE_ENV == 'test') {
            return colorValue;
        }
        // 使用缓存，避免重复调用 getStorageSync
        if (cachedColor) {
            return cachedColor;
        }
        cachedColor = uni.getStorageSync('steColor') || colorValue;
        return cachedColor;
    };

    const setColor = (value: any) => {
        cachedColor = Object.assign({}, colorValue, value);
        uni.setStorageSync('steColor', cachedColor);
    };

    return {
        getColor,
        setColor,
    };
}
