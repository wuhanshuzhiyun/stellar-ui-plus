import type { RichTextSpace } from '@uni-helper/uni-app-types'
import type { PropType } from 'vue'

export default {
  text: { type: String, default: '' },
  space: { type: String as PropType<RichTextSpace>, default: 'nbsp' },
  userSelect: { type: Boolean, default: false },
}
