<script setup lang="ts">
import type { SteSignature } from '@/uni_modules/stellar-plus/types/components';
import { ref } from 'vue';
const signature = ref<SteSignature>();
const save = () => {
  signature.value?.save(res => {
    uni.previewImage({
      urls: [res],
    });
  });
};

const back = () => {
  signature.value?.back();
};

const clear = () => {
  signature.value?.clear();
};
</script>

<template>
  <view class="page">
    <page-nav title="签名" />
    <view class="content">
      <view class="demo-item">
        <view class="title">基础用法</view>
        <view class="signature-demo">
          <ste-signature ref="signature" type="jpg" />
        </view>
        <view class="button" @click="back">回退</view>
        <view class="button" @click="clear">清除</view>
        <view class="button" @click="save">保存并预览</view>
      </view>
      <view class="demo-item">
        <view class="title">画笔颜色和线宽</view>
        <view class="signature-demo">
          <ste-signature strokeColor="red" :lineWidth="1" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  .content {
    .demo-item {
      .signature-demo {
        width: 100%;
        height: 300rpx;
        background-color: #f5f5f5;
      }

      .button {
        display: inline-block;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 30rpx;
        border-radius: 32rpx;
        background-color: red;
        color: #fff;
        padding: 0 20px;
        margin-top: 10px;
        &:active {
          background-color: #f55;
        }

        & + .button {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
