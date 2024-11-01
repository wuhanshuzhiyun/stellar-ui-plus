import type { PropType } from 'vue'

export const SWIPER_KEY = Symbol('ste-swiper')

export interface SwiperProps {
  current: number
  direction: 'horizontal' | 'vertical'
  disabled: boolean
  width: number | string
  height: number | string
  duration: number
  swipeThreshold: number
  indicatorDots: boolean
  indicatorColor: string
  indicatorActiveColor: string
  autoplay: boolean
  interval: number
  circular: boolean
  previousMargin: number | string
  nextMargin: number | string
}

export default {
  // 当前所在滑块的 index
  current: { type: Number, default: () => 0 },
  // 滑动方向  "horizontal" | "vertical"
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: () => 'horizontal' },
  disabled: { type: Boolean, default: () => false },
  width: { type: [Number, String], default: () => null },
  height: { type: [Number, String], default: () => null },
  duration: { type: Number, default: () => 300 },
  swipeThreshold: { type: Number, default: () => 0.35 },
  indicatorDots: { type: Boolean, default: () => false },
  indicatorColor: { type: String, default: () => '#fff' },
  indicatorActiveColor: { type: String, default: () => '#fff' },
  autoplay: { type: Boolean, default: () => false },
  interval: { type: Number, default: () => 3000 },
  circular: { type: Boolean, default: () => false },
  previousMargin: { type: [Number, String], default: () => 0 },
  nextMargin: { type: [Number, String], default: () => 0 },
}
