/**
 * ste-calendar 日历核心日期计算与格式化工具模块
 * 负责日历月份列表轻量元数据生成、纯数学绝对高度与坐标系推导、
 * 单月份单元格状态按需生成（滑动窗口虚拟化）及跨平台日期格式化
 */
import utils from '../../utils/utils'
import type { Dayjs } from '../../types/index'
import type { CSSProperties } from 'vue'

export type SignType = { content: string, style?: CSSProperties, className?: string, key?: number }[]

/** 月份标题格式化配置类型：支持 Dayjs 格式模板字符串或接收 Dayjs 返回字符串的自定义函数 */
export type MonthFormatterType = string | ((date: Dayjs) => string)

/** 日期单元格详细数据结构 */
export interface WeekType {
  dayText: string | number
  key: string | number
  disabled: boolean
  weekend: boolean
  today: boolean
  date: string | number | null
  signs: SignType | null
}

/** 月份详细数据结构（包含已渲染的完整星期单元格矩阵） */
export interface MonthType {
  date: Dayjs
  monthText: string
  key: string
  month: number
  weeks: WeekType[][]
}

/**
 * 月份轻量元数据结构（用于虚拟滚动坐标系及精确高度计算）
 * 仅保留轻量数值与字符串，不创建庞大的日期单元格对象，实现千月级毫秒计算与恒定微小内存开销
 */
