<template>
    <page-layout title="骨架屏">
        <view class="description">
            <view class="cmp-name">Skeleton 骨架屏</view>
            <view class="cmp-desc">骨架图组件用于在数据加载过程中显示页面的基本结构，避免页面的突然变化，为用户提供更好的视觉体验。组件支持多种预设类型，也可以通过组合使用来构建复杂的骨架结构。</view>
        </view>
        <view class="type-block">
            <view>01 骨架屏类型</view>
        </view>
        <view class="demo-item">
            <view class="title">基础文本骨架</view>
            <view class="item-block">
                <!-- 显示骨架图 -->
                <ste-skeleton :loading="loading">
                    <ste-text>床前明月光，疑是地上霜。</ste-text>
                </ste-skeleton>
            </view>
            <view class="item-block">
                <!-- 隐藏骨架图，显示真实内容 -->
                <ste-skeleton :loading="false">
                    <ste-text>床前明月光，疑是地上霜。</ste-text>
                </ste-skeleton>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">图片骨架</view>
            <ste-skeleton :loading="loading" type="image">
                <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="120" height="120" />
            </ste-skeleton>
        </view>
        <view class="demo-item">
            <view class="title">圆形头像骨架</view>
            <ste-skeleton :loading="loading" type="circle">
                <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="120" height="120" radius="50" />
            </ste-skeleton>
        </view>
        <view class="demo-item">
            <view class="title">复杂组合骨架</view>
            <view class="skeleton">
                <view class="image">
                    <ste-skeleton type="image" loading></ste-skeleton>
                </view>
                <view class="text">
                    <ste-skeleton type="text" loading></ste-skeleton>
                    <ste-skeleton type="text" loading style="width: 100rpx"></ste-skeleton>
                </view>
            </view>
        </view>
    </page-layout>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 3000);
});
</script>
<style lang="scss" scoped>
.page {
    background-color: #f8f8f8;
}
.demo-item {
    margin-bottom: 24rpx;
    border-radius: 24rpx;
    background-color: #fff;
    padding: 24rpx;

    .item-block {
        > view {
            margin: 0 36rpx 18rpx 0;
        }
    }

    .skeleton {
        display: flex;

        .text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20rpx;
        }
    }
}
</style>
