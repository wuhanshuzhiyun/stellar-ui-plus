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
  highlightActive: boolean
}

// 验证函数
const validateDimension = (value: number | string): boolean => {
  if (typeof value === 'number') return value > 0 && value <= 10000;
  if (typeof value === 'string') return /^\d+(px|rpx|%)$/.test(value);
  return false;
};

const validateDuration = (value: number): boolean => {
  return value >= 100 && value <= 5000;
};

const validateInterval = (value: number): boolean => {
  return value >= 1000 && value <= 10000;
};

const validateThreshold = (value: number): boolean => {
  return value >= 0.1 && value <= 0.9;
};

export default {
  // 当前所在滑块的 index
  current: {
    type: Number,
    default: () => 0,
    validator: (value: number) => value >= 0
  },
  // 滑动方向  "horizontal" | "vertical"
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: () => 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  width: {
    type: [Number, String],
    default: () => null,
    validator: validateDimension
  },
  height: {
    type: [Number, String],
    default: () => null,
    validator: validateDimension
  },
  duration: {
    type: Number,
    default: () => 300,
    validator: validateDuration
  },
  swipeThreshold: {
    type: Number,
    default: () => 0.35,
    validator: validateThreshold
  },
  indicatorDots: {
    type: Boolean,
    default: () => false
  },
  indicatorColor: {
    type: String,
    default: () => '#fff',
    validator: (value: string) => /^#[0-9A-Fa-f]{3,8}$/.test(value) || value.startsWith('rgb')
  },
  indicatorActiveColor: {
    type: String,
    default: () => '#fff',
    validator: (value: string) => /^#[0-9A-Fa-f]{3,8}$/.test(value) || value.startsWith('rgb')
  },
  autoplay: {
    type: Boolean,
    default: () => false
  },
  interval: {
    type: Number,
    default: () => 3000,
    validator: validateInterval
  },
  circular: {
    type: Boolean,
    default: () => false
  },
  previousMargin: {
    type: [Number, String],
    default: () => 0,
    validator: validateDimension
  },
  nextMargin: {
    type: [Number, String],
    default: () => 0,
    validator: validateDimension
  },
  highlightActive: {
    type: Boolean,
    default: () => false
  },
}