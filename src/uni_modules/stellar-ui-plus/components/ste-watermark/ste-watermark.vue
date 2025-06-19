<template>
    <view :style="styles" :class="fullPage ? 'ste-watermark-root full-page' : 'ste-watermark-root'" />
    <!-- #ifdef MP-TOUTIAO -->
    <canvas :id="tempCanvsId" type="2d" style="width: 0; height: 0" />
    <!-- #endif -->
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref, onMounted } from 'vue';
import { watermarkProps, defaultWatermarkFont } from './props';

import utils from '../../utils/utils';

const componentName = `ste-watermark`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const tempCanvsId = ref(`ste-watermark-temp-${utils.guid()}`);

const querySelect = (selectors: string): Promise<any> => {
    return new Promise((resolve, _reject) => {
        uni.createSelectorQuery()
            .select(selectors)
            .node(res => resolve(res))
            .exec();
    });
};

const props = defineProps(watermarkProps);

const state = reactive({
    base64Url: '',
});
const { zIndex, gapX, gapY, width, height, rotate, image, imageWidth, imageHeight, content } = props;

const { fontStyle, fontWeight, color, fontSize, fontFamily, textAlign } = {
    ...defaultWatermarkFont,
    ...props.font,
};

const init = async () => {
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

    let ctx: any = canvas.getContext('2d');

    // #ifdef MP-TOUTIAO
    const offCanvas = tt.createOffscreenCanvas();
    offCanvas.width = Number(canvasWidth);
    offCanvas.height = Number(canvasHeight);
    ctx = offCanvas.getContext('2d');
    // #endif

    if (ctx) {
        if (image) {
            // 创建一个图片
            let img = canvas.createImage ? (canvas.createImage() as HTMLImageElement) : ({} as HTMLImageElement);

            // #ifdef MP-TOUTIAO
            const res = await querySelect(`#${tempCanvsId.value}`);
            const tmpCanvas = Array.isArray(res?.node) ? res?.node[0] : res?.node;
            img = tmpCanvas.createImage();
            // #endif

            dealWithImage(ctx, img, ratio, ctx.canvas, markWidth, markHeight);
        } else if (content) {
            dealWithText(ctx, ratio, ctx.canvas, markWidth, markHeight);
        }
    } else {
        throw new Error('当前环境不支持Canvas');
    }
};
const initH5 = () => {
    const canvas = document.createElement('canvas');
    const ratio = utils.System.getWindowInfo().pixelRatio;

    const ctx = canvas.getContext('2d');
    const canvasWidth = `${(gapX + width) * ratio}px`;
    const canvasHeight = `${(gapY + height) * ratio}px`;
    const markWidth = width * ratio;
    const markHeight = height * ratio;
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
initH5();
// #endif

// #ifndef H5
onMounted(() => {
    init();
});
// #endif

watch(
    () => props,
    () => {
        // #ifdef H5
        initH5();
        // #endif

        // #ifndef H5
        init();
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
