<script lang="ts">
export default defineComponent({
    name: 'ste-drag',
});
</script>

<!-- <script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';

const props = defineProps(propsData);
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const myDrag = ref();

const myDragID = `myDrag-${utils.guid()}`;
const state: any = reactive({
    elWidth: 0,
    elHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    startTop: 0,
    startLeft: 0,
    initTop: 0,
    initLeft: 0,
    top: 0,
    left: 0,
    attractTransition: false,
    boundary: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    } as Record<string, any>,
});

const classes = computed(() => {
    const prefixCls = 'ste-drag-root';
    return {
        [prefixCls]: true,
    };
});
const domElem = uni.getSystemInfoSync();
async function getInfo() {
    const rec = await utils.querySelector<false>('#' + myDragID, instance);
    console.log('rec is ', rec);
    state.elWidth = rec.width;
    state.elHeight = rec.height;
    state.initTop = rec.top;
    state.initLeft = rec.left;

    state.screenWidth = domElem.screenWidth;
    state.screenHeight = domElem.screenHeight;

    attractFn();
}

function touchMove(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];

    let left = touch.clientX - state.startLeft;
    let top = touch.clientY - state.startTop;

    const rightLocation = state.screenWidth - state.elWidth - state.boundary.right;
    if (Math.abs(left + state.initLeft) > rightLocation) left = rightLocation - state.initLeft;
    else if (left + state.initLeft <= state.boundary.left) left = state.boundary.left - state.initLeft;

    if (top + state.initTop < state.boundary.top) top = state.boundary.top - state.initTop;
    else if (top + state.initTop > state.screenHeight - state.elHeight - state.boundary.bottom) top = state.screenHeight - state.elHeight - state.boundary.bottom - state.initTop;

    if (props.direction !== 'y') state.left = left;
    if (props.direction !== 'x') state.top = top;
}

function attractFn() {
    if (!props.attract || props.direction === 'y') return;
    const screenCenterX = (state.screenWidth - state.boundary.right - state.boundary.left) / 2;
    const centerX = screenCenterX - state.initLeft - state.elWidth / 2;
    if (state.left < centerX) state.left = state.boundary.left - state.initLeft;
    else state.left = state.screenWidth - state.elWidth - state.boundary.right - state.initLeft;
    state.attractTransition = true;
    setTimeout(() => {
        state.attractTransition = false;
    }, 400);
}

function touchEnd() {
    attractFn();
}
function touchStart(e: TouchEvent) {
    const touch = e.touches[0];
    state.startLeft = touch.clientX - state.left;
    state.startTop = touch.clientY - state.top;
    state.attractTransition = false;
}
onMounted(() => {
    setTimeout(() => {
        getInfo();
    }, 200);

    state.boundary = props.boundary;
});

const getStyle = computed(() => {
    return {
        transform: `translate(${`${state.left}px`}, ${`${state.top}px`})`,
        transition: state.attractTransition ? 'all ease 0.3s' : 'none',
    };
});
</script>

<template>
    <view :id="myDragID" ref="myDrag" :class="classes" :style="getStyle" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend="touchEnd">
        <slot />
    </view>
</template> -->

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import utils from '../../utils/utils';
import type { HTMLMouseEvent, UniTouchEvent } from '../../types/event.d';
import propsData, { DEFAULT_BOUNDARY } from './props';
const props = defineProps(propsData);
const rootId = 'ste-drag-root-' + utils.guid();
const SCREEN_WIDTH = utils.System.getWindowWidth();
const SCREEN_HEIGHT = utils.System.getWindowHeight();
const thas = ref<globalThis.ComponentPublicInstance | null>();

type PositionInfoType = {
    x: number;
    y: number;
};

const start = ref<PositionInfoType>({
    x: 0,
    y: 0,
});
const translate = ref<PositionInfoType>({
    x: 0,
    y: 0,
});
const preTranslate = ref<PositionInfoType>({
    x: 0,
    y: 0,
});

