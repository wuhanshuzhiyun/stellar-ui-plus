<script setup lang="ts">
import { ref } from 'vue';
</script>
<template>
    <view class="page-user-info-view">
        <ste-navbar title="个人信息" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="page-content">
            <view class="page-block">
                <view class="user-info-avatar">
                    <ste-image src="https://image.whzb.com/chain/StellarUI/mp-logo.png" width="176" height="176" radius="50%" />
                </view>
                <view class="user-info-item">
                    <view class="info-item-label">昵称</view>
                    <view class="info-item-value">
                        好物分享
                        <view class="info-item-value-icon">
                            <ste-icon size="20" code="&#xe674;" />
                        </view>
                    </view>
                </view>
                <view class="user-info-item">
                    <view class="info-item-label">性别</view>
                    <view class="info-item-value">女</view>
                </view>
                <view class="user-info-item">
                    <view class="info-item-label">地区</view>
                    <view class="info-item-value">湖北武汉</view>
                </view>
            </view>
            <view class="page-block">
                <view class="user-info-item">
                    <view class="info-item-label">出生日期</view>
                    <view class="info-item-value">
                        选择
                        <view class="info-item-value-icon">
                            <ste-icon size="20" code="&#xe674;" color="#333" />
                        </view>
                    </view>
                </view>
                <view class="user-info-item">
                    <view class="info-item-label">个性签名</view>
                    <view class="info-item-value disabled">暂未开放</view>
                </view>
            </view>
            <view class="page-block">
                <view class="user-info-item">
                    <view class="info-item-label">切换账户</view>
                    <view class="info-item-value">
                        13593771647
                        <view class="info-item-value-icon">
                            <ste-icon size="20" code="&#xe674;" />
                        </view>
                    </view>
                </view>
            </view>

            <ste-button class="logout-btn" background="#fff" width="100%" :mode="300">
                <text style="color: #ec3e1a">退出登录</text>
            </ste-button>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.page-user-info-view {
    width: 750rpx;
    min-height: 100vh;
    background-color: #f5f5f5;
    .page-content {
        padding: 20rpx 24rpx 0 24rpx;
        .page-block {
            padding: 0 16rpx;
            background: #ffffff;
            border-radius: 12rpx;
            & + .page-block {
                margin-top: 20rpx;
            }

            .user-info-avatar {
                padding-top: 48rpx;
                padding-bottom: 28rpx;
                display: flex;
                justify-content: center;
            }
            .user-info-item {
                display: flex;
                justify-content: space-between;
                padding: 28rpx 8rpx;
                height: 96rpx;
                line-height: 40rpx;
                font-weight: 400;
                font-size: 28rpx;
                color: #000000;
                & + .user-info-item {
                    border-top: 1rpx solid #f8f8f8;
                }
                .info-item-value {
                    display: flex;
                    align-items: flex-start;
                    .info-item-value-icon {
                        margin-left: 14rpx;
                        line-height: 36rpx;
                    }
                    &.disabled {
                        color: #bbbbbb;
                        // #ifdef H5
                        cursor: not-allowed;
                        // #endif
                    }
                }
            }
        }
        .logout-btn {
            margin-top: 48rpx;
        }
    }
}
</style>
