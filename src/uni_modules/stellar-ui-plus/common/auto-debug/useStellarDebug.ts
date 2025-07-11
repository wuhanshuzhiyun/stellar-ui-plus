import { onLoad } from '@dcloudio/uni-app';

/**
 * 手动注册需要调试的变量。
 * 在需要调试的页面的 <script setup> 中调用此函数。
 *
 * @param data 包含需要调试的变量的对象。
 */
export function useStellarDebug(data: Record<string, any>) {
    onLoad(() => {
        if (process.env.NODE_ENV !== 'development') {
            return;
        }

        const pages = getCurrentPages();
        if (!pages.length) return;

        const currentPage = pages[pages.length - 1];
        const route = currentPage.route;

        if (route && (globalThis as any).stellarDebugRegistry) {
            (globalThis as any).stellarDebugRegistry.set(route, data);
            console.log(`%c[StellarUI Debug] 成功为页面 ${route} 手动注册调试变量。`, 'color: #67C23A;');
        }
    });
}
