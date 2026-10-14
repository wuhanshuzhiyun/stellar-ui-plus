export type DatePickerModeType = 'all' | 'datetime' | 'date' | 'year-month' | 'month-day' | 'time' | 'hour-minute' | 'minute-second'

export type CloumnType = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

export type DatePickerSelectedValue = Partial<Record<CloumnType, number>>

export interface DatePickerChangeEvent {
  value: number
  columnIndexs: number[]
  selected: DatePickerSelectedValue
}
