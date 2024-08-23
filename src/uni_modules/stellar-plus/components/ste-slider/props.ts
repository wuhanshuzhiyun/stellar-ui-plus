import type { ExtractPropTypes } from 'vue'
import type { UniTouchEvent } from '../../types/event'

const sliderProps = {
  value: { type: [Number, String, Array], default: 0 },
  min: { type: [Number, String], default: 0 },
  max: { type: [Number, String], default: 100 },
  step: { type: [Number, String], default: 1 },
  barHeight: { type: [String, Number], default: 8 },
  buttonSize: { type: [String, Number], default: 40 },
  activeColor: { type: String, default: '#0090ff' },
  inactiveColor: { type: String, default: '#eeeeee' },
  range: { type: Boolean, default: false },
  vertical: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  showStops: { type: Boolean, default: false },
  marks: { type: Object, default: () => {} },
}

export default sliderProps

export type SliderProps = ExtractPropTypes<typeof sliderProps>

export const sliderEmits = {
  input: (val: number | number[]) => typeof val === 'number' || Array.isArray(val),
  change: (val: number | number[]) => typeof val === 'number' || Array.isArray(val),
  dragStart: (e: UniTouchEvent | MouseEvent) => e instanceof Object,
  dragEnd: (e: UniTouchEvent | MouseEvent) => e instanceof Object,
}

export type SliderEmits = typeof sliderEmits
