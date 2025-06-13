<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);

function click() {
    show.value = false;
    setTimeout(() => {
        show.value = true;
    }, 50);
}
</script>

<template>
    <page-layout title="动画">
        <view class="description">
            <view class="cmp-name">AppUpdate App更新</view>
            <view class="cmp-desc">此组件用于APP更新功能</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view>
                    <ste-app-update></ste-app-update>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                > view {
                    margin: 0 36rpx 36rpx 0;
                }
            }
        }
    }
}
</style>
