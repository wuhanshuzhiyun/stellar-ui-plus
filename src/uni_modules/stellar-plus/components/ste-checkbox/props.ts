import type { ExtractPropTypes, PropType } from 'vue'
import type { ShapeType, TextPositionType } from './type'

export const CHECKBOX_KEY = Symbol('ste-checkbox')

const checkboxProps = {
  value: Boolean,
  name: { type: [Number, String], default: '' },
  disabled: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  readonly: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  shape: { type: [String, undefined] as PropType<ShapeType>, default: undefined },
  iconSize: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  checkedColor: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  textPosition: { type: [String, undefined] as PropType<TextPositionType>, default: undefined },
  textSize: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  textInactiveColor: { type: String as PropType<string | undefined>, default: undefined },
  textActiveColor: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  textDisabled: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  marginLeft: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  marginRight: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  columnGap: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export default checkboxProps

export const checkboxEmits = {
  'click': (value: boolean, suspend: () => void, next: () => void, stop: () => void) => value && suspend instanceof Function && next instanceof Function && stop instanceof Function,
  'change': (value: boolean | any[]) => typeof value === 'boolean' || Array.isArray(value),
  'input': (value: boolean) => typeof value === 'boolean',
  'update:value': (value: boolean) => typeof value === 'boolean',
}
