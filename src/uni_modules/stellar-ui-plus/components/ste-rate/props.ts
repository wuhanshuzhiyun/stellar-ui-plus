import type { PropType } from 'vue'

export default {
  modelValue: { type: Number, default: 0 },
  count: { type: Number, default: 5 },
  score: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  size: { type: [String, Number], default: 44 },
  inactiveColor: { type: String, default: '#dddddd' },
  activeColor: { type: String, default: '#fa5014' },
  inactiveCode: { type: String, default: '&#xe681;' },
  activeCode: { type: String, default: '&#xe684;' },
  gutter: { type: [String, Number], default: 10 },
  iconData: { type: Array as PropType<string[]>, default: () => [] },
}
