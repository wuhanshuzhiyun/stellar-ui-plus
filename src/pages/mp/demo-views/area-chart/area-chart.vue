<script setup lang="ts">
import { ref, onMounted } from 'vue';
let series1: any = ref([]);
let categories1: any = ref([]);
let series2: any = ref([]);
onMounted(() => {
    getServerData();
});
function getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        series1.value = [
            {
                name: '成交量A',
                data: [35, 8, 25, 37, 4, 20],
            },
            {
                name: '成交量B',
                data: [70, 40, 65, 100, 44, 68],
            },
        ];
        categories1.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
        series2.value = [
            {
                name: '成交量A',
                data: [35, 8, 25, 37, 4, 20],
            },
            {
                name: '成交量B',
                data: [40, 35, 12, 44, 89, 14],
            },
            {
                name: '成交量C',
                data: [45, 27, 32, 100, 65, 20],
            },
            {
                name: '成交量D',
                data: [50, 25, 65, 100, 44, 68],
            },
            {
                name: '成交量B',
                data: [70, 35, 45, 89, 26, 54],
            },
        ];
    }, 500);
}
</script>

<template>
    <page-layout title="面积图">
        <view class="description margin-view">
            <view class="cmp-name">AreaChart 面积图</view>
            <view class="cmp-desc">区域面积图将折线到坐标轴的空间设置背景色，用区域面积表达数据。相比普通的折线图，区域面积图的视觉效果更加饱满丰富，在系列不多的场景下尤其适用。</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-area-chart :series="series1" :categories1="categories1"></ste-area-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认颜色</view>
            <view class="item-block">
                <ste-area-chart :series="series2" :categories1="categories1"></ste-area-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">区域图类型</view>
            <ste-area-chart :series="series1" :categories1="categories1"></ste-area-chart>
            <ste-area-chart :series="series1" :categories1="categories1" :extra="{ area: { type: 'curve' } }"></ste-area-chart>
            <ste-area-chart :series="series1" :categories1="categories1" :extra="{ area: { type: 'step' } }"></ste-area-chart>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.loading-box {
    flex-direction: column !important;
    row-gap: 20rpx;
    align-items: flex-start !important;
    justify-content: center;
}
.item-block {
    column-gap: 40rpx;
    justify-content: center;
}

:deep(.page > .content) {
    padding: 0;
    margin: 0;
}

.margin-view {
    margin: 0 40rpx;
}
</style>
