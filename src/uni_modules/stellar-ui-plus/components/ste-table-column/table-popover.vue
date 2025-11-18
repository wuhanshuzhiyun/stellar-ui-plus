<script lang="ts" setup>
import { ref, onMounted, watch, getCurrentInstance, type ComponentPublicInstance, nextTick } from 'vue';
import utils from '../../utils/utils.js';
const DURATION = 200;
const ANIMATION_PROP: UniApp.CreateAnimationOptions = { duration: DURATION, timingFunction: 'ease-out' };

const props = defineProps({
    text: {
        type: [String, null],
        default: '',
    },
    line: {
        type: [Number, String],
        default: 1,
    }, // 配置超过多少行后才显示
});

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const pressTimer = ref();
const showPopover = ref(false);
const popoverLeft = ref(0);
const popoverTop = ref(0);
const arrowLeft = ref(50); // 箭头的左边距百分比
const isTextOverflow = ref(false);
const animationData = ref<UniApp.Animation>();

onMounted(() => {
    nextTick(() => {
        checkTextOverflow();
    });
});

watch(
    () => props.text,
    () => {
        checkTextOverflow();
    }
);
const checkTextOverflow = async () => {
    const containerData = await utils.querySelector<false>('.ellipsis-box', instance);
    let textData = await utils.querySelector<false>('.measure-text', instance);

    if (containerData && textData && textData.width && containerData.width) {
        isTextOverflow.value = textData.width > containerData.width * Number(props.line) - 4;
    }
};

const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    if (!isTextOverflow.value) return;

    pressTimer.value = setTimeout(() => {
        showPopover.value = true;
        nextTick(() => {
            updatePopoverPosition();
        });
    }, 100);
    // #ifdef WEB
    window.addEventListener('mouseup', doHide);
    // #endif
};

const updatePopoverPosition = async () => {
    const containerData = await utils.querySelector<false>('.ellipsis-box', instance);
    const popoverData = await utils.querySelector<false>('.popover', instance);
    if (!containerData || !popoverData || !containerData.left || !containerData.width || !popoverData.width || !containerData.top || !popoverData.height) return;

    const systemInfo = utils.System;
    const MARGIN = 10; // 间隔像素，避免贴边或者贴着弹出元素

    // 计算文本框中心点
    const boxCenter = containerData.left + containerData.width / 2;

    // 计算 popover 的位置
    let left = boxCenter - popoverData.width / 2;

    // 确保 popover 不超出屏幕左边
    if (left < MARGIN) {
        left = MARGIN;
    }

    // 确保 popover 不超出屏幕右边
    if (left + popoverData.width > systemInfo.getWindowWidth() - MARGIN) {
        left = systemInfo.getWindowWidth() - popoverData.width - MARGIN;
    }

    // 计算箭头位置（相对于 popover 的百分比）
    const tempArrowLeft = ((boxCenter - left) / popoverData.width) * 100;
    popoverLeft.value = left;
    popoverTop.value = containerData.top - popoverData.height - (MARGIN + 5);

    arrowLeft.value = Math.max(10, Math.min(90, tempArrowLeft)); // 限制箭头在 10% 到 90% 之间
    doShow();
};

const handleTouchEnd = () => {
    doHide();
};

const doShow = () => {
    nextTick(() => {
        let animation = uni.createAnimation(ANIMATION_PROP);
        animation.opacity(1).step();
        animationData.value = animation.export();
    });
};

const doHide = () => {
    if (pressTimer.value) {
        clearTimeout(pressTimer.value);
        pressTimer.value = null;
    }
    let animation = uni.createAnimation(ANIMATION_PROP);
    animation.opacity(0).step();
    animationData.value = animation.export();
    setTimeout(() => {
        showPopover.value = false;
    }, DURATION);
    // #ifdef WEB
    window.removeEventListener('mouseup', doHide);
    // #endif
};
</script>

<template>
    <view class="wrapper">
        <view class="ellipsis-box" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @mousedown="handleTouchStart">
            <slot>{{ text }}</slot>
        </view>
        <!-- 不做展示，正常显示文字长度，用于判断是否超过长度 -->
        <text class="measure-text">
            <slot>{{ text }}</slot>
        </text>

        <view class="popover" :class="showPopover ? 'show' : 'hidden'" :style="{ left: popoverLeft + 'px', top: popoverTop + 'px' }" :animation="animationData">
            <view class="popover-content">
                <slot>{{ text }}</slot>
            </view>
            <view class="popover-arrow" :style="{ left: arrowLeft + '%' }"></view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.wrapper {
    position: relative;
}

.ellipsis-box {
    display: -webkit-box;
    -webkit-line-clamp: var(--ste-table-popover-line);
    line-clamp: var(--ste-table-popover-line);
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    // #ifdef H5
    user-select: none;
    // #endif
}

.measure-text {
    position: fixed;
    left: -9999px;
    top: -9999px;
    white-space: nowrap;
    visibility: hidden;
}

.popover {
    position: fixed;
    z-index: 999;
    pointer-events: none;
    opacity: 0;
    &.show {
        display: block;
    }

    &.hidden {
        display: none;
    }
}

.popover-content {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
    word-break: break-word;
    white-space: normal;
    max-width: 60vw;
    text-align: left;
}

.popover-arrow {
    position: absolute;
    bottom: -6px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.8);
}
</style>
