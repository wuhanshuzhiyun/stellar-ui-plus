import { useToastStore } from '../../store/index'

export function useToast() {
  const { setToast } = useToastStore()
  // 打开弹窗
  function showToast(options: any) {
    setToast(
      Object.assign(
        {
          show: true,
        },
        options,
      ),
    )
  }
  /** 关闭弹窗 */
  function hideToast() {
    setToast({
      show: false,
    })
  }
  return {
    showToast,
    hideToast,
  }
}
