import { ref, computed, watch } from 'vue'
import type { SteSelectSeatItem, SteSelectSeatValue } from './types'
import { getSafeGridSize, isInteger, isSeatInBounds } from './internals/gridUtils'

export function useData(props: {
  rows: number
  cols: number
  seats: SteSelectSeatItem[]
  modelValue: SteSelectSeatValue[]
}) {
  // 内部座位数据 Map: `${row}-${col}` => SteSelectSeatItem
  const seatMap = ref<Map<string, SteSelectSeatItem>>(new Map())
  const warnedMessages = new Set<string>()

  const getKey = (row: number, col: number) => `${row}-${col}`

  const warn = (message: string) => {
    if (warnedMessages.has(message)) return
    warnedMessages.add(message)
    console.warn(`[ste-select-seat] ${message}`)
  }

  const getGridSize = () => {
    const shouldWarn = props.rows !== 0 || props.cols !== 0 || props.seats.length > 0 || props.modelValue.length > 0
    const { rows, cols } = getSafeGridSize(props.rows, props.cols)

    if (!rows && shouldWarn) {
      warn(`rows 应为大于 0 的整数，当前值为 ${String(props.rows)}`)
    }
    if (!cols && shouldWarn) {
      warn(`cols 应为大于 0 的整数，当前值为 ${String(props.cols)}`)
    }

    return { rows, cols }
  }

  const normalizeSeat = (seat: SteSelectSeatItem, index: number, rows: number, cols: number) => {
    if (!isInteger(seat?.row) || !isInteger(seat?.col)) {
      warn(`seats[${index}] 缺少合法的 row/col 整数，已忽略`)
      return null
    }

    if (!isSeatInBounds(seat.row, seat.col, rows, cols)) {
      warn(`seats[${index}] 的坐标 (${seat.row}, ${seat.col}) 超出范围 rows=${rows}, cols=${cols}，已忽略`)
      return null
    }

    return { ...seat }
  }

  // 初始化座位数据
  const initSeats = () => {
    const { rows, cols } = getGridSize()
    const map = new Map<string, SteSelectSeatItem>()

    if (!rows || !cols) {
      seatMap.value = map
      return
    }

    if (props.seats && props.seats.length > 0) {
      for (let index = 0; index < props.seats.length; index++) {
        const seat = normalizeSeat(props.seats[index], index, rows, cols)
        if (!seat) continue

        const key = getKey(seat.row, seat.col)
        if (map.has(key)) {
          warn(`seats[${index}] 的坐标 (${seat.row}, ${seat.col}) 重复，后一个配置将覆盖前一个`)
        }
        map.set(key, seat)
      }
    }

    // 补齐 rows*cols 中未定义的座位
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = getKey(r, c)
        if (!map.has(key)) {
          map.set(key, { row: r, col: c })
        }
      }
    }
    seatMap.value = map
  }

  // 获取某个座位数据
  const getSeat = (row: number, col: number): SteSelectSeatItem | undefined => {
    return seatMap.value.get(getKey(row, col))
  }

  // 设置某个座位数据
  const setSeat = (row: number, col: number, data: Partial<SteSelectSeatItem>) => {
    const { rows, cols } = getGridSize()
    if (!rows || !cols) {
      warn('当前 rows/cols 非法，setSeat 已忽略')
      return
    }
    if (!isInteger(row) || !isInteger(col)) {
      warn(`setSeat 的 row/col 应为整数，当前值为 (${String(row)}, ${String(col)})`)
      return
    }
    if (!isSeatInBounds(row, col, rows, cols)) {
      warn(`setSeat 的坐标 (${row}, ${col}) 超出范围 rows=${rows}, cols=${cols}`)
      return
    }

    const key = getKey(row, col)
    const existing = seatMap.value.get(key)
    if (existing) {
      seatMap.value.set(key, { ...existing, ...data })
    } else {
      seatMap.value.set(key, { row, col, ...data })
    }
    // 触发响应式更新
    seatMap.value = new Map(seatMap.value)
  }

  // 获取所有座位
  const getSeats = (): SteSelectSeatItem[] => {
    return Array.from(seatMap.value.values())
  }

  // 按行获取座位（用于渲染）
  const seatRows = computed(() => {
    const { rows: totalRows, cols: totalCols } = getGridSize()
    const rows: SteSelectSeatItem[][] = []
    for (let r = 0; r < totalRows; r++) {
      const row: SteSelectSeatItem[] = []
      for (let c = 0; c < totalCols; c++) {
        const seat = seatMap.value.get(getKey(r, c))
        if (seat) {
          row.push(seat)
        } else {
          row.push({ row: r, col: c })
        }
      }
      rows.push(row)
    }
    return rows
  })

  // 判断座位是否选中
  const isSelected = (row: number, col: number): boolean => {
    return props.modelValue.some(v => v.row === row && v.col === col)
  }

  // 切换座位选中状态，返回新的选中列表
  const toggleSeat = (row: number, col: number): SteSelectSeatValue[] => {
    const seat = getSeat(row, col)
    if (!seat || seat.disabled || seat.empty) return [...props.modelValue]

    const idx = props.modelValue.findIndex(v => v.row === row && v.col === col)
    const newValue = [...props.modelValue]
    if (idx >= 0) {
      newValue.splice(idx, 1)
    } else {
      newValue.push({ row, col })
    }
    return newValue
  }

  // 监听 seats 和 rows/cols 变化重新初始化
  watch(
    () => [props.seats, props.rows, props.cols],
    () => initSeats(),
    { immediate: true, deep: true },
  )

  return {
    seatMap,
    seatRows,
    getSeat,
    setSeat,
    getSeats,
    isSelected,
    toggleSeat,
    initSeats,
  }
}
