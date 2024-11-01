import type { PropType } from 'vue'
import type { SizeType } from '../../types/index'

type ModeType = 'box' | 'line'

export default {
  value: { type: [String, Number], default: '' },
  mode: { type: String as PropType<ModeType>, default: 'box' },
  maxlength: { type: [String, Number] as PropType<SizeType>, default: 6 },
  space: { type: [String, Number] as PropType<SizeType>, default: 16 },
  fontColor: { type: String, default: '#000000' },
  borderColor: { type: String, default: '#dddddd' },
  fontSize: { type: [String, Number] as PropType<SizeType>, default: 28 },
  size: { type: [String, Number] as PropType<SizeType>, default: 64 },
  formatter: { type: [String, Number] as PropType<SizeType>, default: '' },
  focus: { type: Boolean, default: false },
  disabledDot: { type: Boolean, default: true },
  readOnly: { type: Boolean, default: false },
}
