<script lang="ts" setup>
import config from "@/uni_modules/stellar-plus/package.json";
</script>

<template>
  <view class="mp-home">
    <view class="home-title"> Stellar Plus </view>
    <view class="home-content">
      <view class="home-subtitle">
        <image src="https://image.whzb.com/chain/StellarUI/logo.png" />
        <view>
          <view class="subtitle-title">
            Stellar Plus {{ config.version }}
          </view>
          <view class="subtitle-message"> uniapp快速开发的UI框架 </view>
        </view>
      </view>
      <view class="subtitle-message">
        Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
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
}
</style>
