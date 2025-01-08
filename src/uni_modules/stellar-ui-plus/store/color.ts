import { defineStore } from 'pinia'
import { ref } from 'vue'

// 主题色内容
export const useColorStore = defineStore('color', () => {
  const color = ref({
    steThemeColor: '#0090FF',
    defaultColor: '#0090FF',
  })
  const setColor = (val: any) => {
    console.log('val', val)
    color.value = Object.assign(color.value, val)
    console.log('color', color.value)
  }
  const getColor = () => {
    return color.value
  }

  return {
    color,
    setColor,
    getColor,
  }
})
