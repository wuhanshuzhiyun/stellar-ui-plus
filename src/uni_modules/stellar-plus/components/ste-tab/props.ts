export default {
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
