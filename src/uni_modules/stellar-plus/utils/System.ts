export default class System {
  /**
   * 获取屏幕宽度
   */
  static getWindowWidth() {
    return uni.getSystemInfoSync().windowWidth
  }

  /**
   * 获取屏幕高度
   */
  static getWindowHeight() {
    return uni.getSystemInfoSync().windowHeight
  }

  /**
   * 获取手机顶部安全区域距离顶部的距离（状态栏高度）
   */
  static getStatusBarHeight() {
    return uni.getSystemInfoSync().statusBarHeight
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
