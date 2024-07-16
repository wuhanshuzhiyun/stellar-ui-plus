import dayjs from 'dayjs'
import System from './System.js'

import '../common/index.css'

const utils = {
  System,
  dayjs,
  /**
   * 格式化像素单位为px
   * @param value {Number | String} 像素单位值
   * @param restype {"str" | "num"} 返回值类型
   */
  formatPx(value: number | string | any, restype = 'str') {
    let format = value || 0
    if (format && Number.isNaN(format)) {
      if (/^\d+px$/i.test(format))
        return restype ? Number(format.slice(0, -2)) : format
      else if (/^\d+rpx/i.test(format))
        format = Number(format.slice(0, -3))
      else
        return format
    }
    let px = 0
    if (format !== 0)
      px = (format * System.getWindowWidth()) / 750

    return restype === 'num' ? px : `${px}px`
  },
  /**
   * 分转元
   *@val 传入的分
   *@digits 精度，-1 不使用精度 0 保留0位小数 1 保留1位小数 2保留2位小数
   *@defaultVal 默认值
   *@part 取值部分 0 取全部值 1 取元部分 2取角分部分
   */
  fenToYuan(val: any, digits = -1, defaultVal = '', part = 0) {
    // let part1 = Math.floor(val / 100); // 元部分
    // let part2 = val % 100; // 角分部分
    let newVal: any = ''
    if (val == null || val === '') {
      newVal = defaultVal
    }
    else {
      if (digits === -1)
        newVal = val / 100
      else
        newVal = (val / 100).toFixed(digits)
    }
    newVal = String(newVal)
    // 取全部
    if (part === 0) {
      return newVal
      // 取元部分
    }
    else if (part === 1) {
      return newVal.split('.')[0]
      // 取角分部分
    }
    else if (part === 2) {
      if (newVal.split('.').length > 1)
        return `.${newVal.split('.')[1]}`
      else
        return ''
    }
  },
}

export default utils
