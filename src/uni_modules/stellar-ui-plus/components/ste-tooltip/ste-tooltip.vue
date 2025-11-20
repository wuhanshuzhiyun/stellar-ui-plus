<script lang="ts" setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated, nextTick, getCurrentInstance, type ComponentPublicInstance } from 'vue';
import type { TooltipOptions } from './props';
import { defaultTooltipOptions } from './props';
import utils from '../../utils/utils.js';

defineOptions({
    name: 'ste-tooltip',
});

const DURATION = 200;
const ANIMATION_PROP: UniApp.CreateAnimationOptions = { duration: DURATION, timingFunction: 'ease-out' };

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const show = ref(false);
const text = ref('');
const tooltipLeft = ref(0);
const tooltipTop = ref(0);
const arrowLeft = ref(50);
const maxWidth = ref('60vw');
const placement = ref<'top' | 'bottom'>('top');
const animationData = ref<UniApp.Animation>();

// 显示提示
async function showTooltip(options: TooltipOptions) {
    const opts = { ...defaultTooltipOptions, ...options };

    text.value = opts.text;
    maxWidth.value = opts.maxWidth ?? '60vw';
    placement.value = opts.placement ?? 'top';

    // 查询触发元素位置
    const triggerRect = await utils.querySelector<false>(opts.selector, opts.instance);
    if (!triggerRect || !triggerRect.left || !triggerRect.width || !triggerRect.top || !triggerRect.height) return;

    show.value = true;

    // 等待 DOM 渲染后计算位置
    await nextTick();

    const tooltipData = await utils.querySelector<false>('.tooltip-content', instance);
    const systemInfo = utils.System;
    const MARGIN = 10;

    // 计算触发元素中心点
    const triggerCenter = triggerRect.left + triggerRect.width / 2;

    // 获取 tooltip 实际宽高
    const tooltipWidth = tooltipData?.width || 200;
    const tooltipHeight = tooltipData?.height || 40;

    // 计算 tooltip 的水平位置
    let left = triggerCenter - tooltipWidth / 2;

    // 确保不超出屏幕左边
    if (left < MARGIN) {
        left = MARGIN;
    }

    // 确保不超出屏幕右边
    if (left + tooltipWidth > systemInfo.getWindowWidth() - MARGIN) {
        left = systemInfo.getWindowWidth() - tooltipWidth - MARGIN;
    }

    // 计算垂直位置
    let top: number;
    if (placement.value === 'top') {
        top = triggerRect.top - tooltipHeight - (MARGIN + 5);
    } else {
        top = triggerRect.top + triggerRect.height + (MARGIN + 5);
    }

    // 计算箭头位置（相对于 tooltip 的百分比）
    const tempArrowLeft = ((triggerCenter - left) / tooltipWidth) * 100;

    tooltipLeft.value = left;
    tooltipTop.value = top;
    arrowLeft.value = Math.max(10, Math.min(90, tempArrowLeft));

    // 执行显示动画
    nextTick(() => {
        const animation = uni.createAnimation(ANIMATION_PROP);
        animation.opacity(1).step();
        animationData.value = animation.export();
    });
}

// 隐藏提示
function hideTooltip() {
    const animation = uni.createAnimation(ANIMATION_PROP);
    animation.opacity(0).step();
    animationData.value = animation.export();

    setTimeout(() => {
        show.value = false;
    }, DURATION);
}

const registerEvent = (flag = true) => {
    if (flag) {
        uni.$on('ste:tooltip:show', showTooltip);
        uni.$on('ste:tooltip:hide', hideTooltip);
    } else {
        uni.$off('ste:tooltip:show', showTooltip);
        uni.$off('ste:tooltip:hide', hideTooltip);
    }
};

onMounted(() => {
    registerEvent();
});

onUnmounted(() => {
    registerEvent(false);
});

onActivated(() => {
    registerEvent();
});

onDeactivated(() => {
    registerEvent(false);
});

defineExpose({
    showTooltip,
    hideTooltip,
});
</script>

<template>
    <view class="ste-tooltip-root" v-if="show">
        <view class="tooltip" :class="placement" :style="{ left: tooltipLeft + 'px', top: tooltipTop + 'px' }" :animation="animationData">
            <view class="tooltip-content" :style="{ maxWidth: maxWidth }">
                {{ text }}
            </view>
            <view class="tooltip-arrow" :style="{ left: arrowLeft + '%' }"></view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-tooltip-root {
    .tooltip {
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        opacity: 0;

        &.top .tooltip-arrow {
            bottom: -6px;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid rgba(0, 0, 0, 0.8);
        }

        &.bottom .tooltip-arrow {
            top: -6px;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid rgba(0, 0, 0, 0.8);
        }
    }

    .tooltip-content {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        line-height: 1.4;
        word-break: break-word;
        white-space: normal;
        text-align: left;
    }

    .tooltip-arrow {
        position: absolute;
        transform: translateX(-50%);
        width: 0;
        height: 0;
    }
}
</style>
