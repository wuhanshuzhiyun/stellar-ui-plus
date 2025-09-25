import type { ExtractPropTypes, PropType } from 'vue'

type directionType = 'row' | 'column'

export const STEPS_KEY = Symbol('ste-steps')
const stepsProps = {
  active: { type: Number, default: 0 },
  direction: { type: String as PropType<directionType>, default: 'row' },
  dot: { type: Boolean, default: false },
  reverse: { type: Boolean, default: false },
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export const stepsEmits = {
  'click-step': (index: number) => typeof index === 'number',
}

export default stepsProps
