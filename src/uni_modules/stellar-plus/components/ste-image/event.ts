import { defineEmits, withDefaults } from 'vue'

export default withDefaults(defineEmits<{
  click?: (e?: Event) => void
  load?: (e?: Event) => void
  error?: (e?: Event) => void
}>(), {})
