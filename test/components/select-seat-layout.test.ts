import { describe, expect, test } from 'vitest'
import { buildRowLabelItems } from '../../src/uni_modules/stellar-ui-plus/components/ste-select-seat/internals/seatLayout'

describe('SelectSeat row labels', () => {
  test('skips aisle rows while preserving source coordinates', () => {
    const items = buildRowLabelItems({
      rows: 4,
      height: 200,
      seatSize: 20,
      seatGap: 4,
      translateY: 0,
      scale: 1,
      hiddenRows: new Set([1]),
    })

    expect(items.map(item => ({ row: item.row, label: item.label }))).toEqual([
      { row: 0, label: 1 },
      { row: 2, label: 2 },
      { row: 3, label: 3 },
    ])
    expect(items[1].top).toBe(50)
  })
})
