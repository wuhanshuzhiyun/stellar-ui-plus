export interface SteSelectSeatGridSize {
  rows: number
  cols: number
}

export const isInteger = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isInteger(value)
}

export const isPositiveInteger = (value: unknown): value is number => {
  return isInteger(value) && value > 0
}

export const getSafeGridSize = (rows: number, cols: number): SteSelectSeatGridSize => {
  return {
    rows: isPositiveInteger(rows) ? rows : 0,
    cols: isPositiveInteger(cols) ? cols : 0,
  }
}

export const isSeatInBounds = (row: number, col: number, rows: number, cols: number) => {
  return row >= 0 && row < rows && col >= 0 && col < cols
}
