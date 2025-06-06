<script lang="ts" setup>
import { reactive } from 'vue';

const viewDemo = (demo: string) => {
    const url = `/subPackages_demo_view/login/${demo}`;
    uni.navigateTo({ url });
};
</script>

<template>
    <page-layout title="登录">
        <view class="description">
            <view class="cmp-name">Login 登录</view>
            <view class="cmp-desc">登录</view>
        </view>

        <view class="demo-item">
            <view class="title">基础登录</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-button @click="viewDemo('demo1')">基础登录</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">复杂登录</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-button @click="viewDemo('demo2')">复杂登录</ste-button>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        // margin: 0 -30rpx;
        > view {
            // margin: 0 8rpx 8rpx 0;
        }
    }
}
</style>
