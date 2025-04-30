<script setup lang="ts">
import utils from '../../utils/utils';
import { onMounted, watch, getCurrentInstance, type ComponentPublicInstance } from 'vue';
import propsData from './props';
import { PATTERNS, stringToCode128 } from './encode';

const componentName = `ste-barcode`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const props = defineProps(propsData);
const canvasId = 'ste-barcode-' + utils.guid(8);

onMounted(() => {
    initCanvas();
});

watch(
    () => props.content,
    val => {
        if (!val) return;
        initCanvas();
    },
    {}
);

const initCanvas = () => {
    // #ifdef H5 || APP
    const context = uni.createCanvasContext(canvasId, instance);
    drawBarcodeH5(context);
    // #endif

    // #ifdef MP-WEIXIN  || MP-ALIPAY
    uni.createSelectorQuery()
        .in(instance)
        .select(`#${canvasId}`)
        .node(res => {
            const context = res.node.getContext('2d');
            const dpr = utils.System.getWindowInfo().pixelRatio;
            res.node.width = props.width * dpr;
            res.node.height = props.height * dpr;
            context.scale(dpr, dpr);
            drawBarcodeMP(context);
        })
        .exec();
    // #endif
};

// 将 PATTERNS 码序列转换为二进制序列
const patternsToBinary = (codes: number[]) => {
    let binary = '';
    for (let i = 0; i < codes.length; i++) {
        const pattern = PATTERNS[codes[i]];
        for (let j = 0; j < 8; j += 2) {
            // 添加黑色条
            binary += '1'.repeat(pattern[j]);
            // 添加白色空格
            if (j + 1 < 8) {
                binary += '0'.repeat(pattern[j + 1]);
            }
        }
    }
    return binary;
};

// H5环境下的绘制方法
const drawBarcodeH5 = (context: UniApp.CanvasContext) => {
    // 测试环境屏蔽uni
    if (process.env.NODE_ENV == 'test') {
        return;
    }
    if (!props.content) return;
    // 生成编码数据
    const codes = stringToCode128(props.content);
    if (!codes || codes.length === 0) {
        return;
    }

    // 转换为二进制序列
    const barcodeData = patternsToBinary(codes);

    // 清空画布
    context.setFillStyle(props.background);
    context.fillRect(0, 0, props.width, props.height);

    // 设置条码颜色
    context.setFillStyle(props.foreground);

    // 直接使用画布宽度，不考虑边距
    const unitWidth = props.width / barcodeData.length;

    // 绘制条码
    let x = 0;
    for (let i = 0; i < barcodeData.length; i++) {
        if (barcodeData[i] === '1') {
            context.fillRect(x, 0, Math.ceil(unitWidth), props.height);
        }
        x += unitWidth;
    }

    context.draw();
};

// 小程序环境下的绘制方法
const drawBarcodeMP = (context: UniApp.CanvasContext) => {
    if (!context || !props.content) return;

    const codes = stringToCode128(props.content);
    if (!codes || codes.length === 0) return;

    // 清空画布
    context.fillStyle = props.background;
    context.fillRect(0, 0, props.width, props.height);

    const barWeight = props.width / ((codes.length - 3) * 11 + 35);
    let x = 0;

    // 绘制条码
    context.fillStyle = props.foreground;
    for (let i = 0; i < codes.length; i++) {
        const pattern = PATTERNS[codes[i]];
        for (let bar = 0; bar < 8; bar += 2) {
            const barW = pattern[bar] * barWeight;
            if (barW > 0) {
                context.fillRect(x, 0, barW, props.height);
            }
            x += barW + pattern[bar + 1] * barWeight;
        }
    }
};
</script>

<template>
    <view class="ste-barcode-root">
        <!-- #ifdef H5 || APP -->
        <canvas :style="{ width: width + 'px', height: height + 'px' }" :canvas-id="canvasId" :id="canvasId" class="h5-canvas"></canvas>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
        <canvas type="2d" :id="canvasId" :style="{ width: width + 'px', height: height + 'px' }" class="mp-canvas"></canvas>
        <!-- #endif -->
    </view>
</template>

<style lang="scss" scoped>
.ste-barcode-root {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
