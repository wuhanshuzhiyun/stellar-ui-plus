<script lang="ts">
export default defineComponent({
    name: 'ste-drag',
});
</script>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import utils from '../../utils/utils';
import type { HTMLMouseEvent, UniTouchEvent } from '../../types/event.d';
import propsData, { DEFAULT_BOUNDARY } from './props';

const props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'start'): void;
    (e: 'end'): void;
}>();

let isMove = false; // 标识是否正在拖动
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
    emits('start');
    isMove = true;
    const touch = getMoveObj(e);
    start.value = { x: touch.pageX, y: touch.pageY };
    preTranslate.value = translate.value;
}
function touchMove(e: UniTouchEvent | HTMLMouseEvent | MouseEvent) {
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
    if (isMove) {
        emits('end');
        isMove = false;
    }
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
