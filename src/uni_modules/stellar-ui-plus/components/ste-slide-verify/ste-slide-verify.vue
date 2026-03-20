<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch, type ComponentPublicInstance, type CSSProperties } from 'vue';
import { useColorStore } from '../../store/color';
import utils from '../../utils/utils';
import propsData, { slideVerifyEmits, type SlideVerifyDetail } from './props';

const componentName = `ste-slide-verify`;

defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);
const emits = defineEmits(slideVerifyEmits);

const { getColor } = useColorStore();
const themeColor = getColor()?.steThemeColor || '#0090FF';
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const isDragging = ref(false);
const isSuccess = ref(false);
const isFail = ref(false);
const trackWidth = ref(0);
const sliderLeft = ref(0);
const startX = ref(0);
const startLeft = ref(0);
const imageSuccessProgress = ref(1);
const currentAngle = ref(0);
const disableImageTransition = ref(false);

let failTimer: ReturnType<typeof setTimeout> | null = null;

const sliderSizePx = computed(() => {
    const size = Number(utils.formatPx(props.size, 'num'));
    return Number.isNaN(size) ? 0 : size;
});

const maxSliderLeft = computed(() => {
    const max = trackWidth.value - sliderSizePx.value;
    return max > 0 ? max : 0;
});

const progress = computed(() => {
    if (!maxSliderLeft.value) return 0;
    return sliderLeft.value / maxSliderLeft.value;
});

const currentText = computed(() => {
    if (isSuccess.value) return props.successText;
    if (isFail.value) return props.failText;
    if (props.text) return props.text;
    return props.mode === 'image' ? '向右滑动转动图片' : '向右滑动验证';
});

const sliderIconColor = computed(() => {
    if (isSuccess.value || isFail.value) return '#ffffff';
    return activeVisualColor.value;
});

const activeColor = computed(() => {
    return props.activeColor || themeColor;
});

const activeVisualColor = computed(() => {
    const match = String(activeColor.value).match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))/);
    return match ? match[1] : themeColor;
});

const inactiveColor = computed(() => {
    return props.inactiveColor || '#f4f4f5';
});

const sliderBorderColor = computed(() => {
    return isDragging.value ? utils.Color.formatColor(activeVisualColor.value, 0.12) : 'transparent';
});

const textColor = computed(() => {
    if (isSuccess.value) return props.successColor;
    if (isFail.value) return props.failColor;
    return isDragging.value ? activeVisualColor.value : '#5f6b7a';
});

const rootClass = computed(() => {
    let className = '';
    if (isDragging.value) className += ' ste-slide-verify-dragging';
    if (isSuccess.value) className += ' ste-slide-verify-success';
    if (isFail.value) className += ' ste-slide-verify-fail';
    if (props.disabled) className += ' ste-slide-verify-disabled';
    if (props.mode === 'image') className += ' ste-slide-verify-image-mode';
    return className;
});

const rootStyle = computed(() => {
    return {
        '--slide-verify-size': utils.addUnit(props.size),
        '--slide-verify-active-color': activeColor.value,
        '--slide-verify-inactive-color': inactiveColor.value,
        '--slide-verify-success-color': props.successColor,
        '--slide-verify-fail-color': props.failColor,
        '--slide-verify-text-color': textColor.value,
    };
});

const trackStyle = computed(() => {
    const style: CSSProperties = {
        height: utils.addUnit(props.size),
        background: inactiveColor.value,
    };
    return style;
});

const progressStyle = computed(() => {
    const style: CSSProperties = {
        width: `${Math.min(trackWidth.value, sliderLeft.value + sliderSizePx.value / 2)}px`,
        opacity: isSuccess.value || isFail.value ? 0.28 : isDragging.value ? 0.22 : 0.16,
    };

    if (isSuccess.value) {
        style.background = props.successColor;
    } else if (isFail.value) {
        style.background = props.failColor;
    } else {
        style.background = activeVisualColor.value;
    }

    return style;
});

const sliderStyle = computed(() => {
    const style: CSSProperties = {
        width: `${sliderSizePx.value}px`,
        height: utils.addUnit(props.size),
        left: `${sliderLeft.value}px`,
        background: '#ffffff',
        borderColor: sliderBorderColor.value,
        color: sliderIconColor.value,
    };

    if (isSuccess.value) {
        style.background = props.successColor;
        style.borderColor = props.successColor;
        style.color = '#ffffff';
    } else if (isFail.value) {
        style.background = props.failColor;
        style.borderColor = props.failColor;
        style.color = '#ffffff';
    }

    return style;
});

