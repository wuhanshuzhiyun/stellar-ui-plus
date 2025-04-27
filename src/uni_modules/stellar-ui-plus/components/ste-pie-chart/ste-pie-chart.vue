<template>
    <view>
        <canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchend="tap" :style="[chartStyle]"></canvas>
    </view>
</template>

<script setup lang="ts">
import uCharts from '../../Charts/Charts';
var uChartsInstance: { [key: string]: any } = {};
import { ref, onMounted, computed, type CSSProperties } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';
defineOptions({
    name: 'ste-pie-chart',
});

const props = defineProps(propsData);

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
    getServerData();
});

function getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            series: [
                {
                    data: [
                        { name: '一班', value: 50 },
                        { name: '二班', value: 30 },
                        { name: '三班', value: 20 },
                        { name: '四班', value: 18 },
                        { name: '五班', value: 8 },
                    ],
                },
            ],
        };
        drawCharts(canvasId.value, res);
    }, 500);
}

function drawCharts(id: string, data: any) {
    // 默认配置项
    const ctx = uni.createCanvasContext(id);
    uChartsInstance[id] = new uCharts<'pie'>({
        type: 'pie',
        context: ctx,
        width: cWidth.value,
        height: cHeight.value,
        series: data.series,
        animation: true,
        background: '#FFFFFF',
        color: props.color,
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
            pie: {
                activeOpacity: 0.5,
                activeRadius: 10,
                offsetAngle: 0,
                labelWidth: 15,
                border: false,
                borderWidth: 3,
                borderColor: '#FFFFFF',
            },
        },
    });
}
function tap(e: any) {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
}
</script>

<style scoped></style>
