<template>
    <page-layout title="环形图">
        <view class="description">
            <view class="cmp-name">DonutChart 环形图</view>
            <view class="cmp-desc">可以用来表示数据占总体的比例，相比于饼图，它中间空余的部分可以用来显示一些额外的文字等信息，因而也是一种常用的图表类型。</view>
        </view>
        <view class="demo-item">
            <view class="title">默认配置</view>
            <view class="item-block">
                <ste-donut-chart></ste-donut-chart>
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
