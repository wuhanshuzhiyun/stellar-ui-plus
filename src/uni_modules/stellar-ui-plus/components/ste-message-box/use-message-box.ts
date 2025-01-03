import type { MessageBoxOptions } from '../../types'
import { useMsgBoxStore } from '../../store'

export const STE_MESSAGE_BOX_KEY = '$steMsgBoxKey'
export function useMessageBox(key: string = STE_MESSAGE_BOX_KEY) {
  const store = useMsgBoxStore()

  // 初始化
  store.initializeState(key)

  return {
    showMsgBox(params: MessageBoxOptions) {
      store.setMessageBox({
        key,
        params: {
          ...params,
          show: true,
        },
      })
    },

    hideMsgBox() {
      store.resetMessageBox(key)
    },
  }
}
