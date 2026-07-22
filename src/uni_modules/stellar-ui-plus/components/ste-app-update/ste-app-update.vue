<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue';
import propsData from './props';
import { type ClientData, type ResponseData, download as downloadMethod, getAppId, getDeviceId, getPlatform, getVersion, saveDownloadState, getDownloadState, clearDownloadState, isDownloadStateExpired, findExistingDownloadTask } from './method';

// 类型定义
interface AppUpdateData extends ClientData {
    content: string;
    updateFile: string;
    isForce: boolean;
    package_type: number;
    name: string;
    code: string;
}

const props = defineProps(propsData);

const data = reactive<AppUpdateData>({
    content: '',
    updateFile: '',
    isForce: false,
    package_type: 0,
    name: '1.0.1',
    code: '100',
});

const open = ref(false);
const version = ref(uni.getSystemInfoSync().version);
const percent = ref(0);
const updateBtn = ref(true);
const downloadedSize = ref('0');
const packageFileSize = ref('0');
const tempFilePath = ref('');

// 资源管理
let timeoutTimer: ReturnType<typeof setTimeout> | null = null;
let downloadTask: any = null;
let nativeDownloadTask: any = null;
let nativeDownloadListener: ((download: any) => void) | null = null;
let progressPollTimer: ReturnType<typeof setInterval> | null = null;

// 跳过版本相关
const skippedVersions = ref<string[]>([]);
const STORAGE_KEY = 'skipped_app_versions';

// 兜底更新相关

// 兜底检查接口返回类型
interface FallbackCheckResponse {
    code: number;
    message: string;
    data: {
        title: string;
        description: string;
        downloadUrl: string;
    } | null;
}

const emits = defineEmits<{
    (e: 'cancel'): void;
    (e: 'update'): void;
    (e: 'no-update'): void;
    (e: 'skip-version', version: string): void;
    (e: 'fallback', data: { title: string; description: string; downloadUrl: string }): void;
}>();

// 初始化跳过版本列表
const initSkippedVersions = () => {
    try {
        const stored = uni.getStorageSync(STORAGE_KEY);
        if (stored) {
            skippedVersions.value = JSON.parse(stored);
        }
    } catch (error) {
        console.warn('读取跳过版本记录失败:', error);
        skippedVersions.value = [];
    }
};

// 保存跳过版本记录
const saveSkippedVersions = () => {
    try {
        uni.setStorageSync(STORAGE_KEY, JSON.stringify(skippedVersions.value));
    } catch (error) {
        console.warn('保存跳过版本记录失败:', error);
    }
};

// 检查是否已跳过该版本
const isVersionSkipped = (versionCode: string) => {
    return skippedVersions.value.includes(versionCode);
};

const compareVersions = (newVersion: string, currentVersion: string): number => {
    const newParts = newVersion.split('.').map(v => parseInt(v) || 0);
    const currentParts = currentVersion.split('.').map(v => parseInt(v) || 0);
    const maxLength = Math.max(newParts.length, currentParts.length);

    for (let i = 0; i < maxLength; i++) {
        const newPart = newParts[i] || 0;
        const currentPart = currentParts[i] || 0;
        if (newPart > currentPart) return 1;
        if (newPart < currentPart) return -1;
    }
    return 0;
};

// 跳过当前版本
const skipVersion = () => {
    if (!data.code) return;
    // 添加到跳过列表
    if (!skippedVersions.value.includes(data.code)) {
        skippedVersions.value.push(data.code);
        saveSkippedVersions();
    }

    // 关闭更新弹窗
    close();
    emits('skip-version', data.code);
};

// 清理函数
const stopProgressPolling = () => {
    if (progressPollTimer) {
        clearInterval(progressPollTimer);
        progressPollTimer = null;
    }
};

const cleanup = () => {
    if (timeoutTimer) {
        clearTimeout(timeoutTimer);
        timeoutTimer = null;
    }
    stopProgressPolling();
    // #ifdef APP-PLUS
    if (nativeDownloadTask && nativeDownloadListener) {
        try {
            nativeDownloadTask.removeEventListener('statechanged', nativeDownloadListener);
        } catch (_) { }
    }
    // #endif
    downloadTask = null;
    nativeDownloadTask = null;
    nativeDownloadListener = null;
};

