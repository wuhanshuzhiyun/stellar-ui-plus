import type { PropType } from 'vue'

export default {
  list: { type: Array as PropType<string[]>, default: () => [] },
  direction: { type: String, default: 'across' },
  closeMode: { type: Boolean, default: false },
  color: { type: String, default: '#000000' },
  background: { type: String, default: '#ffffff' },
  width: { type: [String, Number], default: '100%' },
  acrossSpeed: { type: Number, default: 50 },
  verticalSpeed: { type: Number, default: 500 },
  delay: { type: Number, default: 1000 },
  standTime: { type: Number, default: 1000 },
  scrollable: { type: Boolean, default: true },
}
