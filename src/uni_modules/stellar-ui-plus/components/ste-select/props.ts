import type { PropType } from 'vue'

export interface SelectOption { label?: string, value?: string | number, children?: SelectOption[], [key: string]: any }

export type SelectValue = string | number | Array<string | number> | null | undefined

export type SelectMode = 'default' | 'filterable' | 'tree' | 'date' | 'time' | 'datetime' | 'month' | 'minute'

export type SelectPosition = 'auto' | 'bottom' | 'bottom-auto' | 'top' | 'top-auto' | 'auto-start' | 'auto-end' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface SteSelectProps {
  modelValue: SelectValue
  list: SelectOption[] | SelectOption[][]
  mode: SelectMode
  minDate: number | string | Date
  maxDate: number | string | Date
  dateUnit: boolean
  width: number | string
  height: number | string
  fontSize: number | string
  background: string
  maskClose: boolean
  optionsWidth: number | string
  placeholder: string
  labelKey: string
  valueKey: string
  childrenKey: string
  multiple: boolean
  allowCreate: boolean
  borderColor: string
  borderRadius: number | string
  optionsPosition: SelectPosition
  disabled: boolean
  autoFilterable: boolean
  loading: boolean
  total: number
}

export default {
  modelValue: { type: [Array, String, Number] as PropType<SelectValue>, default: () => [] },
  list: { type: Array as PropType<SelectOption[] | SelectOption[][]>, default: () => [] },
  mode: { type: String as PropType<SelectMode>, default: () => 'default' },
  minDate: { type: [Number, String, Date], default: () => null },
  maxDate: { type: [Number, String, Date], default: () => null },
  dateUnit: { type: Boolean, default: () => true },
  width: { type: [Number, String], default: () => '100%' },
  height: { type: [Number, String], default: () => 64 },
  fontSize: { type: [Number, String], default: () => 28 },
  background: { type: String, default: () => '#fff' },
  maskClose: { type: Boolean, default: () => true },
  optionsWidth: { type: [Number, String], default: () => 'auto' },
  placeholder: { type: String, default: () => '请选择' },
  labelKey: { type: String, default: () => 'label' },
  valueKey: { type: String, default: () => 'value' },
  childrenKey: { type: String, default: () => 'children' },
  multiple: { type: Boolean, default: () => false },
  allowCreate: { type: Boolean, default: () => false },
  borderColor: { type: String, default: () => '#ebebeb' },
  borderRadius: { type: [Number, String], default: () => 8 },
  optionsPosition: { type: String as PropType<SelectPosition>, default: () => 'auto' },
  disabled: { type: Boolean, default: () => false },
  autoFilterable: { type: Boolean, default: () => true },
  loading: { type: Boolean, default: () => false },
  total: { type: Number, default: () => 0 },
}
