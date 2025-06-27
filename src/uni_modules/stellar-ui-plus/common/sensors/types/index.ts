// types/index.ts - Sensors TypeScript类型定义文件

export interface SensorsConfig {
    server_url?: string;
    is_send?: boolean;
    white_list?: string[];
    is_mui?: boolean;
    autoTrack?: boolean;
    global_properties?: Record<string, any>;
    app_js_bridge?: {
        is_send?: boolean;
        white_list?: string[];
        is_mui?: boolean;
    };
    heatmap?: {
        collect_tags?: { div?: boolean };
        track_attr?: string[];
    };
    use_app_track?: boolean | string;
    use_app_track_is_send?: boolean;
}

export interface TrackProperties {
    [key: string]: any;
    $lib_plugin_version?: string[];
}

export interface ProfileProperties {
    [key: string]: any;
}

export interface BridgeInfo {
    touch_app_bridge: boolean;
    verify_success: string;
    platform: string;
    support_two_way_call?: boolean;
}

export interface SensorsInstance {
    // 核心API
    init: (config: SensorsConfig) => void;
    setPara: (config: SensorsConfig) => void;
    track: (eventName: string, properties?: TrackProperties) => void;

    // 用户身份
    identify: (distinctId: string, isLogin?: boolean) => void;
    login: (loginId: string) => void;
    logout: () => void;
    resetAnonymousIdentity: () => void;

    // ID-Mapping 3.0
    bind: (key: string, value: string) => void;
    unbind: (key: string, value: string) => void;
    loginWithKey: (key: string, value: string) => void;
    getIdentities: () => Record<string, any>;

    // 用户属性
    setProfile: (properties: ProfileProperties) => void;
    setOnceProfile: (properties: ProfileProperties) => void;
    incrementProfile: (properties: ProfileProperties) => void;
    appendProfile: (properties: ProfileProperties) => void;
    unsetProfile: (propertyName: string | string[]) => void;
    deleteProfile: () => void;

    // 公共属性
    register: (properties: Record<string, any>) => void;
    unRegister: (propertyName: string) => void;
    clearRegister: () => void;

    // 获取信息
    getDistinctID: () => string;
    getSuperProperties?: () => Record<string, any>;

    // APP专用方法
    getAppFlushInterval?: () => number;
    getAppFlushBulkSize?: () => number;
    getAppSessionIntervalTime?: () => number;
    trackAppInstall?: () => void;
    appFlush?: () => void;

    // 微信小程序专用
    bindOpenid?: (openid: string) => void;
    unbindOpenid?: (openid: string) => void;
    bindUnionid?: (unionid: string) => void;
    unbindUnionid?: (unionid: string) => void;

    // 扩展属性
    instance?: any;
}

export interface BridgeAPI extends SensorsInstance {
    instance?: any;
}

export interface CommonAPI extends SensorsInstance {}

// 平台类型
export type Platform = 'APP-PLUS' | 'H5' | 'MP-WEIXIN' | 'MP-ALIPAY' | 'MP-BAIDU' | 'MP-TOUTIAO' | 'MP-JD' | 'MP-KUAISHOU' | 'MP-QQ' | 'MP-LARK';

// Vue3相关类型
export interface Vue3ComponentInstance {
    $scope?: any;
    [key: string]: any;
}

export interface Vue3RenderContext {
    $scope?: any;
    [key: string]: any;
}

export interface Vue3SetupFunction {
    (props: any, context: any): any;
}

export interface Vue3RenderFunction {
    (ctx: Vue3RenderContext, cache: any, props?: any, setup?: any, data?: any, options?: any): any;
}

export interface PlatformOptions {
    render?: Vue3RenderFunction;
    setup?: Vue3SetupFunction;
    [key: string]: any;
}

// 神策原生插件类型
export interface SensorsNativePlugin {
    initSDK: (config: SensorsConfig) => void;
    flush: () => void;
    track: (eventName: string, properties?: TrackProperties) => void;
    identify: (distinctId: string) => void;
    login: (loginId: string) => void;
    logout: () => void;

    // Profile相关
    profileSet: (properties: ProfileProperties) => void;
    profileSetOnce: (properties: ProfileProperties) => void;
    profileIncrement: (properties: ProfileProperties) => void;
    profileAppend: (properties: ProfileProperties) => void;
    profileUnset: (propertyName: string | string[]) => void;
    profileDelete: () => void;

    // 公共属性相关
    registerSuperProperties: (properties: Record<string, any>) => void;
    unregisterSuperProperty: (propertyName: string) => void;
    clearSuperProperties: () => void;
    getSuperProperties: () => Record<string, any>;

    // APP专用
    getFlushInterval: () => number;
    getFlushBulkSize: () => number;
    getSessionIntervalTime: () => number;
    trackAppInstall: () => void;
    clearTrackTimer: () => void;
    resumeTrackScreenOrientation: () => void;
    stopTrackScreenOrientation: () => void;
    getScreenOrientation: () => string;

    [key: string]: any;
}
