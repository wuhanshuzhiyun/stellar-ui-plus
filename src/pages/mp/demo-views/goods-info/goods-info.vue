<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
    image: 'https://img.alicdn.com/imgextra/i2/O1CN01KXjxYq1q2Y9jKZY5y_!!6000000001498-0-tps-200-200.png',
    title: '商品名称',
    tag: '新品',
    barCode: '1234567890123',
    code: '1234567890123',
    price: '￥ 999.00',
    originalPrice: '￥ 999.00',
});
</script>
<template>
    <page-layout title="商品信息" contentStyle="padding: 0">
        <view class="description">
            <view class="cmp-name">GoodsList 商品信息</view>
            <view class="cmp-desc">商品信息组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-goods-info :data="data" />
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
