// ste-message-box.ts
export const messageBoxDefaultOptionsKey = 'ste:messageBox';

// 使用页面路由作为唯一标识符
export const getMessageBoxKey = (customKey?: string) => {
    // 获取当前页面栈
    const pages = getCurrentPages();
    // 获取当前页面
    const currentPage = pages.length > 0 ? pages[pages.length - 1] : null;
    // 获取页面路由
    const pageRoute = currentPage ? currentPage.route : 'unknown';

    // 生成基础key
    const key = `${messageBoxDefaultOptionsKey}:${pageRoute}`;

    // 如果提供了自定义key，则附加到基础key后面
    return customKey ? `${key}:${customKey}` : key;
};
