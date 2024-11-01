import utils from '../../utils/utils'
import { getMonthDays } from '../ste-calendar/date'

type Dayjs = typeof utils.dayjs.Dayjs

export type DateMode = 'date' | 'datetime' | 'time' | 'month' | 'minute'

export type DateValue = (number | string)[] | string | number | Date | Dayjs

/**
 * 格式化时间值
 */
export function getFormatStr(mode: 'date' | 'datetime' | 'time' | 'month' | 'minute', unit = false) {
  switch (mode) {
    case 'date':
      return unit ? 'YYYY年MM月DD日' : 'YYYY-MM-DD'
    case 'datetime':
      return unit ? 'YYYY年MM月DD日HH时mm分ss秒' : 'YYYY-MM-DD HH:mm:ss'
    case 'time':
      return unit ? 'HH时mm分ss秒' : 'HH:mm:ss'
    case 'month':
      return unit ? 'YYYY年MM月' : 'YYYY-MM'
    case 'minute':
      return unit ? 'HH时mm分' : 'HH:mm'
    default:
      return unit ? 'YYYY年MM月DD日' : 'YYYY-MM-DD'
  }
}

/**
 * 获取当前时间
 */
export function getNowDate(defaultDate: DateValue, mode: DateMode) {
  let date = formatDate(defaultDate, mode)
  if (!date)
    date = utils.dayjs()
  const y = date.year()
  const m = date.month() + 1
  const d = date.date()
  const h = date.hour()
  const i = date.minute()
  const s = date.second()
  let value = []

  if (['date', 'datetime', 'month'].includes(mode))
    value = [y, m, d, h, i, s]
  else
    value = [h, i, s]

  return value
}

/**
 * 格式化时间值
 */
export function formatDate(value: DateValue, mode: DateMode) {
  let _v: DateValue | null = value
  if (Array.isArray(_v)) {
    if (!_v.length) {
      _v = null
    }
    else if (['date', 'datetime', 'month'].includes(mode)) {
      const date = _v.slice(0, 3)
      const [y, m, d] = date
      const maxD = getMonthDays(Number(y), Number(m) - 1)
      if (Number(d) > maxD)
        date[2] = maxD

      const time = _v.slice(3)
      _v = `${date.join('-')}`
      _v += time.length ? ` ${time.join(':')}` : ''
    }
    else if (['time', 'minute'].includes(mode)) {
      _v = `${utils.dayjs().format('YYYY-MM-DD')} ${_v.join(':')}`
    }
  }
  return _v ? utils.dayjs(_v as string) : null
}

export function getYears(min: Dayjs, max: Dayjs) {
  const minYear = min.year()
  const maxYear = max.year()
  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)
}

export function getMonths(date: Dayjs, min: Dayjs, max: Dayjs) {
  const minMonth = min.year() >= date.year() ? min.month() + 1 : 1
  const maxMonth = max.year() <= date.year() ? max.month() + 1 : 12
  return Array.from({ length: maxMonth - minMonth + 1 }, (_, i) => minMonth + i)
}

export function getDays(date: Dayjs, min: Dayjs, max: Dayjs) {
  const minDay = min.format('YYYY-MM') >= date.format('YYYY-MM') ? min.date() : 1
  const maxDay = max.format('YYYY-MM') <= date.format('YYYY-MM') ? max.date() : getMonthDays(date.year(), date.month())
  return Array.from({ length: maxDay - minDay + 1 }, (_, i) => minDay + i)
}

export function getTimes(date: Dayjs, min: Dayjs, max: Dayjs, formatStr: string, maxNum: number) {
  const minHour = min.format(formatStr) >= date.format(formatStr) ? min.hour() : 0
  const maxHour = max.format(formatStr) <= date.format(formatStr) ? max.date() : maxNum
  return Array.from({ length: maxHour - minHour + 1 }, (_, i) => minHour + i)
}

/**
 * 获取默认数据。
 */
export function getDateOptions(value: DateValue, mode: DateMode, minDate?: string | number | Date, maxDate?: string | number | Date) {
  const _v = formatDate(value, mode)
  const date = utils.dayjs()
  const _value = _v || date
  const min = minDate ? utils.dayjs(minDate) : utils.dayjs(`${date.year() - 10}-${date.format('MM-DD HH:mm:ss')}`)
  const max = maxDate ? utils.dayjs(maxDate) : utils.dayjs(`${date.year() + 10}-${date.format('MM-DD HH:mm:ss')}`)

  const years = getYears(min, max).map(e => ({ value: e, title: `${e}年` }))
  const months = getMonths(_value, min, max).map(e => ({ value: e, title: `${e}月` }))
  const days = getDays(_value, min, max).map(e => ({ value: e, title: `${e}日` }))
  const hours = getTimes(_value, min, max, 'YYYY-MM-DD', 23).map(e => ({ value: e, title: `${e}时` }))
  const minutes = getTimes(_value, min, max, 'YYYY-MM-DD HH', 60).map(e => ({ value: e, title: `${e}分` }))
  const seconds = getTimes(_value, min, max, 'YYYY-MM-DD HH:mm', 60).map(e => ({ value: e, title: `${e}秒` }))

  const options = []
  switch (mode) {
    case 'datetime':
      options.push(years, months, days, hours, minutes, seconds)
      break
    case 'time':
      options.push(hours, minutes, seconds)
      break
    case 'month':
      options.push(years, months)
      break
    case 'minute':
      options.push(hours, minutes)
      break
    default:
      options.push(years, months, days)
  }
  return { options, value: _value }
}
