import { defineProps, withDefaults } from 'vue'

interface Props {
  src: string
  width?: string | number
  height?: string | number
  mode?: UniImageMode
  radius?: string | number
  display?: 'flex' | 'block' | 'inline-flex' | 'inline-block' | 'none' | 'inherit' | 'inline'
  hiddenLoading?: boolean
  hiddenError?: boolean
  lazyLoad?: boolean
  showMenuByLongpress?: boolean
}

const defaultProps: Props = {
  src: '',
  width: '100%',
  height: '100%',
  radius: '0',
  mode: 'scaleToFill',
  display: 'inline-flex',
  hiddenLoading: false,
  hiddenError: true,
  showMenuByLongpress: false,
  lazyLoad: false,
}

export default withDefaults(defineProps<Props>(), defaultProps)
