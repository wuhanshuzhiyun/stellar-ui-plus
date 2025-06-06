<script setup lang="ts">
import { computed } from 'vue';
import propData from './props';

const props = defineProps(propData);

const rootStyle = computed(() => {
    return {
        background: props.background,
        '--ste-order-card-content-bg': props.contentBg,
    };
});

const emits = defineEmits<{
    (e: 'click-header', type: 'title' | 'subhead' | 'more'): void;
    (e: 'click-item', type: 'image' | 'title' | 'subhead' | 'status' | 'button'): void;
    (e: 'click-empty', type: 'image' | 'text' | 'button'): void;
}>();

const onClickHeader = (type: 'title' | 'subhead' | 'more') => emits('click-header', type);

const onClickItem = (type: 'image' | 'title' | 'subhead' | 'status' | 'button') => emits('click-item', type);

const onClickEmpty = (type: 'image' | 'text' | 'button') => emits('click-empty', type);
</script>
<template>
    <view class="ste-order-card-root" :style="[rootStyle]">
        <view class="order-card-head">
            <view class="order-card-head-l">
                <view class="head-image">
                    <slot name="head-image">
                        <image :src="image" class="head-image-img" mode="aspectFill" />
                    </slot>
                </view>
                <view class="head-title">{{ title }}</view>
            </view>
            <view class="order-card-head-r">{{ statusText }}</view>
        </view>
        <view class="order-card-sub-header">
            <view class="sub-tag">{{ tagText }}</view>
            <view class="sub-sub-title">{{ helperText }}</view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-order-card-root {
    border-radius: 12rpx;
    .order-card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx 28rpx 20rpx 30rpx;
        .order-card-head-l {
            display: flex;
            align-items: center;
            .head-image {
                width: 40rpx;
                height: 40rpx;
                background: #ec3e1a;
                border-radius: 50%;
                overflow: hidden;
                .head-image-img {
                    width: 100%;
                    height: 100%;
                }
            }
            .head-title {
                font-weight: bold;
                font-size: 32rpx;
                color: #000000;
                margin-left: 18rpx;
            }
        }
        .order-card-head-r {
            font-size: 28rpx;
            color: #ec3e1a;
        }
    }
    .order-card-sub-header {
        padding: 0 28rpx;
        display: flex;
        align-items: center;
        .sub-tag {
            background-color: #fcde9755;
            border-radius: 4rpx;
        }
    }
}
</style>
