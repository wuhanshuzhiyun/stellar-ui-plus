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

export function download(data: ClientData, options: DownloadOptions): any {
    const { success, error, downloadSuccess, onProgressUpdate } = options;

    if (!data.updateFile) {
        const errorMsg = '更新文件地址不能为空';
        uni.showToast({ title: errorMsg, icon: 'none' });
        error?.(new Error(errorMsg));
        throw new Error(errorMsg);
    }

    const package_type = data.package_type;

    // #ifdef APP-PLUS
    let timeout: ReturnType<typeof setTimeout>;

    const task = plus.downloader.createDownload(
        data.updateFile,
        {
            filename: '_downloads/stellar_update/',
        },
        (download, status) => {
            clearTimeout(timeout);

            if (status === 200) {
                if (!download.filename) {
                    const errorMsg = '下载文件路径为空';
                    uni.showToast({ title: errorMsg, icon: 'none' });
                    error?.(new Error(errorMsg));
                    return;
                }

                downloadSuccess?.(download.filename);

                plus.runtime.install(
                    download.filename,
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
                const errorMsg = `下载失败，状态码：${status}`;
                uni.showToast({ title: errorMsg, icon: 'none' });
                error?.(new Error(errorMsg));
            }
        }
    );

    task.addEventListener('statechanged', (download: any) => {
        if (download.state === 3 && download.totalSize > 0) {
            const progress = Math.round((download.downloadedSize / download.totalSize) * 100);
            onProgressUpdate?.({
                progress,
                totalBytesWritten: download.downloadedSize,
                totalBytesExpectedToWrite: download.totalSize,
            } as UniApp.OnProgressDownloadResult);

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                task.abort();
                const errorMsg = '下载超时，请检查网络连接';
                uni.showToast({ title: errorMsg, icon: 'none' });
                error?.(new Error(errorMsg));
            }, 300000);
        }

        if (download.state === 4 || download.state === -1) {
            clearTimeout(timeout);
        }
    });

    timeout = setTimeout(() => {
        task.abort();
        const errorMsg = '下载超时，请检查网络连接';
        uni.showToast({ title: errorMsg, icon: 'none' });
        error?.(new Error(errorMsg));
    }, 300000);

    task.start();
    return task;
    // #endif

    // #ifndef APP-PLUS
    let timeoutFallback: ReturnType<typeof setTimeout>;

    const downloadTask = uni.downloadFile({
        url: data.updateFile,
        success: res => {
            clearTimeout(timeoutFallback);

            if (res.statusCode === 200) {
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
        fail: err => {
            clearTimeout(timeoutFallback);
            const errorMsg = `网络请求失败：${err.errMsg || '未知错误'}`;
            uni.showToast({ title: errorMsg, icon: 'none' });
            error?.(err);
        },
    });

    downloadTask.onProgressUpdate(res => {
        if (res.progress >= 0 && res.progress <= 100) {
            onProgressUpdate?.(res);
        }

        clearTimeout(timeoutFallback);
        timeoutFallback = setTimeout(() => {
            downloadTask.abort();
            const errorMsg = '下载超时，请检查网络连接';
            uni.showToast({ title: errorMsg, icon: 'none' });
            error?.(new Error(errorMsg));
        }, 300000);
    });

    timeoutFallback = setTimeout(() => {
        downloadTask.abort();
        const errorMsg = '下载超时，请检查网络连接';
        uni.showToast({ title: errorMsg, icon: 'none' });
        error?.(new Error(errorMsg));
    }, 300000);

    return downloadTask;
    // #endif
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

export interface DownloadState {
    versionCode: string;
    updateFile: string;
    startTime: number;
}

const DOWNLOAD_STATE_KEY = 'app_update_download_state';
export const DOWNLOAD_TIMEOUT = 30 * 60 * 1000;

export const saveDownloadState = (state: DownloadState): void => {
    try {
        uni.setStorageSync(DOWNLOAD_STATE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('保存下载状态失败:', e);
    }
};

export const getDownloadState = (): DownloadState | null => {
    try {
        const stored = uni.getStorageSync(DOWNLOAD_STATE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('读取下载状态失败:', e);
    }
    return null;
};

export const clearDownloadState = (): void => {
    try {
        uni.removeStorageSync(DOWNLOAD_STATE_KEY);
    } catch (e) {
        console.warn('清除下载状态失败:', e);
    }
};

export const isDownloadStateExpired = (state: DownloadState): boolean => {
    return Date.now() - state.startTime > DOWNLOAD_TIMEOUT;
};

export interface ExistingDownloadTask {
    task: any;
    state: number;
    filename: string;
}

export const findExistingDownloadTask = (url: string): Promise<ExistingDownloadTask | null> => {
    return new Promise(resolve => {
        // #ifdef APP-PLUS
        plus.downloader.enumerate((tasks: any[]) => {
            if (!tasks || !tasks.length) {
                resolve(null);
                return;
            }
            for (let i = tasks.length - 1; i >= 0; i--) {
                const task = tasks[i];
                if (task.url === url) {
                    if (task.state === 0 || task.state === 1 || task.state === 2 || task.state === 3 || task.state === 4) {
                        resolve({ task, state: task.state, filename: task.filename || '' });
                        return;
                    }
                    if (task.state === -1) {
                        try {
                            task.abort();
                        } catch (_) {}
                    }
                    break;
                }
            }
            // #endif
            resolve(null);
            // #ifdef APP-PLUS
        });
        // #endif

        // #ifndef APP-PLUS
        resolve(null);
        // #endif
    });
};