// 组件卸载时清理资源
onUnmounted(() => {
    cleanup();
});

const getData = async (callback?: (resVersion: { name: string; code: string; updateFile: string }, version: string) => void) => {
    // 参数验证
    if (!props.apiUrl) {
        console.error('API地址不能为空');
        emits('no-update');
        return;
    }

    uni.request({
        url: props.apiUrl,
        method: 'GET',
        header: {
            Authorization: `Basic ${btoa(props.clientId + ':' + props.clientSecret)}`,
        },
        success: async (res: any) => {
            try {
                const _data: {
                    code: number;
                    success: boolean;
                    msg: string;
                    data: ResponseData;
                } = res.data;

                if (_data.code == 200 && _data.data) {
                    // 数据验证
                    if (!_data.data.code || !_data.data.name) {
                        console.warn('返回数据缺少必要字段');
                        emits('no-update');
                        return;
                    }

                    const responseData = _data.data;
                    data.code = responseData.code;
                    data.name = responseData.name;
                    data.content = (responseData.desc || '').replace(/\n+/g, '<br />');
                    data.isForce = !!responseData.isForce;
                    data.updateFile = responseData.entireFile ? responseData.entireFile : responseData.updateFile;
                    data.package_type = responseData.entireFile ? 0 : 1;

                    // strictVersionCheck 为 true 时，优先检查是否需要先升级到最近一次全量包
                    const lastAllDetail = responseData.lastAllDetail;
                    if (props.strictVersionCheck && lastAllDetail && lastAllDetail.entireFile && lastAllDetail.name && lastAllDetail.code) {
                        let allName = lastAllDetail.name;
                        if (props.appType) {
                            const nvs = allName.split('.');
                            const nevn = nvs[nvs.length - 1];
                            if (props.appType === nevn) {
                                nvs.splice(nvs.length - 1);
                                allName = nvs.join('.');
                            }
                        }
                        if (compareVersions(allName, version.value) > 0) {
                            data.code = lastAllDetail.code;
                            data.name = lastAllDetail.name;
                            data.content = (lastAllDetail.desc || '').replace(/\n+/g, '<br />');
                            data.isForce = !!lastAllDetail.isForce;
                            data.updateFile = lastAllDetail.entireFile;
                            data.package_type = 0;
                        }
                    }

                    // 检查是否已跳过该版本
                    if (isVersionSkipped(data.code)) {
                        console.log(`版本 ${data.code} 已被跳过`);
                        emits('no-update');
                        return;
                    }

                    callback &&
                        callback(
                            {
                                code: data.code,
                                name: data.name,
                                updateFile: data.updateFile,
                            },
                            version.value
                        );

                    if (props.appType) {
                        const nvs = data.name.split('.');
                        const nevn = nvs[nvs.length - 1];
                        if (props.appType !== nevn) {
                            uni.showModal({
                                title: '提示',
                                content: `新版本环境：${nevn}和当前环境${props.appType}不一致`,
                                showCancel: false,
                            });
                            return;
                        }
                        nvs.splice(nvs.length - 1);
                        data.name = nvs.join('.');
                    }

                    const shouldUpdate = props.strictVersionCheck
                        ? compareVersions(data.code, version.value) > 0
                        : data.code !== version.value;

                    if (data.updateFile && shouldUpdate) {
                        const downloadState = getDownloadState();
                        const hasValidDownloadState = downloadState
                            && downloadState.versionCode === data.code
                            && downloadState.updateFile === data.updateFile
                            && !isDownloadStateExpired(downloadState);

                        if (hasValidDownloadState) {
                            const existing = await findExistingDownloadTask(data.updateFile);

                            if (existing) {
                                open.value = true;
                                emits('update');
                                if (existing.state === 0 || existing.state === 1 || existing.state === 2 || existing.state === 3) {
                                    updateBtn.value = false;
                                    resumeDownloadProgress(existing.task);
                                } else if (existing.state === 4) {
                                    updateBtn.value = false;
                                    tempFilePath.value = existing.filename;
                                    if (data.package_type === 1 && existing.filename) {
                                        installWgt(existing.filename);
                                    }
                                }
                                return;
                            }
                        }

                        if (downloadState) {
                            clearDownloadState();
                        }

                        open.value = true;
                        emits('update');
                        if (data.isForce) confirm();
                        return;
                    }
                } else {
                    console.log(_data.msg || '获取版本信息失败');
                }
                emits('no-update');
            } catch (error) {
                console.error('数据解析错误:', error);
                emits('no-update');
            }
        },
        fail: (err: any) => {
            console.error('网络请求失败:', err);
            uni.showToast({
                title: '网络请求失败，请检查网络连接',
                icon: 'none',
            });
            emits('no-update');
        },
    });
};

