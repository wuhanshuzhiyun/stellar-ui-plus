<script setup lang="ts">
import { ref } from 'vue';

const active = ref(0);
const contents = [
    'https://image.whzb.com/chain/StellarUI/image/banner1.png',
    'https://image.whzb.com/chain/StellarUI/image/banner2.png',
    'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
    'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
    'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
    'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
];
</script>
<template>
    <page-layout title="滚动锚点">
        <view class="description">
            <view class="cmp-name">ScrollTo 滚动锚点</view>
            <view class="cmp-desc">滚动锚点，可以滚动到指定锚点。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <ste-tabs v-model:active="active" sticky>
                <ste-tab v-for="(m, i) in contents" :key="i" :title="`标签${i + 1}`" />
            </ste-tabs>
            <ste-scroll-to v-model:active="active" height="1200">
                <ste-scroll-to-item v-for="(m, i) in contents" :key="i">
                    <view>内容{{ i + 1 }}</view>
                    <image :src="m" mode="widthFix" style="width: 100%"></image>
                </ste-scroll-to-item>
            </ste-scroll-to>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                display: block;
                margin-bottom: 12rpx;
                & > .ste-search {
                    margin: 0 16rpx 16rpx 0;
                }
            }
        }
    }
}
</style>
