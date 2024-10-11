export default class System {
  /**
   * 获取设备设置
   */
  static getSystemSetting() {
    // #ifdef MP-WEIXIN
    return wx.getSystemSetting()
    // #endif

    // #ifndef MP-WEIXIN
    return uni.getSystemInfoSync()
    // #endif
  }

  /**
   * 获取微信APP授权设置
   */
  static getAppAuthorizeSetting() {
    // #ifdef MP-WEIXIN
    return wx.getAppAuthorizeSetting()
    // #endif

    // #ifndef MP-WEIXIN
    return uni.getSystemInfoSync()
    // #endif
  }

  /**
   * 获取设备基础信息
   */
  static getDeviceInfo() {
    // #ifdef MP-WEIXIN
    return wx.getDeviceInfo()
    // #endif

    // #ifndef MP-WEIXIN
    return uni.getSystemInfoSync()
    // #endif
  }

  /**
   * 获取窗口信息
   */
  static getWindowInfo() {
    // #ifdef MP-WEIXIN
    return wx.getWindowInfo()
    // #endif

    // #ifndef MP-WEIXIN
    return uni.getSystemInfoSync()
    // #endif
  }

  /**
   * 获取微信APP基础信息
   */
  static getAppBaseInfo() {
    // #ifdef MP-WEIXIN
    return wx.getAppBaseInfo()
    // #endif

    // #ifndef MP-WEIXIN
    return uni.getSystemInfoSync()
    // #endif
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

  static getElementBoundary(el: UniApp.NodeInfo) {
    const vw = System.getWindowWidth() // 计算vw单位
    const vh = System.getWindowHeight() // 计算vh单位
    const { top = 0, left = 0, bottom = 0, right = 0 } = el
    return {
      top,
      left,
      bottom: vh - bottom,
      right: vw - right,
    }
  }
}
