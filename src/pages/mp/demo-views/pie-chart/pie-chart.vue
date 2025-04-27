<template>
    <page-layout title="饼图">
        <view class="description">
            <view class="cmp-name">PieChart 饼图</view>
            <view class="cmp-desc">主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例。</view>
        </view>
        <view class="demo-item">
            <view class="title">默认配置</view>
            <view class="item-block">
                <ste-pie-chart></ste-pie-chart>
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

:deep(.page > .content) {
    padding: 0;
    margin: 0 40rpx;
}
</style>
