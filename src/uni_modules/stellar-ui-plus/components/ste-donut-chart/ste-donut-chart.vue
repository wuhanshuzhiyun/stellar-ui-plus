<template>
    <view>
        <canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchend="tap" :style="[chartStyle]" :canvas2d="props.canvas2d"></canvas>
    </view>
</template>

<script setup lang="ts">
import uCharts from '../../Charts/Charts';
let uChartsInstance: { [key: string]: any } = {};
import { ref, onMounted, computed, type CSSProperties, watch } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';
defineOptions({
    name: 'ste-donut-chart',
    virtualHost: true,
});

let props = defineProps(propsData);

let canvasId = ref('');
let cWidth = computed(() => {
    return uni.upx2px(Number(props.width));
});
let cHeight = computed(() => {
    return uni.upx2px(Number(props.height));
});

const chartStyle = computed(() => {
    let style: CSSProperties = {};
    style.width = cWidth + 'px';
    style.height = cHeight + 'px';
    return style;
});

onMounted(() => {
    // 赋予id，id不能为数字开头
    canvasId.value = utils.guid();
    drawCharts(props.series);
});

watch(
    () => props.series,
    (series: any) => {
        console.log('series', series);
        uChartsInstance[canvasId.value].updateData({
            series: series,
        });
    }
);

function drawCharts(series: any) {
    // 默认配置项
    const ctx = uni.createCanvasContext(canvasId.value);
    uChartsInstance[canvasId.value] = new uCharts<'ring'>({
        type: 'ring',
        context: ctx,
        width: cWidth.value,
        height: cHeight.value,
        series: utils.deepClone(series),
        pixelRatio: props.pixelRatio,
        animation: props.animation,
        timing: props.timing,
        duration: props.duration,
        rotate: props.rotate,
        rotateLock: props.rotateLock,
        background: props.background,
        color: props.color,
        padding: props.padding,
        fontSize: props.fontSize,
        fontColor: props.fontColor,
        dataLabel: props.dataLabel,
        dataPointShape: props.dataPointShape,
        dataPointShapeType: props.dataPointShapeType,
        touchMoveLimit: props.touchMoveLimit,
        enableScroll: props.enableScroll,
        enableMarkLine: props.enableMarkLine,
        scrollPosition: props.scrollPosition,
        update: props.update,
        xAxis: props.xAxis,
        yAxis: props.yAxis,
        legend: props.legend,
        title: props.title,
        subtitle: props.subtitle,
        extra: props.extra,
    });
}
function tap(e: any) {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
}
</script>

<style scoped></style>
