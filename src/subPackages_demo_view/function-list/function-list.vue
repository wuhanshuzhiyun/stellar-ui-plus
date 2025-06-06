<script setup lang="ts">
import type { FunctionListItem } from '@/uni_modules/stellar-ui-plus/components/ste-function-list/props';
import { ref } from 'vue';

const data = ref<FunctionListItem[]>([
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
]);
const data1 = ref<FunctionListItem[]>([
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg', buttonText: '自定义' },
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
    { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
]);
</script>
<template>
    <page-layout title="功能列表" contentStyle="padding: 12rpx;background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">FunctionList 功能列表</view>
            <view class="cmp-desc">商品信息组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法(一条数据)</view>
            <ste-function-list title="今日餐食" subhead="食刻准备 到点开吃" :data="data" buttonText="核销" buttonIcon="&#xe693;" />
        </view>
        <view class="demo-item">
            <view class="title">基础用法(没有数据)</view>
            <ste-function-list
                title="今日餐食"
                subhead="食刻准备 到点开吃"
                empty-button-text="去订餐"
                empty-image="https://image.whzb.com/chain/StellarUI/bg1.jpg"
                empty-text="暂未订餐，先去看看吧~"
            />
        </view>
        <view class="demo-item">
            <view class="title">数据按钮自定义</view>
            <ste-function-list title="今日餐食" subhead="食刻准备 到点开吃" :data="data1" buttonText="核销" buttonIcon="&#xe693;" />
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
