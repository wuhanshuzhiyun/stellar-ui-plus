import { setToast } from '../../store/index'
export function useToast() {
  // 打开弹窗
  function showToast(options: any) {
    console.log('options', options)
    uni.setStorageSync(
      'toast',
      Object.assign(
        {
          show: true,
        },
        options,
      ),
    )
    // setToast(
    //     Object.assign(
    //         {
    //             show: true,
    //         },
    //         options
    //     )
    // );
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
