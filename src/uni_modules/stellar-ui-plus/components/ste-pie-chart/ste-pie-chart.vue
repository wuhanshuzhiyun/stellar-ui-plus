<template>
    <view>
        <canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchend="tap" :style="[chartStyle]" :canvas2d="props.canvas2d"></canvas>
    </view>
</template>

<script setup lang="ts">
import uCharts from '../../Charts/Charts';
import { ref, onMounted, computed, type CSSProperties, watch, getCurrentInstance } from 'vue';
import utils from '../../utils/utils';
import { propsData, propsComponent } from './props';
import type { ChartsOptions, ChartsSerie } from '../../Charts/types';
defineOptions({
    name: 'ste-pie-chart',
    virtualHost: true,
});

const charth = ref<uCharts<'pie'>>();
// 合并默认对象配置
const props = defineProps(propsData);
const cmpProps = computed(() => {
    return {
        xAxis: utils.deepMerge(propsComponent().xAxis || {}, props.xAxis),
        yAxis: utils.deepMerge(propsComponent().yAxis || {}, props.yAxis),
        legend: utils.deepMerge(propsComponent().legend || {}, props.legend),
        title: utils.deepMerge(propsComponent().title || {}, props.title),
        subtitle: utils.deepMerge(propsComponent().subtitle || {}, props.subtitle),
        extra: utils.deepMerge(propsComponent().extra || {}, props.extra),
    };
});

const canvasId = ref(utils.guid());
const ctx = ref<UniNamespace.CanvasContext>();
const cWidth = computed(() => {
    return utils.formatPx(props.width, 'num');
});
const cHeight = computed(() => {
    return utils.formatPx(props.height, 'num');
});

const chartStyle = computed(() => {
    const style: CSSProperties = {};
    style.width = cWidth.value + 'px';
    style.height = cHeight.value + 'px';
    return style;
});

onMounted(() => {
    ctx.value = uni.createCanvasContext(canvasId.value, getCurrentInstance());
    if (props.series.length) drawCharts(props.series);
});

watch(
    () => props.series,
    series => {
        console.log('series', series);
        drawCharts(series);
    }
);

function drawCharts(series: ChartsSerie<'pie'>[]) {
    // 默认配置项
    const options: ChartsOptions<'pie'> = {
        type: 'pie',
        context: ctx.value || uni.createCanvasContext(canvasId.value, getCurrentInstance()),
        width: cWidth.value,
        height: cHeight.value,
        series,
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
    };
    charth.value = new uCharts<'pie'>(options);
}
function tap(e: any) {
    charth.value?.touchLegend(e);
    charth.value?.showToolTip(e);
}
</script>

<style scoped></style>
