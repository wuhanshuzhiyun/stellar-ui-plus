<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import steIcon from '../ste-icon/ste-icon.vue';
import propsData from './props';
import { useColorStore } from '../../store';

let { getColor } = useColorStore();

const props = defineProps(propsData);

const color = computed(() => getColor().steThemeColor);
</script>
<template>
    <view class="ste-goods-list-root" :class="{ icon: !hideTitleIcon && titleIcon, line: !hideTitleIcon && !titleIcon }">
        <view class="ste-goods-list-header">
            <view class="ste-goods-list-title" :style="titleStyle">
                <view class="ste-goods-list-title-icon" v-if="!hideTitleIcon">
                    <ste-icon v-if="titleIcon" :code="titleIcon" size="20"></ste-icon>
                    <view class="ste-goods-list-title-icon-empty" :style="{ background: color }" v-else></view>
                </view>
                <view class="ste-goods-list-title-text">{{ title }}</view>
            </view>
            <view class="ste-goods-list-method" v-if="method">
                {{ methodText }}
                <ste-icon v-if="methodIcon" :code="methodIcon"></ste-icon>
            </view>
        </view>
        <view class="ste-goods-list-body">
            <view class="ste-goods-list-body-item" v-for="(item, index) in data" :key="index">
                <view class="ste-goods-list-body-item-left">{{ item.label }}</view>
                <view class="ste-goods-list-body-item-right">{{ item.value }}</view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-goods-list-root {
    width: 100%;
    background-color: #fff;
    padding: 28rpx 40rpx;
    font-size: 28rpx;

    &.icon {
        padding-left: 16rpx;
        .ste-goods-list-header {
            .ste-goods-list-title-icon {
                margin-right: 8rpx;
                transform: translateY(2rpx);
            }
        }
        .ste-goods-list-body {
            padding-left: 28rpx;
        }
    }
    &.line {
        padding-left: 16rpx;
        .ste-goods-list-body {
            padding-left: 24rpx;
        }
    }
    .ste-goods-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        color: #1d2129;

        .ste-goods-list-title {
            height: 40rpx;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .ste-goods-list-title-icon {
                height: 24rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                .ste-goods-list-title-icon-empty {
                    width: 8rpx;
                    height: 100%;
                    margin-right: 16rpx;
                }
            }
            .ste-goods-list-title-text {
                line-height: 40rpx;
            }
        }
        .ste-goods-list-method {
            display: flex;
            align-items: center;
            line-height: 40rpx;
        }
    }
    .ste-goods-list-body {
        width: 100%;
        .ste-goods-list-body-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1.2;
            margin-top: 28rpx;
            height: 40rpx;
            line-height: 40rpx;
            .ste-goods-list-body-item-left {
                color: #555a61;
            }
            .ste-goods-list-body-item-right {
                color: #1c1f23;
            }
        }
    }
}
</style>
