import { provide, ref } from 'vue'
import { messageBoxDefaultOptionsKey } from './ste-message-box'
import type { MessageBoxOptions } from './constants'

export function useMessageBox(customKey?: string) {
  const provideKey = customKey || messageBoxDefaultOptionsKey
  const MsgOptions = ref<MessageBoxOptions>({})
  provide(provideKey, MsgOptions)

  // 打开弹窗
  function showMsgBox(options: MessageBoxOptions) {
    MsgOptions.value = Object.assign(
      {
        show: true,
      },
      options,
    )
  }
  /** 关闭弹窗 */
  function hideMsgBox() {
    MsgOptions.value = {
      show: false,
    }
  }
  return {
    showMsgBox,
    hideMsgBox,
  }
}
