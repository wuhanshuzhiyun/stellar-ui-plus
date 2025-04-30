<script setup lang="ts">
import type { ChartsExtra } from '@/uni_modules/stellar-ui-plus/Charts/extra';
import type { ChartsSerie } from '@/uni_modules/stellar-ui-plus/Charts/types';
import { ref, onMounted } from 'vue';

const series = ref<ChartsSerie<'bar'>[]>([
    {
        name: '测试1',
        data: [35, 36, 31],
    },
    {
        name: '测试2',
        data: [20, 16, 40],
    },
]);
const categories = ref<string[]>(['2022', '2023', '2024']);

const extra: ChartsExtra = {
    bar: {
        type: 'stack',
        width: 30,
        meterBorde: 1,
        meterFillColor: '#FFFFFF',
        activeBgColor: '#000000',
        activeBgOpacity: 0.08,
        categoryGap: 2,
    },
};

onMounted(() => {
    getServerData();
});
function getServerData() {
    //模拟从服务器获取数据时的延时
    // setTimeout(() => {
    //     // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    //     categories.value = ['2022', '2023', '2024'];
    //     series.value = [
    //         {
    //             name: '测试1',
    //             data: [35, 36, 31],
    //         },
    //         {
    //             name: '测试2',
    //             data: [20, 16, 40],
    //         },
    //     ];
    // }, 2000);
}
</script>

<template>
    <page-layout title="条状图">
        <view class="description margin-view">
            <view class="cmp-name">BarChart 条状图</view>
            <view class="cmp-desc">一种通过不同长度的条形展示分类数据大小的统计图表，适用于直观比较各类别间的数值差异。</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-bar-chart :series="series" width="660" height="400" :categories="categories"></ste-bar-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">堆叠图</view>
            <view class="item-block">
                <ste-bar-chart :series="series" width="660" height="400" :categories="categories" :extra="extra"></ste-bar-chart>
            </view>
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
}

:deep(.page > .content) {
    padding: 0;
    margin: 0;
}

.margin-view {
    margin: 0 40rpx;
}
</style>
