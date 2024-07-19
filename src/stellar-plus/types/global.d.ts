export interface TouchEvent {
  changedTouches: Touch[]
  targetTouches: Touch[]
  touches: Touch[]
}

export interface Touch {
  clientX: number
  clientY: number
  identifier: number
  pageX: number
  pageY: number
  screenX: number
  screenY: number
  radiusX: number
  radiusY: number
  rotationAngle: number
  force: number
  altitudeAngle: number
  azimuthAngle: number
  x: number
  y: number
}

export interface HTMLMoveEvent extends MouseEvent {
  target: EventTarget & { offsetLeft: number, offsetTop: number }
}
