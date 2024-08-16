<script lang="ts">
import { defineOptions } from 'vue';
const componentName = `ste-popup`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});
</script>

<script setup lang="ts">
import { ref, computed, watch, type CSSProperties } from 'vue';
import propsData from './props';
import utils from '../../utils/utils';
const DEFAULT_BORDER_RADIUS = 32;
const props = defineProps(propsData);

const animationProp: UniApp.CreateAnimationOptions = { duration: props.duration, timingFunction: 'ease-out' };
const pageDisplay = ref('none');
const overlayAnimationData = ref<UniApp.Animation>();
const animationData = ref<UniApp.Animation>();
const showContent = ref(false);

const emits = defineEmits<{
    (e: 'clickMask'): void;
    (e: 'close', suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'update:show', show: boolean): void;
    (e: 'open-after'): void;
}>();

let clickTask: Promise<any> = Promise.resolve(null);

if (props.show) {
    beginAnimation();
}

const cmpPageStyle = computed(() => {
    return {
        zIndex: props.zIndex,
        display: pageDisplay.value,
        backgroundColor: props.showMask ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
        '--content-border-radius': utils.formatPx(props.round ? DEFAULT_BORDER_RADIUS : 0),
        '--content-height': utils.addUnit(Number(props.height) / 2),
    };
});
const cmpContentStyle = computed(() => {
    let style: CSSProperties = {
        width: utils.addUnit(props.width),
        height: utils.addUnit(props.height),
        backgroundColor: props.backgroundColor,
    };

    if (props.position === 'center') {
        // style.transform = `translate(${utils.addUnit(this.offsetX)}, ${utils.addUnit(this.offsetY)})`;
    } else if (props.position === 'bottom') {
    } else if (props.position === 'top') {
    } else if (props.position === 'left') {
    } else if (props.position === 'right') {
    }

    return style;
});

watch(
    () => props.show,
    val => {
        if (val) {
            beginAnimation();
        } else {
            endAnimation();
        }
    }
);

function onMaskClick() {
    emits('clickMask');
    if (props.isMaskClick) {
        handleClose();
    }
}

async function handleClose() {
    if (await clickTask) {
        return;
    }
    let next = true;
    clickTask = new Promise<void>((resolve, reject) => {
        emits(
            'close',
            () => (next = false),
            () => resolve(),
            () => reject()
        );
    });
    if (!next) {
        await clickTask;
    }
    endAnimation();
    emits('update:show', false);
    setTimeout(() => {
        clickTask = Promise.resolve(null);
    }, props.duration);
}

async function beginAnimation() {
    pageDisplay.value = 'flex';
    await utils.sleep(50);
    let animation = uni.createAnimation(animationProp);
    let overlayAnimation = uni.createAnimation(animationProp);
    overlayAnimation.opacity(1).step({
        duration: props.duration,
    });

    if (props.position === 'center') {
        animation
            .scale(1, 1)
            .translate(utils.formatPx(props.offsetX) as number, utils.formatPx(props.offsetY) as number)
            .step();
    } else if (props.position === 'top' || props.position === 'bottom') {
        animation.translate(utils.formatPx(props.offsetX) as number, utils.formatPx(props.offsetY) as number).step();
    } else if (props.position === 'left' || props.position === 'right') {
        animation.translate(utils.formatPx(props.offsetX) as number, utils.formatPx(props.offsetY) as number).step();
    }

    overlayAnimationData.value = overlayAnimation.export();
    animationData.value = animation.export();

    setTimeout(() => {
        showContent.value = true;
        emits('open-after');
    }, props.duration);
}

function endAnimation() {
    let animation = uni.createAnimation(animationProp);
    let overlayAnimation = uni.createAnimation(animationProp);
    overlayAnimation.opacity(0).step();

    if (props.position === 'center') {
        animation.scale(0, 0).step();
    } else if (props.position === 'top' || props.position === 'bottom') {
        animation.translateY(props.position == 'top' ? ('-100%' as any) : ('100%' as any)).step();
    } else if (props.position === 'left' || props.position === 'right') {
        animation.translateX(props.position == 'left' ? ('-100%' as any) : ('100%' as any)).step();
    }

    overlayAnimationData.value = overlayAnimation.export();
    animationData.value = animation.export();

    setTimeout(() => {
        pageDisplay.value = 'none';
        showContent.value = false;
    }, props.duration);
}

function touchmove(e: TouchEvent) {
    // TODO nvue 取消冒泡
    e.stopPropagation();
}
</script>

<template>
    <view class="ste-popup" :class="position" :style="[cmpPageStyle]" @click.stop="onMaskClick" @touchmove.stop.prevent="touchmove" :animation="overlayAnimationData">
        <view class="content" :class="position" :style="[cmpContentStyle]" :animation="animationData" @click.stop>
            <template v-if="keepContent || showContent">
                <scroll-view style="width: 100%; height: 100%" v-if="Number(height) > 0" :scroll-y="true">
                    <slot name="default"></slot>
                </scroll-view>
                <slot v-else name="default"></slot>
            </template>
            <view class="close-icon-box" @click="handleClose" v-if="showClose && position != 'center'">
                <ste-icon code="&#xe6a0;" :size="40" :color="'#666'"></ste-icon>
            </view>
        </view>
        <view class="close-icon-box-center" @click="handleClose" v-if="showClose && position == 'center' && showContent">
            <ste-icon code="&#xe6a0;" :size="40" color="'#fff'"></ste-icon>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-popup {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    touch-action: none;

    .close-icon-box-center {
        position: absolute;
        color: #fff;
        top: calc(50% + var(--content-height) + 40rpx);
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
    }
}

.content {
    display: inline-block;
    opacity: 1;
    overflow-y: auto;
    position: absolute;
    .close-icon-box {
        position: absolute;
        right: 24rpx;
        top: 24rpx;
        display: flex;
    }
    &.center {
        // position: relative;
        transform: scale(0);
        border-radius: var(--content-border-radius);
    }
    &.bottom {
        transform: translateY(100%);
        left: 0;
        bottom: 0;
        border-top-left-radius: var(--content-border-radius);
        border-top-right-radius: var(--content-border-radius);
    }
    &.top {
        transform: translateY(-100%);
        left: 0;
        top: 0;
        border-bottom-left-radius: var(--content-border-radius);
        border-bottom-right-radius: var(--content-border-radius);
    }
    &.left {
        transform: translateX(-100%);
        left: 0;
        top: 0;
        border-top-right-radius: var(--content-border-radius);
        border-bottom-right-radius: var(--content-border-radius);
    }
    &.right {
        transform: translateX(100%);
        right: 0;
        top: 0;
        border-top-left-radius: var(--content-border-radius);
        border-bottom-left-radius: var(--content-border-radius);
    }
}
</style>
