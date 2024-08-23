<script lang="ts" setup>
import { computed, defineOptions, getCurrentInstance, type CSSProperties, type ComponentPublicInstance, onMounted, watch, onBeforeUnmount } from 'vue';
import type { UniTouchEvent, BaseEvent } from '../../types/event';
import utils from '../../utils/utils';
import propsData, { sliderEmits } from './props';
import useData from './useData';
const componentName = `ste-slider`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);
const emits = defineEmits(sliderEmits);
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

let hasMarks = false;
let isMouseDown = false;
let isSecondSlider = false;

let elRoot: UniApp.NodeInfo;

let { markList, isDrag, realPercentage, realPercentage2, getRealValue, calculateStepMarks, startPosition, getPosition, startPercentage } = useData(props, emits, instance);

const cmpRootClass = computed(() => {
    let classStr = '';
    if (isDrag.value) {
        classStr += 'ste-slider-drag ';
    }

    if (props.range) {
        classStr += 'ste-slider-range ';
    }

    if (props.disabled) {
        classStr += 'ste-slider-disabled ';
    }

    if (props.vertical) {
        classStr += 'ste-slider-vertical ';
    } else {
        classStr += 'ste-slider-horizontal ';
    }
    return classStr;
});

const cmpRootCssVar = computed(() => {
    return {
        '--progress-height': utils.addUnit(props.barHeight),
        '--bar-size': utils.addUnit(props.buttonSize),
        '--active-color': props.activeColor,
    };
});

const cmpInactiveStyle = computed(() => {
    let style: CSSProperties = {};
    if (!props.disabled) {
        const bg = utils.bg2style(props.inactiveColor);
        style = { ...style, ...bg };
    }
    return style;
});

const cmpActiveStyle = computed(() => {
    let style: CSSProperties = {};
    if (!props.disabled) {
        const bg = utils.bg2style(props.activeColor);
        style = { ...style, ...bg };
    }
    if (props.vertical) {
        if (props.range) {
            style.top = realPercentage.value + '%';
            style.height = realPercentage2.value - realPercentage.value + '%';
        } else {
            style.height = realPercentage.value + '%';
        }
    } else {
        if (props.range) {
            style.left = realPercentage.value + '%';
            style.width = realPercentage2.value - realPercentage.value + '%';
        } else {
            style.width = realPercentage.value + '%';
        }
    }
    return style;
});

onMounted(() => {
    handleWindowResize();
    uni.onWindowResize(handleWindowResize);
    calculateStepMarks();
});

onBeforeUnmount(() => {
    uni.offWindowResize(handleWindowResize);
});

watch(
    () => props.value,
    val => {
        if (Array.isArray(val)) {
            realPercentage.value = getRealValue(Number(val[0]));
            realPercentage2.value = getRealValue(Number(val[1]));
        } else {
            realPercentage.value = getRealValue(Number(val));
        }
    },
    { immediate: true }
);

watch(
    () => props.marks,
    val => {
        hasMarks = Object.keys(val || {}).length > 0;
    },
    { immediate: true }
);

function handleWindowResize() {
    utils.querySelector<false>('.ste-slider-root', instance).then(rect => {
        elRoot = rect || {};
    });
}

function handleClick(e: MouseEvent | BaseEvent) {
    if (props.readonly || props.disabled || props.range) return;
    const { top = 0, height = 0, left = 0, width = 0 } = elRoot;
    let offsetValue;
    if (props.vertical) {
        let clientY = e.detail.y || e.detail.clientY;
        offsetValue = ((clientY - top) / height) * 100;
    } else {
        let clientX = e.detail.x || e.detail.clientX;
        offsetValue = ((clientX - left) / width) * 100;
    }
    updateWidth(offsetValue, false);
    emits('change', props.range ? [realPercentage.value, realPercentage2.value] : realPercentage.value);
}

function onTouchStart(e: UniTouchEvent | MouseEvent, isSecond: Boolean = false) {
    isSecondSlider = !!isSecond;

    startPosition.value = getPosition(e);
    startPercentage.value = isSecond ? realPercentage2.value : realPercentage.value;
    emits('dragStart', e);
}

