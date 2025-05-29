<script lang="ts" setup>
import { ref } from 'vue';

const resolutionConfigArr = ref([
    { text: '流畅', url: 'https://image.whzb.com/chain/StellarUI/video/demo1.mp4' },
    { text: '高清', url: 'https://image.whzb.com/chain/StellarUI/video/demo2.mp4' },
]);
</script>

<template>
    <page-layout title="视频">
        <view class="description">
            <view class="cmp-name">Video 视频</view>
            <view class="cmp-desc">用于播放视频</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-video title="视频标题视频标题" src="https://image.whzb.com/chain/StellarUI/video/demo1.mp4"></ste-video>
                </view>
            </view>
        </view>
        <!-- #ifndef MP-ALIPAY || APP -->
        <view class="demo-item">
            <view class="title">可选择清晰度</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-video title="视频标题视频标题" :resolution="resolutionConfigArr"></ste-video>
                </view>
            </view>
        </view>
        <!-- #endif -->
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            // margin: 0 36px 36px 0;
            margin-bottom: 36rpx;
        }
    }
}
</style>
