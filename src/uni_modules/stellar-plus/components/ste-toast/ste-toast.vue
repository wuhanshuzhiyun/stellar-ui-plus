<script setup lang="ts">
import { computed, defineOptions, inject, watch } from 'vue';
import { toastDefaultOptionsKey } from './ste-toast';
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

// 打开弹窗
function showToast(params: any) {
    // 关闭前面的弹窗
    show.value = false;
    // 关闭系统的弹窗
    uni.hideToast();
    setTimeout(() => {
        try {
            clearTimeout(timer.value);
            show.value = true;
            title.value = params.title || '';
            icon.value = params.icon || 'success';
            image.value = params.image || '';
            duration.value = params.duration || 1500;
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
    });
}

// 关闭弹窗
function hideToast() {
    show.value = false;
    close.value();
}

// 组合函数
const injectToastOptions = ref(inject(toastDefaultOptionsKey));
watch(injectToastOptions, (value: any) => {
    console.log('value', value);
    if (value.show) {
        showToast(value);
    } else {
        hideToast();
    }
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
                <ste-text clas="title" space="nbsp">{{ title }}</ste-text>
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
        font-size: 32rpx;
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
