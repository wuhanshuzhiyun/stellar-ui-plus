<script setup lang="ts">
import { onPageShow, onPageHide } from '@dcloudio/uni-app';
import { ref, toRef, computed, defineOptions, watch, nextTick } from 'vue';
import { toast, setToast, getToast, setToastTimer, getToastTimer, setToastLastParams, getToastLastParams, clearToastLastParams, toastLastParams } from '../../store/index';

defineOptions({
    name: 'ste-toast',
});

let show = ref(false);
let title = ref('');
let icon = ref('&#xe67a');
let image = ref('');
let duration = ref(1500);
let mask = ref(false);
let success = ref(function () {});
let fail = ref(function () {});
let complete = ref(function () {});
let close = ref(function () {});
let timer = ref();

const cmpIcon = computed(() => {
    let iconObj: any = {
        success: '&#xe67a;',
        error: '&#xe67b;',
    };
    return iconObj[icon.value] || '';
});

const openBegin = computed(() => {
    let toast = uni.getStorageSync('toast');
    console.log('toast', toast);
    return toast.show;
    // console.log('getToast', toast.value.show);
    // return toRef(toast.value.show);
});

let pageShow = ref(true);
onPageShow(() => {
    {
        nextTick(() => {
            pageShow.value = true;
            // 每次进入页面 则清空队列时间
            // setToastLastParams({});
            // 每次离开页面 清除所有定时器
            // getToastTimer().forEach(value => {
            //     clearTimeout(value);
            // });
            // // 清除定时器数据
            // setToastTimer([]);
        });
    }
});
onPageHide(() => {
    pageShow.value = false;
    // 每次离开页面 则清空队列时间
    // clearToastLastParams();
    // 每次离开页面 清除所有定时器
    // getToastTimer().forEach(value => {
    //     clearTimeout(value);
    // });
    // // 清除定时器数据
    // setToastTimer([]);
});

watch(openBegin, (value: any) => {
    console.log('value', value);
    console.log('pageShow', pageShow.value);
    if (value && pageShow.value) {
        showToast(getToast());
    } else {
        show.value = false;
    }
});

// 打开弹窗
function showToast(params: any) {
    console.log('params', params);
    // 关闭前面的弹窗
    show.value = false;
    // 关闭系统的弹窗
    uni.hideToast();
    // 默认持续时间
    let defaultDuration = 1500;
    // 提示队列
    let time = 0;
    if (params.order) {
        // 先取上一次存的值 如果为空 则为第一个值
        let toastLastParams = getToastLastParams();
        // 等待的时间 第一个没有等待时间 后面的都是前面的持续时间的合
        time = toastLastParams.time ?? 0;
        // 存当前的等待时间 加100ms 以防没有打开中间的提示
        params.time = time + (params.duration ?? defaultDuration) + 100;
        setToastLastParams(params);
    } else {
        // 遇到非队列数据 则清空队列时间
        setToastLastParams({});
        setToastTimer([]);
    }
    let stateTimer = setTimeout(() => {
        try {
            clearTimeout(timer.value);
            show.value = true;
            title.value = params.title || '';
            icon.value = params.icon || 'success';
            image.value = params.image || '';
            duration.value = params.duration || defaultDuration;
            if (icon.value == 'loading') {
                duration.value = 0;
            }
            mask.value = params.mask || false;
            success.value = params.success || function () {};
            fail.value = params.fail || function () {};
            complete.value = params.complete || function () {};
            close.value = params.close || function () {};
            if (duration.value) {
                timer.value = setTimeout(() => {
                    hideToast();
                }, duration.value);
            }
            success.value();
        } catch (error) {
            console.error('error', error);
            fail.value();
        }
        complete.value();
    }, time);
    setToastTimer([...getToastTimer(), stateTimer]);
}

// 关闭弹窗
function hideToast() {
    show.value = false;
    // 遇到非队列数据 则清空队列时间
    clearToastLastParams();
    setToastTimer([]);
    close.value();
    setToast({
        show: false,
    });
}

defineExpose({
    showToast,
    hideToast,
});
</script>

<template>
    <view class="ste-toast-root" v-if="show">
        <view class="base">
            <view class="box">
                <view v-if="icon != 'none' || image" class="icon-box">
                    <block v-if="image">
                        <ste-image :src="image" :width="72" :height="72" display="block"></ste-image>
                    </block>
                    <block v-else>
                        <ste-icon v-if="icon != 'loading'" :code="cmpIcon" :size="icon != 'error' ? 72 : 72 * 0.8"></ste-icon>
                        <ste-loading v-else :size="72" color="#FFFFFF"></ste-loading>
                    </block>
                </view>
                <ste-text class="title" space="nbsp">{{ title }}</ste-text>
            </view>
        </view>
        <view class="mask" v-if="mask"></view>
    </view>
</template>

<style lang="scss" scoped>
.ste-toast-root {
    .base {
        position: fixed;
        text-align: center;
        z-index: 9999;
        top: 40%;
        left: 0;
        transform: translateY(-40%);
        width: 100vw;
    }
    .box {
        max-width: 520rpx;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 16rpx;
        font-size: var(--font-size-32, 32rpx);
        font-weight: bold;
        color: #ffffff;
        line-height: 44rpx;
        padding: 40rpx 48rpx;
        word-break: break-all;
        text-align: center;
        margin: 0 auto;
        display: inline-block;
    }
    .icon-box {
        margin-bottom: 24rpx;
        text-align: center;
        display: flex;
        justify-content: center;
    }

    .mask {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 10000;
        top: 0;
        left: 0;
    }
}
</style>
