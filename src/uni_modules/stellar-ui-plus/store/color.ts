import { ref } from 'vue'
// 主题色内容
export function useColorStore() {
  const color = ref({
    steThemeColor: '#0090FF',
    defaultColor: '#0090FF',
  })
  const getColor = () => {
    return color.value
  }
  return {
    color,
    getColor,
  }
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
