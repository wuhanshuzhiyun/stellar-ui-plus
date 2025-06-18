<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted, onActivated, onDeactivated } from 'vue';
import { createOptions } from '../../utils/mixin';
defineOptions(createOptions('ste-toast'));

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

// 打开弹窗
function showToast(params: any) {
    console.log('显示弹窗');
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
        let toastLastParams = uni.getStorageSync('toastLastParams');
        // 等待的时间 第一个没有等待时间 后面的都是前面的持续时间的合
        if (typeof toastLastParams == 'object') {
            time = toastLastParams.time;
        }
        // 存当前的等待时间 加100ms 以防没有打开中间的提示
        params.time = time + (params.duration ?? defaultDuration) + 100;
        uni.setStorageSync('toastLastParams', params);
    } else {
        // 遇到非队列数据 则清空队列时间
        uni.removeStorageSync('toastLastParams');
    }
    setTimeout(() => {
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
            console.log('error', error);
            fail.value();
        }
        complete.value();
    }, time);
}

// 关闭弹窗
function hideToast() {
    show.value = false;
    // 遇到非队列数据 则清空队列时间
    uni.removeStorageSync('toastLastParams');
    close.value();
}

const registEvent = (flag = true) => {
    if (flag) {
        // 注册事件
        uni.$on('ste:toast:show', showToast);
        uni.$on('ste:toast:hide', hideToast);
    } else {
        // 卸载事件
        uni.$off('ste:toast:show', showToast);
        uni.$off('ste:toast:hide', hideToast);
    }
};

onMounted(() => {
    registEvent();
});

onUnmounted(() => {
    registEvent(false);
});

// 使用onActivated和onDeactivated来处理页面切换
onActivated(() => {
    registEvent();
});

onDeactivated(() => {
    registEvent(false);
});

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
                <ste-text clas="title" space="nbsp" :value="title">{{ title }}</ste-text>
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
