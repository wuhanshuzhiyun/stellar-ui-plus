export const ICON_OBJ = {
  info: '&#xe67d;',
  success: '&#xe67a;',
  error: '&#xe67b;',
}
export const DURATION = 200
export const ANIMATION_PROP: UniApp.CreateAnimationOptions = { duration: DURATION, timingFunction: 'ease-out' }

export type MessageBoxIcon = 'info' | 'success' | 'error'

export const DEFAULT_CONFIG = {
  title: '',
  content: '',
  showCancel: true,
  icon: '',
  cancelText: '取消',
  cancelColor: '#333333',
  confirmText: '确认',
  confirmColor: '#0090ff',
  editable: false,
  placeholderText: '',
  success: null,
  fail: null,
  complete: null,
}
