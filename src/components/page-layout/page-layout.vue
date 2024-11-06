<script lang="ts" setup>
import utils from '@/common/utils';

const props = defineProps({
    title: String,
    contentStyle: [String, Object],
});

const cmpContentStyle = computed(() => {
    const { safeArea } = utils.getWindowInfo();
    const style = {
        paddingTop: '32rpx',
        // #ifdef APP
        paddingBottom: `calc(100vh - ${safeArea.bottom - 16}px)`,
        // #endif
    };

    return style;
});
</script>

<template>
    <view class="page">
        <page-nav :title="props.title"></page-nav>
        <view class="content" :style="[cmpContentStyle, props.contentStyle]">
            <slot></slot>
        </view>
    </view>
</template>

<style lang="scss" scoped>
/*
  demo页通用样式
*/

.page {
    height: 100vh;
    overflow: hidden;
    width: 100vw;
    ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
        color: transparent;
    }
    & > .content {
        padding: 0 40rpx;
        // #ifdef  H5 || APP
        height: calc(100vh - 50px);
        // #endif
        // #ifdef  MP-WEIXIN
        height: calc(100% - 220rpx);
        // #endif
        // #ifdef  MP-ALIPAY
        height: calc(100% - 200rpx);
        // #endif
        overflow-y: auto;

        & > .demo-item {
            margin-bottom: 16px;

            & > .title {
                font-size: 14px;
                color: #8f9ca2;
                margin-bottom: 8px;
            }

            & > .item-block {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
            }
        }
    }
}
</style>
