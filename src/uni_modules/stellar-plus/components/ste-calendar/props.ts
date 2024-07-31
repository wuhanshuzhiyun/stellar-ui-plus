import type { PropType } from 'vue'
import type { DateType } from './date'

export default {
  title: { type: String, default: () => '日期选择' },
  showTitle: { type: Boolean, default: () => true },
  list: { type: Array as PropType<DateType[]>, default: () => [] },
  mode: { type: String, default: () => 'single' },
  startText: { type: String, default: () => '开始' },
  endText: { type: String, default: () => '结束' },
  color: { type: String, default: () => '#FF1A00' },
  minDate: { type: [String, Number, Date], default: () => 0 },
  maxDate: { type: [String, Number, Date], default: () => 0 },
  defaultMonth: { type: [Number, String, Date], default: () => 0 },
  maxCount: { type: [Number, String], default: () => 0 },
  formatter: { type: String, default: () => 'YYYY-MM-DD' },
  showMark: { type: Boolean, default: () => true },
  readonly: { type: Boolean, default: () => false },
  maxRange: { type: Number, default: () => null },
  rangePrompt: { type: String, default: () => null },
  showRangePrompt: { type: Boolean, default: () => true },
  allowSameDay: { type: Boolean, default: () => false },
  showConfirm: { type: Boolean, default: () => true },
  width: { type: [Number, String], default: () => '100%' },
  height: { type: [Number, String], default: () => '100%' },
}
