<template>
    <view>
        <canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchend="tap" @mouseup="mouseTap" :style="[chartStyle]" :canvas2d="props.canvas2d"></canvas>
    </view>
</template>

<script setup lang="ts">
import uCharts from '../../Charts/Charts';
import { ref, onMounted, computed, type CSSProperties, watch, getCurrentInstance, type ComponentPublicInstance } from 'vue';
import utils from '../../utils/utils';
import Color from '../../utils/Color';
import { propsData, propsComponent } from './props';
import type { ChartsOptions, ChartsSerie } from '../../Charts/types/index';
defineOptions({
    name: 'ste-arcbar-chart',
    virtualHost: true,
});
const charts = ref<uCharts<'arcbar'>>();
// 合并默认对象配置
let props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'ring-tap', index: number): void;
}>();
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
    if (props.series.length) drawCharts(props.series);
});

watch(
    () => props.series,
    (series: any) => {
        drawCharts(series);
    }
);

// 高亮切换只换色，不重播进度动画
watch(
    () => [props.activeIndex, props.inactiveOpacity],
    () => {
        if (!charts.value) return;
        charts.value.updateData({ series: getDisplaySeries(props.series), animation: false } as ChartsOptions<'arcbar'>);
    }
);

/**
 * 按 activeIndex 生成绘制用 series：非激活圆弧降低透明度
 * 渐变模式（linearType: 'custom'）下 uCharts 仅支持16进制色值，不做淡化
 */
function getDisplaySeries(series: ChartsSerie<'arcbar'>[]) {
    const list: ChartsSerie<'arcbar'>[] = utils.deepClone(series || []);
    const active = props.activeIndex;
    if (active < 0 || active >= list.length || cmpProps.value.extra.arcbar?.linearType === 'custom') return list;
    // 与 uCharts fillSeries 一致：未指定颜色的 series 依次取主题色
    let colorIndex = 0;
    return list.map((item, i) => {
        let color = item.color;
        if (!color) {
            color = props.color[colorIndex];
            colorIndex = (colorIndex + 1) % props.color.length;
        }
        return { ...item, color: i === active ? color : Color.formatColor(color, props.inactiveOpacity) };
    });
}

function drawCharts(series: any) {
    // 默认配置项
    const options: ChartsOptions<'arcbar'> = {
        type: 'arcbar',
        context: ctx.value || uni.createCanvasContext(canvasId.value, getCurrentInstance()),
        width: cWidth.value,
        height: cHeight.value,
        series: getDisplaySeries(series),
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
    charts.value = new uCharts<'arcbar'>(options);
}

/** 获取触点相对画布左上角的坐标（css px） */
function getTouchPoint(e: any): { x: number; y: number } | null {
    // 触摸事件：小程序与 H5（uni 已注入）的 canvas 触点 x/y 均为相对画布坐标
    const touch = e?.changedTouches?.[0] || e?.mp?.changedTouches?.[0];
    if (touch && typeof touch.x === 'number') return { x: touch.x, y: touch.y };
    // H5 鼠标事件：视口坐标减去画布位置
    const el = e?.currentTarget || e?.target;
    if (typeof e?.clientX === 'number' && el?.getBoundingClientRect) {
        const rect = el.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    return null;
}

/** 命中检测：返回触点所在圆弧的 series 下标，未命中返回 -1 */
function getRingIndex(point: { x: number; y: number }) {
    const opts: any = charts.value?.opts;
    const arcbarData = opts?.chartData?.arcbarData;
    if (!arcbarData?.center) return -1;
    const pix = opts.pix || 1;
    const arcbar = cmpProps.value.extra.arcbar || {};
    const lineWidth = (arcbar.width ?? 12) * pix;
    const gap = (arcbar.gap ?? 2) * pix;
    const x = point.x * pix;
    const y = point.y * pix;
    const d = Math.sqrt(Math.pow(x - arcbarData.center.x, 2) + Math.pow(y - arcbarData.center.y, 2));
    // 与 drawArcbarDataPoints 一致：第 i 条圆弧半径 = radius - (lineWidth + gap) * i；容差取线宽一半 + 间距一半，环间无死区
    const tolerance = (lineWidth + gap) / 2;
    const len = arcbarData.series?.length || 0;
    for (let i = 0; i < len; i++) {
        const r = arcbarData.radius - (lineWidth + gap) * i;
        if (Math.abs(d - r) <= tolerance) return i;
    }
    return -1;
}

// H5 移动端 touchend 后会补发 mouseup，需去重
let lastTouchTime = 0;
function tap(e: any) {
    lastTouchTime = Date.now();
    handleTap(e);
}
function mouseTap(e: any) {
    if (Date.now() - lastTouchTime < 600) return;
    handleTap(e);
}
function handleTap(e: any) {
    if (!charts.value) return;
    const point = getTouchPoint(e);
    if (!point) return;
    emits('ring-tap', getRingIndex(point));
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
        return new Promise((resolve, reject) => {
            const query = uni.createSelectorQuery().in(thas.value);
            query
                .select('#' + canvasId.value)
                .fields({ node: true, size: true })
                .exec(res => {
                    if (res[0]) {
                        uni.canvasToTempFilePath(
                            {
                                canvasId: canvasId.value,
                                success: result => {
                                    resolve(result.tempFilePath);
                                },
                                fail: err => {
                                    reject(err);
                                },
                            },
                            thas.value
                        );
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
