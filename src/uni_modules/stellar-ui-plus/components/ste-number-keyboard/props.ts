import type { PropType } from 'vue'

export interface NumberKeyboardProps {
  mode: string
  modelValue: string
  maxlength: number | string
  show: boolean
  rightKeys: boolean
  randomKeys: boolean
  confirmText: string
  confirmDisabled: boolean
  customKeys: string[]
  showClear: boolean
  textColor: string
  textSize: string | number
  confirmBg: string
  confirmColor: string
}

export default {
  mode: { type: String, default: () => 'popup' },
  modelValue: { type: String, default: () => '' },
  maxlength: { type: [Number, String], default: () => null },
  show: { type: Boolean, default: () => false },
  rightKeys: { type: Boolean, default: () => true },
  randomKeys: { type: Boolean, default: () => false },
  confirmText: { type: String, default: () => '确定' },
  confirmDisabled: { type: Boolean, default: () => false },
  customKeys: { type: Array as PropType<string[]>, default: () => [] },
  showClear: { type: Boolean, default: () => true },
  textColor: { type: String, default: () => '#000' },
  textSize: { type: [Number, String], default: () => 48 },
  confirmBg: { type: String, default: () => '' },
  confirmColor: { type: String, default: () => '#fff' },
}
