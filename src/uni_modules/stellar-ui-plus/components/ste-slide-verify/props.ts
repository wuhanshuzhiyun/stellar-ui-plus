import type { ExtractPropTypes, PropType } from 'vue'

export type SlideVerifyMode = 'slide' | 'image'

export interface SlideVerifyDetail {
  mode: SlideVerifyMode
  progress: number
  angle: number
  left: number
  maxLeft: number
}

const slideVerifyProps = {
  modelValue: { type: Boolean, default: false },
  mode: { type: String as PropType<SlideVerifyMode>, default: 'slide' },
  size: { type: [String, Number], default: 80 },
  disabled: { type: Boolean, default: false },
  imageUrl: { type: String, default: '' },
  imageSize: { type: [String, Number], default: 168 },
  angleThreshold: { type: Number, default: 10 },
  text: { type: String, default: '' },
  successText: { type: String, default: '验证成功' },
  showFail: { type: Boolean, default: true },
  failText: { type: String, default: '验证失败' },
  failDuration: { type: Number, default: 800 },
  activeColor: { type: String, default: '' },
  inactiveColor: { type: String, default: '' },
  successColor: { type: String, default: '#13ce66' },
  failColor: { type: String, default: '#ee0a24' },
}

export default slideVerifyProps

export type SlideVerifyProps = ExtractPropTypes<typeof slideVerifyProps>

export const slideVerifyEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  success: (detail: SlideVerifyDetail) => detail instanceof Object,
  fail: (detail: SlideVerifyDetail) => detail instanceof Object,
  change: (detail: SlideVerifyDetail) => detail instanceof Object,
}

export type SlideVerifyEmits = typeof slideVerifyEmits
