<template>
    <page-layout title="条形码">
        <view class="description">
            <view class="cmp-name">Barcode 条形码</view>
            <view class="cmp-desc">能够将数字和字母转换生成条形码的组件，支持自定义配色</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view>
                    <ste-barcode content="123987456abc" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义颜色</view>
            <view class="item-block">
                <view>
                    <ste-barcode content="123456abc123" foreground="#c11" background="#dad" />
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;
        }
    }
}
</style>
