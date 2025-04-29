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
import { propsData, propsComponent } from './props';
defineOptions({
    name: 'ste-column-chart',
    virtualHost: true,
});

// 合并默认对象配置
let props = defineProps(propsData);
let cmpProps = computed(() => {
    return {
        xAxis: utils.deepMerge(utils.deepClone(propsComponent?.xAxis ?? {}), props.xAxis),
        yAxis: utils.deepMerge(utils.deepClone(propsComponent?.yAxis ?? {}), props.yAxis),
        legend: utils.deepMerge(utils.deepClone(propsComponent.legend), props.legend),
        title: utils.deepMerge(utils.deepClone(propsComponent.title), props.title),
        subtitle: utils.deepMerge(utils.deepClone(propsComponent?.subtitle ?? {}), props.subtitle),
        extra: utils.deepMerge(utils.deepClone(propsComponent.extra), props.extra),
    };
});

let canvasId = ref('');
let cWidth = computed(() => {
    return utils.formatPx(Number(props.width), 'num');
});
let cHeight = computed(() => {
    return utils.formatPx(Number(props.height), 'num');
});

const chartStyle = computed(() => {
    let style: CSSProperties = {};
    style.width = cWidth.value + 'px';
    style.height = cHeight.value + 'px';
    return style;
});

onMounted(() => {
    canvasId.value = utils.guid();
    // 赋予id，id不能为数字开头
    drawCharts(props.series);
});

watch(
    () => props.series,
    (series: any) => {
        drawCharts(series);
    }
);

function drawCharts(series: any) {
    // 默认配置项
    const ctx = uni.createCanvasContext(canvasId.value);
    uChartsInstance[canvasId.value] = new uCharts<'column'>({
        type: 'column',
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
        xAxis: cmpProps.value.xAxis,
        yAxis: cmpProps.value.yAxis,
        legend: cmpProps.value.legend,
        title: cmpProps.value.title,
        subtitle: cmpProps.value.subtitle,
        extra: cmpProps.value.extra,
        categories: props.categories,
    });
}
function tap(e: any) {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
}
</script>

<style scoped></style>
