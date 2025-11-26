<template>
    <view :style="styles" :class="fullPage ? 'ste-watermark-root full-page' : 'ste-watermark-root'">
        <!-- #ifdef APP -->
        <canvas :id="canvasId" :canvas-id="canvasId" style="width: 100%; height: 100%; opacity: 0"></canvas>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, watch } from 'vue';
import { watermarkProps, defaultWatermarkFont } from './props';

import utils from '../../utils/utils';

const canvasId = `ste-watermark-canvas-${Math.floor(Math.random() * 10000).toString(36)}`;

const componentName = `ste-watermark`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(watermarkProps);

const state = reactive({
    base64Url: '',
});
const { zIndex, gapX, gapY, width, height, rotate, image, imageWidth, imageHeight, content } = props;

const { fontStyle, fontWeight, color, fontSize, fontFamily, textAlign } = {
    ...defaultWatermarkFont,
    ...props.font,
};
let timeout: any;
function debounce<T extends Function>(fn: T, time: number = 100): void {
    clearTimeout(timeout);
    if (!fn) return;
    timeout = setTimeout(() => {
        fn();
    }, time);
}

const dealWithImage = (ctx: any, img: HTMLImageElement, ratio: number, canvas: HTMLCanvasElement, markWidth: number, markHeight: number) => {
    ctx.translate(markWidth / 2, markHeight / 2);
    ctx.rotate((Math.PI / 180) * Number(rotate));
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = image!; // 要加载的图片 url, 可以是base64
    img.onload = () => {
        ctx.drawImage(img, (-imageWidth * ratio) / 2, (-imageHeight * ratio) / 2, imageWidth * ratio, imageHeight * ratio);
        ctx.restore();
        state.base64Url = canvas.toDataURL();
    };
};
const dealWithText = (ctx: any, ratio: number, canvas: HTMLCanvasElement, markWidth: number, markHeight: number) => {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // 文字绕中间旋转
    ctx.translate(markWidth / 2, markHeight / 2);
    ctx.rotate((Math.PI / 180) * Number(rotate));
    const markSize = Number(fontSize) * ratio;
    ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    if (Array.isArray(content)) {
        content?.forEach((item, index) => {
            ctx.fillText(item, 0, (index - 1) * markSize);
        });
    } else {
        ctx.fillText(content, 0, 0);
    }
    ctx.restore();

    state.base64Url = canvas.toDataURL();
};
// #ifdef H5
const initH5 = () => {
    const ratio = utils.System.getWindowInfo().pixelRatio;
    const canvasWidth = `${(gapX + width) * ratio}px`;
    const canvasHeight = `${(gapY + height) * ratio}px`;
    const markWidth = width * ratio;
    const markHeight = height * ratio;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    if (ctx) {
        if (image) {
            const img = new Image();
            dealWithImage(ctx, img, ratio, canvas, markWidth, markHeight);
        } else if (content) {
            dealWithText(ctx, ratio, canvas, markWidth, markHeight);
        }
    } else {
        throw new Error('当前环境不支持Canvas');
    }
};
debounce(initH5);
// #endif

// #ifdef MP
const initMP = async () => {
    let ratio = utils.System.getWindowInfo().pixelRatio;

    const canvasWidth = `${(gapX + width) * ratio}`;
    const canvasHeight = `${(gapY + height) * ratio}`;
    const markWidth = width * ratio;
    const markHeight = height * ratio;

    const canvas: any = uni.createOffscreenCanvas({
        type: '2d',
        width: Number(canvasWidth),
        height: Number(canvasHeight),
    });

    const ctx: any = canvas.getContext('2d');

    if (ctx) {
        if (image) {
            // 创建一个图片
            const img = canvas.createImage() as HTMLImageElement;
            dealWithImage(ctx, img, ratio, ctx.canvas, markWidth, markHeight);
        } else if (content) {
            dealWithText(ctx, ratio, ctx.canvas, markWidth, markHeight);
        }
    } else {
        throw new Error('当前环境不支持Canvas');
    }
};
debounce(initMP);
// #endif
// #ifdef APP-PLUS
// #ifdef APP-PLUS
const initAPP = () => {
    const ratio = utils.System.getWindowInfo().pixelRatio;
    const canvasWidth = (gapX + width) * ratio;
    const canvasHeight = (gapY + height) * ratio;
    const markWidth = width * ratio;
    const markHeight = height * ratio;

    // 创建 Canvas 上下文
    const ctx: any = uni.createCanvasContext(canvasId);

    if (ctx) {
        // 完全重置画布
        ctx.clearRect(0, 0, canvasWidth * 2, canvasHeight * 2);

        // 填充透明背景确保清空
        ctx.setFillStyle('rgba(255, 255, 255, 0)');
        ctx.fillRect(0, 0, canvasWidth * 2, canvasHeight * 2);

        // 开始新的绘制路径
        ctx.beginPath();

        if (image) {
            // 处理图片水印
            ctx.save();
            ctx.translate(markWidth / 2, markHeight / 2);
            ctx.rotate((Math.PI / 180) * Number(rotate));

            // 绘制图片
            ctx.drawImage(image, (-imageWidth * ratio) / 2, (-imageHeight * ratio) / 2, imageWidth * ratio, imageHeight * ratio);
            ctx.restore();
        } else if (content) {
            // 处理文字水印
            ctx.save();
            ctx.setTextBaseline('middle');
            ctx.setTextAlign('center');

            // 文字绕中间旋转
            ctx.translate(markWidth / 2, markHeight / 2);
            ctx.rotate((Math.PI / 180) * Number(rotate));

            const markSize = Number(fontSize) * ratio;
            ctx.setFontSize(markSize); // 使用专用方法设置字体大小
            if (color) ctx.setFillStyle(color);
            if (textAlign) ctx.setTextAlign(textAlign as any);

            if (Array.isArray(content)) {
                content.forEach((item: any, index) => {
                    ctx.fillText(item, 0, (index - 1) * markSize);
                });
            } else {
                ctx.fillText(content, 0, 0);
            }
            ctx.restore();
        }

        // 导出为 base64 图片
        ctx.draw(true, () => {
            // 使用 true 参数清空画布后再绘制
            uni.canvasToTempFilePath({
                canvasId: canvasId,
                success: res => {
                    state.base64Url = res.tempFilePath;
                },
                fail: err => {
                    console.error('导出图片失败:', err);
                },
            });
        });
    } else {
        throw new Error('当前环境不支持Canvas');
    }
};
// #endif
debounce(initAPP);
// #endif

watch(
    () => props,
    () => {
        // #ifdef H5
        debounce(initH5);
        // #endif

        // #ifdef MP
        debounce(initMP);
        // #endif

        // #ifdef APP-PLUS
        debounce(initAPP);
        // #endif
    }
);

const styles = computed(() => {
    return {
        zIndex: zIndex,
        backgroundSize: `${gapX + width}px`,
        backgroundImage: `url('${state.base64Url}')`,
    };
});
</script>

<style lang="scss">
.ste-watermark-root {
    // position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-repeat: repeat;

    &.full-page {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}
</style>
