<script setup lang="ts">
import { computed, onMounted, getCurrentInstance, ref, type ComponentPublicInstance } from 'vue';
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
const thas = ref<ComponentPublicInstance | null>();
const canvasSize = {
    width: 0,
    height: 0,
};
/**
 * 工具：将角度转为弧度
 */
const toRad = (deg: number) => (Math.PI * deg) / 180;
const initCtx = () => {
    thas.value = getCurrentInstance()?.proxy;
    ctx.value = uni.createCanvasContext(canvasId.value, thas.value);
    drawStrokes();
};

const drawStrokes = () => {
    if (!ctx.value || typeof ctx.value.setLineCap !== 'function') return;
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
    // #ifdef H5
    strokeing.value = [await getH5MousePosition(e as unknown as HTMLMouseEvent)];
    // #endif
    // #ifdef MP
    strokeing.value = [{ x: e.changedTouches[0]?.x || 0, y: e.changedTouches[0]?.y || 0 }];
    // #endif
    // #ifdef APP
    strokeing.value = [{ x: e.touches[0]?.x || 0, y: e.touches[0]?.y || 0 }];
    // #endif
    drawStrokeing();
    emits('start');
};

const onTouchMove = async (e: UniTouchEvent) => {
    if (!strokeing.value.length) return;
    // #ifdef H5
    strokeing.value.push(await getH5MousePosition(e as unknown as HTMLMouseEvent));
    // #endif
    // #ifdef MP
    strokeing.value.push({ x: e.changedTouches[0].x || 0, y: e.changedTouches[0].y || 0 });
    // #endif
    // #ifdef APP
    strokeing.value.push({ x: e.touches[0]?.x || 0, y: e.touches[0]?.y || 0 });
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
    Object.assign(canvasSize, { width: canvas.width, height: canvas.height });
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

const output = ({
    orientation = 'up',
    success,
    fail,
}: { orientation?: 'up' | 'down' | 'right' | 'left' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored'; success?: (res: string) => void; fail?: (err: any) => void } = {}) => {
    if (!success) return;
    save(path => {
        // #ifdef MP-WEIXIN
        rotateImageByWx({ path, orientation, success, fail });
        // #endif
        // #ifdef H5 | WEB
        rotateImageByWeb({ path, orientation, success, fail });
        // #endif
        // #ifdef APP
        rotateImageByApp({ path, orientation, success, fail });
        // #endif
    }, fail);
};

interface RotateImageOptions {
    path: string;
    orientation: 'up' | 'down' | 'right' | 'left' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';
    success: (res: string) => void;
    fail?: (err: any) => void;
}
// #ifdef MP-WEIXIN
const rotateImageByWx = ({ path, orientation = 'up', success, fail }: RotateImageOptions) => {
    const validOrientations = ['up', 'down', 'left', 'right', 'up-mirrored', 'down-mirrored', 'left-mirrored', 'right-mirrored'];
    if (!validOrientations.includes(orientation)) {
        return fail && fail(new Error(`Invalid orientation: ${orientation}`));
    }
    if (orientation === 'up') {
        success(path);
        return;
    }
    const { width: w, height: h } = canvasSize;
    const is90or270 = ['left', 'right', 'left-mirrored', 'right-mirrored'].includes(orientation);
    const width = is90or270 ? h : w;
    const height = is90or270 ? w : h;

    // 创建离屏canvas
    let canvas: any;
    try {
        canvas = uni.createOffscreenCanvas({ type: '2d', width, height });
    } catch (e: any) {
        return fail && fail(new Error('微信小程序创建离屏Canvas失败：' + e.message));
    }
    const ctx = canvas.getContext('2d');

    const img = canvas.createImage();
    img.onload = () => {
        try {
            ctx.clearRect(0, 0, width, height);
            ctx.save();

            // 统一：顺时针为正方向
            switch (orientation) {
                case 'down':
                    ctx.rotate(toRad(180)); // 180°
                    ctx.translate(-width, -height);
                    break;
                case 'left':
                    ctx.rotate(toRad(270)); // 顺时针270° = Math.PI * 270 / 180;等价于-90°
                    ctx.translate(-height, 0);
                    break;
                case 'right':
                    ctx.rotate(toRad(90)); // 90°
                    ctx.translate(0, -width);
                    break;
                case 'up-mirrored':
                    ctx.scale(1, -1);
                    ctx.translate(0, -height);
                    break;
                case 'down-mirrored':
                    ctx.rotate(toRad(180));
                    ctx.scale(1, -1);
                    ctx.translate(-width, 0);
                    break;
                case 'left-mirrored':
                    ctx.rotate(toRad(270));
                    ctx.scale(1, -1);
                    ctx.translate(-height, -width);
                    break;
                case 'right-mirrored':
                    ctx.rotate(toRad(90));
                    ctx.scale(1, -1);
                    break;
            }
            ctx.drawImage(img, 0, 0, w, h);
            ctx.restore();
            setTimeout(() => {
                const base64 = canvas.toDataURL();
                success(base64);
            });
        } catch (e: any) {
            fail && fail(new Error('微信小程序旋转图片失败：' + e.message));
        }
    };
    img.onerror = () => {
        fail && fail(new Error('微信小程序加载图片失败：' + path));
    };
    img.src = path;
};
// #endif

// #ifdef H5 | WEB
const rotateImageByWeb = ({ path, orientation = 'up', success, fail }: RotateImageOptions) => {
    const validOrientations = ['up', 'down', 'left', 'right', 'up-mirrored', 'down-mirrored', 'left-mirrored', 'right-mirrored'];
    if (!validOrientations.includes(orientation)) {
        return fail && fail(new Error(`Invalid orientation: ${orientation}`));
    }
    if (orientation === 'up') {
        success(path);
        return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        try {
            const { width: sw, height: sh } = img;
            const is90or270 = ['left', 'right', 'left-mirrored', 'right-mirrored'].includes(orientation);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return fail && fail(new Error('创建canvas失败'));
            canvas.width = is90or270 ? sh : sw;
            canvas.height = is90or270 ? sw : sh;

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);

            // 统一：顺时针为正方向，镜像配合 translate 保证与小程序一致
            switch (orientation) {
                case 'down':
                    ctx.rotate(toRad(180)); // 180°
                    break;
                case 'left':
                    ctx.rotate(toRad(-90)); // -90°
                    break;
                case 'right':
                    ctx.rotate(toRad(90)); // 90°
                    break;
                case 'up-mirrored':
                    ctx.scale(1, -1);
                    break;
                case 'down-mirrored':
                    ctx.rotate(toRad(180));
                    ctx.scale(1, -1);
                    break;
                case 'left-mirrored':
                    ctx.rotate(toRad(270));
                    ctx.scale(1, -1);
                    break;
                case 'right-mirrored':
                    ctx.rotate(toRad(90));
                    ctx.scale(1, -1);
                    break;
            }
            ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
            ctx.restore();
            setTimeout(() => {
                const mimeType = 'image/png';
                const base64 = canvas.toDataURL(mimeType);
                success && success(base64);
            });
        } catch (e: any) {
            fail && fail(new Error('H5 旋转图片失败：' + e.message));
        }
    };
    img.onerror = () => {
        fail && fail(new Error('H5 加载图片失败：' + path));
    };
    img.src = path.startsWith('data:') ? path : path;
};
// #endif

// #ifdef APP | APP-PLUS
const rotateImageByApp = async ({ path, orientation = 'up', success, fail }: RotateImageOptions) => {
    const validOrientations = ['up', 'down', 'left', 'right', 'up-mirrored', 'down-mirrored', 'left-mirrored', 'right-mirrored'];
    if (!validOrientations.includes(orientation)) {
        return fail && fail(new Error(`Invalid orientation: ${orientation}`));
    }
    if (orientation === 'up') {
        success && success(path);
        return;
    }
    /**
     * 工具：获取图片信息（尺寸等）
     */
    const getImageInfo = (src: string) => {
        return new Promise((resolve, reject) => {
            uni.getImageInfo({
                src,
                success: resolve,
                fail: reject,
            });
        });
    };

    try {
        const imgInfo: any = await getImageInfo(path);
        console.log('图片信息：', imgInfo);
        const { width: originalWidth, height: originalHeight } = imgInfo;

        // 根据方向确定旋转后图片的尺寸
        const is90or270 = ['left', 'right', 'left-mirrored', 'right-mirrored'].includes(orientation);
        const canvasWidth = is90or270 ? originalHeight : originalWidth;
        const canvasHeight = is90or270 ? originalWidth : originalHeight;

        const canvas = uni.createCanvasContext('ste-signature-app-canvas-output', thas.value);
        // 设置canvas尺寸
        (canvas as any).width = canvasWidth;
        (canvas as any).height = canvasHeight;

        canvas.save();
        canvas.translate(canvasWidth / 2, canvasHeight / 2);

        console.log('旋转图片尺寸：', canvasWidth, canvasHeight);

        // 统一：顺时针为正方向，镜像配合 translate 保证与小程序一致
        switch (orientation) {
            case 'down':
                canvas.rotate(toRad(180)); // 180°
                break;
            case 'left':
                canvas.rotate(toRad(270)); // -90°
                break;
            case 'right':
                canvas.rotate(toRad(90)); // 90°
                break;
            case 'up-mirrored':
                canvas.scale(1, -1);
                break;
            case 'down-mirrored':
                canvas.rotate(toRad(180));
                canvas.scale(1, -1);
                break;
            case 'left-mirrored':
                canvas.rotate(toRad(270));
                canvas.scale(1, -1);
                break;
            case 'right-mirrored':
                canvas.rotate(toRad(90));
                canvas.scale(1, -1);
                break;
        }
        if (is90or270) {
            const min = Math.min(originalWidth, originalHeight);
            const max = Math.max(originalWidth, originalHeight);
            let dx = -max / 2;
            let dy = -min / 2;
            if (['right', 'right-mirrored'].includes(orientation)) {
                if (originalWidth < originalHeight) {
                    const d = (max - min) / 2;
                    dx += d;
                    dy += d;
                }
                canvas.drawImage(path, dx, dy, min, min);
            } else {
                if (originalWidth > originalHeight) {
                    const d = max - min;
                    dx += d;
                    canvas.drawImage(path, dx, dy, min, min);
                } else {
                    canvas.drawImage(path, dy, dx, min, min);
                }
            }
        } else {
            canvas.drawImage(path, -canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
        }
        canvas.restore();
        // 确保绘制完成
        canvas.draw(false, () => {
            // 导出临时文件路径
            uni.canvasToTempFilePath({
                canvasId: 'ste-signature-app-canvas-output',
                width: canvasWidth,
                height: canvasHeight,
                destWidth: canvasWidth,
                destHeight: canvasHeight,
                fileType: props.type,
                success: res => {
                    console.log('导出图片：', res);
                    success && success(res.tempFilePath);
                },
                fail: err => {
                    fail && fail(new Error('APP 导出旋转图片失败：' + (err.errMsg || err.message)));
                },
            });
        });
    } catch (e: any) {
        fail && fail(new Error('APP 旋转图片失败：' + e.message));
    }
};
// #endif

defineExpose({ save, output, clear, back });
</script>

<template>
    <view class="ste-signature-root" :style="cmpRootStyle" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onTouchEnd" @mosueleave="onTouchEnd">
        <canvas :id="canvasId" :canvas-id="canvasId" :style="cmpRootStyle" disable-scroll @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" />
        <!-- #ifdef APP | APP-PLUS -->
        <canvas style="pointer-events: none; opacity: 0" :style="[cmpRootStyle]" id="ste-signature-app-canvas-output" canvas-id="ste-signature-app-canvas-output" />
        <!-- #endif -->
    </view>
</template>
