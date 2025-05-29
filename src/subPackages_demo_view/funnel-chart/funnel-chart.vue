<script setup lang="ts">
import { ref } from 'vue';
let series1: any = ref([]);
let series2: any = ref([]);
series1.value = [
    {
        data: [
            { name: '一班', value: 50 },
            { name: '二班', value: 30 },
            { name: '三班', value: 20 },
            { name: '四班', value: 18 },
            { name: '五班', value: 8 },
        ],
    },
];
series2.value = [
    {
        data: [
            { name: '一班', centerText: '标签 50', value: 50, labelShow: false },
            { name: '二班', centerText: '30', value: 30, labelShow: false },
            { name: '三班', centerText: '20', value: 20, labelShow: false },
            { name: '四班', centerText: '18', value: 18, labelShow: false },
            { name: '五班', centerText: '8', value: 8, labelShow: false },
        ],
    },
];
</script>

<template>
    <page-layout title="漏斗图">
        <view class="description margin-view">
            <view class="cmp-name">FunnelChart 漏斗图</view>
            <view class="cmp-desc">漏斗图适用于业务流程比较规范、周期长、环节多的单流程单向分析</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-funnel-chart :series="series1"></ste-funnel-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">显示标签</view>
            <view class="item-block">
                <ste-funnel-chart :series="series2"></ste-funnel-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">显示类型</view>
            <view class="item-block">
                <ste-funnel-chart :series="series1" :extra="{ funnel: { type: 'triangle', minSize: 0 } }"></ste-funnel-chart>
            </view>
            <view class="item-block">
                <ste-funnel-chart :series="series1" :extra="{ funnel: { type: 'pyramid' } }"></ste-funnel-chart>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.item-block {
    column-gap: 40rpx;
}

:deep(.page > .content) {
    padding: 0;
    margin: 0;
}

.margin-view {
    margin: 0 40rpx;
}
</style>
