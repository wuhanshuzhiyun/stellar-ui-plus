/**
 * ste-calendar 日历核心日期计算与格式化工具模块
 * 负责日历月份列表生成、月度周数排布、日期单元格状态计算（禁用、周末、打卡标记等）及日期格式化转换
 */
import utils from '../../utils/utils'
import type { Dayjs } from '../../types/index'
import type { CSSProperties } from 'vue'

export type SignType = { content: string, style?: CSSProperties, className?: string, key?: number }[]

/** 月份标题格式化配置类型：支持 Dayjs 格式模板字符串或接收 Dayjs 返回字符串的自定义函数 */
export type MonthFormatterType = string | ((date: Dayjs) => string)

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
 * 格式化月份标题文本
 * @param date 当前月份的 Dayjs 实例
 * @param monthFormatter 月份格式化模板或自定义函数，默认为 'YYYY年MM月'
 * @returns 格式化后的月份展示字符串
 */
export function formatMonthTitle(date: Dayjs, monthFormatter: MonthFormatterType = 'YYYY年MM月'): string {
  if (typeof monthFormatter === 'function') {
    return monthFormatter(date)
  }
  return date.format(monthFormatter || 'YYYY年MM月')
}

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
    const totalMonths = sM + Number(monthCount) - 1
    eY = sY + Math.floor((totalMonths - 1) / 12)
    eM = ((totalMonths - 1) % 12) + 1
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
 * @param minDate 最小可选日期
 * @param maxDate 最大可选日期
 * @param defaultDate 默认定位日期
 * @param monthCount 渲染月份数
 * @param formatter 日期单元格格式化模板，默认 'YYYY-MM-DD'
 * @param signs 标记点数据
 * @param viewStart 可视起始日期
 * @param viewEnd 可视截止日期
 * @param monthFormatter 月份标题展示格式化配置（模板字符串或回调函数），默认 'YYYY年MM月'
 * @returns 月份数据集及周文本列表
 */
export function getCalendarData(
  minDate?: DateType,
  maxDate?: DateType,
  defaultDate?: DateType,
  monthCount = 12,
  formatter = 'YYYY-MM-DD',
  signs: { [key: string]: SignType } = {},
  viewStart?: DateType,
  viewEnd?: DateType,
  monthFormatter: MonthFormatterType = 'YYYY年MM月'
) {
  const monthDatas: MonthType[] = []
  if (viewStart && maxDate && maxDate < viewStart) {
    throw new Error('viewStart cannot be greater than viewEnd')
  }
  if (viewEnd && minDate && minDate > viewEnd) {
    throw new Error('viewEnd cannot be less than viewStart')
  }
  const months = getMonthList(viewStart ? viewStart : minDate, viewEnd ? viewEnd : maxDate, defaultDate, monthCount)
  const today = utils.dayjs().format('YYYY-MM-DD');
  months.forEach((date) => {
    const daysCount = getMonthDays(date.year(), date.month())
    // 一号的星期
    const firstDay = date.startOf('month').day()
    const monthData: MonthType = {
      date,
      monthText: formatMonthTitle(date, monthFormatter),
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
        if (_day) {
          const keyDate = utils.dayjs(key)
          disabled = Boolean(
            (minDate && keyDate.isBefore(utils.dayjs(minDate), 'day')) ||
            (maxDate && keyDate.isAfter(utils.dayjs(maxDate), 'day'))
          )
        }

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
