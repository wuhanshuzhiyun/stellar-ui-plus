import type { PropType } from 'vue'

const stepProps = {
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  status: { type: String as PropType<string | undefined>, default: undefined },
}

export default stepProps
