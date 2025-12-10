import type { UniTouch, UniTouchList } from '../../types/event'

export default class TouchScaleing {
  identifiers: UniTouch[] = []

  startParam: {
    id1: number | null
    x1?: number | null
    y1?: number | null
    id2: number | null
    x2?: number | null
    y2?: number | null
  } = {
      id1: null,
      x1: null,
      y1: null,
      id2: null,
      x2: null,
      y2: null,
    }

  isScale = false
  scale = 1
  baseScale = 1

  rotate = 0
  baseRotate = 0

  translateX = 0
  translateY = 0
  baseTranslateX = 0
  baseTranslateY = 0

  private _setData(changedTouches: UniTouchList) {
    for (let i = 0; i < changedTouches.length; i++) {
      const newData = changedTouches[i]
      const data = this.identifiers.find(item => item.identifier === newData.identifier)
      if (data) {
        Object.assign(data, newData)
      }
      else {
        this.identifiers.push(newData)
        if (this.identifiers.length > 2) {
          this.identifiers.shift()
          this.startParam.id1 = this.startParam.id2
          this.startParam.x1 = this.startParam.x2
          this.startParam.y1 = this.startParam.y2
          this.startParam.id2 = newData.identifier
          this.startParam.x2 = newData.pageX
          this.startParam.y2 = newData.pageY
        }
      }
    }
  }

  private _getTouchPosition() {
    const [m1, m2] = this.identifiers
    const x1 = m1?.pageX || null
    const y1 = m1?.pageY || null
    const x2 = m2?.pageX || null
    const y2 = m2?.pageY || null
    const id1 = m1?.identifier || null
    const id2 = m2?.identifier || null
    return [x1, y1, x2, y2, id1, id2]
  }

  touchStart(changedTouches: UniTouchList) {
    this._setData(changedTouches)

    const [x1, y1, x2, y2, id1, id2] = this._getTouchPosition()
    if (x1 !== null && y1 !== null) {
      this.startParam.x1 = x1
      this.startParam.y1 = y1
      this.startParam.id1 = id1
    }
    if (x2 !== null && y2 !== null) {
      this.startParam.x2 = x2
      this.startParam.y2 = y2
      this.startParam.id2 = id2
    }
    return [x1, y1, x2, y2]
  }

  touchMove(changedTouches: UniTouchList) {
    this._setData(changedTouches)

    // 单指拖拽处理
    if (this.isScale && changedTouches.length === 1) {
      const param = this.startParam
      const [x1, y1] = this._getTouchPosition() as number[]

      // 如果之前有记录第一个触摸点，则计算移动距离
      if (param.x1 && param.y1) {
        this.translateX = this.baseTranslateX + (x1 - param.x1)
        this.translateY = this.baseTranslateY + (y1 - param.y1)
      }
      return true
    }

    // 双指缩放处理
    if (changedTouches.length >= 2) {
      const param = this.startParam
      const [startX1, startY1, startX2, startY2] = [param.x1, param.y1, param.x2, param.y2] as number[]
      const [x1, y1, x2, y2] = this._getTouchPosition() as number[]

      this.scale = this.baseScale *
        (Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
          / Math.sqrt((startX2 - startX1) ** 2 + (startY2 - startY1) ** 2))

      this.rotate = this.baseRotate +
        ((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
          - (Math.atan2(startY2 - startY1, startX2 - startX1) * 180) / Math.PI)

      this.translateX = this.baseTranslateX + ((x1 + x2) / 2 - (startX1 + startX2) / 2)
      this.translateY = this.baseTranslateY + ((y1 + y2) / 2 - (startY1 + startY2) / 2)
      return true
    }

    return false
  }

  touchEnd(changedTouches: UniTouchList) {
    for (let i = 0; i < changedTouches.length; i++) {
      const item = changedTouches[i]
      const index = this.identifiers.findIndex(m => m.identifier === item.identifier)
      if (index !== -1)
        this.identifiers.splice(index, 1)
    }
    const [x1, y1, x2, y2] = this._getTouchPosition()
    if (x1 !== null && y1 !== null) {
      this.startParam.x1 = null
      this.startParam.y1 = null
    }
    if (x2 !== null && y2 !== null) {
      this.startParam.x2 = null
      this.startParam.y2 = null
    }

    // 保存当前状态作为基础值，以便下次操作基于此状态继续
    this.baseScale = this.scale
    this.baseRotate = this.rotate
    this.baseTranslateX = this.translateX
    this.baseTranslateY = this.translateY
    this.isScale = this.scale > 1
    return !this.identifiers.length
  }

  // 重置所有变换状态
  reset() {
    this.isScale = false
    this.scale = 1
    this.baseScale = 1
    this.rotate = 0
    this.baseRotate = 0
    this.translateX = 0
    this.translateY = 0
    this.baseTranslateX = 0
    this.baseTranslateY = 0
  }
}