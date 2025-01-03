import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { MessageBoxOptions } from '../types'
import { DEFAULT_CONFIG } from '../components/ste-message-box/constants'

// 定义消息框状态接口
interface MessageBoxState extends MessageBoxOptions {
  show: boolean
}

// 定义消息框存储接口
interface MessageBoxStore {
  [key: string]: MessageBoxState
}

export const useMsgBoxStore = defineStore('msgBox', () => {
  const messageBox = reactive<MessageBoxStore>({})

  const initializeState = (key: string): void => {
    if (!messageBox[key]) {
      messageBox[key] = {
        show: false,
      }
    }
  }

  const setMessageBox = ({ key, params }: { key: string, params: Partial<MessageBoxState> }): void => {
    if (messageBox[key])
      Object.assign(messageBox[key], { ...DEFAULT_CONFIG, ...params })
  }

  const resetMessageBox = (key: string): void => {
    if (messageBox[key]) {
      Object.assign(messageBox[key], {
        show: false,
      })
    }
  }

  const getMessageBox = (key: string): MessageBoxState => {
    if (messageBox[key])
      return messageBox[key]

    return {} as MessageBoxState
  }

  return {
    messageBox,
    initializeState,
    setMessageBox,
    resetMessageBox,
    getMessageBox,
  }
})
