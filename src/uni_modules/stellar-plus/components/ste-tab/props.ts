export interface TabProps {
  title: string
  subTitle: string
  image: string
  name: string
  index: number
  disabled: boolean
  showDot: boolean
  badge: string | number
  showZeroBadge: boolean
}

const porpsData = {
  title: { type: String, default: () => '' },
  subTitle: { type: String, default: () => '' },
  image: { type: String, default: () => '' },
  name: { type: String, default: () => '' },
  index: { type: Number, default: () => null },
  disabled: { type: Boolean, default: () => false },
  showDot: { type: Boolean, default: () => false },
  badge: { type: [String, Number], default: () => 0 },
  showZeroBadge: { type: Boolean, default: () => false },
}

export default porpsData
