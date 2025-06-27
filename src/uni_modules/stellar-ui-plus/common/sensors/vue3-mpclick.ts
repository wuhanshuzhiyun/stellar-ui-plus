// vue3-mpclick.ts - Vue3小程序点击追踪TypeScript版本
import type { SensorsInstance, Vue3ComponentInstance, Vue3RenderContext, Vue3SetupFunction, Vue3RenderFunction, PlatformOptions } from './types';

interface PlatformSDK {
    createPage?: (options: PlatformOptions) => any;
    createComponent?: (options: PlatformOptions) => any;
}

interface SensorsWithUtils extends SensorsInstance {
    instance?: {
        _?: {
            isFunction: (fn: any) => boolean;
            isObject: (obj: any) => boolean;
        };
    };
}

export default function get_enableVue3MpClick(sensors: SensorsWithUtils) {
    const sa = sensors.instance;
    const _ = sa?._;

    return function enableVue3MpClick(): void {
        // #ifdef VUE3
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-JD || MP-KUAISHOU || MP-QQ || MP-LARK

        let platform: PlatformSDK | undefined;

        // #ifdef MP-WEIXIN
        platform = (globalThis as any).wx;
        // #endif

        // #ifdef MP-BAIDU
        platform = (globalThis as any).swan;
        // #endif

        // #ifdef MP-ALIPAY
        platform = (globalThis as any).my;
        // #endif

        // #ifdef MP-TOUTIAO
        platform = (globalThis as any).tt;
        // #endif

        // #ifdef MP-JD
        platform = (globalThis as any).jd;
        // #endif

        // #ifdef MP-KUAISHOU
        platform = (globalThis as any).ks;
        // #endif

        // #ifdef MP-QQ
        platform = (globalThis as any).qq;
        // #endif

        // #ifdef MP-LARK
        platform = (globalThis as any).tt;
        // #endif

        if (!platform || !_) {
            console.warn('Platform or utility functions not available');
            return;
        }

        // 重写 createPage
        const oldCreatePage = platform.createPage;
        if (_.isFunction(oldCreatePage)) {
            platform.createPage = function (options: PlatformOptions) {
                mutateOptions(options);
                if (oldCreatePage) {
                    return oldCreatePage.call(platform, options);
                }
                return undefined;
            };
        }

        // 重写 createComponent
        const oldCreateComponent = platform.createComponent;
        if (_.isFunction(oldCreateComponent)) {
            platform.createComponent = function (options: PlatformOptions) {
                mutateOptions(options);
                if (oldCreateComponent) {
                    return oldCreateComponent.call(platform, options);
                }
                return undefined;
            };
        }

        function mutateOptions(options: PlatformOptions): void {
            if (!_?.isObject(options)) return;

            // 处理 render 函数
            if (_.isFunction(options.render)) {
                const oldRender = options.render;
                options.render = function (_ctx: Vue3RenderContext, _cache: any, $props?: any, $setup?: any, $data?: any, $options?: any) {
                    const instance: Vue3ComponentInstance | undefined = _ctx?.$scope;
                    let bindingConfig: any;
                    if (typeof oldRender === 'function') {
                        bindingConfig = (oldRender as Vue3RenderFunction).call(options, _ctx, _cache, $props, $setup, $data, $options);
                        addMPClick(instance, bindingConfig);
                    }
                    return bindingConfig;
                };
            }
            // 处理 setup 函数
            else if (_.isFunction(options.setup)) {
                const oldSetup = options.setup as Vue3SetupFunction;
                options.setup = function (_props: any, _defines: any) {
                    const oldRender = oldSetup.call(options, _props, _defines);

                    return function render(_ctx: Vue3RenderContext, _cache: any) {
                        const instance: Vue3ComponentInstance | undefined = _ctx?.$scope;
                        const bindingConfig = oldRender.call(options, _ctx, _cache);
                        addMPClick(instance, bindingConfig);
                        return bindingConfig;
                    };
                };
            }
        }

        function addMPClick(instance: Vue3ComponentInstance | undefined, bindingConfig: any): void {
            if (!instance || !bindingConfig) return;

            try {
                // 这里可以添加具体的点击事件绑定逻辑
                // 根据 bindingConfig 的结构来处理点击事件
                processMPClickEvents(instance, bindingConfig);
            } catch (error) {
                console.error('Error in addMPClick:', error);
            }
        }

        function processMPClickEvents(instance: Vue3ComponentInstance, bindingConfig: any): void {
            // 具体的小程序点击事件处理逻辑
            // 这里需要根据实际的 bindingConfig 结构来实现
            if (bindingConfig && typeof bindingConfig === 'object') {
                // 递归处理配置对象中的事件绑定
                Object.keys(bindingConfig).forEach(key => {
                    const value = bindingConfig[key];
                    if (value && typeof value === 'object') {
                        // 检查是否是事件处理函数
                        if (key.startsWith('on') && typeof value === 'function') {
                            // 包装事件处理函数，添加埋点逻辑
                            bindingConfig[key] = wrapEventHandler(value, instance, key);
                        } else if (Array.isArray(value) || typeof value === 'object') {
                            // 递归处理嵌套对象
                            processMPClickEvents(instance, value);
                        }
                    }
                });
            }
        }

        function wrapEventHandler(originalHandler: Function, instance: Vue3ComponentInstance, eventName: string): Function {
            return function (this: any, ...args: any[]) {
                try {
                    // 执行原始事件处理函数
                    const result = originalHandler.apply(this, args);

                    // 添加埋点逻辑
                    if (eventName === 'onClick' || eventName === 'onTap') {
                        // 这里可以调用 sensors.track 进行埋点
                        if (sensors.track) {
                            sensors.track('$MPClick', {
                                $element_type: 'view',
                                $element_name: eventName,
                                // 可以添加更多上下文信息
                            });
                        }
                    }

                    return result;
                } catch (error) {
                    console.error('Error in wrapped event handler:', error);
                    return originalHandler.apply(this, args);
                }
            };
        }

        // #endif
        // #endif
    };
}
