<script setup lang="ts">
import { computed, ref, defineComponent } from 'vue';
import propsData from './props';
import utils from '../../utils/utils';
defineComponent({
    name: 'ste-navbar',
});

const props = defineProps(propsData);

const pageStyle = computed(() => {
    const { safeArea } = utils.System.getWindowInfo();

    const style: any = {
        zIndex: props.zIndex,
    };
    if (props.safeAreaInsetTop) {
        // #ifdef APP
        style.marginTop = safeArea.top ? safeArea.top + 'px' : 0;
        // #endif
    }
    if (props.fixed) {
        style.position = 'fixed';
        style.top = 0;
    }

    return style;
});

let navbarTop = ref(utils.px2rpx(16));
let navbarWidth = ref(utils.px2rpx(281));
let navbarHeight = ref(utils.px2rpx(26));

// #ifdef MP-WEIXIN || MP-ALIPAY
const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
const addHeight = 16;
navbarTop.value = utils.px2rpx(menuButtonInfo.top - uni.upx2px(addHeight));
navbarWidth.value = utils.px2rpx(menuButtonInfo.left);
navbarHeight.value = utils.px2rpx(menuButtonInfo.height + uni.upx2px(addHeight * 2));
// #endif

if (!props.safeAreaInsetTop) {
    navbarTop.value = 0;
}

// 回调事件
const emits = defineEmits<{
    (e: 'backClick'): void;
}>();

function backClick() {
    emits('backClick');
}
</script>

<template>
    <view class="ste-navbar-root" :style="[pageStyle, { paddingTop: `${navbarTop}rpx`, backgroundColor: backgroundColor }]" data-test="navbar">
        <view class="nav" :style="{ width: `${navbarWidth}rpx`, height: `${navbarHeight}rpx` }">
            <view class="back-box">
                <view v-if="autoBack" class="back" :style="{ backgroundColor: backBackgroundColor, borderColor: backBorderColor, opacity: backOpacity }">
                    <ste-icon :code="backCode" weight="bold" :size="28" :color="backColor"></ste-icon>
                </view>
                <view @click="backClick" class="back-click-hot" />
            </view>

            <view v-if="title && titleAlignment == 1" class="title" :style="{ color: titleColor }">{{ title }}</view>
            <view class="title slot-default"><slot name="default"></slot></view>
        </view>
        <view
            v-if="title && titleAlignment == 2"
            class="title-center"
            :style="{
                color: titleColor,
                height: `${navbarHeight}rpx`,
                lineHeight: `${navbarHeight}rpx`,
                paddingTop: `${navbarTop}rpx`,
            }"
        >
            {{ title }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-navbar-root {
    position: relative;
}

.nav {
    display: flex;
    align-items: center;
    padding-left: 8rpx;
    overflow: hidden;
    .back-box {
        padding-right: 10rpx;
        display: flex;
        align-items: center;
        position: relative;
        .back {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 50rpx;
            height: 50rpx;
            border-radius: 25rpx;
            border-width: 1px;
            border-style: solid;
        }
        .back-click-hot {
            position: absolute;
            z-index: 99;
            width: 90rpx;
            height: 90rpx;
            transform: translateX(-30rpx);
        }
    }
    .slot-default {
        display: flex;
        align-items: center;
        flex: 1;
    }
}
.title-center {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    font-size: 32rpx;
    text-align: center;
    font-weight: bold;
}

.title {
    font-size: 32rpx;
    font-weight: bold;
    margin-right: 10rpx;
    line-height: 1;
}
</style>
