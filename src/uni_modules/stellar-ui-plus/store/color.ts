const colorValue = {
    steThemeColor: '#0090FF',
    defaultColor: '#0090FF',
};
export function useColorStore() {
    const getColor = () => {
        return uni.getStorageSync('steColor') ? uni.getStorageSync('steColor') : colorValue;
    };

    const setColor = (value: any) => {
        uni.setStorageSync('steColor', Object.assign(colorValue, value));
    };

    return {
        getColor,
        setColor,
    };
}
