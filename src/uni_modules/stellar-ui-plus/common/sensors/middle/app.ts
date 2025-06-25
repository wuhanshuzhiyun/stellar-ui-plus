// middle/app.ts - APP平台桥接器TypeScript版本
import type { BridgeAPI, SensorsConfig, SensorsNativePlugin, TrackProperties, ProfileProperties } from '../types';

// 声明uni全局对象
declare const uni: {
    requireNativePlugin: (name: string) => SensorsNativePlugin;
};

// 原生SDK提供的API，直接实现app对应的所有js的api，在这里再做一次bridge的api封装
const sensors: SensorsNativePlugin = uni.requireNativePlugin('Sensorsdata-UniPlugin-App');

let cachePara: Partial<SensorsConfig> = {};
let isInit: boolean = false;

// 工具函数：深度合并对象
function deepMerge(target: any, source: any): any {
    if (!source || typeof source !== 'object') return target;
    if (!target || typeof target !== 'object') return source;

    const result = { ...target };

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                result[key] = deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }

    return result;
}

// 转换为初始化SDK参数
function convertToInitSDKPara(para: Partial<SensorsConfig>): Partial<SensorsConfig> {
    // 这里可以添加参数转换逻辑
    return {
        ...para,
        // 添加默认配置
        is_send: para.is_send !== false,
    };
}

// 初始化后设置参数
function setParaAfterInitSDK(para: Partial<SensorsConfig>): void {
    // 初始化后的参数设置逻辑
    if (para.global_properties && typeof para.global_properties === 'object') {
        sensors.registerSuperProperties(para.global_properties);
    }
}

const sa: BridgeAPI = {
    // 提供扩展性
    instance: sensors,

    setPara: function (para: SensorsConfig): void {
        if (!isInit) {
            cachePara = convertToInitSDKPara(para);
            return;
        }
        // 初始化后，按旧有方式直接调用原生 API 进行设置
        setParaAfterInitSDK(para);
    },

    init: function (para: SensorsConfig): void {
        if (!sensors.initSDK) {
            console.log('原生插件未提供 initSDK 方法。');
            return;
        }
        sensors.initSDK(deepMerge(cachePara, para));
        isInit = true;
    },

    // APP专用的方法
    getAppFlushInterval: sensors.getFlushInterval?.bind(sensors),
    getAppFlushBulkSize: sensors.getFlushBulkSize?.bind(sensors),
    getAppSessionIntervalTime: sensors.getSessionIntervalTime?.bind(sensors),
    trackAppInstall: sensors.trackAppInstall?.bind(sensors),
    appFlush: sensors.flush?.bind(sensors),

    // 公共属性管理
    register: sensors.registerSuperProperties?.bind(sensors),
    unRegister: sensors.unregisterSuperProperty?.bind(sensors),
    clearRegister: sensors.clearSuperProperties?.bind(sensors),

    // 用户属性管理
    setProfile: sensors.profileSet?.bind(sensors),
    setOnceProfile: sensors.profileSetOnce?.bind(sensors),
    incrementProfile: sensors.profileIncrement?.bind(sensors),
    appendProfile: sensors.profileAppend?.bind(sensors),
    unsetProfile: sensors.profileUnset?.bind(sensors),
    deleteProfile: sensors.profileDelete?.bind(sensors),

    // 其他专用方法
    clearTrackTimer: sensors.clearTrackTimer?.bind(sensors),
    resumeTrackScreenOrientation: sensors.resumeTrackScreenOrientation?.bind(sensors),
    stopTrackScreenOrientation: sensors.stopTrackScreenOrientation?.bind(sensors),
    getScreenOrientation: sensors.getScreenOrientation?.bind(sensors),
    getSuperProperties: sensors.getSuperProperties?.bind(sensors),

    // 基础API（这些方法在原始代码中可能不完整，需要补充）
    getDistinctID: (): string => {
        // 这里需要调用原生方法获取distinctId
        console.log('APP平台获取distinctId');
        return '';
    },

    identify: (distinctId: string, isLogin?: boolean): void => {
        if (sensors.identify) {
            sensors.identify(distinctId);
        }
    },

    login: (loginId: string): void => {
        if (sensors.login) {
            sensors.login(loginId);
        }
    },

    logout: (): void => {
        if (sensors.logout) {
            sensors.logout();
        }
    },

    track: (eventName: string, properties?: TrackProperties): void => {
        if (sensors.track) {
            sensors.track(eventName, properties);
        }
    },

    // ID-Mapping 3.0 相关方法（需要检查原生插件是否支持）
    bind: (key: string, value: string): void => {
        console.log('APP平台 bind 方法');
    },

    unbind: (key: string, value: string): void => {
        console.log('APP平台 unbind 方法');
    },

    loginWithKey: (key: string, value: string): void => {
        console.log('APP平台 loginWithKey 方法');
    },

    resetAnonymousIdentity: (): void => {
        console.log('APP平台 resetAnonymousIdentity 方法');
    },

    getIdentities: (): Record<string, any> => {
        console.log('APP平台 getIdentities 方法');
        return {};
    },

    // 微信小程序专用方法（APP平台不支持）
    bindOpenid: (): void => {
        console.log('APP平台不支持 bindOpenid 方法');
    },

    unbindOpenid: (): void => {
        console.log('APP平台不支持 unbindOpenid 方法');
    },

    bindUnionid: (): void => {
        console.log('APP平台不支持 bindUnionid 方法');
    },

    unbindUnionid: (): void => {
        console.log('APP平台不支持 unbindUnionid 方法');
    },
};

export default sa;
