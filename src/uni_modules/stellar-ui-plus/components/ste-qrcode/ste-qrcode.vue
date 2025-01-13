<script setup lang="ts">
import utils from '../../utils/utils';
import { nextTick, onMounted, watch, defineOptions, getCurrentInstance, type ComponentPublicInstance } from 'vue';
import propsData from './props';

import UQRCode, { type URCodeCanvasContext } from './uqrcode';

const componentName = `ste-qrcode`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const props = defineProps(propsData);
const canvasId = 'ste-qrcode-' + utils.guid(8);

onMounted(() => {
    initCanvas();
});

watch(
    () => props.content,
    val => {
        if (!val) return;
        nextTick(() => {
            initCanvas();
        });
    },
    {}
);

const initCanvas = () => {
    // #ifdef H5 || APP
    const context = uni.createCanvasContext(canvasId, instance);
    draw(context);
    // #endif

    // #ifdef MP-WEIXIN  || MP-ALIPAY
    uni.createSelectorQuery()
        .in(instance)
        .select(`#${canvasId}`)
        .node(res => {
            const context = res.node.getContext('2d');
            const dpr = utils.System.getWindowInfo().pixelRatio;
            res.node.width = props.size * dpr;
            res.node.height = props.size * dpr;
            context.scale(dpr, dpr);
            draw(context);
        })
        .exec();
    // #endif
};

const draw = (ctx: URCodeCanvasContext) => {
    const qr = new UQRCode();
    qr.backgroundColor = props.background;
    qr.foregroundColor = props.foreground;
    qr.foregroundImageSrc = props.foregroundImageSrc;
    props.foregroundImageWidth ? (qr.foregroundImageWidth = props.foregroundImageWidth) : '';
    props.foregroundImageHeight ? (qr.foregroundImageHeight = props.foregroundImageHeight) : '';
    // 设置二维码内容
    qr.data = props.content;
    // 设置二维码大小，必须与canvas设置的宽高一致
    qr.size = props.size;
    // 调用制作二维码方法
    qr.make();

    // 设置uQRCode实例的canvas上下文
    qr.canvasContext = ctx;
    // 调用绘制方法将二维码图案绘制到canvas上
    qr.drawCanvas();
};
</script>

<template>
    <view class="ste-qrcode-root">
        <!-- #ifdef H5 || APP -->
        <canvas :style="{ width: size + 'px', height: size + 'px' }" :canvas-id="canvasId" :id="canvasId" class="h5-canvas"></canvas>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
        <canvas type="2d" :id="canvasId" :style="{ width: size + 'px', height: size + 'px' }" class="mp-canvas"></canvas>
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
