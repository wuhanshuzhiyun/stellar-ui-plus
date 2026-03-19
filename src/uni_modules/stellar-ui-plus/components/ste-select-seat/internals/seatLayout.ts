export interface SteSelectSeatContentSize {
  width: number
  height: number
}

export interface SteSelectSeatViewport {
  scale: number
  translateX: number
  translateY: number
}

export interface SteSelectSeatRowLabelItem {
  row: number
  top: number
  rowHeight: number
  style: {
    top: string
    height: string
    lineHeight: string
    fontSize: string
  }
}

export const INTERNAL_MAX_SCALE = 3

export const getLabelWidth = (showRowLabels: boolean, seatSize: number, seatGap: number) => {
  return showRowLabels ? seatSize + seatGap : 0
}

export const getSeatContentSize = (params: {
  rows: number
  cols: number
  seatSize: number
  seatGap: number
  labelWidth: number
}): SteSelectSeatContentSize => {
  const { rows, cols, seatSize, seatGap, labelWidth } = params
  if (!rows || !cols) return { width: 0, height: 0 }

  return {
    width: labelWidth + cols * (seatSize + seatGap) + seatGap,
    height: rows * (seatSize + seatGap) + seatGap,
  }
}

export const getFitScale = (params: {
  width: number
  height: number
  contentWidth: number
  contentHeight: number
}) => {
  const { width, height, contentWidth, contentHeight } = params
  if (!contentWidth || !contentHeight) return 1
  return Math.min(1, width / contentWidth, height / contentHeight)
}

export const clampSeatScale = (scale: number, fitScale: number, maxScale = INTERNAL_MAX_SCALE) => {
  return Math.min(Math.max(scale, fitScale), maxScale)
}

export const getSeatTranslateBounds = (params: {
  scale: number
  width: number
  height: number
  contentWidth: number
  contentHeight: number
}) => {
  const { scale, width, height, contentWidth, contentHeight } = params
  if (!contentWidth || !contentHeight) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  }

  const scaledWidth = contentWidth * scale
  const scaledHeight = contentHeight * scale
  const centerX = (width / scale - contentWidth) / 2
  const centerY = (height / scale - contentHeight) / 2
  const marginX = width * 0.2 / scale
  const marginY = height * 0.2 / scale

  return {
    minX: scaledWidth > width ? width / scale - contentWidth - marginX : centerX - marginX,
    maxX: scaledWidth > width ? marginX : centerX + marginX,
    minY: scaledHeight > height ? height / scale - contentHeight - marginY : centerY - marginY,
    maxY: scaledHeight > height ? marginY : centerY + marginY,
  }
}

export const getDefaultSeatViewport = (params: {
  fitScale: number
  width: number
  height: number
  contentWidth: number
  contentHeight: number
  maxScale?: number
}): SteSelectSeatViewport => {
  const { fitScale, width, height, contentWidth, contentHeight, maxScale = INTERNAL_MAX_SCALE } = params
  if (!contentWidth || !contentHeight) {
    return {
      scale: 1,
      translateX: 0,
      translateY: 0,
    }
  }

  const scale = clampSeatScale(fitScale, fitScale, maxScale)
  return {
    scale,
    translateX: (width / scale - contentWidth) / 2,
    translateY: (height / scale - contentHeight) / 2,
  }
}

export const getScreenTranslateX = (params: {
  scale: number
  translateX: number
  width: number
  defaultViewport: SteSelectSeatViewport
}) => {
  const { scale, translateX, width, defaultViewport } = params
  const anchorX = width / (2 * defaultViewport.scale) - defaultViewport.translateX
  return (anchorX + translateX) * scale - width / 2
}

export const buildRowLabelItems = (params: {
  rows: number
  height: number
  seatSize: number
  seatGap: number
  translateY: number
  scale: number
}): SteSelectSeatRowLabelItem[] => {
  const { rows, height, seatSize, seatGap, translateY, scale } = params
  const rowHeight = seatSize * scale
  const fontSize = Math.max(10, Math.min(13, rowHeight * 0.3))

  return Array.from({ length: rows }, (_, row) => {
    const top = (row * (seatSize + seatGap) + seatGap / 2 + translateY) * scale
    return {
      row,
      top,
      rowHeight,
      style: {
        top: `${top}px`,
        height: `${rowHeight}px`,
        lineHeight: `${rowHeight}px`,
        fontSize: `${fontSize}px`,
      },
    }
  }).filter(item => item.top + rowHeight > 0 && item.top < height)
}

export const getRowLabelTrackStyle = (items: SteSelectSeatRowLabelItem[], height: number) => {
  if (!items.length) {
    return {
      display: 'none',
    }
  }

  const first = items[0]
  const last = items[items.length - 1]
  const padding = 8
  const top = Math.max(0, first.top - padding)
  const bottom = Math.min(height, last.top + last.rowHeight + padding)

  return {
    top: `${top}px`,
    height: `${Math.max(32, bottom - top)}px`,
  }
}
