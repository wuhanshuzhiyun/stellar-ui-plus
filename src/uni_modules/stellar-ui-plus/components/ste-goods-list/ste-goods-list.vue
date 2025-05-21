<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import steIcon from '../ste-icon/ste-icon.vue';
import propsData from './props';

const props = defineProps(propsData);
</script>
<template>
    <view class="ste-goods-list-root">
        <view class="ste-goods-list-header">
            <view class="ste-goods-list-title" :style="titleStyle">
                <view class="ste-goods-list-title-icon">
                    <ste-icon v-if="titleIcon" :code="titleIcon"></ste-icon>
                    <view class="ste-goods-list-title-icon-empty" v-else></view>
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
    .ste-goods-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .ste-goods-list-title {
            height: 36rpx;
            line-height: 36rpx;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .ste-goods-list-title-icon {
                width: 40rpx;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .ste-goods-list-title-icon-empty {
                    width: 12rpx;
                    height: 100%;
                    background-color: #09f;
                }
            }
            .ste-goods-list-title-text {
                line-height: 1.2;
            }
        }
        .ste-goods-list-method {
            display: flex;
            align-items: center;
            line-height: 1.2;
        }
    }
    .ste-goods-list-body {
        width: 100%;
        .ste-goods-list-body-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1.2;
        }
    }
}
</style>
