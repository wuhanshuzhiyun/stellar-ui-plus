<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, getCurrentInstance } from 'vue';
import propsData from './props';
import utils from '../../utils/utils';

const instance = getCurrentInstance();
const props = defineProps(propsData);
const emits = defineEmits(['buttonClick', 'footerClick', 'countDown']);
const rootStyle = computed(() => {
    return {
        '--ste-coupon-lis-background': props.backgroundColor,
    };
});

const countDown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let interval: any;
onMounted(() => {
    if (props.endTime) {
        interval = utils.countDown(props.endTime, (data, time) => {
            countDown.value = data;
            emits('countDown', time);
        });
    }
    // 当组件挂载时绘制进度条
    if (props.progress >= 0) {
        drawProgress();
    }
});
onBeforeUnmount(() => {
    clearInterval(interval);
});
const viewTime = (v: number) => {
    return v >= 10 ? v : `0${v}`;
};
const canvasId = utils.guid();

// 绘制半圆环形进度条
const drawProgress = () => {
    if (props.progress < 0) return;

    // 等待下一个tick确保canvas已经渲染
    setTimeout(() => {
        const query = uni
            .createSelectorQuery()
            // #ifdef MP-WEIXIN || MP-ALIPAY
            .in(instance);
        // #endif

        query
            .select('#' + canvasId)
            .fields({ node: true, size: true }, res => {
                console.log(res);
            })
            .exec(res => {
                console.log(res);
                if (!res || !res[0]) return;
                const canvas = res[0].node;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                const dpr = uni.getSystemInfoSync().pixelRatio;
                canvas.width = res[0].width * dpr;
                canvas.height = res[0].height * dpr;
                ctx.scale(dpr, dpr);

                // 清空画布
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // 设置半圆进度条参数
                const centerX = res[0].width / 2;
                const centerY = res[0].height;
                const radius = res[0].width / 2 - utils.formatPx(6, 'num'); // 留出边距

                // 绘制背景圆弧（灰色）
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
                ctx.lineWidth = utils.formatPx(8, 'num');
                ctx.strokeStyle = '#F3F3F3';
                ctx.lineCap = 'round';
                ctx.stroke();

                // 绘制进度圆弧
                if (props.progress > 0) {
                    const progressAngle = Math.PI * (props.progress / 100);
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + progressAngle, false);
                    ctx.strokeStyle = '#FF283A';
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
            });
    }, 50);
};

// 监听progress变化重新绘制
watch(
    () => props.progress,
    newVal => {
        if (newVal >= 0) {
            drawProgress();
        }
    }
);
</script>
<template>
    <view class="ste-coupon-list--root" :style="rootStyle">
        <view class="coupon-info-block">
            <ste-image width="144" height="144" :src="data.image" radius="12" />
            <view class="coupon-info">
                <view class="info-title">{{ data.title }}</view>
                <view class="info-desc">
                    <view v-if="endTime" class="coun-down">
                        <view class="coun-down-view">{{ viewTime(countDown.hours) }}</view>
                        <view class="coun-down-dot">:</view>
                        <view class="coun-down-view">{{ viewTime(countDown.minutes) }}</view>
                        <view class="coun-down-dot">:</view>
                        <view class="coun-down-view">{{ viewTime(countDown.seconds) }}</view>
                        <view class="coun-down-msg">后截止</view>
                    </view>
                    <view v-else>
                        {{ data.desc }}
                    </view>
                </view>
                <view class="info-price">
                    <view class="price-left">
                        <view class="price-text">
                            <ste-price :value="data.price" font-size="40" />
                        </view>
                        <text class="info-constraint">{{ data.constraint }}</text>
                    </view>
                    <view class="price-right">
                        <ste-button :disabled="buttonDisabled" :mode="100" @click="emits('buttonClick')">{{ buttonText }}</ste-button>
                    </view>
                </view>
            </view>
            <view class="circle-progress-canvas" v-if="progress >= 0">
                <!-- #ifdef H5 || APP-PLUS -->
                <canvas :canvas-id="canvasId" :id="canvasId" class="canvas-element" />
                <!-- #endif -->

                <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
                <canvas type="2d" :id="canvasId" class="canvas-element" />
                <!-- #endif -->
                <view class="progress-text">{{ progressText }}</view>
            </view>
            <slot name="position"></slot>
        </view>
        <view class="coupon-footer-block" v-if="data.footers?.length">
            <view class="coupon-footer-item" v-for="(value, i) in data.footers" :key="i">
                <view class="footer-item-text">
                    {{ value }}
                </view>
                <view class="footer-item-icon" @click="emits('footerClick', i)">
                    <ste-icon code="&#xe674;" size="12" color="#A4A4A4" />
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-coupon-list--root {
    width: 100%;

    .coupon-info-block {
        width: 100%;
        height: 180rpx;
        padding: 18rpx 18rpx 14rpx 18rpx;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        background-color: var(--ste-coupon-lis-background);
        border-radius: 16rpx;
        position: relative;

        .coupon-info {
            width: calc(100% - 162rpx);
            height: 100%;
            .info-title {
                font-weight: bold;
                font-size: 28rpx;
                line-height: 40rpx;
                color: #000000;
            }
            .info-desc {
                height: 36rpx;
                font-size: 22rpx;
                color: #727272;
                line-height: 32rpx;
                margin-top: 8rpx;
                .coun-down {
                    display: flex;
                    align-items: center;
                    font-weight: 400;
                    font-size: 20rpx;
                    color: #ff283a;
                    line-height: 28rpx;
                    text-align: center;
                    .coun-down-view {
                        height: 100%;
                        width: 28rpx;
                        height: 28rpx;
                        background: #fef4f1;
                        border-radius: 4rpx;
                    }
                    .coun-down-dot {
                        margin: 0 8rpx;
                    }
                    .coun-down-msg {
                        font-weight: 400;
                        font-size: 20rpx;
                        color: #a4a4a4;
                        line-height: 28rpx;
                        margin-left: 12rpx;
                    }
                }
            }
            .info-price {
                margin-top: 12rpx;
                width: 100%;
                height: 56rpx;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                .price-left {
                    height: 100%;
                    display: flex;
                    align-items: flex-end;
                    .price-text {
                        height: 100%;
                        display: flex;
                        align-items: center;
                    }
                    .info-constraint {
                        font-size: 20rpx;
                        color: #363636;
                        line-height: 42rpx;
                        margin-left: 16rpx;
                    }
                }
            }
        }
        .circle-progress-canvas {
            width: 96rpx;
            height: 48rpx;
            position: absolute;
            top: 24rpx;
            right: 26rpx;
            .canvas-element {
                width: 100%;
                height: 100%;
            }
            .progress-text {
                width: 100%;
                text-align: center;
                position: absolute;
                bottom: -6rpx;
                font-size: 16rpx;
                color: #a4a4a4;
                line-height: 22rpx;
            }
        }
    }

    .coupon-footer-block {
        width: 100%;
        margin-top: 2px;
        background-color: var(--ste-coupon-lis-background);
        border-radius: 16rpx;
        padding: 14rpx 18rpx;
        .coupon-footer-item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .footer-item-text {
                // 不换行
                width: calc(100% - 54rpx);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-weight: 400;
                font-size: 24rpx;
                color: #a4a4a4;
                line-height: 34rpx;
            }
            .footer-item-icon {
                width: 26rpx;
                height: 26rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f3f3f3;
                border-radius: 50%;
            }
        }
    }
}
</style>
