import { ref } from 'vue'
import type { MessageBoxIcon } from './constants'

export default function useData() {
  const title = ref('确认删除订单？')
  const content = ref('')
  const icon = ref<MessageBoxIcon | ''>('')
  const cancelText = ref('取消')
  const cancelColor = ref('#333333')
  const confirmText = ref('确认')
  const confirmColor = ref('#0090ff')
  const showCancel = ref(true)
  const editable = ref(false)
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
  }
}