const textStyle = computed(() => {
    return {} as CSSProperties;
});

const imageStyle = computed(() => {
    return {
        width: utils.addUnit(props.imageSize),
        height: utils.addUnit(props.imageSize),
        transform: `rotate(${currentAngle.value}deg)`,
        transition: disableImageTransition.value ? 'none' : undefined,
    };
});

function setImageAngle(angle: number, immediate = false) {
    if (!immediate) {
        currentAngle.value = angle;
        return;
    }

    disableImageTransition.value = true;
    currentAngle.value = angle;

    nextTick(() => {
        setTimeout(() => {
            disableImageTransition.value = false;
        }, 0);
    });
}

function getRandomImageSuccessProgress() {
    return Number((Math.random() * 0.54 + 0.23).toFixed(4));
}

function normalizeAngle(angle: number) {
    const result = angle % 360;
    return result >= 0 ? result : result + 360;
}

function clearFailTimer() {
    if (failTimer) {
        clearTimeout(failTimer);
        failTimer = null;
    }
}

function buildDetail(): SlideVerifyDetail {
    return {
        mode: props.mode,
        progress: progress.value,
        angle: normalizeAngle(currentAngle.value),
        left: sliderLeft.value,
        maxLeft: maxSliderLeft.value,
    };
}

function getImageSuccessLeft() {
    return Number((maxSliderLeft.value * imageSuccessProgress.value).toFixed(2));
}

function setSuccessState() {
    clearFailTimer();
    isDragging.value = false;
    isFail.value = false;
    isSuccess.value = true;
    if (props.mode === 'image') {
        sliderLeft.value = getImageSuccessLeft();
        setImageAngle(0, true);
    } else {
        sliderLeft.value = maxSliderLeft.value;
        currentAngle.value = 0;
    }
}

function setDefaultState() {
    clearFailTimer();
    isDragging.value = false;
    isSuccess.value = false;
    isFail.value = false;
    sliderLeft.value = 0;
    startLeft.value = 0;
    startX.value = 0;
    if (props.mode === 'image') {
        imageSuccessProgress.value = getRandomImageSuccessProgress();
        setImageAngle(Number((imageSuccessProgress.value * 360).toFixed(2)), true);
    } else {
        imageSuccessProgress.value = 1;
        currentAngle.value = 0;
    }
}

function syncModelValue(value: boolean) {
    if (value) {
        setSuccessState();
    } else if (!isDragging.value) {
        setDefaultState();
    }
}

async function init() {
    await nextTick();
    const rect = await utils.querySelector<false>('.ste-slide-verify-track', instance);
    trackWidth.value = rect?.width || 0;
    syncModelValue(props.modelValue);
}

function reset() {
    setDefaultState();
}

function checkVerification() {
    if (props.mode === 'slide') {
        return progress.value >= 1;
    }

    const angle = normalizeAngle(currentAngle.value);
    return angle <= props.angleThreshold || angle >= 360 - props.angleThreshold;
}

function getClientX(event: TouchEvent | MouseEvent) {
    if ('touches' in event) {
        return event.touches[0]?.clientX ?? startX.value;
    }
    return event.clientX;
}

function updateByClientX(clientX: number) {
    if (!maxSliderLeft.value) return;
    let left = startLeft.value + clientX - startX.value;
    if (left < 0) left = 0;
    if (left > maxSliderLeft.value) left = maxSliderLeft.value;

    sliderLeft.value = left;

    if (props.mode === 'image') {
        currentAngle.value = Number(normalizeAngle((imageSuccessProgress.value - progress.value) * 360).toFixed(2));
    }

    emits('change', buildDetail());
}

function touchStart(event: TouchEvent | MouseEvent) {
    if (props.disabled || isSuccess.value || isFail.value) return;

    clearFailTimer();
    isFail.value = false;
    isDragging.value = true;
    startX.value = getClientX(event);
    startLeft.value = sliderLeft.value;
}

function touchMove(event: TouchEvent | MouseEvent) {
    if (!isDragging.value || props.disabled || isSuccess.value || isFail.value) return;
    updateByClientX(getClientX(event));
}

