export default class System {
  /**
   * 获取设备设置
   */
  static getSystemSetting() {
    let res: any = {}
    // #ifdef MP-WEIXIN
    res = wx.getSystemSetting()
    // #endif

    // #ifndef MP-WEIXIN
    res = uni.getSystemInfoSync()
    // #endif
    return res
  }

  /**
   * 获取微信APP授权设置
   */
  static getAppAuthorizeSetting() {
    let res: any = {}
    // #ifdef MP-WEIXIN
    res = wx.getAppAuthorizeSetting()
    // #endif

    // #ifndef MP-WEIXIN
    res = uni.getSystemInfoSync()
    // #endif
    return res
  }

  /**
   * 获取设备基础信息
   */
  static getDeviceInfo() {
    let res: any = {}
    // #ifdef MP-WEIXIN
    res = wx.getDeviceInfo()
    // #endif

    // #ifndef MP-WEIXIN
    res = uni.getSystemInfoSync()
    // #endif
    return res
  }

  /**
   * 获取窗口信息
   */
  static getWindowInfo() {
    let res: any = {}
    // #ifdef MP-WEIXIN
    res = wx.getWindowInfo()
    // #endif

    // #ifndef MP-WEIXIN
    res = uni.getSystemInfoSync()
    // #endif
    return res
  }

  /**
   * 获取微信APP基础信息
   */
  static getAppBaseInfo() {
    let res: any = {}
    // #ifdef MP-WEIXIN
    res = wx.getAppBaseInfo()
    // #endif

    // #ifndef MP-WEIXIN
    res = uni.getSystemInfoSync()
    // #endif
    return res
  }

  /**
   * 获取屏幕宽度
   */
  static getWindowWidth() {
    return System.getWindowInfo().windowWidth
  }

  /**
   * 获取屏幕高度
   */
  static getWindowHeight() {
    return System.getWindowInfo().windowHeight
  }

  /**
   * 获取手机顶部安全区域距离顶部的距离（状态栏高度）
   */
  static getStatusBarHeight() {
    return System.getWindowInfo().statusBarHeight
  }

  /**
   * 获取导航栏底部安全区域距离底部的距离（底部安全区距离状态栏的距离）
   */
  static getNavbarBottom() {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    return menuButtonInfo.bottom + 8
  }

  static getElementBoundary(el: any) {
    const vw = System.getWindowWidth() // 计算vw单位
    const vh = System.getWindowHeight() // 计算vh单位
    return { top: el.top, left: el.left, bottom: vh - el.bottom, right: vw - el.right }
  }
}
