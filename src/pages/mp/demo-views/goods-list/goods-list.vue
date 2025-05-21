<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
    {
        label: '调价类型',
        value: '促销调价',
    },
    {
        label: '原售价',
        value: '￥ 20.90',
    },
    {
        label: '新售价',
        value: '￥ 19.90',
    },
    {
        label: '变更日期',
        value: '2025-05-20',
    },
]);
</script>
<template>
    <page-layout title="商品列表" contentStyle="padding: 0">
        <view class="description">
            <view class="cmp-name">GoodsList 商品列表</view>
            <view class="cmp-desc">商品列表组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-goods-list title="价格数据" :data="data" method methodText="查看详情" />
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
