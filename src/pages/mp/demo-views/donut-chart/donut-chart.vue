<script setup lang="ts">
import { ref, onMounted } from 'vue';
let series1: any = ref([]);
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
                data: [
                    { name: '成功率', value: 50 },
                    { name: '失败率', value: 50 },
                ],
            },
        ];
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
            <view class="cmp-name">DonutChart 环形图</view>
            <view class="cmp-desc">可以用来表示数据占总体的比例，相比于饼图，它中间空余的部分可以用来显示一些额外的文字等信息，因而也是一种常用的图表类型。</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-donut-chart :series="series1" :color="['#165DFF', '#DDDDDD']"></ste-donut-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认颜色</view>
            <view class="item-block">
                <ste-donut-chart :series="series2"></ste-donut-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">标题配置</view>
            <view class="item-block">
                <ste-donut-chart :series="series1" :title="{ name: '指标名', fontSize: 12 }"></ste-donut-chart>
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
