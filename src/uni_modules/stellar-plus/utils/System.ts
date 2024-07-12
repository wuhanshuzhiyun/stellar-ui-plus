export default class System {
  static systemInfo = uni.getSystemInfoSync()
  static navbarBottom: number
  static windowWidth: number
  static windowHeight: number

  /**
   * 获取屏幕宽度
   */
  static getWindowWidth() {
    if (System.windowWidth === undefined)
      System.windowWidth = System.systemInfo.windowWidth

    return System.windowWidth
  }

  /**
   * 获取屏幕高度
   */
  static getWindowHeight() {
    if (System.windowHeight === undefined)
      System.windowHeight = System.systemInfo.windowHeight

    return System.windowHeight
  }

  /**
   * 获取手机顶部安全区域距离顶部的距离（状态栏高度）
   */
  static getStatusBarHeight() {
    return System.systemInfo.statusBarHeight
  }

  /**
   * 获取导航栏底部安全区域距离底部的距离（底部安全区距离状态栏的距离）
   */
  static getNavbarBottom() {
    if (System.navbarBottom === undefined) {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
      System.navbarBottom = menuButtonInfo.bottom + 8
    }
    return System.navbarBottom
  }

  static getElementBoundary(el: any) {
    const vw = System.getWindowWidth() // 计算vw单位
    const vh = System.getWindowHeight() // 计算vh单位
    return { top: el.top, left: el.left, bottom: vh - el.bottom, right: vw - el.right }
  }
}
