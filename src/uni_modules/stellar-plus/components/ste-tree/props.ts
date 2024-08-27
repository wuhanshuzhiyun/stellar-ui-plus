import type { PropType } from 'vue'
import type { TreeNode } from '../../types'

export interface SteTreeProps {
  valueKey: string
  titleKey: string
  childrenKey: string
  options: TreeNode[]
  accordion: boolean
  childrenPadding: number | string
  openNodes: (string | number)[]
  searchTitle: string
}

export default {
  valueKey: { type: String, default: () => 'value' },
  titleKey: { type: String, default: () => 'title' },
  childrenKey: { type: String, default: () => 'children' },
  options: { type: Array as PropType<TreeNode[]>, default: () => [] },
  accordion: { type: Boolean, default: () => true },
  childrenPadding: { type: [Number, String], default: () => 40 },
  openNodes: { type: Array as PropType<(string | number)[]>, default: () => [] },
  searchTitle: { type: String, default: () => '' },
}
