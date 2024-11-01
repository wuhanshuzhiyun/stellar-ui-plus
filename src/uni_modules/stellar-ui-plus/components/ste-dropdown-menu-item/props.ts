import type { ExtractPropTypes } from 'vue'

const dropdownMenuItemProps = {
  value: { type: String, default: '' },
  title: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  max: { type: Number, default: 1 },
}

export type DropdownMenuItemProps = ExtractPropTypes<typeof dropdownMenuItemProps>

export default dropdownMenuItemProps

export const dropdownMenuItemEmits = {
  click: (suspend: () => void, next: () => void, stop: () => void) => suspend instanceof Function && next instanceof Function && stop instanceof Function,
}
