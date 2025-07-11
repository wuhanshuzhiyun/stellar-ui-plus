import { unref } from 'vue';
export function initDebugTool() {
    if (process.env.NODE_ENV === 'development') {
        const stellarDebugRegistry = new Map<string, Record<string, any>>();
        (globalThis as any).stellarDebugRegistry = stellarDebugRegistry;

        const execFunName = '$vs';

        const printInfo = () => {
            const pages = getCurrentPages();
            if (!pages.length) {
                console.warn('[StellarUI Debug] 未找到当前页面。');
                return;
            }
            const currentPage = pages[pages.length - 1];
            const route = currentPage.route;
            const data = stellarDebugRegistry.get(route || '');

            if (!data) {
                console.warn(`[StellarUI Debug] 页面 ${route} 没有注册任何调试变量。`);
                return;
            }

            const output: Record<string, any> = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    output[key] = unref(data[key]);
                }
            }

            console.log(`%c[StellarUI Debug] 当前页面: ${route}`, 'color: #409EFF; font-weight: bold;');
            console.table(output);
            return '';
        };

        // #ifdef MP-WEIXIN
        (wx as any)[execFunName] = printInfo;
        console.log(`%c[StellarUI Debug] 调试工具已挂载。在控制台输入 ${`wx.${execFunName}()`} 查看当前页面变量。`, 'color: #409EFF; font-weight: bold;');
        // #endif

        // #ifdef MP-ALIPAY
        (my as any)[execFunName] = printInfo;
        console.log(`%c[StellarUI Debug] 调试工具已挂载。在控制台输入 ${`my.${execFunName}()`} 查看当前页面变量。`, 'color: #409EFF; font-weight: bold;');
        // #endif

        // #ifdef WEB || H5
        (window as any)[execFunName] = printInfo;
        console.log(`%c[StellarUI Debug] 调试工具已挂载。在控制台输入 ${`${execFunName}()`} 查看当前页面变量。`, 'color: #409EFF; font-weight: bold;');
        // #endif
    }
}