// 兜底检查：上报版本 + 检查是否命中兜底配置
const checkFallback = (): Promise<boolean> => {
    return new Promise(resolve => {
        if (!props.fallbackApiUrl) {
            resolve(false);
            return;
        }
        const data = {
            appId: getAppId(), // 优先用配置的 appId（业务包名），fallback 到系统 appid
            deviceId: getDeviceId(),
            versionCode: parseInt(version.value) || 0,
            versionName: version.value, // 版本名称，兜底触发的主要依据
            platform: getPlatform(),
        };

        uni.request({
            url: props.fallbackApiUrl,
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            data,
            timeout: 1000,
            success: (res: any) => {
                try {
                    const resp = res.data as FallbackCheckResponse;
                    // 明确返回 data 且有 downloadUrl 才触发兜底
                    if (resp && resp.code === 0 && resp.data && resp.data.downloadUrl) {
                        emits('fallback', resp.data);
                        uni.showModal({
                            title: resp.data.title || '发现新版本',
                            content: resp.data.description || '当前版本可能存在兼容性问题，建议您前往浏览器下载最新版本。',
                            confirmText: '前往下载',
                            showCancel: true,
                            cancelText: '暂不更新',
                            success: modalRes => {
                                if (modalRes.confirm) {
                                    // #ifdef APP-PLUS
                                    plus.runtime.openURL(resp.data!.downloadUrl);
                                    // #endif
                                    // #ifndef H5
                                    window.open(resp.data!.downloadUrl, '_blank');
                                    // #endif
                                }
                            },
                        });
                        resolve(true);
                        return;
                    }
                } catch (e) {
                    console.warn('兜底检查响应解析失败:', e);
                }
                // 接口失败或未命中兜底 → 走正常更新流程
                resolve(false);
            },
            fail: () => {
                // 接口失败 → 降级走正常更新流程
                resolve(false);
            },
        });
    });
};

const start = async (callback?: (resVersion: { name: string; code: string; updateFile: string }, version: string) => void) => {
    // 初始化跳过版本记录
    initSkippedVersions();

    const v = await getVersion(props.appVersion);
    if (v) version.value = v;
    // #ifdef APP-PLUS
    // 兜底检查：如果配置了 fallbackApiUrl，先调兜底接口
    const hit = await checkFallback();
    if (hit) return; // 命中兜底，不继续正常流程
    // #endif
    // 正常更新流程
    getData(callback);
};

const onProgressUpdate = (res: UniApp.OnProgressDownloadResult) => {
    // 添加边界检查
    if (res.progress >= 0 && res.progress <= 100) {
        percent.value = res.progress;
        downloadedSize.value = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
        packageFileSize.value = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
    }
};

const resumeDownloadProgress = (task: any) => {
    // #ifdef APP-PLUS
    if (nativeDownloadTask && nativeDownloadListener) {
        nativeDownloadTask.removeEventListener('statechanged', nativeDownloadListener);
    }
    stopProgressPolling();

    nativeDownloadTask = task;

    const updateProgress = () => {
        if (task.downloadedSize !== undefined && task.totalSize > 0) {
            percent.value = Math.round((task.downloadedSize / task.totalSize) * 100);
            downloadedSize.value = (task.downloadedSize / Math.pow(1024, 2)).toFixed(2);
            packageFileSize.value = (task.totalSize / Math.pow(1024, 2)).toFixed(2);
        }
    };
    updateProgress();

    nativeDownloadListener = (download: any) => {
        if (download.state === 4) {
            stopProgressPolling();
            percent.value = 100;
            downloadedSize.value = packageFileSize.value;
            tempFilePath.value = download.filename;
            if (open.value && data.package_type === 1 && download.filename) {
                installWgt(download.filename);
            }
        } else if (download.state === -1) {
            stopProgressPolling();
            updateBtn.value = true;
            clearDownloadState();
            cleanup();
        }
    };

    task.addEventListener('statechanged', nativeDownloadListener);

    if (task.state === 3) {
        progressPollTimer = setInterval(updateProgress, 500);
        try {
            task.start();
        } catch (e) {
            console.warn('尝试重启下载任务:', e);
        }
    }

    if (task.state === 0 || task.state === 1 || task.state === 2) {
        task.start();
    }
    // #endif
};

