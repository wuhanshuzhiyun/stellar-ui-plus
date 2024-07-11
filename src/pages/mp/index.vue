<script lang="ts" setup>
import config from '@/uni_modules/stellar-plus/package.json';
import utils from '@/common/utils';

const joinSrc = utils.joinSrc;

function nav(routerName: string) {
    const path = '/pages/mp/' + routerName + '-demo/' + routerName + '-demo';
    uni.navigateTo({
        url: path,
    });
}
</script>

<template>
    <view class="mp-home">
        <view class="home-title">Stellar Plus</view>
        <view class="home-content">
            <view class="home-subtitle">
                <image src="https://image.whzb.com/chain/StellarUI/logo.png" />
                <view>
                    <view class="subtitle-title">Stellar Plus {{ config.version }}</view>
                    <view class="subtitle-message">uniapp快速开发的UI框架</view>
                </view>
            </view>
            <view class="subtitle-message">Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</view>

            <!-- ***电商组件*** -->
            <view class="group-title">电商组件</view>
            <view class="com-box" @click="nav('price')">
                <view class="com-title">
                    <image class="img" :src="joinSrc('组件图标/price.png')" width="36rpx" height="36rpx" />
                    <text>Price 价格</text>
                </view>
                <view class="com-arrow">
                    <image class="img" :src="joinSrc('组件图标/r-arrow.png')" width="36rpx" height="36rpx" />
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.mp-home {
    width: 100vw;
    height: 100vh;
    .home-title {
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        font-size: 42rpx;
        text-align: center;
        color: #333;
    }
    .home-content {
        width: 100%;
        height: calc(100vh - 90rpx);
        overflow-y: auto;
        padding: 42rpx;
        .home-subtitle {
            width: 100%;
            height: 180rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            image {
                width: 120rpx;
                height: 120rpx;
                margin-right: 20rpx;
            }
            .subtitle-title {
                font-size: 36rpx;
                line-height: 42rpx;
                color: #000;
                font-weight: bold;
            }
            .subtitle-message {
                margin-top: 12rpx;
                line-height: 42rpx;
                font: 24rpx;
                color: #999;
            }
        }
    }

    .group-title {
        padding: 32rpx 0;
        padding-bottom: 8rpx;
        border-bottom: 1px solid #eee;
        font-weight: bold;
    }
    .com-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 20rpx 0;
        .com-title {
            flex: 1;
            font-size: 28rpx;
            display: flex;
            align-items: center;
            .img {
                margin-right: 12rpx;
                width: 18px;
                height: 18px;
            }
            line-height: 100%;
            column-gap: 10rpx;
        }
        .com-arrow {
            display: flex;
            align-items: center;
            justify-content: center;

            .img {
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>
