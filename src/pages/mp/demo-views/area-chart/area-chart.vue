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
                data: [
                    { name: '一班', value: 50 },
                    { name: '二班', value: 30 },
                    { name: '三班', value: 20 },
                    { name: '四班', value: 18 },
                    { name: '五班', value: 8 },
                    { name: '六班', value: 5 },
                ],
            },
        ];
    }, 500);
}
</script>

<template>
    <page-layout title="环形图">
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
                <ste-ring-chart :series="series2"></ste-ring-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">副标题，标题+副标题</view>
            <view class="item-block">
                <ste-ring-chart
                    :series="series1"
                    :subtitle="{
                        name: '50%',
                    }"
                ></ste-ring-chart>
            </view>
            <view class="item-block">
                <ste-ring-chart
                    :series="series1"
                    :title="{
                        name: '指标名',
                    }"
                    :subtitle="{
                        name: '50%',
                    }"
                ></ste-ring-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">图例</view>
            <view class="item-block">
                <ste-ring-chart
                    :series="series1"
                    :height="400"
                    :title="{
                        name: '指标名',
                    }"
                    :subtitle="{
                        name: '50%',
                    }"
                    :legend="{
                        show: true,
                        position: 'bottom',
                    }"
                    :extra="{ ring: { ringWidth: 10.5, customRadius: 64, offsetAngle: -90, linearType: 'none' } }"
                ></ste-ring-chart>
            </view>
            <view class="item-block">
                <ste-ring-chart
                    :series="series1"
                    :height="400"
                    :title="{
                        name: '指标名',
                    }"
                    :subtitle="{
                        name: '50%',
                    }"
                    :legend="{
                        show: true,
                        position: 'right',
                    }"
                    :extra="{ ring: { ringWidth: 10.5, customRadius: 64, offsetAngle: -90, linearType: 'none' } }"
                ></ste-ring-chart>
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
