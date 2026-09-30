<script setup lang="ts">
import { ref, onMounted } from 'vue';
let series1: any = ref([]);
let series2: any = ref([]);
const activeIndex = ref(-1);
onMounted(() => {
    getServerData();
});
function getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
        series1.value = [{ name: '完成率', color: '#165DFF', data: 0.8 }];
        series2.value = [
            { name: '完成率', color: '#3CC08E', data: 0.72 },
            { name: '覆盖率', color: '#2D7DF6', data: 0.56 },
        ];
    }, 500);
}
// 再次点击同一圆弧或点击空白处取消高亮
function onRingTap(index: number) {
    activeIndex.value = index === activeIndex.value ? -1 : index;
}
</script>

<template>
    <page-layout title="圆弧进度图">
        <view class="description margin-view">
            <view class="cmp-name">ArcbarChart 圆弧进度图</view>
            <view class="cmp-desc">用圆弧长度表示进度，支持半圆弧、整圆及多条圆弧同心嵌套，点击可识别命中的圆弧并高亮。</view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">默认配置</view>
            <view class="item-block">
                <ste-arcbar-chart :series="series1" :subtitle="{ name: '80%' }"></ste-arcbar-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">半圆弧</view>
            <view class="item-block">
                <ste-arcbar-chart
                    :series="series1"
                    :title="{ name: '完成率' }"
                    :subtitle="{ name: '80%' }"
                    :extra="{ arcbar: { type: 'default', width: 12, startAngle: 0.75, endAngle: 0.25 } }"
                ></ste-arcbar-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">多环嵌套</view>
            <view class="item-block">
                <ste-arcbar-chart :series="series2" :extra="{ arcbar: { width: 10, gap: 6, lineCap: 'butt', backgroundColor: '#E8F1FD' } }"></ste-arcbar-chart>
            </view>
        </view>
        <view class="demo-item">
            <view class="title margin-view">点击高亮</view>
            <view class="item-block">
                <ste-arcbar-chart :series="series2" :activeIndex="activeIndex" @ring-tap="onRingTap"></ste-arcbar-chart>
            </view>
            <view class="margin-view tip">当前高亮：{{ activeIndex === -1 ? '无' : series2[activeIndex]?.name }}</view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
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

.tip {
    font-size: 24rpx;
    color: #666666;
    text-align: center;
}
</style>
