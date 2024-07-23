import type { EventTarget } from '@uni-helper/uni-app-types'

export interface UniTouch extends Touch {
  x?: number
  y?: number
}
export interface UniTouchList extends TouchList {
  [index: number]: UniTouch
}

export interface UniTouchEvent extends TouchEvent {
  changedTouches: UniTouchList
  targetTouches: UniTouchList
  touches: UniTouchList
}

export interface HTMLMouseEvent extends MouseEvent {
  target: EventTarget & { offsetLeft?: number, offsetTop?: number } | null
}

export interface ImageLoadEvent {
  detail: {
    width: number
    height: number
  }
  target: {
    id: string
    dataset: Record<string, any>
  }
}
export interface BaseEvent<Mark extends _AnyRecord = _AnyRecord, CurrentTargetDataset extends _AnyRecord = _AnyRecord, TargetDataset extends _AnyRecord = CurrentTargetDataset> {
  /** 事件类型 */
  type?: string
  /** 事件生成时的时间戳 */
  timeStamp?: number
  /** 事件冒泡路径上所有由 mark: 开头的自定义属性组成的集合 */
  mark?: Mark
  /** 触发事件的源组件的一些属性值集合 */
  target?: EventTarget
  /** 事件绑定的当前组件的一些属性值集合 */
  currentTarget?: EventTarget
  [key: string]: any
}
