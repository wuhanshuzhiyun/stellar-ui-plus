<script setup lang="ts">
import { useMessageBox } from '@/uni_modules/stellar-ui-plus/composables';
import { title } from 'process';
import { ref, watch } from 'vue';

const data = [
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
];
</script>
<template>
    <page-layout title="商品信息" contentStyle="padding: 12rpx;background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">GoodsList 商品信息</view>
            <view class="cmp-desc">商品信息组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-function-list title="今日餐食" subhead="食刻准备 到点开吃" :data="data" buttonText="核销" buttonIcon="&#xe693;" />
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
