import type { PropType } from 'vue'

export default {
  src: { type: String, default: '' },
  width: { type: [String, Number] as PropType<SizeType>, default: '100%' },
  height: { type: [String, Number] as PropType<SizeType>, default: '100%' },
  radius: { type: [String, Number] as PropType<SizeType>, default: '0' },
  mode: { type: String as PropType<UniImageMode>, default: 'scaleToFill' },
  display: { type: String as PropType<DisplayType>, default: 'inline-flex' },
  hiddenLoading: { type: Boolean, default: false },
  hiddenError: { type: Boolean, default: true },
  showMenuByLongpress: { type: Boolean, default: true },
  lazyLoad: { type: Boolean, default: true },
}
