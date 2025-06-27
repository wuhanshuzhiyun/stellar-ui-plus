// middle/web.ts - H5平台桥接器TypeScript版本
import type { BridgeAPI, SensorsConfig, TrackProperties, ProfileProperties } from '../types';

// 声明全局window对象上的神策相关属性
declare global {
    interface Window {
        sensors?: any;
        sensorsDataAnalytic201505?: any;
        sa?: any;
    }
}

// 动态导入web版本的神策SDK
let sensors: any;

// 尝试获取已加载的神策SDK实例
if (typeof window !== 'undefined') {
    sensors = window.sensors || window.sensorsDataAnalytic201505 || window.sa;
}

// 如果没有找到SDK实例，尝试动态加载
if (!sensors && typeof window !== 'undefined') {
    try {
        // 这里可以动态加载神策web SDK
        // 或者从已经加载的脚本中获取
        console.warn('神策Web SDK未找到，请确保已正确加载');
    } catch (error) {
        console.error('加载神策Web SDK失败:', error);
    }
}

// Web平台适配器
const sa: BridgeAPI = {
    // 提供扩展性
    instance: sensors,

    // 初始化方法
    init: function (para: SensorsConfig): void {
        if (!sensors) {
            console.error('神策Web SDK未加载');
            return;
        }

        try {
            // 调用web SDK的初始化方法
            if (typeof sensors.init === 'function') {
                sensors.init(para);
            } else if (typeof sensors.quick === 'function') {
                // 快速初始化方式
                sensors.quick('init', para);
            }

            // 设置全局属性
            if (para.global_properties && typeof para.global_properties === 'object') {
                this.register(para.global_properties);
            }
        } catch (error) {
            console.error('神策Web SDK初始化失败:', error);
        }
    },

    setPara: function (para: SensorsConfig): void {
        if (!sensors) {
            console.error('神策Web SDK未加载');
            return;
        }

        try {
            if (typeof sensors.setPara === 'function') {
                sensors.setPara(para);
            }

            // 设置全局属性
            if (para.global_properties && typeof para.global_properties === 'object') {
                this.register(para.global_properties);
            }
        } catch (error) {
            console.error('神策Web SDK参数设置失败:', error);
        }
    },

    // 用户标识
    getDistinctID: function (): string {
        if (!sensors || typeof sensors.store?.getDistinctId !== 'function') {
            console.warn('神策Web SDK getDistinctId方法不可用');
            return '';
        }

        try {
            return sensors.store.getDistinctId() || '';
        } catch (error) {
            console.error('获取distinctId失败:', error);
            return '';
        }
    },

    identify: function (distinctId: string, isLogin?: boolean): void {
        if (!sensors || typeof sensors.identify !== 'function') {
            console.warn('神策Web SDK identify方法不可用');
            return;
        }

        try {
            sensors.identify(distinctId, isLogin);
        } catch (error) {
            console.error('identify调用失败:', error);
        }
    },

    login: function (loginId: string): void {
        if (!sensors || typeof sensors.login !== 'function') {
            console.warn('神策Web SDK login方法不可用');
            return;
        }

        try {
            sensors.login(loginId);
        } catch (error) {
            console.error('login调用失败:', error);
        }
    },

    logout: function (): void {
        if (!sensors || typeof sensors.logout !== 'function') {
            console.warn('神策Web SDK logout方法不可用');
            return;
        }

        try {
            sensors.logout();
        } catch (error) {
            console.error('logout调用失败:', error);
        }
    },

    // 事件追踪
    track: function (eventName: string, properties?: TrackProperties): void {
        if (!sensors || typeof sensors.track !== 'function') {
            console.warn('神策Web SDK track方法不可用');
            return;
        }

        try {
            sensors.track(eventName, properties || {});
        } catch (error) {
            console.error('track调用失败:', error);
        }
    },

    // 公共属性管理
    register: function (properties: Record<string, any>): void {
        if (!sensors || typeof sensors.register !== 'function') {
            console.warn('神策Web SDK register方法不可用');
            return;
        }

        try {
            sensors.register(properties);
        } catch (error) {
            console.error('register调用失败:', error);
        }
    },

    unRegister: function (propertyName: string): void {
        if (!sensors) {
            console.warn('神策Web SDK不可用');
            return;
        }

        try {
            if (typeof sensors.unregister === 'function') {
                sensors.unregister(propertyName);
            } else {
                console.warn('当前Web SDK版本不支持unregister方法');
            }
        } catch (error) {
            console.error('unRegister调用失败:', error);
        }
    },

    clearRegister: function (): void {
        if (!sensors) {
            console.warn('神策Web SDK不可用');
            return;
        }

        try {
            if (typeof sensors.clearAllRegister === 'function') {
                sensors.clearAllRegister();
            } else {
                console.warn('当前Web SDK版本不支持clearAllRegister方法');
            }
        } catch (error) {
            console.error('clearRegister调用失败:', error);
        }
    },

    // 用户属性设置
    setProfile: function (properties: ProfileProperties): void {
        if (!sensors || typeof sensors.setProfile !== 'function') {
            console.warn('神策Web SDK setProfile方法不可用');
            return;
        }

        try {
            sensors.setProfile(properties);
        } catch (error) {
            console.error('setProfile调用失败:', error);
        }
    },

    setOnceProfile: function (properties: ProfileProperties): void {
        if (!sensors || typeof sensors.setOnceProfile !== 'function') {
            console.warn('神策Web SDK setOnceProfile方法不可用');
            return;
        }

        try {
            sensors.setOnceProfile(properties);
        } catch (error) {
            console.error('setOnceProfile调用失败:', error);
        }
    },

    incrementProfile: function (properties: ProfileProperties): void {
        if (!sensors || typeof sensors.incrementProfile !== 'function') {
            console.warn('神策Web SDK incrementProfile方法不可用');
            return;
        }

        try {
            sensors.incrementProfile(properties);
        } catch (error) {
            console.error('incrementProfile调用失败:', error);
        }
    },

    appendProfile: function (properties: ProfileProperties): void {
        if (!sensors || typeof sensors.appendProfile !== 'function') {
            console.warn('神策Web SDK appendProfile方法不可用');
            return;
        }

        try {
            sensors.appendProfile(properties);
        } catch (error) {
            console.error('appendProfile调用失败:', error);
        }
    },

    unsetProfile: function (propertyName: string | string[]): void {
        if (!sensors || typeof sensors.unsetProfile !== 'function') {
            console.warn('神策Web SDK unsetProfile方法不可用');
            return;
        }

        try {
            sensors.unsetProfile(propertyName);
        } catch (error) {
            console.error('unsetProfile调用失败:', error);
        }
    },

    deleteProfile: function (): void {
        if (!sensors || typeof sensors.deleteProfile !== 'function') {
            console.warn('神策Web SDK deleteProfile方法不可用');
            return;
        }

        try {
            sensors.deleteProfile();
        } catch (error) {
            console.error('deleteProfile调用失败:', error);
        }
    },

    // ID-Mapping 3.0
    bind: function (key: string, value: string): void {
        if (!sensors || typeof sensors.bind !== 'function') {
            console.warn('神策Web SDK bind方法不可用');
            return;
        }

        try {
            sensors.bind(key, value);
        } catch (error) {
            console.error('bind调用失败:', error);
        }
    },

    unbind: function (key: string, value: string): void {
        if (!sensors || typeof sensors.unbind !== 'function') {
            console.warn('神策Web SDK unbind方法不可用');
            return;
        }

        try {
            sensors.unbind(key, value);
        } catch (error) {
            console.error('unbind调用失败:', error);
        }
    },

    loginWithKey: function (key: string, value: string): void {
        if (!sensors || typeof sensors.loginWithKey !== 'function') {
            console.warn('神策Web SDK loginWithKey方法不可用');
            return;
        }

        try {
            sensors.loginWithKey(key, value);
        } catch (error) {
            console.error('loginWithKey调用失败:', error);
        }
    },

    resetAnonymousIdentity: function (): void {
        if (!sensors || typeof sensors.resetAnonymousIdentity !== 'function') {
            console.warn('神策Web SDK resetAnonymousIdentity方法不可用');
            return;
        }

        try {
            sensors.resetAnonymousIdentity();
        } catch (error) {
            console.error('resetAnonymousIdentity调用失败:', error);
        }
    },

    getIdentities: function (): Record<string, any> {
        if (!sensors || typeof sensors.getIdentities !== 'function') {
            console.warn('神策Web SDK getIdentities方法不可用');
            return {};
        }

        try {
            return sensors.getIdentities() || {};
        } catch (error) {
            console.error('getIdentities调用失败:', error);
            return {};
        }
    },

    // 微信小程序专用方法（Web平台不支持）
    bindOpenid: function (): void {
        console.warn('Web平台不支持bindOpenid方法');
    },

    unbindOpenid: function (): void {
        console.warn('Web平台不支持unbindOpenid方法');
    },

    bindUnionid: function (): void {
        console.warn('Web平台不支持bindUnionid方法');
    },

    unbindUnionid: function (): void {
        console.warn('Web平台不支持unbindUnionid方法');
    },
};

export default sa;
