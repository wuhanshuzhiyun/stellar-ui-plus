export interface ResponseData {
    id: number;
    createUser: number;
    createDept: number;
    createTime: string;
    updateUser: number;
    updateTime: string;
    status: number;
    isDeleted: number;
    tenantId: string;
    inteClientId: number;
    code: string;
    name: string;
    desc: string;
    content: string;
    updateFile: string;
    entireFile: string;
    isCurrent: true;
    isForce: true;
    publishStatus: 'TO_RELEASE' | 'RELEASED';
    createUserName: string;
    updateUserName: string;
    createDeptName: string;
}

export interface ClientData {
    content: string;
    updateFile: string;
    isForce: boolean;
    package_type: number;
    name: string;
    code: string;
}

interface DownloadOptions {
    success?: () => void;
    error?: (e: any) => void;
    downloadSuccess?: (tempFilePath: string) => void;
    onProgressUpdate?: (res: UniApp.OnProgressDownloadResult) => void;
}

export function download(
    data: ClientData,
    options: DownloadOptions
): UniApp.DownloadTask {
    const { success, error, downloadSuccess, onProgressUpdate } = options;

    // 参数验证
    if (!data.updateFile) {
        const errorMsg = '更新文件地址不能为空';
        uni.showToast({ title: errorMsg, icon: 'none' });
        error?.(new Error(errorMsg));
        throw new Error(errorMsg);
    }

    const package_type = data.package_type;
    let timeout: ReturnType<typeof setTimeout>;

    const downloadTask = uni.downloadFile({
        url: data.updateFile,
        success: res => {
            clearTimeout(timeout);

            if (res.statusCode === 200) {
                // 文件完整性检查
                if (!res.tempFilePath) {
                    const errorMsg = '下载文件路径为空';
                    uni.showToast({ title: errorMsg, icon: 'none' });
                    error?.(new Error(errorMsg));
                    return;
                }

                downloadSuccess?.(res.tempFilePath);

                plus.runtime.install(
                    res.tempFilePath,
                    { force: true },
                    () => {
                        if (package_type == 1) {
                            uni.showModal({
                                title: '提示',
                                content: '升级成功，请重新启动！',
                                confirmText: '确定',
                                showCancel: false,
                                success: () => {
                                    success?.();
                                    plus.runtime.restart();
                                },
                            });
                        } else {
                            // 整包升级时，执行到此处更新并未完成，只是弹出了安装提示，无法获悉用户是否安装了更新包，若是在此处清除资源，会导致升级包被删除，后续流程无法继续执行
                            success?.();
                        }
                    },
                    e => {
                        const errorMsg = e.message || '安装失败';
                        uni.showModal({
                            title: '提示',
                            content: errorMsg,
                            showCancel: false,
                            success: () => {
                                error?.(e);
                            },
                        });
                    }
                );
            } else {
                const errorMsg = `下载失败，状态码：${res.statusCode}`;
                uni.showToast({ title: errorMsg, icon: 'none' });
                error?.(new Error(errorMsg));
            }
        },
        fail: (err) => {
            clearTimeout(timeout);
            const errorMsg = `网络请求失败：${err.errMsg || '未知错误'}`;
            uni.showToast({ title: errorMsg, icon: 'none' });
            error?.(err);
        }
    });

    // 下载进度监控
    downloadTask.onProgressUpdate(res => {
        // 添加进度验证
        if (res.progress >= 0 && res.progress <= 100) {
            onProgressUpdate?.(res);
        }

        // 重置超时计时器
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            downloadTask.abort();
            const errorMsg = '下载超时，请检查网络连接';
            uni.showToast({ title: errorMsg, icon: 'none' });
            error?.(new Error(errorMsg));
        }, 300000); // 5分钟超时
    });

    // 初始超时设置
    timeout = setTimeout(() => {
        downloadTask.abort();
        const errorMsg = '下载超时，请检查网络连接';
        uni.showToast({ title: errorMsg, icon: 'none' });
        error?.(new Error(errorMsg));
    }, 300000);

    return downloadTask;
}

// 获取设备唯一标识
export const getDeviceId = (): string => {
    // #ifdef APP-PLUS
    return plus.device.uuid || '';
    // #endif
    // #ifndef APP-PLUS
    return '';
    // #endif
};

// 获取当前平台
export const getPlatform = (): string => {
    // #ifdef APP-PLUS
    return plus.os.name?.toLowerCase() || 'android';
    // #endif
    // #ifndef APP-PLUS
    return 'unknown';
    // #endif
};

// 获取APPID
export const getAppId = (): string => {
    // #ifdef APP-PLUS
    return plus.runtime.appid || '';
    // #endif
    // #ifndef APP-PLUS
    return '';
    // #endif
};

// 获取当前版本号
export const getVersion = (appVersion: string): Promise<string> => {
    return new Promise(resolve => {
        if (appVersion) {
            resolve(appVersion);
        } else {
            plus.runtime.getProperty(plus.runtime.appid || '', inf => {
                resolve(inf.version || '');
            });
        }
    });
};