export interface MonthMeta {
  /** 当前月份对应 Dayjs 对象 */
  date: Dayjs
  /** 年份数值，如 2026 */
  year: number
  /** 月份数值 (1-12) */
  month: number
  /** 月份唯一键值，格式为 'YYYY-MM' */
  key: string
  /** 格式化后的月份展示文本，如 '2026年10月' */
  monthText: string
  /** 当月包含的总周数（行数），通常为 4、5 或 6 */
  weeksCount: number
  /** 当月总物理高度（单位：px），包含月份头部及所有周行高 */
  height: number
  /** 当月在虚拟长列表中的起始绝对高度偏移（单位：px） */
  top: number
  /** 当月在虚拟长列表中的结束绝对高度偏移（单位：px） */
  end: number
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
 * 获取指定年月的自然天数
 * @param year 公元年份
 * @param month 0-indexed 月份（0 代表 1 月，11 代表 12 月）
 * @returns 当月天数（28、29、30 或 31）
 */
export function getMonthDays(year: number, month: number): number {
  // 是否是闰年：能被4整除但不能被100整除，或者能被400整除
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  // 每个月的天数数组
  const daysCount = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return daysCount[month]
}

/**
 * 纯数学计算指定年月包含的周数（行数）
 * 1号所在星期 + 当月天数向上取整除以 7，得出日历网格的行数（4、5 或 6 行）
 * @param year 年份
 * @param monthZeroIndexed 0-indexed 月份（0-11）
 */
export function calcMonthWeeksCount(year: number, monthZeroIndexed: number): number {
  const daysCount = getMonthDays(year, monthZeroIndexed)
  const m = monthZeroIndexed + 1
  const firstDay = utils.dayjs(`${year}-${m < 10 ? `0${m}` : m}-01`).day()
  return Math.ceil((daysCount + firstDay) / 7)
}

/**
 * 纯数学计算指定月份卡片的物理高度
 * @param weeksCount 当月包含的周行数
 * @param rowHeight 单行行高 (px)
 * @param headerHeight 月份标题头部高度 (px)
 */
export function calcMonthHeight(weeksCount: number, rowHeight: number, headerHeight: number): number {
  return headerHeight + weeksCount * rowHeight
}

/**
 * 生成轻量级月份元数据列表及其绝对高度坐标体系
 * 采用纯数学公式计算与前缀和累加，不创建日期单元格，千月级生成耗时 < 1ms，内存仅几十 KB
 *
 * @param minDate 最小可选日期
 * @param maxDate 最大可选日期
 * @param defaultDate 默认定位日期
 * @param monthCount 渲染月份数
 * @param viewStart 可视起始日期
 * @param viewEnd 可视截止日期
 * @param monthFormatter 月份标题展示格式化配置
 * @param infinite 是否开启前后无限滚动模式
 * @param infiniteYears 无限模式下单向前溯/后延的年份跨度
 * @param rowHeight 单元格行高 (px)
 * @param headerHeight 月份头部高度 (px)
 * @returns 包含月份元数据数组、字典映射表及总滚动高度的对象
 */
export function generateMonthMetas(
  minDate?: DateType,
  maxDate?: DateType,
  defaultDate?: DateType,
  monthCount = 12,
  viewStart?: DateType,
  viewEnd?: DateType,
  monthFormatter: MonthFormatterType = 'YYYY年MM月',
  infinite = false,
  infiniteYears = 10,
  rowHeight = 63,
  headerHeight = 40
): { metas: MonthMeta[]; metaMap: Record<string, MonthMeta>; totalHeight: number } {
  if (viewStart && maxDate && maxDate < viewStart) {
    throw new Error('viewStart cannot be greater than viewEnd')
  }
  if (viewEnd && minDate && minDate > viewEnd) {
    throw new Error('viewEnd cannot be less than viewStart')
  }

  const defaultDay = defaultDate ? utils.dayjs(defaultDate) : utils.dayjs()
  let sY: number
  let sM: number
  let eY: number
  let eM: number

  // 1. 优先使用显式指定的可视起始/截止日期
  const effectiveStart = viewStart || (infinite ? null : minDate)
  const effectiveEnd = viewEnd || (infinite ? null : maxDate)

  if (effectiveStart) {
    const start = utils.dayjs(effectiveStart)
    sY = Number(start.format('YYYY'))
    sM = Number(start.format('MM'))
  } else if (infinite) {
    // 开启前后无限滚动模式且无限定起始：以当前定位日期向前推演 N 年
    sY = defaultDay.year() - (infiniteYears || 10)
    sM = 1
  } else {
    // 普通模式：以 defaultDate 作为起始月份
    sY = Number(defaultDay.format('YYYY'))
    sM = Number(defaultDay.format('MM'))
  }

  if (effectiveEnd) {
    const end = utils.dayjs(effectiveEnd)
    eY = Number(end.format('YYYY'))
    eM = Number(end.format('MM'))
  } else if (infinite) {
    // 开启前后无限滚动模式且无限定截止：以当前定位日期向后推演 N 年
    eY = defaultDay.year() + (infiniteYears || 10)
    eM = 12
  } else {
    // 普通模式：根据 monthCount 计算截止年份与月份
    const totalMonths = sM + Number(monthCount) - 1
    eY = sY + Math.floor((totalMonths - 1) / 12)
    eM = ((totalMonths - 1) % 12) + 1
  }

  const metas: MonthMeta[] = []
  const metaMap: Record<string, MonthMeta> = {}
  let currentTop = 0

  for (let y = sY; y <= eY; y++) {
    const startMonth = y === sY ? sM : 1
    const endMonth = y === eY ? eM : 12
    for (let m = startMonth; m <= endMonth; m++) {
      const monthStr = m < 10 ? `0${m}` : `${m}`
      const dateStr = `${y}-${monthStr}-01`
      const date = utils.dayjs(dateStr)
      const key = `${y}-${monthStr}`
      const weeksCount = calcMonthWeeksCount(y, m - 1)
      const height = calcMonthHeight(weeksCount, rowHeight, headerHeight)
      const top = currentTop
      const end = currentTop + height

      const meta: MonthMeta = {
        date,
        year: y,
        month: m,
        key,
        monthText: formatMonthTitle(date, monthFormatter),
        weeksCount,
        height,
        top,
        end,
      }

      metas.push(meta)
      metaMap[key] = meta
      currentTop = end
    }
  }

  return { metas, metaMap, totalHeight: currentTop }
}

/**
 * 按需生成单个月份的详细单元格数据（滑动窗口虚拟化专用）
 * 仅在月份进入可视视口或预热缓冲区时动态构建其星期与天数对象，离开时即可被 GC 回收
 *
 * @param meta 月份轻量元数据
 * @param minDate 最小可选日期限制
 * @param maxDate 最大可选日期限制
 * @param formatter 日期单元格格式化模板，默认 'YYYY-MM-DD'
 * @param signs 标记点数据映射表
 * @param todayStr 今日日期的字符串表示，用于高亮今日标识
 * @returns 包含完整矩阵单元格的 MonthType 对象
 */
export function generateSingleMonthData(
  meta: MonthMeta,
  minDate?: DateType,
  maxDate?: DateType,
  formatter = 'YYYY-MM-DD',
  signs: { [key: string]: SignType } = {},
  todayStr = utils.dayjs().format('YYYY-MM-DD')
): MonthType {
  const date = meta.date
  const year = meta.year
  const month = meta.month
  const daysCount = getMonthDays(year, month - 1)
  const firstDay = date.startOf('month').day()

  const monthData: MonthType = {
    date,
    monthText: meta.monthText,
    key: meta.key,
    month,
    weeks: [],
  }

  let day = 1
  for (let w = 0; w < meta.weeksCount; w++) {
    const week: WeekType[] = []
    for (let d = 0; d < 7; d++) {
      let _day: string | number = ''
      if ((w === 0 && d < firstDay) || day > daysCount) {
        _day = ''
      } else {
        _day = day++
      }

      const key = _day ? utils.dayjs(`${meta.key}-${_day}`).format(formatter) : Math.random()
      let disabled = !_day
      if (_day) {
        const keyDate = utils.dayjs(key)
        disabled = Boolean(
          (minDate && keyDate.isBefore(utils.dayjs(minDate), 'day')) ||
          (maxDate && keyDate.isAfter(utils.dayjs(maxDate), 'day'))
        )
      }

      const daySigns = _day && signs && signs[key]
        ? signs[key].slice(0, 3).map((item) => ({
            ...item,
            key: Math.random(),
          }))
        : null

      week.push({
        dayText: _day,
        key,
        disabled,
        weekend: d === 0 || d === 6,
        today: Boolean(_day && todayStr === key),
        date: _day ? key : null,
        signs: daySigns,
      })
    }
    monthData.weeks.push(week)
  }

  return monthData
}

/**
 * 获取日历数据（兼容原有全量接口）
 * 供单测或非虚拟化静态场景调用
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
  const { metas } = generateMonthMetas(
    minDate,
    maxDate,
    defaultDate,
    monthCount,
    viewStart,
    viewEnd,
    monthFormatter,
    false,
    10,
    63,
    40
  )
  const today = utils.dayjs().format('YYYY-MM-DD')
  const monthDatas = metas.map((m) => generateSingleMonthData(m, minDate, maxDate, formatter, signs, today))
  return { monthDatas, weekTexts: '日一二三四五六'.split('') }
}

/**
 * 格式化时间为指定模板字符串
 * @param date 日期对象或时间戳
 * @param formatter 格式化字符串模板，默认 'YYYY-MM-DD'
 */
export function formatDate(date: DateType, formatter = 'YYYY-MM-DD') {
  return utils.dayjs(date).format(formatter)
}
