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

// defineStore('color', () => {
//   const color = ref({
//     steThemeColor: '#0090FF',
//     defaultColor: '#0090FF',
//   })
//   const setColor = (val: any) => {
//     console.log('val', val)
//     color.value = Object.assign(color.value, val)
//     console.log('color', color.value)
//   }
//   const getColor = () => {
//     return color.value
//   }

//   return {
//     color,
//     setColor,
//     getColor,
//   }
// })
