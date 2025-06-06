<script setup lang="ts">
import { computed } from 'vue';
import propData from './props';

const props = defineProps(propData);

const rootStyle = computed(() => {
    return {
        background: props.background,
        '--ste-order-card-content-bg': props.contentBg || props.background,
    };
});

const emits = defineEmits<{
    (e: 'click-header', type: 'title' | 'subhead' | 'more'): void;
    (e: 'click-item', type: 'image' | 'title' | 'subhead' | 'status' | 'button'): void;
}>();

const onClickHeader = (type: 'title' | 'subhead' | 'more') => emits('click-header', type);

const onClickItem = (type: 'image' | 'title' | 'subhead' | 'status' | 'button') => emits('click-item', type);

const oneData = computed(() => (props.data?.length === 1 ? props.data[0] : null));
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
            <view class="sub-text">{{ helperText }}</view>
        </view>
        <view class="order-card-content">
            <view class="content-info" v-if="oneData">
                <ste-image :src="oneData.image" width="132" height="132" />

                <view class="info-text">
                    <view class="info-t">
                        <view class="info-title">{{ oneData.title }}</view>
                        <view class="info-sub-title">{{ oneData.subTitle }}</view>
                    </view>
                    <view class="info-f">
                        详情
                        <ste-icon code="&#xe674;" />
                    </view>
                </view>
            </view>
            <scroll-view scroll-x class="content-list" v-else></scroll-view>
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
            padding: 0 12rpx;
            height: 38rpx;
            font-size: 24rpx;
            color: #8a1100;
            line-height: 38rpx;
        }
        .sub-text {
            flex: 1;
            padding-left: 16rpx;
            font-size: 28rpx;
            color: #757575;
        }
    }
    .order-card-content {
        margin-top: 10rpx;
        padding: 20rpx 28rpx;
        background-color: var(--ste-order-card-content-bg);
        border-radius: 12rpx;
        .content-info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .info-text {
                width: calc(100% - 152rpx);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .info-t {
                    .info-title {
                        font-weight: bold;
                        font-size: 28rpx;
                        color: #000000;
                        line-height: 40rpx;
                    }
                    .info-sub-title {
                        margin-top: 8rpx;
                        font-weight: 500;
                        font-size: 24rpx;
                        color: #757575;
                        line-height: 34rpx;
                    }
                }
                .info-f {
                    font-weight: 500;
                    font-size: 24rpx;
                    color: #757575;
                    line-height: 34rpx;
                }
            }
        }
    }
}
</style>
