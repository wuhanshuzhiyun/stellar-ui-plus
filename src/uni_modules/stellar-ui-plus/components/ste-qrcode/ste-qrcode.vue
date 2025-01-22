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
    () => {
        initCanvas();
    },
    {}
);

const initCanvas = () => {
    if (!props.content) return;
    nextTick(() => {
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
                draw(context, res.node);
            })
            .exec();
        // #endif
    });
};

const draw = (ctx: URCodeCanvasContext, canvas: any = null) => {
    const qr = new UQRCode();
    // #ifdef MP-WEIXIN || MP-ALIPAY
    qr.loadImage = src => {
        // 需要返回Promise对象，小程序下获取网络图片信息需先配置download域名白名单才能生效
        return new Promise((resolve, reject) => {
            var img = canvas.createImage();
            img.src = src;
            img.onload = () => {
                // resolve返回img
                resolve(img);
            };
            img.onerror = (err: any) => {
                // reject返回错误信息
                reject(err);
            };
        });
    };

    // #endif

    // #ifdef H5
    qr.loadImage = src => {
        // 需要返回Promise对象
        return new Promise((resolve, reject) => {
            uni.getImageInfo({
                src,
                success: res => {
                    resolve(res.path);
                },
                fail: err => {
                    // reject返回错误信息
                    reject(err);
                },
            });
        });
    };

    // #endif

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