function touchEnd() {
    // #ifdef WEB
    removeListenner();
    // #endif

    if (!isDragging.value || props.disabled || isSuccess.value || isFail.value) return;

    isDragging.value = false;

    const detail = buildDetail();

    if (checkVerification()) {
        setSuccessState();
        emits('update:modelValue', true);
        emits('success', buildDetail());
        return;
    }

    emits('update:modelValue', false);

    if (props.showFail) {
        isFail.value = true;
        emits('fail', detail);

        if (props.failDuration > 0) {
            failTimer = setTimeout(() => {
                reset();
            }, props.failDuration);
        }
    } else {
        emits('fail', detail);
        reset();
    }
}

function handleWindowResize() {
    init();
}

// #ifdef WEB
function mouseDown(event: MouseEvent) {
    if (props.disabled || isSuccess.value || isFail.value) return;
    touchStart(event);
    window.addEventListener('mousemove', touchMove);
    window.addEventListener('mouseup', touchEnd);
}

function removeListenner() {
    window.removeEventListener('mousemove', touchMove);
    window.removeEventListener('mouseup', touchEnd);
}
// #endif

watch(
    () => props.modelValue,
    value => {
        syncModelValue(value);
    }
);

watch(
    () => [props.mode, props.imageUrl, props.size, props.imageSize],
    () => {
        init();
    }
);

onMounted(() => {
    init();
    uni.onWindowResize(handleWindowResize);
});

onBeforeUnmount(() => {
    clearFailTimer();
    uni.offWindowResize(handleWindowResize);
    // #ifdef WEB
    removeListenner();
    // #endif
});

defineExpose({ init, reset });
</script>

<template>
    <view class="ste-slide-verify-root" :class="[rootClass]" :style="[rootStyle]" data-test="slide-verify">
        <image v-if="mode === 'image' && imageUrl" class="ste-slide-verify-image" :src="imageUrl" :style="[imageStyle]" mode="aspectFill"></image>
        <view class="ste-slide-verify-track" :style="[trackStyle]">
            <view class="ste-slide-verify-progress" :style="[progressStyle]"></view>
            <view class="ste-slide-verify-text" :style="[textStyle]">
                <ste-text>{{ currentText }}</ste-text>
            </view>
            <view
                class="ste-slide-verify-slider"
                :style="[sliderStyle]"
                @touchstart.stop="touchStart"
                @touchmove.stop.prevent="touchMove"
                @touchend="touchEnd"
                @touchcancel="touchEnd"
                @mousedown.stop="mouseDown"
            >
                <view class="slider-icon">
                    <ste-icon v-if="isSuccess" code="&#xe67a;" :size="28" color="#ffffff"></ste-icon>
                    <template v-else>
                        <view class="slider-icon-item">
                            <ste-icon code="&#xe674;" :size="22" :color="sliderIconColor"></ste-icon>
                        </view>
                        <view class="slider-icon-item slider-icon-item-overlap">
                            <ste-icon code="&#xe674;" :size="22" :color="sliderIconColor"></ste-icon>
                        </view>
                    </template>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-slide-verify-root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 28rpx;

    &.ste-slide-verify-disabled {
        opacity: 0.6;
    }

    .ste-slide-verify-image {
        border-radius: 50%;
        display: block;
        object-fit: cover;
        background: #ffffff;
        box-shadow: 0 18rpx 40rpx rgba(15, 35, 95, 0.08);
        transition: transform 0.15s linear;
    }

    .ste-slide-verify-track {
        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 14rpx;
        user-select: none;
        box-sizing: border-box;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    .ste-slide-verify-progress {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 14rpx;
        transition:
            width 0.25s ease,
            opacity 0.25s ease,
            background-color 0.25s ease;
    }

    .ste-slide-verify-text {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 56rpx;
        color: var(--slide-verify-text-color);
        font-size: 28rpx;
        font-weight: 600;
        letter-spacing: 0.4rpx;
        z-index: 1;
        pointer-events: none;
    }

    .ste-slide-verify-slider {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        border-radius: 10rpx;
        border-width: 1px;
        border-style: solid;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--slide-verify-active-color);
        transition:
            left 0.3s ease,
            background-color 0.3s ease,
            border-color 0.3s ease;

        .slider-icon {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .slider-icon-item {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .slider-icon-item-overlap {
            margin-left: -14rpx;
        }
    }

    &.ste-slide-verify-dragging {
        .ste-slide-verify-progress,
        .ste-slide-verify-slider,
        .ste-slide-verify-image {
            transition: none;
        }

        .ste-slide-verify-slider {
            box-shadow: none;
        }
    }

    &.ste-slide-verify-image-mode {
        row-gap: 34rpx;
    }
}
</style>
