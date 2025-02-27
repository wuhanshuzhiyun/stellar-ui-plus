import { reactive } from 'vue'

// 主题色内容
export function useColorStore() {
  const color = reactive({
    steThemeColor: '#0090FF',
    defaultColor: '#0090FF',
  })
  const setColor = (val: any) => {
    if ('steThemeColor' in val) {
      color.steThemeColor = val.steThemeColor
    }
    if ('defaultColor' in val) {
      color.defaultColor = val.defaultColor
    }
  }
  const getColor = () => {
    return color
  }

  return {
    color,
    setColor,
    getColor,
  }
}
