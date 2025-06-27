// index.ts - Sensors主入口文件TypeScript版本
/*
 * @Date: 2022-10-28 10:30:10
 * @File: Sensors主入口文件
 */

/**
 * SensorsData uni-app SDK
 * APP原生SDK所有API -> JS可用的所有API -> 各端通用的有限的桥API
 * APP SDK(所有) -> JS 写的 SDK(所有) -> uni-app Bridge SDK(有限)
 */

import type { SensorsInstance, BridgeAPI, CommonAPI, TrackProperties } from './types';
import commonAPI from './common-api';

// 动态导入平台特定的bridgeAPI
let bridgeAPI: BridgeAPI | undefined;

// #ifdef APP-PLUS
// @ts-ignore - 条件编译导入
import appBridge from './middle/app';
bridgeAPI = appBridge;
// #endif

// #ifdef H5
// @ts-ignore - 条件编译导入
import webBridge from './middle/web';
bridgeAPI = webBridge;
// #endif

// #ifdef MP-WEIXIN
// @ts-ignore - 条件编译导入
import weixinBridge from './middle/weixin';
bridgeAPI = weixinBridge;
// #endif

// #ifdef MP-ALIPAY
// @ts-ignore - 条件编译导入
import alipayBridge from './middle/alipay';
bridgeAPI = alipayBridge;
// #endif

// #ifdef MP-BAIDU
// @ts-ignore - 条件编译导入
import baiduBridge from './middle/baidu';
bridgeAPI = baiduBridge;
// #endif

// #ifdef MP-TOUTIAO
// @ts-ignore - 条件编译导入
import toutiaoBridge from './middle/toutiao';
bridgeAPI = toutiaoBridge;
// #endif

import get_enableVue3MpClick from './vue3-mpclick';

let sa: SensorsInstance = {} as SensorsInstance;

let lib_plugin_track_timer: number = 0;
const js_uniapp_version: string = 'js_uniapp:0.0.1';

// 检查是否是支持的平台，如果不支持就使用commonAPI
if (typeof bridgeAPI === 'undefined') {
    console.error('uni-app SDK 不支持当前平台,数据不会发送');
    sa = commonAPI;
} else {
    sa = bridgeAPI;

    /*
  做一次common-api的遍历
    如果bridgeAPI都实现了，就结束
    如果bridgeAPI没有实现，从instance中获取，如果还没有就=common-api
  */
    (Object.keys(commonAPI) as Array<keyof CommonAPI>).forEach(key => {
        if (!(key in bridgeAPI!)) {
            if (typeof bridgeAPI!.instance === 'object' && bridgeAPI!.instance !== null && typeof bridgeAPI!.instance[key] === 'function') {
                (sa as any)[key] = bridgeAPI!.instance[key].bind(bridgeAPI!.instance);
            } else {
                (sa as any)[key] = (commonAPI as any)[key].bind(commonAPI);
            }
        }

        // 如果是track，先加属性
        if (key === 'track') {
            const oldTrack = sa.track;
            sa.track = function (eventName: string, properties?: TrackProperties): void {
                const arr: [string, TrackProperties?] = [eventName, properties];

                if (++lib_plugin_track_timer === 1) {
                    if (typeof arr[1] === 'object' && arr[1] !== null) {
                        arr[1]['$lib_plugin_version'] = [js_uniapp_version];
                    } else {
                        arr[1] = {
                            $lib_plugin_version: [js_uniapp_version],
                        };
                    }
                }

                return oldTrack.call(sa, arr[0], arr[1]);
            };
        }
    });
}

// Vue3小程序点击支持
const enableVue3MpClick = get_enableVue3MpClick(sa);

// #ifdef VUE3
enableVue3MpClick();
// #endif

export default sa;
export { enableVue3MpClick };
