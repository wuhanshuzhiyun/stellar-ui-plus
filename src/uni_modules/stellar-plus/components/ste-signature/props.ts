import type { PropType } from 'vue'
import type { ImgType } from '../../types/index'

export default {
  customClass: { type: String, default: '' },
  lineWidth: { type: Number, default: 3 },
  strokeColor: { type: String, default: '#000000' },
  background: { type: String, default: 'none' },
  type: { type: String as PropType<ImgType>, default: 'png' },
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: '100%' },
}
