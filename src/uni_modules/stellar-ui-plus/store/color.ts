// try {
//     const value = uni.getStorageSync('storage_key');
//     if (value) {
//         console.log(value);
//     }
// } catch (e) {
//     // error
// }

// export function useColorStore() {
//     const getColor = () => {
//         return color;
//     };
//     const setColor = (value: any) => {
//         Object.assign(color, value);
//         console.log('color', color);
//     };
//     return {
//         color,
//         getColor,
//         setColor,
//     };
// }

import { reactive } from 'vue';
const color = reactive({
    steThemeColor: '#0090FF',
    defaultColor: '#0090FF',
});
// 主题色内容
export function useColorStore() {
    const getColor = () => {
        return color;
    };
    const setColor = (value: any) => {
        Object.assign(color, value);
        console.log('color', color);
    };

    return {
        color,
        getColor,
        setColor,
    };
}
