import type { PropType } from 'vue'

import type { CloumnType } from './types'

export default {
  showToolbar: {
    type: Boolean,
    default: true,
  },
  value: {
    type: [String, Number],
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'all',
  },
  maxDate: {
    type: [Number, String, Date],
    default: new Date(new Date().getFullYear() + 10, 11, 31, 23, 59, 59).getTime(),
  },
  minDate: {
    type: [Number, String, Date],
    default: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
  },
  filter: {
    type: Function as PropType<(type: CloumnType, values: string[]) => string[]> | null,
    default: null,
  },
  formatter: {
    type: Function as PropType<(type: CloumnType, value: string) => string> | null,
    default: null,
  },
  itemHeight: {
    type: [String, Number],
    default: 43,
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确认',
  },
  cancelColor: {
    type: String,
    default: '#969799',
  },
  confirmColor: {
    type: String,
    default: '#0090FF',
  },
  visibleItemCount: {
    type: [String, Number],
    default: 5,
  },
}
