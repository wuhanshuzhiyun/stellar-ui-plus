import type { ExtractPropTypes, PropType } from 'vue'
import type { ShapeType, TextPositionType } from '../ste-checkbox/type'

type DirectionType = 'row' | 'column'

export const checkboxGroupProps = {
  value: { type: Array, default: [] },
  direction: { type: String as PropType<DirectionType>, default: 'column' },
  max: { type: Number, default: 0 },
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

export default checkboxGroupProps

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export const checkboxGroupEmits = {
  change: (value: any[]) => Array.isArray(value),
  input: (value: any[]) => Array.isArray(value),
}

export type CheckboxGroupEmits = typeof checkboxGroupEmits
