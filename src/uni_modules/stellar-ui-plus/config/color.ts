import { useColorStore } from '../store/index'

const color = useColorStore()
function useColor() {
  return {
    setColor(params: any) {
      color.setColor(params)
    },
    getColor() {
      return color.getColor()
    },
    /** 响应式数据 */
    color: color.color,
  }
}
export default useColor
