import type { PropType } from 'vue'
import type { ButtonOpenType } from '@uni-helper/uni-app-types'

import type { ModeType, SizeType } from '../../types'

export default {
  mode: { type: [Number, String] as PropType<ModeType>, default: 200 },
  color: { type: String, default: '#ffffff' },
  background: { type: String, default: '' },
  borderColor: { type: String, default: '' },
  width: { type: [String, Number] as PropType<SizeType>, default: 'auto' },
  round: { type: Boolean, default: true },
  disabled: Boolean,
  loading: Boolean,
  stopPropagation: Boolean,
  openType: String as PropType<ButtonOpenType>,
  scope: String,
  rootStyle: { type: Object, default: () => ({}) },
  bold: { type: Boolean, default: false },
  borderWidth: { type: [String, Number], default: 2 },
}
