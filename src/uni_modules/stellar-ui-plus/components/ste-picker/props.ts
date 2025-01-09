// pickerProps.ts
import type { PropType } from 'vue'

export default {
  columns: { type: Array as PropType<string[][]>, default: () => [] },
  itemHeight: { type: [String, Number] as PropType<string | number>, default: 44 },
  visibleItemCount: { type: [String, Number], default: 5 },
  showToolbar: { type: Boolean, default: true },
  title: { type: String, default: '' },
  cancelText: { type: String, default: '取消' },
  cancelColor: { type: String, default: '#969799' },
  confirmText: { type: String, default: '确认' },
  confirmColor: { type: String, default: '#0090FF' },
  defaultIndex: { type: Array as PropType<number[]>, default: () => [] },
  rootClass: { type: String, default: '' },
}
