export const INDEX_LIST_KEY = Symbol('index-list')

export interface IndexListProps {
  active: number
  height: string | number
  sticky: boolean
  inactiveColor: string
  activeColor: string
}

export default {
  active: { type: Number, default: () => 0 },
  height: { type: [String, Number], default: () => '100%' },
  sticky: { type: Boolean, default: () => true },
  inactiveColor: { type: String, default: () => '#666' },
  activeColor: { type: String, default: () => '#FF1A00' },
}
