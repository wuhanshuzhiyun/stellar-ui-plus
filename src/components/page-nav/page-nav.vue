<script lang="ts">
export default defineComponent({
    name: 'page-nav',
});
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import propsData from './props';
import utils from '@/common/utils';

const props = defineProps(propsData);

const pageStyle = computed(() => {
    const style = {
        zIndex: 10,
    };

    return style;
});

let navbarTop = utils.px2rpx(16);
let navbarWidth = utils.px2rpx(281);
let navbarHeight = utils.px2rpx(26);

// #ifdef MP-WEIXIN || MP-ALIPAY
const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
const addHeight = 16;
navbarTop = utils.px2rpx(menuButtonInfo.top - uni.upx2px(addHeight));
navbarWidth = utils.px2rpx(menuButtonInfo.left);
navbarHeight = utils.px2rpx(menuButtonInfo.height + uni.upx2px(addHeight * 2));
// #endif

const isFirstPage = ref(false);
const pages = getCurrentPages();
isFirstPage.value = pages.length === 1;

function navBack() {
    if (pages.length > 2) {
        uni.navigateBack();
    } else {
        uni.redirectTo({
            url: '/pages/mp/index',
        });
    }
}
</script>

<template>
    <div class="nav-box" :style="[pageStyle, { paddingTop: `${navbarTop}rpx` }]">
        <div class="nav" :style="{ width: `${navbarWidth}rpx`, height: `${navbarHeight}rpx` }">
            <!-- #ifdef MP-WEIXIN || H5 -->
            <div class="back-box">
                <div class="back" :style="{ backgroundColor: 'transparent', borderColor: 'transparent' }">
                    <ste-icon v-if="isFirstPage" :code="'&#xe68d;'" weight="bold" :size="28" color="#000"></ste-icon>
                    <ste-icon v-else :code="'&#xe673;'" weight="bold" :size="28" color="#000"></ste-icon>
                </div>
                <div class="back-click-hot" @click="navBack" />
            </div>

            <!-- #endif -->
            <!-- #ifdef MP-ALIPAY -->
            <div class="ali-back-box" />
            <!-- #endif -->
            <div class="slot-default">
                <slot name="default" />
            </div>
        </div>
        <div
            class="title-center"
            :style="{
                color: '#181818',
                height: `${navbarHeight}rpx`,
                lineHeight: `${navbarHeight}rpx`,
                paddingTop: `${navbarTop}rpx`,
            }"
        >
            {{ title }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav-box {
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
            z-index: 2;
            width: 90rpx;
            height: 90rpx;
            transform: translateX(-30rpx);
        }
    }

    .ali-back-box {
        width: 50rpx;
        height: 50rpx;
        padding-right: 10rpx;
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
