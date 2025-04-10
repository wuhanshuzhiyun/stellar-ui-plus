const colorValue = {
    steThemeColor: '#0090FF',
    defaultColor: '#0090FF',
};
export function useColorStore() {
    const getColor = () => {
        // 测试环境判断
        if (process.env.NODE_ENV == 'test') {
            return colorValue;
        }
        if (process.env.NODE_ENV != 'test') {
            return uni.getStorageSync('steColor') ? uni.getStorageSync('steColor') : colorValue;
        }
    };

    const setColor = (value: any) => {
        uni.setStorageSync('steColor', Object.assign(colorValue, value));
    };

    return {
        getColor,
        setColor,
    };
}
