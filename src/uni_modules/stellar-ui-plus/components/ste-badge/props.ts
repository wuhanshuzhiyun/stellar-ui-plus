import type { AroundPositionType } from '../../types'

export default {
  content: [String, Number],
  background: { type: String, default: '#ee0a24' },
  showDot: Boolean,
  offsetX: { type: [String, Number], default: 'auto' },
  offsetY: { type: [String, Number], default: 'auto' },
  showZero: Boolean,
  position: { type: String as PropType<AroundPositionType>, default: 'topRight' },
  max: { type: Number, default: 99 },
  showBorder: { type: Boolean, default: false },
  borderColor: { type: String, default: '' },
  zIndex: { type: [Number, String], default: 2 },
  isInline: { type: Boolean, default: false },
  rootStyle: { type: Object, default: () => {} },
}
