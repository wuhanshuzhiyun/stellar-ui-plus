<script lang="ts">
export default defineComponent({
    name: 'ste-drag',
});
</script>

<script setup lang="ts">
import { watch, onMounted, reactive, onBeforeUnmount } from 'vue';
import utils from '../../utils/utils';
import propsData, { DEFAULT_BOUNDARY } from './props';

let isMove = false;
const props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'start'): void;
    (e: 'end'): void;
}>();

const SCREEN_WIDTH = utils.System.getWindowWidth();
const SCREEN_HEIGHT = utils.System.getWindowHeight();
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const rootID = `myDrag-${utils.guid()}`;
const state: any = reactive({
    elWidth: 0,
    elHeight: 0,
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
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

onMounted(() => {
    getInfo();
});

onBeforeUnmount(() => {
    removeListenner();
});

watch(
    () => props.boundary,
    val => {
        state.boundary = { ...DEFAULT_BOUNDARY, ...val };
    },
    { immediate: true, deep: true }
);

async function getInfo() {
    const rec = await utils.querySelector<false>('#' + rootID, instance);
    state.elWidth = rec.width;
    state.elHeight = rec.height;
    state.initTop = rec.top;
    state.initLeft = rec.left;

    attractFn();
}

function touchMove(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    const touch = getMoveObj(e);

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
    removeListenner && removeListenner();
    if (isMove) {
        emits('end');
        isMove = false;
    }
    attractFn();
}
function touchStart(e: TouchEvent | MouseEvent) {
    isMove = true;
    emits('start');
    const touch = getMoveObj(e);
    state.startLeft = touch.clientX - state.left;
    state.startTop = touch.clientY - state.top;
    state.attractTransition = false;
}

function mouseDown(e: MouseEvent) {
    touchStart(e);
    window.addEventListener('mousemove', touchMove);
    window.addEventListener('mouseup', touchEnd);
}

function removeListenner() {
    window.removeEventListener('mousemove', touchMove);
    window.removeEventListener('mouseup', touchEnd);
}
function getMoveObj(e: TouchEvent | MouseEvent): { clientX: number; clientY: number } {
    if ('touches' in e) {
        // e is UniTouchEvent
        const touch = e.touches[0];
        return { clientX: touch.pageX, clientY: touch.pageY };
    } else {
        // e is HTMLMouseEvent
        return { clientX: e.clientX, clientY: e.clientY };
    }
}
</script>

<template>
    <view
        :id="rootID"
        class="ste-drag-root"
        :style="{
            transform: `translate(${`${state.left}px`}, ${`${state.top}px`})`,
            transition: state.attractTransition ? 'all ease 0.3s' : 'none',
        }"
        @touchstart="touchStart"
        @touchmove.stop.prevent="touchMove"
        @touchend="touchEnd"
        @mousedown="mouseDown"
    >
        <slot />
    </view>
</template>

<style lang="scss" scoped>
.ste-drag-root {
    display: inline-flex;
}
</style>