function onTouchMove(e: UniTouchEvent | MouseEvent) {
    if (props.readonly || props.disabled) return;
    let touches = getPosition(e);
    let distance = props.vertical ? touches.clientY - startPosition.value.clientY : touches.clientX - startPosition.value.clientX;
    let containerLength = props.vertical ? elRoot.height : elRoot.width;
    let offsetValue = (distance / Number(containerLength)) * 100;
    updateWidth(offsetValue, true);
}
function onTouchEnd(e: UniTouchEvent | MouseEvent) {
    isDrag.value = false;
    // this.isSecondSlider = false;
    emits('dragEnd', e);
    emits('change', props.range ? [realPercentage.value, realPercentage2.value] : realPercentage.value);
    removeListenner && removeListenner();
}

function updateWidth(value: number, drag: boolean) {
    let realValue;
    isDrag.value = drag;
    if (drag) {
        realValue = startPercentage.value + value;
    } else {
        realValue = value;
    }
    const changeValue = calculateValue(realValue);
    if (isSecondSlider) {
        realPercentage2.value = changeValue;
    } else {
        realPercentage.value = changeValue;
    }
    emits('input', props.range ? [realPercentage.value, realPercentage2.value] : realPercentage.value);
}

// 根据步长和最大最小值来计算每次的滑动
function calculateValue(value: number) {
    let step = hasMarks ? 1 : Number(props.step);
    let min = Number(props.min);
    let max = Number(props.max);

    /**
     *当范围模式下时，两个滑块不允许交替,
     *第一个滑块的最大值就是第二个滑块的当前值，
     * 第二个滑块的最小是就是第一个滑块的当前值
     */
    if (props.range) {
        if (isSecondSlider) {
            min = realPercentage.value;
        } else {
            max = realPercentage2.value;
        }
    }

    // 计算出当前值相对于最小值的偏移量
    const offset = value - Number(min);
    // 根据步长计算出应该是哪个步长点
    const targetValue = Math.round(offset / step) * step + min;
    // 确保计算出的值不会超过最大值和低于最小值
    return getRealValue(targetValue, max, min);
}

// #ifdef WEB
// 适配web端没有touch事件
function onDown(e: UniTouchEvent | MouseEvent, isSecond: Boolean = false) {
    isMouseDown = true;
    onTouchStart({ touches: [{ clientX: e.clientX, clientY: e.clientY }] } as unknown as UniTouchEvent, isSecond);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
}
function removeListenner() {
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
}

// #endif
</script>

<template>
    <view class="ste-slider-root" :class="cmpRootClass" :style="[cmpRootCssVar]" @click="handleClick">
        <view class="inactive-box" :style="[cmpInactiveStyle]"></view>
        <view class="active-box line" :style="[cmpActiveStyle]"></view>

        <view
            class="slider-bar-box"
            :class="{ 'range-min': realPercentage == 0, 'range-max': realPercentage == 100 }"
            @touchstart.stop="onTouchStart"
            @touchmove.stop="onTouchMove"
            @touchend.stop="onTouchEnd"
            @touchcancel.stop="onTouchEnd"
            @mousedown="onDown"
            :style="{
                left: vertical ? '50%' : `${realPercentage}%`,
                top: vertical ? `${realPercentage}%` : '50%',
            }"
        >
            <slot v-if="range" name="leftButton">
                <view class="slider-bar"></view>
            </slot>
            <slot v-else name="button">
                <view class="slider-bar"></view>
            </slot>
        </view>

        <view
            v-if="range"
            class="slider-bar-box range"
            :class="{ 'range-min': realPercentage2 == 0, 'range-max': realPercentage2 == 100 }"
            @touchstart="onTouchStart($event, true)"
            @touchmove.stop="onTouchMove($event)"
            @touchend="onTouchEnd($event)"
            @touchcancel="onTouchEnd($event)"
            @mousedown="onDown($event, true)"
            :style="{
                left: vertical ? '50%' : `${realPercentage2}%`,
                top: vertical ? `${realPercentage2}%` : '50%',
                zIndex: isSecondSlider ? 10 : 8,
            }"
        >
            <slot name="rightButton">
                <view class="slider-bar"></view>
            </slot>
        </view>

        <template v-if="showStops">
            <template v-for="(e, i) in markList">
                <view class="mark-box" :style="{ left: e.left, top: e.top }">
                    <view class="dot" />
                    <view class="marks-label" :style="e.style">{{ e.label }}</view>
                </view>
            </template>
        </template>
    </view>
</template>

<style lang="scss" scoped>
@import './ste-slider.scss';
</style>
