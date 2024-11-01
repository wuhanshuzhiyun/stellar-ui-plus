import type { InputConfirmType } from '@uni-helper/uni-app-types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SteInputType } from '../../types'

const inputProps = {
  value: { type: [String, Number], default: '' },
  // 当前值（支持v-model双向绑定）
  modelValue: { type: String, default: '' },
  type: { type: String as PropType<SteInputType>, default: 'text' },
  placeholder: { type: String, default: '' },
  placeholderStyle: { type: String, default: 'color: #BBBBBB' },
  placeholderClass: { type: String, default: 'ste-input-placeholder' },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  maxlength: { type: Number, default: -1 },
  showWordLimit: { type: Boolean, default: false },
  confirmType: { type: String as PropType<InputConfirmType>, default: 'done' },
  focus: { type: Boolean, default: false },
  inputAlign: { type: String, default: 'left' },
  fontSize: { type: [String, Number], default: 24 },
  fontColor: { type: String, default: '#000000' },
  readonly: { type: Boolean, default: false },
  shape: { type: String, default: 'square' },
  border: { type: Boolean, default: false },
  borderColor: { type: String, default: '' },
  background: { type: String, default: '' },
  rootClass: { type: String, default: '' },
  cursorSpacing: { type: Number, default: 20 },
  allowSpace: { type: Boolean, default: true },
  cursor: { type: Number, default: 0 },
}

export default inputProps

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'input': (value: string | number) => value,
  'clear': () => true,
  'update:focus': (v: boolean) => typeof v === 'boolean',
  'update:modelValue': (value: string | number) => typeof value === 'string' || typeof value === 'number',
  'blur': () => true,
  'focus': (value: string | number) => value,
  'confirm': (value: string | number) => value,
}
export type InputEmits = typeof inputEmits
