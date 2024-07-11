import config from './config'

const utils = {
  /**
   * 拼接image的src
   * val 图片地址
   * isTheme 是否包含皮肤
   * systemThemeBaseUrl 系统皮肤路径
   */
  joinSrc(val: string, isTheme = false, systemTheme: string = '') {
    if (val === '' || val == null)
      val = '空图片/空图片.png'
    // val = 'none'

    // 如果图片地址包含http https前缀，则不拼接全局图片前缀
    let baseUrl = ''
    systemTheme = systemTheme ?? config.IMAGE_SYSTEM_THENE
    if (/^(data:image|wxfile:)/g.test(val)) {
      return val
    }
    else if (/^(http:|https:)/g.test(val)) {
      return `${val}?${new Date().getTime()}`
    }
    else {
      baseUrl = config.IMAGE_BASE_URL
      baseUrl += isTheme ? systemTheme : config.IMAGE_COMMON
      return `${baseUrl + val}?${new Date().getTime()}`
    }
  },
  /**
   * 拼接background的url，支持 joinUrl('图片.png no-repeat cover/100% 100%')完整写法
   * val 图片地址
   * isTheme 是否包含皮肤
   * systemThemeBaseUrl 系统皮肤路径
   */
  joinUrl(val: string, isTheme = false, systemTheme: string = '') {
    if (val === '' || val == null) {
      // val = '空图片/空图片.png'
      return 'none'
    }
    // 如果图片地址包含http https前缀，则不拼接全局图片前缀
    let baseUrl = ''
    systemTheme = systemTheme ?? config.IMAGE_SYSTEM_THENE
    if (/^(http:|https:)/g.test(val) === false) {
      baseUrl = config.IMAGE_BASE_URL
      baseUrl += isTheme ? systemTheme : config.IMAGE_COMMON
    }

    // 第一个空格后面的内容，拼接到url外面去
    const index = val.indexOf(' ')
    let str = ''
    let url = ''
    let other = ''
    if (index > 0) {
      url = `${val.substr(0, index)}?${new Date().getTime()}`
      other = val.substr(index + 1)
      str = `url('${baseUrl}${url}') ${other}`
    }
    else {
      url = `${val}?${new Date().getTime()}`
      str = `url('${baseUrl}${url}')`
    }
    return str
  },
}

export default utils
