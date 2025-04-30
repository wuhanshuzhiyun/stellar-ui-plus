<script setup lang="ts">
import type { ChartsExtra } from '@/uni_modules/stellar-ui-plus/Charts/types/extra';
import type { ChartsSerie } from '@/uni_modules/stellar-ui-plus/Charts/types';
import { ref, onMounted } from 'vue';
let series1 = ref<ChartsSerie<'pie'>[]>([
    {
        name: '测试1',
        data: [
            { name: '一班', value: 50 },
            { name: '二班', value: 30 },
            { name: '三班', value: 20 },
        ],
    },
]);
let series2 = ref<ChartsSerie<'pie'>[]>([]);

const extra: ChartsExtra = {
    pie: {
        activeOpacity: 0.5,
        activeRadius: 10,
        offsetAngle: 0,
        labelWidth: 15,
        border: true,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        linearType: 'custom',
    },
    markLine: {
        type: 'dash',
    },
};

onMounted(() => {
    getServerData();
});
function getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        series2.value = [
            {
                name: '测试2',
                data: [
                    { name: '一班', value: 50 },
                    { name: '二班', value: 30 },
                    { name: '三班', value: 20 },
                    { name: '四班', value: 18 },
                    { name: '五班', value: 8 },
                ],
            },
        ];
    }, 1000);
}
</script>

<template>
    <page-layout title="饼图">
        <view class="description margin-view">
            <view class="cmp-name">PieChart 饼图</view>
            <view class="cmp-desc">主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例。</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-pie-chart :series="series1" width="420" height="420" :enableScroll="false"></ste-pie-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">带分割线+渐变色</view>
            <view class="item-block">
                <ste-pie-chart :series="series2" width="420" height="420" :extra="extra"></ste-pie-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">显示Label</view>
            <view class="item-block">
                <ste-pie-chart :series="series1" width="420" height="420" dataLabel></ste-pie-chart>
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
    display: flex;
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
