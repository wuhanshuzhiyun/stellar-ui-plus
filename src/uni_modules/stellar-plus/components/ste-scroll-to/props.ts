export const SCROLL_TO_KEY = Symbol('scroll-to')

export interface ScrollToProps {
  active: number
  height: number | string
}

export default {
  active: {
    type: Number,
    default: 0,
  },
  height: {
    type: [Number, String],
    default: '100%',
  },
}
