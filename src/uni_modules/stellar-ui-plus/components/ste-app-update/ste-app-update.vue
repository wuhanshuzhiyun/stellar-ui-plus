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
                data.content = _data.data.content + _data.data.desc;
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
                }
                if (data.updateFile && data.code > version.value) {
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
        <view class="content botton-radius">
            <view class="content-top">
                <view class="content-top-text">
                    <text class="">发现新版本 v{{ data.code }}</text>
                    <text class="version">当前版本：{{ version }}</text>
                </view>
                <image class="content-top" style="top: 0" width="100%" height="100%" src="../../static/bg_top.png"></image>
            </view>
            <view class="content-header"></view>
            <view class="content-body">
                <view class="title"><text>更新内容</text></view>
                <view class="body">
                    <scroll-view class="box-des-scroll" scroll-y><rich-text :nodes="data.content"></rich-text></scroll-view>
                </view>
                <view class="footer">
                    <view class="progress-box flex-column" v-if="!updateBtn">
                        <progress class="progress" border-radius="35" :percent="percent" activeColor="#3DA7FF" show-info stroke-width="10" />
                        <view>
                            <text class="fs24" v-if="tempFilePath">下载完成</text>
                            <text class="fs24" v-else>正在下载，请稍后 ({{ downloadedSize }}/{{ packageFileSize }}M)</text>
                        </view>
                    </view>

                    <button class="content-button" style="border: none; color: #fff" plain @click="confirm" v-if="updateBtn">立即升级</button>
                    <button class="content-button" style="border: none; color: #fff" plain @click="install" v-else-if="data.package_type === 0 && tempFilePath">安装</button>
                </view>
            </view>

            <image v-if="!data.isForce" class="close-img" src="../../static/app_update_close.png" @click.stop="close"></image>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.flex-center {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
}

.update-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 9999;
}

.botton-radius {
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
}

.content {
    position: relative;
    top: 0;
    width: 600rpx;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 50rpx;
    font-family: Source Han Sans CN;
}

.text {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    line-height: 200px;
    text-align: center;
    color: #ffffff;
}

.content-top {
    position: absolute;
    top: -195rpx;
    left: 0;
    width: 600rpx;
    height: 270rpx;
}

.content-top-text {
    font-size: 40rpx;
    font-weight: bold;
    color: #f8f8fa;
    position: absolute;
    top: 120rpx;
    left: 50rpx;
    z-index: 1;
    display: flex;
    flex-direction: column;
}

.content-header {
    height: 70rpx;
}

.title {
    font-size: 33rpx;
    font-weight: bold;
    color: #3da7ff;
    line-height: 38px;
}

.footer {
    min-height: 150rpx;
    padding-bottom: 12rpx;
}

.box-des-scroll {
    box-sizing: border-box;
    padding: 0 40rpx;
    text-align: left;
}

.box-des {
    font-size: 26rpx;
    color: #000000;
    line-height: 50rpx;
}

.progress-box {
    width: 100%;
}

.progress {
    width: 83%;
    height: 40rpx;
    border-radius: 35px;
}

.close-img {
    width: 70rpx;
    height: 70rpx;
    z-index: 1000;
    position: absolute;
    bottom: -120rpx;
    left: calc(50% - 70rpx / 2);
}

.content-button {
    text-align: center;
    flex: 1;
    font-size: 30rpx;
    font-weight: 400;
    color: #ffffff;
    border-radius: 40rpx;
    margin: 0 18rpx;

    height: 80rpx;
    line-height: 80rpx;

    background: linear-gradient(to right, #1785ff, #3da7ff);
}

.flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.fs24 {
    font-size: 24rpx;
}
.version {
    font-size: 24rpx;
    margin-top: 10rpx;
    color: #eeeeee;
    text-decoration: underline;
}
</style>
