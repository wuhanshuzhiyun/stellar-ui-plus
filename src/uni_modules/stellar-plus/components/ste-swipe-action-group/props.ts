import type { PropType } from 'vue'
import type { ModeType } from '../ste-swipe-action/props'

export interface SwipeActionGroupProps {
  mode?: ModeType
  autoClose?: boolean
  disabled?: boolean
  swipeThreshold?: number | string
  duration?: number | string
  leftIcon?: boolean
  rightIcon?: boolean
}

export default {
  mode: { type: String as PropType<ModeType>, default: () => 'right' },
  autoClose: { type: Boolean, default: () => true },
  disabled: { type: Boolean, default: () => false },
  swipeThreshold: { type: [Number, String], default: () => 0.35 },
  duration: { type: [Number, String], default: () => 300 },
  leftIcon: { type: Boolean, default: () => false },
  rightIcon: { type: Boolean, default: () => false },
}
