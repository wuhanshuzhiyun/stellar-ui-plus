// middle/toutiao.ts - 头条小程序桥接器TypeScript版本
import type { BridgeAPI, SensorsConfig, TrackProperties, ProfileProperties } from '../types';

// 动态导入头条小程序版本的神策SDK
let sensors: any;
let _: any;

try {
    // @ts-ignore - 条件编译导入
    const sensorsModule = require('../jssdk/toutiao.js');
    sensors = sensorsModule.default || sensorsModule;
    _ = sensors?._; // 获取工具函数
} catch (error) {
    console.error('头条小程序神策SDK加载失败:', error);
}

// 头条小程序平台适配器
let isParaSet: boolean = false;

const sa: BridgeAPI = {
    // 提供扩展性
    instance: sensors,

    // 提供初始化和配置参数
    init: function (para: SensorsConfig): void {
        if (!sensors) {
            console.error('头条小程序神策SDK未加载');
            return;
        }

        try {
            if (!isParaSet) {
                this.setPara(para);
            }

            if (typeof sensors.init === 'function') {
                sensors.init(para);
            }

            // 设置全局属性
            if (para && _ && _.isObject && _.isObject(para.global_properties)) {
                this.register(para.global_properties);
            }
        } catch (error) {
            console.error('头条小程序SDK初始化失败:', error);
        }
    },

    setPara: function (para: SensorsConfig): void {
        if (!sensors) {
            console.error('头条小程序神策SDK未加载');
            return;
        }

        try {
            const defaultValue: Partial<SensorsConfig> = {
                autoTrack: false,
                ...para,
            };

            if (typeof sensors.setPara === 'function') {
                sensors.setPara(defaultValue);
            }

            // 设置全局属性
            if (para && _ && _.isObject && _.isObject(para.global_properties)) {
                this.register(para.global_properties);
            }

            isParaSet = true;
        } catch (error) {
            console.error('头条小程序SDK参数设置失败:', error);
        }
    },

    // 用户标识
    getDistinctID: function (): string {
        if (!sensors || !sensors.store || typeof sensors.store.getDistinctId !== 'function') {
            console.warn('头条小程序SDK getDistinctId方法不可用');
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
            console.warn('头条小程序SDK identify方法不可用');
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
            console.warn('头条小程序SDK login方法不可用');
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
            console.warn('头条小程序SDK logout方法不可用');
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
            console.warn('头条小程序SDK track方法不可用');
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
        if (!sensors || typeof sensors.registerApp !== 'function') {
            console.warn('头条小程序SDK registerApp方法不可用');
            return;
        }

        try {
            sensors.registerApp(properties);
        } catch (error) {
            console.error('register调用失败:', error);
        }
    },

    unRegister: function (propertyName: string): void {
        console.warn('头条小程序SDK暂不支持unRegister方法');
    },

    clearRegister: function (): void {
        console.warn('头条小程序SDK暂不支持clearRegister方法');
    },

    // 用户属性设置
    setProfile: function (properties: ProfileProperties): void {
        if (!sensors || typeof sensors.setProfile !== 'function') {
            console.warn('头条小程序SDK setProfile方法不可用');
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
            console.warn('头条小程序SDK setOnceProfile方法不可用');
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
            console.warn('头条小程序SDK incrementProfile方法不可用');
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
            console.warn('头条小程序SDK appendProfile方法不可用');
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
            console.warn('头条小程序SDK unsetProfile方法不可用');
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
            console.warn('头条小程序SDK deleteProfile方法不可用');
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
            console.warn('头条小程序SDK bind方法不可用');
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
            console.warn('头条小程序SDK unbind方法不可用');
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
            console.warn('头条小程序SDK loginWithKey方法不可用');
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
            console.warn('头条小程序SDK resetAnonymousIdentity方法不可用');
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
            console.warn('头条小程序SDK getIdentities方法不可用');
            return {};
        }

        try {
            return sensors.getIdentities() || {};
        } catch (error) {
            console.error('getIdentities调用失败:', error);
            return {};
        }
    },

    // 头条小程序不支持微信专用方法
    bindOpenid: function (): void {
        console.warn('头条小程序不支持bindOpenid方法');
    },

    unbindOpenid: function (): void {
        console.warn('头条小程序不支持unbindOpenid方法');
    },

    bindUnionid: function (): void {
        console.warn('头条小程序不支持bindUnionid方法');
    },

    unbindUnionid: function (): void {
        console.warn('头条小程序不支持unbindUnionid方法');
    },
};

export default sa;
