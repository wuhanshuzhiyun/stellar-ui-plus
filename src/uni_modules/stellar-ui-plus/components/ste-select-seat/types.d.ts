/** 选中的座位值，仅表示已选中的座位坐标 */
export interface SteSelectSeatValue {
  row: number
  col: number
}

/** 座位项数据，用于描述座位属性，不表示选中状态 */
export interface SteSelectSeatItem {
  /** 行号（从0开始） */
  row: number
  /** 列号（从0开始） */
  col: number
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为空位（不渲染） */
  empty?: boolean
  /** 自定义背景色 */
  bgColor?: string
  /** 自定义边框颜色 */
  borderColor?: string
  /** 自定义选中背景色 */
  selectedBgColor?: string
  /** 自定义选中文字/图标颜色 */
  selectedColor?: string
}

/** 移动事件参数 */
export interface SteSelectSeatMoveEvent {
  translateX: number
  translateY: number
  scale: number
  screenTranslateX: number
}
