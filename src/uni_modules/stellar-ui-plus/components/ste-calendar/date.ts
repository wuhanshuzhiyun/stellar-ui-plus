import utils from '../../utils/utils'
import type { Dayjs } from '../../types/index'
import type { CSSProperties } from 'vue'

export type SignType = { content: string, style?: CSSProperties, className?: string, key?: number }[]


export interface WeekType {
  dayText: string | number
  key: string | number
  disabled: boolean
  weekend: boolean
  today: boolean
  date: string | number | null
  signs: SignType | null
}

export interface MonthType {
  date: Dayjs
  monthText: string
  key: string
  month: number
  weeks: WeekType[][]
}

export type DateType = string | number | Dayjs | Date

/**
 * 获取从当前月份开始的12个月
 */
function getMonthList(minDate?: DateType, maxDate?: DateType, defaultDate?: DateType, monthCount?: number) {
  if (maxDate) monthCount = 12;
  const start = minDate ? utils.dayjs(minDate) : utils.dayjs(defaultDate)
  const sY = Number(start.format('YYYY'))
  const sM = Number(start.format('MM'))
  const end = maxDate ? utils.dayjs(maxDate) : null
  let eY, eM
  if (end) {
    eY = Number(end.format('YYYY'))
    eM = Number(end.format('MM'))
  } else {
    eY = sM + Number(monthCount) - 1 > 12 ? sY + 1 : sY
    eM = sM + Number(monthCount) - 1 > 12 ? sM + Number(monthCount) - 1 - 12 : sM + Number(monthCount) - 1
  }
  const months = []
  for (let y = sY; y <= eY; y++) {
    for (let m = y === sY ? sM : 1; m <= (y === eY ? eM : 12); m++)
      months.push(utils.dayjs(`${y}-${m < 10 ? `0${m}` : m}-01`))
  }
  return months
}

/**
 * 获取每个月的天数
 */
export function getMonthDays(year: number, month: number) {
  // 是否是闰年
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  // 每个月的天数
  const daysCount = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return daysCount[month]
}

/**
 * 获取日历数据
 */
export function getCalendarData(minDate?: DateType, maxDate?: DateType, defaultDate?: DateType, monthCount = 12, formatter = 'YYYY-MM-DD', signs: { [key: string]: SignType } = {}) {
  const monthDatas: MonthType[] = []
  const months = getMonthList(minDate, maxDate, defaultDate, monthCount)
  const today = utils.dayjs().format('YYYY-MM-DD');
  months.forEach((date) => {
    const daysCount = getMonthDays(date.year(), date.month())
    // 一号的星期
    const firstDay = date.startOf('month').day()
    const monthData: MonthType = {
      date,
      monthText: date.format('YYYY年MM月'),
      key: date.format('YYYY-MM'),
      month: date.month() + 1,
      weeks: [],
    }
    // 计算本月周数
    const weekNum = Math.ceil((daysCount + firstDay) / 7)
    let day = 1
    for (let w = 0; w < weekNum; w++) {
      const week = []
      for (let d = 0; d < 7; d++) {
        let _day
        if ((w === 0 && d < firstDay) || day > daysCount) _day = ''
        else _day = day++
        const key = _day ? utils.dayjs(`${monthData.key}-${_day}`).format(formatter) : Math.random()
        let disabled = !_day
        if (_day)
          disabled = Boolean((minDate && key < minDate) || (maxDate && key > maxDate))

        const daySigns = _day && signs && signs[key] ? signs[key].slice(0, 3).map(item => ({
          ...item,
          key: Math.random()
        })) : null;


        week.push({
          dayText: _day,
          key,
          disabled,
          weekend: d === 0 || d === 6,
          // 是否是今天
          today: Boolean(_day && today === key),
          date: _day ? key : null,
          signs: daySigns,
        })
      }
      monthData.weeks.push(week)
    }
    monthDatas.push(monthData)
  })
  return { monthDatas, weekTexts: '日一二三四五六'.split('') }
}

/**
 * 格式化时间
 */
export function formatDate(date: DateType, formatter = 'YYYY-MM-DD') {
  return utils.dayjs(date).format(formatter)
}
