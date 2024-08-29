import type { ExtractPropTypes, PropType } from 'vue'
import type { ShapeType, TextPositionType } from './type'

export const RADIO_KEY = Symbol('ste-radio')

const radioProps = {
  value: { type: String, default: '' },
  name: { type: [Number, String], default: '' },
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

export type RadioProps = ExtractPropTypes<typeof radioProps>

export default radioProps

export const radioEmits = {
  'click': (value: string, suspend: () => void, next: () => void, stop: () => void) => value && suspend instanceof Function && next instanceof Function && stop instanceof Function,
  'change': (value: string) => typeof value === 'string',
  'input': (value: string) => typeof value === 'string',
  'update:value': (value: string) => typeof value === 'string',
}
