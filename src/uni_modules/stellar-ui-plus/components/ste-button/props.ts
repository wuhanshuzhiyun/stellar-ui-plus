import type { PropType } from 'vue'
import type { ButtonOpenType } from '@uni-helper/uni-app-types'

import type { ModeType, SizeType } from '../../types'

export default {
  mode: { type: Number as PropType<ModeType>, default: 200 },
  color: { type: String, default: '#ffffff' },
  background: { type: String, default: '#0091ff' },
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
  borderWidth: { type: String, default: 2 },
}
