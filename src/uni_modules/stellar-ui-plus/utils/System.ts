// 模块级缓存，所有实例共享，App 生命周期内只调用一次系统 API
// 定义 WindowInfo 类型，包含 getWindowInfo 和 getSystemInfoSync 返回的共同字段
interface WindowInfo {
    pixelRatio: number;
    safeArea: {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
    };
    safeAreaInsets?: { bottom: number };
    screenHeight: number;
    screenTop?: number;
    screenWidth: number;
    statusBarHeight: number;
    windowHeight: number;
    windowWidth: number;
    [key: string]: any;
}

let _cachedWindowInfo: WindowInfo | null = null;

export default class System {
    /**
     * 获取设备设置
     */
    static getSystemSetting() {
        // #ifdef MP-WEIXIN
        return wx.getSystemSetting();
        // #endif

        // #ifndef MP-WEIXIN
        return uni.getSystemInfoSync();
        // #endif
    }

    /**
     * 获取微信APP授权设置
     */
    static getAppAuthorizeSetting() {
        // #ifdef MP-WEIXIN
        return wx.getAppAuthorizeSetting();
        // #endif

        // #ifndef MP-WEIXIN
        return uni.getSystemInfoSync();
        // #endif
    }

    /**
     * 获取设备基础信息
     */
    static getDeviceInfo() {
        // #ifdef MP-WEIXIN
        return wx.getDeviceInfo();
        // #endif

        // #ifndef MP-WEIXIN
        return uni.getSystemInfoSync();
        // #endif
    }

    /**
     * 获取窗口信息（结果已缓存，同一 App 生命周期内只调用一次系统 API）
     */
    static getWindowInfo() {
        if (_cachedWindowInfo) return _cachedWindowInfo;

        // 测试环境判断
        if (process.env.NODE_ENV == 'test' || process.env.UNI_APP_NAME == 'stellar-debug') {
            let windowInfo: WindowInfo = {
                pixelRatio: 3,
                safeArea: {
                    bottom: 778,
                    height: 731,
                    left: 0,
                    right: 375,
                    top: 47,
                    width: 375,
                },
                safeAreaInsets: { bottom: 34 },
                screenHeight: 812,
                screenTop: 82,
                screenWidth: 375,
                statusBarHeight: 47,
                windowHeight: 730,
                windowWidth: 375,
            };
            windowInfo.safeAreaInsets = {
                bottom: windowInfo.screenHeight - windowInfo.safeArea.bottom,
            };
            _cachedWindowInfo = windowInfo;
            return _cachedWindowInfo;
        }

        // #ifdef MP-WEIXIN
        let windowInfo: WindowInfo = wx.getWindowInfo();
        windowInfo.safeAreaInsets = {
            bottom: (windowInfo?.screenHeight ?? 812) - (windowInfo?.safeArea?.bottom ?? 778),
        };
        _cachedWindowInfo = windowInfo;
        return _cachedWindowInfo;
        // #endif

        // #ifndef MP-WEIXIN
        _cachedWindowInfo = uni.getSystemInfoSync() as WindowInfo;
        return _cachedWindowInfo;
        // #endif
    }

    /**
     * 清除窗口信息缓存（屏幕旋转或窗口尺寸变化时调用）
     */
    static clearWindowInfoCache() {
        _cachedWindowInfo = null;
    }

    /**
     * 获取微信APP基础信息
     */
    static getAppBaseInfo() {
        // #ifdef MP-WEIXIN
        return wx.getAppBaseInfo();
        // #endif

        // #ifndef MP-WEIXIN
        return uni.getSystemInfoSync();
        // #endif
    }

    /**
     * 获取屏幕宽度
     */
    static getWindowWidth() {
        return System.getWindowInfo()?.windowWidth ?? 375;
    }

    /**
     * 获取屏幕高度
     */
    static getWindowHeight() {
        return System.getWindowInfo()?.windowHeight ?? 730;
    }

    /**
     * 获取手机顶部安全区域距离顶部的距离（状态栏高度）
     */
    static getStatusBarHeight() {
        return System.getWindowInfo()?.statusBarHeight ?? 47;
    }

    /**
     * 获取导航栏底部安全区域距离底部的距离（底部安全区距离状态栏的距离）
     */
    static getNavbarBottom() {
        // #ifdef H5 || APP
        return 44;
        // #endif
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
        return menuButtonInfo.bottom + 8;
    }

    static getElementBoundary(el: UniApp.NodeInfo) {
        const vw = System.getWindowWidth(); // 计算vw单位
        const vh = System.getWindowHeight(); // 计算vh单位
        const { top = 0, left = 0, bottom = 0, right = 0 } = el;
        return {
            top,
            left,
            bottom: vh - bottom,
            right: vw - right,
        };
    }
}
