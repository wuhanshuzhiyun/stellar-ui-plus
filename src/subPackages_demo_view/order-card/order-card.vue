<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
    {
        image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
        title: '梅姨家常菜馆',
        subTitle: '商品描述',
    },
]);
</script>
<template>
    <page-layout title="订单卡片" contentStyle="padding: 12rpx;background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">OrderCard 订单卡片</view>
            <view class="cmp-desc">商品信息组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法(一条数据)</view>
            <ste-order-card
                title="梅姨家常菜馆"
                image="https://image.whzb.com/chain/StellarUI/bg1.jpg"
                :data="data"
                statusText="待核销"
                tagText="标签"
                helperText="辅助信息：XXXX-XX-XX"
                subBtnText="次要功能"
                mainBtnText="主要功能"
            />
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
