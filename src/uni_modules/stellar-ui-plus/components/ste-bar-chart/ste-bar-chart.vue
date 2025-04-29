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
import type { ChartsOptions, ChartsSerie } from '../../Charts/types';
defineOptions({
    name: 'ste-donut-chart',
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
    return utils.formatPx(props.width, 'num');
});
let cHeight = computed(() => {
    return utils.formatPx(props.height, 'num');
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
    series => {
        drawCharts(series);
    }
);

function drawCharts(series: ChartsSerie<'bar'>[]) {
    // 默认配置项
    const ctx = uni.createCanvasContext(canvasId.value);
    // const options: ChartsOptions<'bar'> = {
    //     type: 'bar',
    //     context: ctx,
    //     width: cWidth.value,
    //     height: cHeight.value,
    //     categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
    //     series: [
    //         {
    //             name: '目标值',
    //             data: [35, 36, 31, 33, 13, 34],
    //         },
    //         {
    //             name: '完成量',
    //             data: [18, 27, 21, 24, 6, 28],
    //         },
    //     ],
    //     animation: true,
    //     background: '#FFFFFF',
    //     color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
    //     padding: [15, 30, 0, 5],
    //     enableScroll: false,
    //     legend: {},
    //     xAxis: {
    //         boundaryGap: 'justify',
    //         disableGrid: false,
    //         min: 0,
    //         axisLine: false,
    //         max: 40,
    //     },
    //     yAxis: {},
    //     extra: {
    //         bar: {
    //             type: 'group',
    //             width: 30,
    //             meterBorde: 1,
    //             meterFillColor: '#FFFFFF',
    //             activeBgColor: '#000000',
    //             activeBgOpacity: 0.08,
    //             linearType: 'custom',
    //             barBorderCircle: true,
    //             seriesGap: 2,
    //             categoryGap: 2,
    //         },
    //     },
    // };
    const options: ChartsOptions<'bar'> = {
        type: 'bar',
        context: ctx,
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
        categories: props.categories,
    };
    console.log('options', options);
    uChartsInstance[canvasId.value] = new uCharts<'bar'>(options);
}
function tap(e: any) {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
}
</script>

<style scoped></style>
