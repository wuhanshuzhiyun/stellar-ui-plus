import type { PropType } from 'vue'

export default {
  show: { type: Boolean, default: () => false },
  urls: { type: Array as PropType<string[]>, default: () => [] },
  autoplay: { type: Number, default: () => 0 },
  loop: { type: Boolean, default: () => false },
  index: { type: [Number, null] as PropType<(number | null)>, default: () => null },
  showIndex: { type: Boolean, default: () => true },
  scale: { type: Boolean, default: () => false },
  showmenu: { type: Boolean, default: () => true },
}
