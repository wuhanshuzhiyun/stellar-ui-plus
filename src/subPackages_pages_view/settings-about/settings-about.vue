<script setup></script>
<template>
    <view class="settings-about-view">
        <ste-navbar title="关于" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <ste-image src="https://image.whzb.com/chain/StellarUI/logo.png" width="116rpx" mode="widthFix" />
            <view class="title">智慧门店</view>
            <view class="version">v1.01</view>
            <view class="sub">
                智慧门店营运平台赋能零售数字化, 集成AI分析、智能导购、供应链管理, 助力企业降本增效。通过大数据驱动精准营销, 提升顾客体验, 实现线上线下全渠道融合, 打造新一代智慧零售解决方案。
            </view>

            <view class="block">
                <view class="label">用户协议</view>
                <view class="text"><ste-icon size="24" code="&#xe674;" color="#888C92" /></view>
            </view>
            <view class="block">
                <view class="label">客服热线</view>
                <view class="text">400-919-0001</view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.settings-about-view {
    width: 100%;
    height: 100vh;
    background-color: #f4f5f6;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        padding: 28rpx;
        overflow-y: auto;
        padding-top: 74rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            font-size: 48rpx;
            color: #1c1f23;
            margin-top: 18rpx;
        }
        .version {
            font-size: 26rpx;
            color: #a7abb0;
            margin-top: 20rpx;
        }
        .sub {
            font-size: 28rpx;
            color: #1c1f23;
            margin-top: 40rpx;
            margin-bottom: 64rpx;
        }

        .block {
            width: 100%;
            height: 104rpx;
            border-radius: 12rpx;
            background: #ffffff;
            padding: 0 28rpx;
            margin-bottom: 24rpx;

            display: flex;
            align-items: center;
            .text {
                flex: 1;
                text-align: right;
                color: #888c92;
            }
        }
    }
}
</style>
