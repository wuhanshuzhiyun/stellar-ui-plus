<script setup lang="ts">
import { ref, onMounted } from 'vue';
let series1: any = ref([]);
let categories: any = ref([]);
let series2: any = ref([]);
let categories2: any = ref([]);

series1.value = [
    {
        name: '目标值',
        data: [35, 36, 31, 33, 13, 34],
    },
];
categories.value = ['2018', '2019', '2020', '2021', '2022', '2023'];

series2.value = [
    {
        name: '目标值',
        data: [35, 36, 31, 33, 13, 34],
    },
    {
        name: '完成量',
        data: [18, 27, 21, 24, 6, 28],
    },
];
</script>

<template>
    <page-layout title="折线图">
        <view class="description margin-view">
            <view class="cmp-name">LineChart 折线图</view>
            <view class="cmp-desc">折线图主要用来展示数据项随着时间推移的趋势或变化</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-line-chart :series="series1" :categories="categories"></ste-line-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">多图例</view>
            <view class="item-block">
                <ste-line-chart :series="series2" :categories="categories" :dataLabel="true" :legend="{ show: true }"></ste-line-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">曲线</view>
            <view class="item-block">
                <ste-line-chart :series="series2" :categories="categories" :dataLabel="false" :extra="{ line: { type: 'curve' } }"></ste-line-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">迷你图表</view>
            <view class="item-block">
                <ste-line-chart
                    :series="series1"
                    :categories="categories"
                    :dataLabel="false"
                    :xAxis="{ disabled: true, disableGrid: true, axisLine: false }"
                    :yAxis="{ disabled: true, disableGrid: true }"
                    width="300"
                ></ste-line-chart>
                <ste-line-chart
                    :series="series1"
                    :categories="categories"
                    :dataLabel="false"
                    :xAxis="{ disabled: true, disableGrid: true, axisLine: false }"
                    :yAxis="{ disabled: true, disableGrid: true }"
                    :extra="{ line: { type: 'curve' } }"
                    width="300"
                ></ste-line-chart>
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
