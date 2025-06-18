/**
 * 异步事件处理控制器
 * @param emitEvent - 发射事件的函数，接收三个回调参数（暂停函数，成功回调函数，失败回调函数），用于暂停、成功和失败处理）
 * @param onSuccess - 成功后的处理函数

 */
export async function asyncEvent(emitEvent: (pauseFn: () => void, resolveFn: (e?: any) => void, rejectFn: (e?: any) => void) => void, onSuccess: () => void) {
    let shouldContinue = true;
    const stopPromise = new Promise((resolve, reject) => {
        emitEvent(
            // 暂停函数
            () => {
                shouldContinue = false;
            },
            // 成功回调
            result => {
                resolve(result);
            },
            // 失败回调
            error => {
                reject(error);
            }
        );
    });

    // #ifdef MP-TOUTIAO
    await new Promise(resolve => setTimeout(resolve, 50));
    // #endif

    // #ifndef MP-TOUTIAO
    await new Promise(resolve => setTimeout(resolve, 0));
    // #endif

    // 如果被暂停，等待stopPromise完成
    if (!shouldContinue) {
        try {
            await stopPromise;
        } catch (error) {
            // 不执行后续逻辑
            throw error;
        }
    }

    onSuccess();
}
