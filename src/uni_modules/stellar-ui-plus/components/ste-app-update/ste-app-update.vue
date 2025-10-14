<script setup lang="ts">
import { ref, reactive } from 'vue';
import propsData from './props';
import { type ClientData, type ResponseData, download } from './method';

const props = defineProps(propsData);

const data = reactive<ClientData>({
    content: '',
    updateFile: '', //安装包
    isForce: false, //是否强制更新 0代表否 1代表是
    package_type: 0, //0 是整包升级 1是wgt升级
    name: '1.0.1', // 版本名称
    code: '100', // 版本号
});

const open = ref(false);
const version = ref(uni.getSystemInfoSync().version);
const percent = ref(0);
const updateBtn = ref(true);
const downloadedSize = ref('0');
const packageFileSize = ref('0');
const tempFilePath = ref('');

const emits = defineEmits<{
    (e: 'cancel'): void;
    (e: 'update'): void;
    (e: 'no-update'): void;
}>();

const getData = (callback?: (resVersion: { name: string; code: string; updateFile: string }, version: string) => void) => {
    uni.request({
        url: props.apiUrl,
        method: 'GET',
        header: {
            Authorization: `Basic ${btoa(props.clientId + ':' + props.clientSecret)}`,
        },
        success: (res: any) => {
            const _data: {
                code: number;
                success: boolean;
                msg: string;
                data: ResponseData;
            } = res.data;
            if (_data.code == 200) {
                data.code = _data.data.code;
                data.name = _data.data.name;

                data.content = (_data.data.desc || '').replace(/\n+/g, '<br />');

                data.isForce = _data.data.isForce;
                data.updateFile = _data.data.entireFile ? _data.data.entireFile : _data.data.updateFile;
                data.package_type = _data.data.entireFile ? 0 : 1;
                callback && callback({ code: _data.data.code, name: _data.data.name, updateFile: data.updateFile }, version.value);
                if (props.appType) {
                    const nvs = data.name.split('.');
                    // 版本号的最后一位是环境，比较版本号最后一位版本号是否一致，不一致弹错误窗口提示
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
                if (data.updateFile && data.code !== version.value) {
                    open.value = true;
                    emits('update');
                    // 如果是强制更新，直接开始下载
                    if (data.isForce) confirm();
                    return;
                }
            } else {
                console.log(_data.msg);
            }
            // 无需升级
            emits('no-update');
        },
        fail: (err: any) => {
            console.log('err===========', err);
            emits('no-update');
        },
    });
};

const start = (callback?: (resVersion: { name: string; code: string; updateFile: string }, version: string) => void) => {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid || '', inf => {
        version.value = inf.version || '';
        getData(callback);
    });
    // #endif
    // #ifndef APP-PLUS
    getData(callback);
    // #endif
};

const onProgressUpdate = (res: UniApp.OnProgressDownloadResult) => {
    percent.value = res.progress;
    downloadedSize.value = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
    packageFileSize.value = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
};
const confirm = () => {
    if (data.package_type == 0) {
        //apk整包升级 下载地址必须以.apk结尾
        if (data.updateFile.includes('.apk')) {
            updateBtn.value = false;
            download(data, {
                onProgressUpdate,
                downloadSuccess: path => (tempFilePath.value = path),
            });
        } else {
            //外部下载 一般是手机应用市场或者其他h5页面
            plus.runtime.openURL(data.updateFile);
            uni.navigateBack({
                delta: 1,
            });
        }
    } else {
        updateBtn.value = false;
        //wgt资源包升级 下载地址必须以.wgt结尾
        download(data, { onProgressUpdate, downloadSuccess: path => (tempFilePath.value = path) });
    }
};

function close() {
    open.value = false;
    emits('cancel');
}

const install = () => {
    plus.runtime.install(
        tempFilePath.value,
        { force: true },
        () => {
            // wgt升级
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
            //提示部分wgt包无法安装的问题
            uni.showModal({
                title: '提示',
                content: e.message,
                showCancel: false,
                success: () => {},
            });
        }
    );
};

defineExpose({
    start,
});
</script>
<template>
    <view class="update-mask flex-center" v-if="open">
        <view class="update-content">
            <image class="update-image" src="../../static/app_update_img.png"></image>

            <view class="update-title">发现新版本</view>
            <view class="update-version">v{{ data.name }}</view>
            <scroll-view scroll-y class="update-desc">
                <view class="update-desc-title">更新内容</view>
                <view class="update-desc-message"><rich-text :nodes="data.content"></rich-text></view>
            </scroll-view>
            <view class="update-footer">
                <view class="update-progress-box" v-if="!updateBtn">
                    <progress class="update-progress" border-radius="35" :percent="percent" activeColor="#3DA7FF" show-info stroke-width="10" />
                    <view>
                        <text class="update-down-msg" v-if="tempFilePath">下载完成</text>
                        <text class="update-down-msg" v-else>正在下载，请稍后 ({{ downloadedSize }}/{{ packageFileSize }}M)</text>
                    </view>
                </view>
                <button class="update-button" plain @click="confirm" v-if="updateBtn">{{ btnText }}</button>
                <button class="update-button" plain @click="install" v-else-if="data.package_type === 0 && tempFilePath">安装</button>
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
    z-index: 9999;
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
                font-weight: 400;
                font-size: 34rpx;
                color: #a7abb0;
            }
            .update-button {
                width: 100%;
                height: 96rpx;
                line-height: 88rpx;
                background: #1388f7;
                border-radius: 16rpx;
                border: 4rpx solid #1388f7;
                font-weight: 500;
                font-size: 32rpx;
                color: #ffffff;
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