const installWgt = (filePath: string) => {
    // #ifdef APP-PLUS
    plus.runtime.install(
        filePath,
        { force: true },
        () => {
            uni.showModal({
                title: '提示',
                content: '升级成功，请重新启动！',
                confirmText: '确定',
                showCancel: false,
                success: () => {
                    clearDownloadState();
                    plus.runtime.restart();
                },
            });
        },
        e => {
            uni.showModal({
                title: '安装失败',
                content: e.message || '安装过程中出现错误',
                showCancel: false,
            });
        }
    );
    // #endif
};

const confirm = async () => {
    cleanup();

    if (!data.updateFile) {
        uni.showToast({ title: '更新文件地址不能为空', icon: 'none' });
        return;
    }

    // #ifdef APP-PLUS
    const stale = await findExistingDownloadTask(data.updateFile);
    if (stale) {
        try { stale.task.abort(); } catch (_) { }
    }
    // #endif

    saveDownloadState({
        versionCode: data.code,
        updateFile: data.updateFile,
        startTime: Date.now(),
    });

    if (data.package_type == 0) {
        if (data.updateFile.includes('.apk')) {
            updateBtn.value = false;
            downloadTask = downloadMethod(data, {
                onProgressUpdate,
                downloadSuccess: path => (tempFilePath.value = path),
                error: () => {
                    updateBtn.value = true;
                    clearDownloadState();
                    cleanup();
                },
                success: () => {
                    clearDownloadState();
                    cleanup();
                },
            });
        } else {
            plus.runtime.openURL(data.updateFile);
            uni.navigateBack({
                delta: 1,
            });
        }
    } else {
        updateBtn.value = false;
        downloadTask = downloadMethod(data, {
            onProgressUpdate,
            downloadSuccess: path => (tempFilePath.value = path),
            error: () => {
                updateBtn.value = true;
                clearDownloadState();
                cleanup();
            },
            success: () => {
                clearDownloadState();
                cleanup();
            },
        });
    }
};

function close() {
    cleanup();
    open.value = false;
    emits('cancel');
}

const install = () => {
    if (!tempFilePath.value) {
        uni.showToast({ title: '安装文件不存在', icon: 'none' });
        return;
    }

    plus.runtime.install(
        tempFilePath.value,
        { force: true },
        () => {
            clearDownloadState();
            if (data.package_type == 1) {
                uni.showModal({
                    title: '提示',
                    content: '升级成功，请重新启动！',
                    confirmText: '确定',
                    showCancel: false,
                    success: () => {
                        plus.runtime.restart();
                    },
                });
            }
        },
        e => {
            uni.showModal({
                title: '安装失败',
                content: e.message || '安装过程中出现错误',
                showCancel: false,
            });
        }
    );
};

// 添加取消下载功能
const cancelDownload = () => {
    uni.showModal({
        title: '确认取消',
        content: '确定要取消下载吗？',
        success: res => {
            if (res.confirm) {
                if (downloadTask) {
                    try { downloadTask.abort(); } catch (_) { }
                }
                clearDownloadState();
                cleanup();
                updateBtn.value = true;
                percent.value = 0;
                downloadedSize.value = '0';
                packageFileSize.value = '0';
                tempFilePath.value = '';
                uni.showToast({ title: '已取消下载', icon: 'none' });
            }
        },
    });
};

defineExpose({
    start,
    getSkippedVersions: () => [...skippedVersions.value], // 获取跳过版本列表
    clearSkippedVersions: () => {
        skippedVersions.value = [];
        saveSkippedVersions();
    }, // 清空跳过版本记录
});
</script>

