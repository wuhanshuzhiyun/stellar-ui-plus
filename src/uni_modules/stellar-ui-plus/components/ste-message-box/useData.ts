import { ref } from 'vue'
import { DEFAULT_CONFIG, type MessageBoxIcon } from './constants'

export default function useData() {
  const title = ref(DEFAULT_CONFIG.title)
  const content = ref('')
  const icon = ref<MessageBoxIcon | ''>('')
  const cancelText = ref(DEFAULT_CONFIG.cancelText)
  const cancelColor = ref(DEFAULT_CONFIG.cancelColor)
  const confirmText = ref(DEFAULT_CONFIG.confirmText)
  const confirmColor = ref(DEFAULT_CONFIG.confirmColor)
  const showCancel = ref(DEFAULT_CONFIG.showCancel)
  const editable = ref(DEFAULT_CONFIG.editable)
  const placeholderText = ref('')
  const inputType = ref('')
  const confirm = ref((_value?: string) => {})
  const cancel = ref((_value?: string) => {})
  const complete = ref((_value?: string) => {})

  // 内部值
  const pageShow = ref(true)
  const show = ref(false)
  const inputValue = ref('')
  const animationData = ref(null)
  const maskAnimationData = ref(null)

  const open = ref(false)
  const tmpMsg = ref(null)

  const showInputPlaceholder = ref(true)

  return {
    title,
    content,
    icon,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    showCancel,
    editable,
    placeholderText,
    inputType,
    confirm,
    cancel,
    complete,
    pageShow,
    show,
    inputValue,
    animationData,
    maskAnimationData,
    open,
    tmpMsg,
    showInputPlaceholder,
  }
}
