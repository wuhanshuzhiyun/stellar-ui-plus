<template>
    <view>
        <canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchend="tap" @mouseup="tap" :style="[chartStyle]" :canvas2d="props.canvas2d"></canvas>
    </view>
</template>

<script setup lang="ts">
import uCharts from '../../Charts/Charts';
import { ref, onMounted, computed, type CSSProperties, watch, getCurrentInstance, type ComponentPublicInstance } from 'vue';
import utils from '../../utils/utils';
import { propsData, propsComponent } from './props';
import type { ChartsOptions } from '../../Charts/types/index';
defineOptions({
    name: 'ste-ring-chart',
    virtualHost: true,
});
const charts = ref<uCharts<'ring'>>();
// 合并默认对象配置
let props = defineProps(propsData);
let cmpProps = computed(() => {
    return {
        xAxis: utils.deepMerge(utils.deepClone(propsComponent()?.xAxis ?? {}), props.xAxis),
        yAxis: utils.deepMerge(utils.deepClone(propsComponent()?.yAxis ?? {}), props.yAxis),
        legend: utils.deepMerge(utils.deepClone(propsComponent()?.legend ?? {}), props.legend),
        title: utils.deepMerge(utils.deepClone(propsComponent()?.title ?? {}), props.title),
        subtitle: utils.deepMerge(utils.deepClone(propsComponent()?.subtitle ?? {}), props.subtitle),
        extra: utils.deepMerge(utils.deepClone(propsComponent()?.extra ?? {}), props.extra),
    };
});
// 赋予id，id不能为数字开头
let canvasId = ref(utils.guid());
const ctx = ref<UniNamespace.CanvasContext>();
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

const thas = ref<ComponentPublicInstance | null>();

onMounted(() => {
    ctx.value = uni.createCanvasContext(canvasId.value, getCurrentInstance());
    thas.value = getCurrentInstance()?.proxy;
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
    const options: ChartsOptions<'ring'> = {
        type: 'ring',
        context: ctx.value || uni.createCanvasContext(canvasId.value, getCurrentInstance()),
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
    };
    charts.value = new uCharts<'ring'>(options);
}
function tap(e: any) {
    charts?.value.touchLegend(e);
    charts?.value.showToolTip(e);
}

async function getImage() {
    if (props.canvas2d == false) {
        return new Promise(resolve => {
            uni.canvasToTempFilePath(
                {
                    canvasId: canvasId.value,
                    success: res => {
                        resolve(res.tempFilePath);
                    },
                },
                thas.value
            );
        });
    } else {
        return new Promise(resolve => {
            const query = uni.createSelectorQuery().in(thas.value);
            query
                .select('#' + canvasId.value)
                .fields({ node: true, size: true })
                .exec(res => {
                    if (res[0]) {
                        uni.canvasToTempFilePath(
                            {
                                canvasId: canvasId.value, // 传入 canvas 实例
                                success: result => {
                                    // result.tempFilePath 就是生成的图片路径
                                    resolve(result.tempFilePath);
                                },
                                fail: err => {
                                    reject(err);
                                },
                            },
                            thas.value
                        ); // 这里的 thas.value 必须是当前组件实例
                    }
                });
        });
    }
}
defineExpose({
    getImage,
});
</script>

<style scoped></style>
