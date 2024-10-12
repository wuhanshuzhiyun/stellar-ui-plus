<script setup lang="ts">
import { computed, onMounted, getCurrentInstance, defineOptions } from 'vue';
import utils from '../../utils/utils';
import type { Stroke } from './types';
import type { HTMLMouseEvent, UniTouchEvent } from '../../types/event.d';
import propsData from './props';

defineOptions({
    name: 'ste-signature',
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'start'): void;
    (e: 'signing'): void;
    (e: 'end'): void;
}>();

const cmpRootStyle = computed(() => ({
    width: utils.formatPx(props.width),
    height: utils.formatPx(props.height),
}));

const canvasId = computed(() => utils.guid(8));

const ctx = ref<UniNamespace.CanvasContext>();

const strokeing = ref<Stroke[]>([]);
const strokes = ref<Stroke[][]>([]);
const thas = ref<globalThis.ComponentPublicInstance | null>();

const initCtx = () => {
    thas.value = getCurrentInstance()?.proxy;
    ctx.value = uni.createCanvasContext(canvasId.value, thas.value);
    drawStrokes();
};

const drawStrokes = () => {
    ctx.value?.setLineCap('round');
    ctx.value?.setLineWidth(props.lineWidth);
    ctx.value?.setStrokeStyle(props.strokeColor);
    ctx.value?.setLineJoin('round');
    ctx.value?.clearRect(0, 0, 1920, 1080);
    if (props.background !== 'none') {
        ctx.value?.setFillStyle(props.background);
        ctx.value?.fillRect(0, 0, 1920, 1080);
    }
    ctx.value?.draw();
    if (!strokes.value.length) {
        ctx.value?.stroke();
        ctx.value?.draw(true);
        return;
    }
    strokes.value.forEach(stroke => {
        if (!stroke.length) return;
        ctx.value?.beginPath();
        ctx.value?.moveTo(stroke[0].x, stroke[0].y);
        stroke.forEach(({ x, y }, index) => {
            if (index == 0) return;
            ctx.value?.lineTo(x, y);
        });
        ctx.value?.stroke();
        ctx.value?.draw(true);
    });
};

const drawStrokeing = () => {
    const length = strokeing.value.length;
    if (!length) return;
    ctx.value?.beginPath();
    const end = strokeing.value[length - 1];
    const start = strokeing.value[length - 2] || end;
    ctx.value?.moveTo(start.x, start.y);
    ctx.value?.lineTo(end.x, end.y);
    ctx.value?.stroke();
    ctx.value?.draw(true);
};

// #ifdef H5
const getH5MousePosition = async (e: HTMLMouseEvent) => {
    const el = await utils.querySelector<false>(`.ste-signature-root #${canvasId.value}`, thas.value);
    if (!el) return { x: 0, y: 0 };
    return {
        x: e.clientX - (el.left || 0),
        y: e.clientY - (el.top || 0),
    };
};
// #endif

const onMousedown = (e: MouseEvent) => onTouchStart(e as unknown as UniTouchEvent);
const onMousemove = (e: MouseEvent) => onTouchMove(e as unknown as UniTouchEvent);

const onTouchStart = async (e: UniTouchEvent) => {
    // #ifdef MP
    strokeing.value = [{ x: e.changedTouches[0]?.x || 0, y: e.changedTouches[0]?.y || 0 }];
    // #endif
    // #ifdef H5
    strokeing.value = [await getH5MousePosition(e as unknown as HTMLMouseEvent)];
    // #endif
    drawStrokeing();
    emits('start');
};

const onTouchMove = async (e: UniTouchEvent) => {
    if (!strokeing.value.length) return;
    // #ifdef MP
    strokeing.value.push({ x: e.changedTouches[0].x || 0, y: e.changedTouches[0].y || 0 });
    // #endif
    // #ifdef H5
    strokeing.value.push(await getH5MousePosition(e as unknown as HTMLMouseEvent));
    // #endif
    drawStrokeing();
    emits('signing');
};

const onTouchEnd = () => {
    strokes.value.push(strokeing.value);
    strokeing.value = [];
    emits('end');
};

onMounted(() => {
    initCtx();
});

const clear = () => {
    strokes.value = [];
    drawStrokes();
};

const back = () => {
    strokes.value.pop();
    drawStrokes();
};

const save = async (callback: (res: string) => void, error?: (err: any) => void) => {
    if (!strokes.value.length) {
        console.warn('没有绘制签名内容');
        if (error) error('请绘制签名');
        return;
    }
    const canvas = await utils.querySelector<false>(`.ste-signature-root #${canvasId.value}`, thas.value);
    if (!canvas) {
        console.error('找不到canvas');
        return;
    }
    uni.canvasToTempFilePath(
        {
            canvasId: canvasId.value,
            width: canvas.width,
            height: canvas.height,
            destWidth: (canvas.width || 0) * 2, // 设置导出图片的宽度，这里设置为canvas宽度的两倍
            destHeight: (canvas.height || 0) * 2, // 设置导出图片的高度，这里设置为canvas高度的两倍
            fileType: props.type, // 设置导出图片的类型，如'png'、'jpg'等
            success: res => {
                if (callback) callback(res.tempFilePath);
            },
            fail: err => {
                console.error(err);
                if (error) error(err);
            },
        },
        thas.value
    );
};

defineExpose({ save, clear, back });
</script>

<template>
    <view class="ste-signature-root" :style="cmpRootStyle" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onTouchEnd" @mosueleave="onTouchEnd">
        <canvas :id="canvasId" :canvas-id="canvasId" :style="cmpRootStyle" disable-scroll @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" />
    </view>
</template>
