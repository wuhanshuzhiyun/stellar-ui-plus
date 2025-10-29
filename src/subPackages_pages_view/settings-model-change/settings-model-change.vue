<script setup>
import { ref } from 'vue';
const switchVal1 = ref(false);
const switchVal2 = ref(false);
</script>
<template>
    <view class="settings-model-change-view">
        <ste-navbar title="模式切换" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <view class="setting-block">
                <view class="icon-box">
                    <ste-image src="https://image.whzb.com/chain/StellarUI/image/setting-icon-1.png" width="32" height="32" />
                </view>
                <view class="text">
                    <view class="text-1">普通模式</view>
                    <view class="text-2">功能全面，信息丰富</view>
                </view>
                <ste-switch v-model="switchVal1" />
            </view>

            <view class="setting-block">
                <view class="icon-box">
                    <ste-image src="https://image.whzb.com/chain/StellarUI/image/setting-icon-2.png" width="32" height="32" />
                </view>
                <view class="text">
                    <view class="text-1">关爱模式</view>
                    <view class="text-2">简单好用，字大清晰</view>
                </view>
                <ste-switch v-model="switchVal2" />
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.settings-model-change-view {
    width: 100%;
    height: 100vh;
    background-color: #f4f5f6;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        padding: 24rpx 28rpx;
        overflow-y: auto;

        .setting-block {
            background: #ffffff;
            border-radius: 12rpx;

            height: 146rpx;
            padding: 28rpx;
            display: flex;
            align-items: center;

            .icon-box {
                margin-top: 8rpx;
                align-self: flex-start;
            }

            .text {
                flex: 1;
                margin: 0 16rpx;

                .text-1 {
                    color: #1c1f23;
                    font-size: 32rpx;
                    margin-bottom: 8rpx;
                }

                .text-2 {
                    color: #a7abb0;
                    font-size: 24rpx;
                }
            }
        }

        .setting-block + .setting-block {
            margin-top: 24rpx;
        }
    }
}
</style>
