import type { PropType } from 'vue'
import type { DirectionType } from '../../types'

export const TOUCH_SWIPE_KEY = Symbol('ste-touch-swipe')

export default {
  // 当前展示的面板索引
  index: { type: Number, default: () => 0 },
  // 滑动方向  "horizontal" | "vertical"(水平方向时宽度必须固定，垂直方向时高度必须固定)
  direction: { type: String as PropType<DirectionType>, default: () => 'horizontal' },
  width: { type: [String, Number], default: () => '100%' },
  height: { type: [String, Number], default: () => '100%' },
  // 动画时长
  duration: { type: [String, Number], default: () => 0.3 },
  // 灵敏度（0-1之间的数值，数值越小越灵敏）
  swipeThreshold: { type: Number, default: () => 0.35 },
  // 是否禁用
  disabled: { type: Boolean, default: () => false },
  // 面板数量（使用touch-swipe-item作为子元素时不需要传递，不使用touch-swipe-item作为子元素盒子时必传）
  childrenLength: { type: Number, default: () => 0 },
  // 禁用的面板索引（使用touch-swipe-item作为子元素时直接在touch-swipe-item上定义某个标签禁用即可，不使用touch-swipe-item作为子元素盒子时可传）
  disabledIndexs: { type: Array as PropType<(string | number)[]>, default: () => [] },
}
