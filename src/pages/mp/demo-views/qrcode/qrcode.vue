<template>
    <page-layout title="二维码">
        <view class="description">
            <view class="cmp-name">QRcode 二维码</view>
            <view class="cmp-desc">能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view>
                    <ste-qrcode content="https://stellar-ui.intecloud.com.cn/mp/index/index" />
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">自定义颜色</view>
            <view class="item-block">
                <view>
                    <ste-qrcode content="https://stellar-ui.intecloud.com.cn/mp/index/index" foreground="#c11" background="#dad" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">带logo</view>
            <view class="item-block">
                <view>
                    <ste-qrcode content="https://stellar-ui.intecloud.com.cn/mp/index/index" foregroundImageSrc="https://image.whzb.com/chain/StellarUI/logo.png" />
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
