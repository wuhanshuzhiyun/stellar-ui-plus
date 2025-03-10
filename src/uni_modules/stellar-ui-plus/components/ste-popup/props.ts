import type { PropType } from 'vue'
import type { PositionType, SizeType } from '../../types/index'

export default {
  show: { type: Boolean, default: false },
  backgroundColor: { type: String, default: '#ffffff' },
  showMask: { type: Boolean, default: true },
  isMaskClick: { type: Boolean, default: true },
  width: { type: [String, Number] as PropType<SizeType>, default: '100vw' },
  height: { type: [String, Number] as PropType<SizeType>, default: 'auto' },
  position: { type: String as PropType<PositionType>, default: 'center' },
  round: { type: Boolean, default: false },
  showClose: { type: Boolean, default: true },
  offsetX: { type: [String, Number], default: 0 },
  offsetY: { type: [String, Number], default: 0 },
  duration: { type: Number, default: 200 },
  zIndex: { type: [Number, String], default: 998 },
  keepContent: { type: Boolean, default: true },
}
