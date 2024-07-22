<script setup lang="ts">
import { computed, defineProps, onMounted, getCurrentInstance, defineEmits, defineExpose } from 'vue';
import utils from '../../utils/utils';
import type { Stroke } from './types';
import type { HTMLMoveEvent, UniTouchEvent } from '../../types/global.d';

const emits = defineEmits({
  start: () => {},
  signing: () => {},
  end: () => {},
});

const props = defineProps({
  customClass: { type: String, default: () => '' },
  lineWidth: { type: Number, default: () => 3 },
  strokeColor: { type: String, default: () => '#000000' },
  type: { type: String, default: () => 'png' },
  width: { type: [String, Number], default: () => '100%' },
  height: { type: [String, Number], default: () => '100%' },
});

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
  ctx.value?.setLineCap('round');
  ctx.value?.setLineWidth(props.lineWidth);
  ctx.value?.setStrokeStyle(props.strokeColor);
  ctx.value?.setLineJoin('round');
  drawStrokes();
};

const drawStrokes = () => {
  ctx.value?.clearRect(0, 0, 1920, 1080);
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
const getH5MousePosition = (e: HTMLMoveEvent) => {
  return {
    x: e.clientX - (e.target?.offsetLeft || 0),
    y: e.clientY - (e.target?.offsetTop || 0),
  };
};
// #endif

const onMousedown = (e: HTMLMoveEvent) => onTouchStart(e as unknown as UniTouchEvent);
const onMousemove = (e: HTMLMoveEvent) => onTouchMove(e as unknown as UniTouchEvent);

const onTouchStart = (e: UniTouchEvent) => {
  // #ifdef MP
  strokeing.value = [{ x: e.changedTouches[0]?.x || 0, y: e.changedTouches[0]?.y || 0 }];
  // #endif
  // #ifdef H5
  strokeing.value = [getH5MousePosition(e as unknown as HTMLMoveEvent)];
  // #endif
  drawStrokeing();
  emits('start');
};

const onTouchMove = (e: UniTouchEvent) => {
  if (!strokeing.value.length) return;
  // #ifdef MP
  strokeing.value.push({ x: e.changedTouches[0].x || 0, y: e.changedTouches[0].y || 0 });
  // #endif
  // #ifdef H5
  strokeing.value.push(getH5MousePosition(e as unknown as HTMLMoveEvent));
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
  if (!thas.value) return;
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
        console.log(res);
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
  <view
    class="ste-signature-root"
    :style="cmpRootStyle"
    @mousedown="onMousedown"
    @mousemove="onMousemove"
    @mouseup="onTouchEnd"
    @mosueleave="onTouchEnd"
  >
    <canvas
      :id="canvasId"
      :canvas-id="canvasId"
      :style="cmpRootStyle"
      disable-scroll
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    />
  </view>
</template>
