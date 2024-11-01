import type { ExtractPropTypes, PropType } from 'vue'
import type { ShapeType, TextPositionType } from '../ste-radio/type'

type DirectionType = 'row' | 'column'

export const radioGroupProps = {
  modelValue: String,
  direction: { type: String as PropType<DirectionType>, default: 'column' },
  disabled: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  readonly: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  shape: { type: [String, undefined] as PropType<ShapeType>, default: undefined },
  iconSize: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  checkedColor: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  textPosition: { type: [String, undefined] as PropType<TextPositionType>, default: undefined },
  textSize: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  textInactiveColor: { type: String as PropType<string | undefined>, default: undefined },
  textActiveColor: { type: String as PropType<string | undefined>, default: undefined },
  textDisabled: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  marginLeft: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  marginRight: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
  columnGap: { type: [Number, String] as PropType<string | number | undefined>, default: undefined },
}

export default radioGroupProps

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = {
  'change': (value: string) => typeof value === 'string',
  'update:modelValue': (value: string) => typeof value === 'string',
}

export type RadioGroupEmits = typeof radioGroupEmits