<template>
    <view class="update-mask flex-center" :style="{ zIndex }" v-if="open">
        <view class="update-content">
            <image class="update-image" src="../../static/app_update_img.png"></image>

            <view class="update-title">发现新版本</view>
            <view class="update-version">v{{ data.name }}</view>

            <scroll-view scroll-y class="update-desc">
                <view class="update-desc-title">更新内容</view>
                <view class="update-desc-message">
                    <rich-text :nodes="data.content"></rich-text>
                </view>
            </scroll-view>

            <view class="update-footer">
                <view class="update-progress-box" v-if="!updateBtn">
                    <view class="progress-container">
                        <progress class="update-progress" border-radius="35" :percent="percent" activeColor="#3DA7FF"
                            backgroundColor="#f0f0f0" show-info stroke-width="12" />
                        <view class="progress-text">{{ percent }}%</view>
                    </view>

                    <view class="download-info">
                        <text class="update-down-msg" v-if="tempFilePath">
                            <text class="success-icon">✓</text>
                            下载完成，准备安装...
                        </text>
                        <text class="update-down-msg" v-else>正在下载，请稍后 ({{ downloadedSize }}/{{ packageFileSize
                            }}MB)</text>
                    </view>

                    <button v-if="!tempFilePath && !data.isForce" class="cancel-download-btn"
                        @click="cancelDownload">取消下载</button>
                </view>

                <template v-if="updateBtn">
                    <button class="update-button primary" plain @click="confirm">
                        {{ btnText }}
                    </button>

                    <!-- 跳过版本按钮 -->
                    <button v-if="!data.isForce" class="update-button skip" plain @click="skipVersion">跳过此版本</button>
                </template>

                <button class="update-button secondary" plain @click="install"
                    v-else-if="data.package_type === 0 && tempFilePath">立即安装</button>
            </view>

            <view class="update-close" v-if="!data.isForce" @click.stop="close">✖</view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.update-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;

    .update-content {
        width: 694rpx;
        background-color: #fff;
        border-radius: 16rpx;
        padding: 72rpx 40rpx 40rpx 40rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 1.5;
        position: relative;

        .update-image {
            width: 201rpx;
            height: 201rpx;
        }

        .update-title {
            margin-top: 28rpx;
            font-weight: 500;
            font-size: 48rpx;
            color: #000000;
        }

        .update-version {
            font-weight: 400;
            font-size: 34rpx;
            color: #a7abb0;
        }

        .update-desc {
            width: 100%;
            max-height: 350rpx;
            margin-top: 24rpx;

            .update-desc-title {
                font-weight: 500;
                font-size: 32rpx;
                color: #000000;
            }

            .update-desc-message {
                font-weight: 400;
                font-size: 28rpx;
                color: #555a61;
            }
        }

        .update-footer {
            width: 100%;
            margin-top: 48rpx;

            .update-progress-box {
                text-align: center;

                .progress-container {
                    position: relative;
                    margin: 20rpx 0;

                    .progress-text {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 24rpx;
                        color: #3da7ff;
                        font-weight: 500;
                    }
                }

                .download-info {
                    margin: 20rpx 0;
                    font-weight: 400;
                    font-size: 34rpx;
                    color: #a7abb0;

                    .success-icon {
                        color: #4caf50;
                        font-weight: bold;
                        margin-right: 8rpx;
                    }
                }

                .cancel-download-btn {
                    width: 100%;
                    height: 72rpx;
                    line-height: 72rpx;
                    background: #f5f5f5;
                    border: 2rpx solid #ddd;
                    border-radius: 12rpx;
                    color: #666;
                    font-size: 28rpx;
                    margin-top: 20rpx;
                }
            }

            .update-button {
                width: 100%;
                height: 96rpx;
                line-height: 88rpx;
                border-radius: 16rpx;
                border: 4rpx solid;
                font-weight: 500;
                font-size: 32rpx;
                margin-bottom: 20rpx;

                &.primary {
                    background: #1388f7;
                    border-color: #1388f7;
                    color: #ffffff;
                }

                &.secondary {
                    background: #4caf50;
                    border-color: #4caf50;
                    color: #ffffff;
                }

                &.skip {
                    background: #f5f5f5;
                    border-color: #ddd;
                    color: #666;
                }
            }
        }

        .update-close {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 30rpx;
            color: #555a61;
            width: 104rpx;
            height: 96rpx;
            line-height: 96rpx;
            text-align: center;
        }
    }
}
</style>
