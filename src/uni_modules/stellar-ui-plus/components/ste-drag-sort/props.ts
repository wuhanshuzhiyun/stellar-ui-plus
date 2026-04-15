import type { ExtractPropTypes, PropType } from 'vue'

export type SteDragSortItem = Record<string, any> & {
  disabled?: boolean
}

const dragSortProps = {
  modelValue: { type: Array as PropType<SteDragSortItem[]>, default: () => [] },
  disabled: { type: Boolean, default: false },
  columns: { type: Number, default: 1 },
  longPress: { type: Boolean, default: true },
}

export default dragSortProps

export type SteDragSortProps = ExtractPropTypes<typeof dragSortProps>
