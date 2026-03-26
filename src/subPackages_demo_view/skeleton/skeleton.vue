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
                <ste-skeleton loading>
                    <ste-text>床前明月光，疑是地上霜。</ste-text>
                </ste-skeleton>

                <!-- 隐藏骨架图，显示真实内容 -->
                <ste-skeleton :loading="false">
                    <ste-text>床前明月光，疑是地上霜。</ste-text>
                </ste-skeleton>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;

            .avator {
                height: 80rpx;
                width: 80rpx;
                border-radius: 8rpx;
                background-color: #f2f3f5;
            }
        }
    }
}
</style>
