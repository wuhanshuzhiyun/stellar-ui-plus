import type { PropType } from 'vue'

type DirectionType = 'all' | 'x' | 'y'
export const DEFAULT_BOUNDARY = { top: 0, left: 0, right: 0, bottom: 0 }

export default {
  attract: { type: Boolean, default: false },
  direction: { type: String as PropType<DirectionType>, default: 'all' },
  boundary: { type: Object, default: () => DEFAULT_BOUNDARY },
}
