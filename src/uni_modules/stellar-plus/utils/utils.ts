import * as dayjs from 'dayjs'
import System from './System.js'

import '../common/index.css'

type ReturnBasedOnBool<T extends boolean> = T extends true ? UniApp.NodeInfo[] : UniApp.NodeInfo

type PartType = 0 | 1 | 2

type RestType = 'str' | 'num'

const utils = {
  System,
  dayjs,
  isNaN(value: number | string | null | undefined): boolean {
    const deg = /^-?\d+(\.\d+)?$/i
    return !deg.test(String(value))
  },
  /**
   * 格式化像素单位为px
   * @param value {Number | String} 像素单位值
   * @param restype {"str" | "num"} 返回值类型
   */
  formatPx(value: number | string, restype: RestType = 'str') {
    let format = value || 0
    if (typeof format === 'string' && utils.isNaN(format)) {
      if (/^\d+px$/i.test(format))
        return restype === 'num' ? Number(format.slice(0, -2)) : format
      else if (/^\d+rpx/i.test(format))
        format = format.slice(0, -3)
      else return format
    }
    let px = 0
    if (format !== 0)
      px = (Number(format) * System.getWindowWidth()) / 750
    return restype === 'num' ? px : `${px}px`
  },
  /**
   * 分转元
   *@val 传入的分
   *@digits 精度，-1 不使用精度 0 保留0位小数 1 保留1位小数 2保留2位小数
   *@defaultVal 默认值
   *@part 取值部分 0 取全部值 1 取元部分 2取角分部分
   */
  fenToYuan(val: any, digits: number = -1, defaultVal: string = '', part: PartType = 0): string | undefined {
    // let part1 = Math.floor(val / 100); // 元部分
    // let part2 = val % 100; // 角分部分
    let newVal: any = ''
    if (val == null || val === '') {
      newVal = defaultVal
    }
    else {
      if (digits === -1)
        newVal = val / 100
      else newVal = (val / 100).toFixed(digits)
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
      else return ''
    }
  },
  /**
   * 对象深度合并
   * 用source上的数据覆盖掉target上的数据，返回target
   */
  deepMerge(target: { [key: string]: any }, source: { [key: string]: any }) {
    // 遍历 source 的所有属性
    for (const prop in source) {
      // 判断是否为自身属性
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        // 判断属性是否为对象，如果是则递归合并
        if (typeof source[prop] === 'object' && !Array.isArray(source[prop]) && source[prop] !== null) {
          // 如果 target 对应的属性不是对象，则新建一个空对象
          if (typeof target[prop] !== 'object' || target[prop] === null)
            target[prop] = {}

          this.deepMerge(target[prop], source[prop])
        }
        else {
          // 如果属性不是对象，直接赋值
          target[prop] = source[prop]
        }
      }
    }
    return target
  },
  /**
   * 背景值转样式
   * @param {string} value
   */
  bg2style(value: string) {
    const result = {} as any
    const colorReg = /^(\#|rgba?)/i
    const colorsReg = /^linear\-gradient/i
    const imgReg = /^(https?\:\/\/|data\:image\/)/i
    if (colorReg.test(value)) {
      // 纯色
      result.backgroundColor = value
    }
    else if (colorsReg.test(value)) {
      // 渐变色
      result.backgroundImage = value
    }
    else if (imgReg.test(value)) {
      // 图片
      result.backgroundImage = `url(${value})`
    }
    else {
      // 其他原生值
      result.background = value
    }
    return result
  },
  /**
   * 全局唯一标识符
   * @param {number} len uuid的长度
   * @param {boolean} firstU 将返回的首字母置为"u
   */
  guid(len = 32, firstU = true) {
    let str = firstU ? 'u' : ''
    for (let i = str.length; i < len; i++) str += Math.floor(Math.random() * 32).toString(32)
    return str
  },
  querySelector<T extends boolean>(
    selectors: string,
    component: globalThis.ComponentPublicInstance,
    all?: T,
  ): Promise<ReturnBasedOnBool<T>> {
    return new Promise((resolve, reject) => {
      try {
        const query = uni.createSelectorQuery().in(component)
        const func = all ? query.selectAll : query.select
        func(selectors)
          .boundingClientRect((data) => {
            resolve(data as ReturnBasedOnBool<T>)
          })
          .exec()
      }
      catch (e) {
        reject(e)
      }
    })
  },
  /**
   * 兼容css中的单位
   * 如果值为数字，则拼接 'rpx'，否则直接返回字符串的值
   * @param {number} val 数值
   */
  addUnit(val: string | number) {
    val = String(val)
    let newVal
    if (this.isNumber(val))
      newVal = `${val}rpx`
    else newVal = val

    // #ifdef H5
    if (newVal && newVal.includes('rpx'))
      newVal = this.formatPx(newVal)

    // #endif
    return newVal
  },
  /**
   * 字符串是否为数字
   *@value 要判断的字符串
   */
  isNumber(value: string) {
    return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value)
  },
}

export default utils
