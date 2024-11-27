<template>
    <page-layout title="加载动画">
        <view class="description">
            <view class="cmp-name">Loading 加载</view>
            <view class="cmp-desc">加载动画，用于表示加载中的过渡状态。</view>
        </view>

        <view class="demo-item">
            <view class="title">加载类型</view>
            <view class="item-block">
                <ste-loading></ste-loading>
                <ste-loading :type="2"></ste-loading>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">自定义图标颜色</view>
            <view class="item-block">
                <ste-loading color="#0091FF"></ste-loading>
                <ste-loading :type="2" color="#0091FF"></ste-loading>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义图标大小</view>
            <view class="item-block">
                <ste-loading :size="100"></ste-loading>
                <ste-loading :type="2" :size="100"></ste-loading>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">加载文案</view>
            <view class="item-block">
                <ste-loading>加载中...</ste-loading>
                <ste-loading :type="2">加载中...</ste-loading>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">垂直排列</view>
            <view class="item-block">
                <ste-loading vertical>加载中...</ste-loading>
                <ste-loading :type="2" vertical>加载中...</ste-loading>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义文本样式</view>
            <view class="item-block">
                <ste-loading :textSize="50" textColor="#0091FF">加载中...</ste-loading>
                <ste-loading :type="2" :textSize="50" textColor="#0091FF">加载中...</ste-loading>
            </view>
        </view>
    </page-layout>
</template>

<script></script>

<style lang="scss" scoped>
.loading-box {
    flex-direction: column !important;
    row-gap: 20rpx;
    align-items: flex-start !important;
    justify-content: center;
}
.item-block {
    column-gap: 40rpx;
}
</style>
