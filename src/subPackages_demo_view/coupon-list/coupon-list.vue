<script lang="ts" setup>
import { computed, ref } from 'vue';

const data = ref({
    title: '满11-5乐事组合【外卖】',
    desc: '截至日期 2025.11.30',
    image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
    price: 500,
    constraint: '满11可用',
    footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使'],
});
const endTime = computed(() => Date.now() + 60 * 60 * 1000 * 2);
</script>

<template>
    <page-layout title="动画">
        <view class="description">
            <view class="cmp-name">CouponList 券列表</view>
            <view class="cmp-desc">此组件用于展示券列表</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <ste-coupon-list :data="data" />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">倒计时</view>
            <view class="item-block">
                <ste-coupon-list :data="data" :endTime="endTime" />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">按钮文字</view>
            <view class="item-block">
                <ste-coupon-list :data="data" buttonText="去使用" />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">禁用按钮</view>
            <view class="item-block">
                <ste-coupon-list :data="data" buttonDisabled />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">进度条</view>
            <view class="item-block">
                <ste-coupon-list :data="data" :progress="50" progressText="仅剩40件" />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">Position插槽</view>
            <view class="item-block">
                <ste-coupon-list :data="data">
                    <template #position>
                        <view class="position-slot">
                            <ste-image src="https://image.whzb.com/chain/StellarUI/售罄.png" width="130" height="92" />
                        </view>
                    </template>
                </ste-coupon-list>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.page {
    background-color: #f5f5f5;
    .content {
        .demo-item {
            .item-block {
                .position-slot {
                    position: absolute;
                    top: 6rpx;
                    right: 6rpx;
                }
            }
        }
    }
}
</style>
