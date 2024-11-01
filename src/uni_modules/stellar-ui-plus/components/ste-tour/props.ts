import type { PropType } from 'vue'

export type PositionType = 'top' | 'bottom' | 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'

export interface TourStepType {
  message: string
  target: string
  title?: string
  position?: PositionType
}

export interface TourPropsType {
  show: boolean
  current: number
  steps: Array<TourStepType>
  offset: Array<number>
  showTitleBar: boolean
  showFooter: boolean
  mask: boolean
  maskColse: boolean
  showPrevStep: boolean
  background: string
  radius: number | string
  messageBg: string
  messageColor: string
}

export default {
  show: { type: Boolean, default: () => false },
  current: { type: Number, default: () => 0 },
  steps: { type: Array as PropType<Array<TourStepType>>, default: () => [] },
  offset: { type: Array as PropType<Array<number>>, default: () => [0, 0] },
  showTitleBar: { type: Boolean, default: () => false },
  showFooter: { type: Boolean, default: () => true },
  mask: { type: Boolean, default: () => true },
  maskColse: { type: Boolean, default: () => true },
  showPrevStep: { type: Boolean, default: () => true },
  background: { type: String, default: () => 'rgba(0,0,0,.5)' },
  radius: { type: [Number, String], default: () => 18 },
  messageBg: { type: String, default: () => '#fff' },
  messageColor: { type: String, default: () => '#000' },
  nextStepTxt: { type: String, default: () => '下一步' },
  prevStepTxt: { type: String, default: () => '上一步' },
  completeTxt: { type: String, default: () => '完成' },
}
