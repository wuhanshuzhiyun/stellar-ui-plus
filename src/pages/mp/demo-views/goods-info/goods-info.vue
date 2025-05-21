<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
    image: 'https://image.whzb.com/chain/StellarUI/none.png',
    title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
    tag: '新品',
    code: '123456',
    barCode: '1234567890123',
    price: '99900',
    originalPrice: '99900',
});
</script>
<template>
    <page-layout title="商品信息" contentStyle="padding: 12rpx;background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">GoodsList 商品信息</view>
            <view class="cmp-desc">商品信息组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-goods-info :data="data" stepper :number="10"></ste-goods-info>
        </view>
    </page-layout>
</template>
<style scoped lang="scss">
.content {
    padding: 0;

    .description {
        padding: 0 30rpx;
    }

    .type-block {
        margin: 30rpx 0;
    }

    .demo-item {
        .title {
            padding: 0 30rpx;
        }

        .item-content {
            padding: 0 30rpx;

            .demo-code {
                // display: inline-block;
                margin: 0 12rpx 12rpx 0;
            }
        }

        :deep(.test-signs) {
            color: #fff;
            background-color: #000;
        }
    }
}
</style>
