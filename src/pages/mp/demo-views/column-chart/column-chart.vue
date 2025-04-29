<script setup lang="ts">
import { ref, onMounted } from 'vue';
let series1: any = ref([]);
let categories: any = ref([]);
let series2: any = ref([]);
let categories2: any = ref([]);

onMounted(() => {
    getServerData();
});
function getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
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
    }, 100);
}
</script>

<template>
    <page-layout title="柱状图">
        <view class="description margin-view">
            <view class="cmp-name">ColumnChart 柱状图</view>
            <view class="cmp-desc">柱状图（或称条形图）是一种通过柱形的长度来表现数据大小的一种常用图表类型</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-column-chart :series="series1" :categories="categories"></ste-column-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">多图例</view>
            <view class="item-block">
                <ste-column-chart :series="series2" :categories="categories" :dataLabel="false" :extra="{ column: { width: 20 } }" :legend="{ show: true }"></ste-column-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">堆叠</view>
            <view class="item-block">
                <ste-column-chart :series="series2" :categories="categories" :dataLabel="false" :extra="{ column: { type: 'stack' } }"></ste-column-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">迷你图表</view>
            <view class="item-block">
                <ste-column-chart
                    :series="series1"
                    :categories="categories"
                    :dataLabel="false"
                    :xAxis="{ disabled: true, disableGrid: true, axisLine: false }"
                    :yAxis="{ disabled: true, disableGrid: true }"
                    :extra="{ column: { width: 20 } }"
                    width="500"
                ></ste-column-chart>
            </view>
        </view>
        <!-- <view class="demo-item">
            <view class="title margin-view">显示类型</view>
            <view class="item-block">
                <ste-column-chart :series="series1" :extra="{ funnel: { type: 'triangle', minSize: 0 } }"></ste-column-chart>
            </view>
            <view class="item-block">
                <ste-column-chart :series="series1" :extra="{ funnel: { type: 'pyramid' } }"></ste-column-chart>
            </view>
        </view> -->
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
