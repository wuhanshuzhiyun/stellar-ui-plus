import type { PropType } from 'vue'

export const STE_SWIPE_ACTION_KEY = Symbol('ste-swipe-action')

export type ModeType = 'all' | 'left' | 'right'

export interface SteSwipeActionProps {
  mode?: ModeType
  disabled?: boolean
  swipeThreshold?: number | string
  duration?: number | string
  leftIcon?: boolean
  rightIcon?: boolean
}

export default {
  mode: { type: String as PropType<ModeType>, default: () => null },
  disabled: { type: Boolean, default: () => null },
  swipeThreshold: { type: [Number, String], default: () => null },
  duration: { type: [Number, String], default: () => null },
  leftIcon: { type: Boolean, default: () => null },
  rightIcon: { type: Boolean, default: () => null },
}
