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

export interface HTMLMoveEvent extends MouseEvent {
  target: EventTarget & { offsetLeft?: number, offsetTop?: number } | null
}