const attractTransition = ref(false); // 标识是否贴边动画
const initTop = ref<number | undefined>(0);
const initLeft = ref<number | undefined>(0);
const elWidth = ref<number | undefined>(0);
const elHeight = ref<number | undefined>(0);
const canMove = ref(false);
const boundaryData = ref(props.boundary);

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
    if (!thas.value) return;
    utils.querySelector<false>('#' + rootId, thas.value).then(rec => {
        elWidth.value = rec.width;
        elHeight.value = rec.height;
        initTop.value = rec.top;
        initLeft.value = rec.left;

        nextTick(() => {
            touchEnd();
        });
    });
});

onBeforeUnmount(() => {
    removeListenner();
});

watch(
    () => props.boundary,
    val => {
        boundaryData.value = { ...DEFAULT_BOUNDARY, ...val };
    },
    { immediate: true, deep: true }
);

function mouseDown(e: HTMLMouseEvent | MouseEvent) {
    touchStart(e);
    window.addEventListener('mousemove', touchMove);
    window.addEventListener('mouseup', touchEnd);
}

function removeListenner() {
    window.removeEventListener('mousemove', touchMove);
    window.removeEventListener('mouseup', touchEnd);
}
function touchStart(e: UniTouchEvent | HTMLMouseEvent | MouseEvent) {
    const touch = getMoveObj(e);
    start.value = { x: touch.pageX, y: touch.pageY };
    preTranslate.value = translate.value;
}
function touchMove(e: UniTouchEvent | HTMLMouseEvent | MouseEvent) {
    e.preventDefault();
    const touch = getMoveObj(e);
    let x = preTranslate.value.x + (touch.pageX - start.value.x);
    let xLeft = x + (initLeft.value ?? 0);
    let y = preTranslate.value.y + (touch.pageY - start.value.y);
    let yTop = y + (initTop.value ?? 0);

    if (xLeft <= boundaryData.value.left) {
        x = boundaryData.value.left - (initLeft.value ?? 0);
    }

    if (xLeft >= SCREEN_WIDTH - (boundaryData.value.right + elWidth.value)) {
        x = SCREEN_WIDTH - (boundaryData.value.right + elWidth.value) - (initLeft.value ?? 0);
    }

    if (yTop <= boundaryData.value.top) {
        y = boundaryData.value.top - (initTop.value ?? 0);
    }

    if (yTop >= SCREEN_HEIGHT - (boundaryData.value.bottom + elHeight.value)) {
        y = SCREEN_HEIGHT - (boundaryData.value.bottom + elHeight.value) - (initTop.value ?? 0);
    }

    translate.value = {
        x: props.direction == 'all' || props.direction == 'x' ? x : preTranslate.value.x,
        y: props.direction == 'all' || props.direction == 'y' ? y : preTranslate.value.y,
    };
}
function touchEnd() {
    removeListenner && removeListenner();
    // 是否执行贴边
    if (!props.attract) {
        return;
    }

    let { x: moveLeft } = translate.value;
    const screenCenterX = (SCREEN_WIDTH - boundaryData.value.right - boundaryData.value.left) / 2;
    const centerX = screenCenterX - (initLeft.value ?? 0) - (elWidth.value ?? 0) / 2;
    if (moveLeft < centerX) {
        moveLeft = boundaryData.value.left - (initLeft.value ?? 0);
    } else {
        moveLeft = SCREEN_WIDTH - (elWidth.value ?? 0) - boundaryData.value.right - (initLeft.value ?? 0);
    }

    translate.value = { ...translate.value, x: moveLeft };

    attractTransition.value = true;
    setTimeout(() => {
        attractTransition.value = false;
    }, 400);
}
function getMoveObj(e: UniTouchEvent | HTMLMouseEvent | MouseEvent): { pageX: number; pageY: number } {
    if ('touches' in e) {
        // e is UniTouchEvent
        const touch = e.touches[0];
        return { pageX: touch.pageX, pageY: touch.pageY };
    } else {
        // e is HTMLMouseEvent
        return { pageX: e.clientX, pageY: e.clientY };
    }
}
</script>
<template>
    <view
        class="ste-drag-root"
        :id="rootId"
        @touchstart="touchStart"
        @touchmove.stop.prevent="touchMove"
        @touchend="touchEnd"
        @mousedown="mouseDown"
        :style="{
            translate: translate.x + 'px ' + translate.y + 'px',
            transition: attractTransition ? 'all ease 0.3s' : 'none',
        }"
    >
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
.ste-drag-root {
    display: inline-flex;
}
</style>
