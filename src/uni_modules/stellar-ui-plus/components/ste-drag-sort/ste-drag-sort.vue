<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, ref, watch, type ComponentPublicInstance, type CSSProperties } from 'vue';
import { getTouchX, getTouchY, toTouchArray } from '../ste-select-seat/useTouchCompat';
import utils from '../../utils/utils';
import propsData, { type SteDragSortItem } from './props';

const componentName = 'ste-drag-sort';

defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

type InternalItem = {
    uid: string;
    raw: SteDragSortItem;
};

type ItemPosition = {
    top: number;
    left: number;
    width: number;
    height: number;
};

type TranslateOffset = {
    x: number;
    y: number;
};

const props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'update:modelValue', value: SteDragSortItem[]): void;
    (e: 'change', value: SteDragSortItem[]): void;
    (e: 'start', index: number): void;
    (e: 'end', index: number): void;
}>();

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const list = ref<InternalItem[]>([]);
const dragging = ref(false);
const dragIndex = ref(-1);
const insertIndex = ref(-1);
const startX = ref(0);
const startY = ref(0);
const offsetX = ref(0);
const offsetY = ref(0);
const itemPositions = ref<ItemPosition[]>([]);
const itemWidth = ref(0);
const itemHeight = ref(0);
const sortingStarted = ref(false);

let mouseLongPressTimer: ReturnType<typeof setTimeout> | null = null;
let mousePressing = false;
let mousePendingIndex = -1;
let mousePendingX = 0;
let mousePendingY = 0;
let dragSessionId = 0;

const columns = computed(() => {
    const value = Math.floor(Number(props.columns) || 1);
    return value > 0 ? value : 1;
});

const rootClass = computed(() => {
    return {
        'ste-drag-sort-columns': columns.value > 1,
    };
});

function getUidPools(items: InternalItem[]) {
    const pools = new Map<SteDragSortItem, string[]>();

    items.forEach(item => {
        const pool = pools.get(item.raw) || [];
        pool.push(item.uid);
        pools.set(item.raw, pool);
    });

    return pools;
}

function syncList(value: SteDragSortItem[]) {
    const pools = getUidPools(list.value);

    list.value = (value || []).map(item => {
        const pool = pools.get(item);
        const uid = pool?.shift() || utils.guid(12);
        return { uid, raw: item };
    });
}

function resetDragState() {
    dragSessionId += 1;
    dragging.value = false;
    dragIndex.value = -1;
    insertIndex.value = -1;
    startX.value = 0;
    startY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    itemPositions.value = [];
    itemWidth.value = 0;
    itemHeight.value = 0;
    sortingStarted.value = false;
}

function clearMouseLongPress() {
    if (mouseLongPressTimer) {
        clearTimeout(mouseLongPressTimer);
        mouseLongPressTimer = null;
    }
    mousePressing = false;
    mousePendingIndex = -1;
    mousePendingX = 0;
    mousePendingY = 0;
}

function removeMouseListeners() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
}

function getItemDisabled(index: number) {
    return !!list.value[index]?.raw?.disabled;
}

function getEnabledIndices() {
    return list.value.reduce<number[]>((indices, item, index) => {
        if (!item.raw?.disabled) {
            indices.push(index);
        }
        return indices;
    }, []);
}

function getReorderPreview(dragIdx: number, targetIdx: number) {
    const enabledIndices = getEnabledIndices();
    const dragEnabledIndex = enabledIndices.indexOf(dragIdx);
    const targetEnabledIndex = enabledIndices.indexOf(targetIdx);

    if (dragEnabledIndex < 0 || targetEnabledIndex < 0) return null;

    const nextEnabledSourceIndices = [...enabledIndices];
    const [draggedSourceIndex] = nextEnabledSourceIndices.splice(dragEnabledIndex, 1);
    nextEnabledSourceIndices.splice(targetEnabledIndex, 0, draggedSourceIndex);

    const finalIndexMap = new Map<number, number>();
    list.value.forEach((_, index) => finalIndexMap.set(index, index));
    enabledIndices.forEach((slotIndex, orderIndex) => {
        finalIndexMap.set(nextEnabledSourceIndices[orderIndex], slotIndex);
    });

    return {
        enabledIndices,
        nextEnabledSourceIndices,
        finalIndexMap,
    };
}

function getFirstTouch(event: TouchEvent) {
    return toTouchArray(event.touches)[0] || toTouchArray(event.changedTouches)[0];
}

async function measureItemPositions() {
    const rootRect = await utils.querySelector<false>('.ste-drag-sort-root', instance);
    const rects = await utils.querySelector('.ste-drag-sort-item', instance, true);
    const items = Array.isArray(rects) ? rects : [];

    itemWidth.value = columns.value > 1 ? (rootRect?.width || 0) / columns.value : items[0]?.width || 0;
    itemHeight.value = items[0]?.height || 0;
    itemPositions.value = items.map(rect => ({
        top: rect.top || 0,
        left: rect.left || 0,
        width: rect.width || itemWidth.value,
        height: rect.height || itemHeight.value,
    }));
}

function calculateGridInsertIndex(centerX: number, centerY: number) {
    if (!itemPositions.value.length) return dragIndex.value;

    let closestIndex = dragIndex.value;
    let minDistance = Infinity;

    itemPositions.value.forEach((position, index) => {
        if (getItemDisabled(index)) return;

        const itemCenterX = position.left + position.width / 2;
        const itemCenterY = position.top + position.height / 2;
        const distance = Math.sqrt(Math.pow(centerX - itemCenterX, 2) + Math.pow(centerY - itemCenterY, 2));

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function calculateSingleColumnInsertIndex(centerY: number) {
    let closestIndex = dragIndex.value;
    let minDistance = Infinity;

    itemPositions.value.forEach((position, index) => {
        if (getItemDisabled(index)) return;

        const itemCenterY = position.top + position.height / 2;
        const distance = Math.abs(centerY - itemCenterY);

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function calculateInsertIndex() {
    if (!itemPositions.value.length || dragIndex.value < 0) return dragIndex.value;

    const dragPosition = itemPositions.value[dragIndex.value];
    const centerX = dragPosition.left + dragPosition.width / 2 + offsetX.value;
    const centerY = dragPosition.top + dragPosition.height / 2 + offsetY.value;

    if (columns.value > 1) {
        return calculateGridInsertIndex(centerX, centerY);
    }

    return calculateSingleColumnInsertIndex(centerY);
}

function getItemTranslateOffset(index: number): TranslateOffset {
    if (!dragging.value || !sortingStarted.value) return { x: 0, y: 0 };
    if (getItemDisabled(index)) return { x: 0, y: 0 };
    if (index === dragIndex.value || dragIndex.value === insertIndex.value) return { x: 0, y: 0 };

    const reorderPreview = getReorderPreview(dragIndex.value, insertIndex.value);
    const nextIndex = reorderPreview?.finalIndexMap.get(index);

    if (typeof nextIndex !== 'number' || nextIndex === index) return { x: 0, y: 0 };

    if (columns.value > 1) {
        const cols = columns.value;
        const currentRow = Math.floor(index / cols);
        const currentCol = index % cols;
        const nextRow = Math.floor(nextIndex / cols);
        const nextCol = nextIndex % cols;

        return {
            x: (nextCol - currentCol) * itemWidth.value,
            y: (nextRow - currentRow) * itemHeight.value,
        };
    }

    return {
        x: 0,
        y: (nextIndex - index) * itemHeight.value,
    };
}

function getItemStyle(index: number): CSSProperties {
    const style: CSSProperties = {};

    if (columns.value > 1) {
        const width = `${100 / columns.value}%`;
        style.flexBasis = width;
        style.width = width;
        style.boxSizing = 'border-box';
    }

    if (!dragging.value) return style;

    if (index === dragIndex.value) {
        const dragScale = sortingStarted.value ? 1.03 : 1.02;
        style.transform = `translate(${offsetX.value}px, ${offsetY.value}px) scale(${dragScale})`;
        style.zIndex = 100;
        return style;
    }

    const offset = getItemTranslateOffset(index);
    if (offset.x || offset.y) {
        style.transform = `translate(${offset.x}px, ${offset.y}px)`;
    }

    return style;
}

function getItemClass(index: number) {
    return {
        'ste-drag-sort-item-disabled': props.disabled || !!list.value[index]?.raw?.disabled,
        'ste-drag-sort-item-ready': dragging.value && dragIndex.value === index && !sortingStarted.value,
        'ste-drag-sort-item-dragging': dragging.value && dragIndex.value === index,
        'ste-drag-sort-item-animating': dragging.value && dragIndex.value !== index,
    };
}

function triggerReadyHaptic() {
    if (!props.longPress) return;

    try {
        if (typeof uni === 'undefined' || typeof uni.vibrateShort !== 'function') return;
        uni.vibrateShort({
            type: 'light',
            fail: () => {},
        });
    } catch {
        // Ignore unsupported platforms so drag flow can proceed.
    }
}

function checkMovedToOtherElement() {
    if (!itemPositions.value.length || dragIndex.value < 0) return false;

    const dragPosition = itemPositions.value[dragIndex.value];
    const centerX = dragPosition.left + dragPosition.width / 2 + offsetX.value;
    const centerY = dragPosition.top + dragPosition.height / 2 + offsetY.value;

    if (columns.value > 1) {
        return itemPositions.value.some((position, index) => {
            if (index === dragIndex.value) return false;

            return centerX >= position.left && centerX <= position.left + position.width && centerY >= position.top && centerY <= position.top + position.height;
        });
    }

    if (dragIndex.value > 0) {
        const prev = itemPositions.value[dragIndex.value - 1];
        if (centerY <= prev.top + prev.height / 2) return true;
    }

    if (dragIndex.value < itemPositions.value.length - 1) {
        const next = itemPositions.value[dragIndex.value + 1];
        if (centerY >= next.top + next.height / 2) return true;
    }

    return false;
}

async function startDrag(index: number, clientX: number, clientY: number) {
    if (props.disabled) return false;
    if (dragging.value) return false;
    if (index < 0 || index >= list.value.length) return false;
    if (getItemDisabled(index)) return false;

    const sessionId = ++dragSessionId;
    dragging.value = true;
    dragIndex.value = index;
    insertIndex.value = index;
    startX.value = clientX;
    startY.value = clientY;
    offsetX.value = 0;
    offsetY.value = 0;
    sortingStarted.value = false;

    triggerReadyHaptic();
    emits('start', index);
    await measureItemPositions();

    return dragging.value && dragSessionId === sessionId && dragIndex.value === index;
}

function moveDrag(clientX: number, clientY: number) {
    if (!dragging.value) return;

    offsetX.value = clientX - startX.value;
    offsetY.value = clientY - startY.value;

    if (!sortingStarted.value && checkMovedToOtherElement()) {
        sortingStarted.value = true;
    }

    if (sortingStarted.value) {
        insertIndex.value = calculateInsertIndex();
    }
}

function finishDrag() {
    if (!dragging.value) return;

    const oldIndex = dragIndex.value;
    const reorderPreview = getReorderPreview(oldIndex, insertIndex.value >= 0 ? insertIndex.value : oldIndex);
    const newIndex = reorderPreview?.finalIndexMap.get(oldIndex) ?? oldIndex;

    if (oldIndex !== newIndex && oldIndex >= 0) {
        const nextList = Array.from({ length: list.value.length }) as InternalItem[];

        list.value.forEach((item, index) => {
            if (getItemDisabled(index)) {
                nextList[index] = item;
            }
        });

        reorderPreview?.enabledIndices.forEach((slotIndex, orderIndex) => {
            nextList[slotIndex] = list.value[reorderPreview.nextEnabledSourceIndices[orderIndex]];
        });

        list.value = nextList;

        const result = nextList.map(item => item.raw);
        emits('update:modelValue', result);
        emits('change', result);
    }

    resetDragState();
    emits('end', newIndex);
}

async function onTouchStart(event: TouchEvent, index: number, type: 'touch' | 'longpress') {
    if (type === 'longpress' && !props.longPress) return;
    if (type === 'touch' && props.longPress) return;

    const touch = getFirstTouch(event);
    if (!touch) return;

    const started = await startDrag(index, getTouchX(touch), getTouchY(touch));
    if (!started) return;

    event.stopPropagation();
    event.preventDefault();
}

function onTouchMove(event: TouchEvent) {
    if (!dragging.value) return;

    const touch = getFirstTouch(event);
    if (!touch) return;

    moveDrag(getTouchX(touch), getTouchY(touch));
    event.preventDefault();
}

function onTouchEnd() {
    finishDrag();
}

function mouseDown(event: MouseEvent, index: number) {
    if (typeof window === 'undefined') return;
    if (props.disabled || getItemDisabled(index)) return;

    mousePressing = true;
    mousePendingIndex = index;
    mousePendingX = event.clientX;
    mousePendingY = event.clientY;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    if (!props.longPress) {
        startDrag(index, event.clientX, event.clientY);
        return;
    }

    mouseLongPressTimer = setTimeout(() => {
        if (!mousePressing || mousePendingIndex < 0) return;
        startDrag(mousePendingIndex, mousePendingX, mousePendingY);
    }, 350);
}

function onMouseMove(event: MouseEvent) {
    if (dragging.value) {
        moveDrag(event.clientX, event.clientY);
        event.preventDefault();
        return;
    }

    if (!mousePressing || !mouseLongPressTimer) return;

    const deltaX = Math.abs(event.clientX - mousePendingX);
    const deltaY = Math.abs(event.clientY - mousePendingY);

    if (deltaX > 5 || deltaY > 5) {
        clearMouseLongPress();
        removeMouseListeners();
    }
}

function onMouseUp() {
    if (dragging.value) {
        finishDrag();
    }

    clearMouseLongPress();
    removeMouseListeners();
}

watch(
    () => props.modelValue,
    value => {
        syncList(value || []);
    },
    {
        immediate: true,
        deep: true,
    }
);

onBeforeUnmount(() => {
    clearMouseLongPress();
    removeMouseListeners();
});
</script>

<template>
    <view class="ste-drag-sort-root" :class="[rootClass, { 'ste-drag-sort-root-dragging': dragging }]" data-test="drag-sort">
        <template v-if="dragging">
            <view
                v-for="(current, index) in list"
                :key="current.uid"
                class="ste-drag-sort-item"
                :class="getItemClass(index)"
                :style="getItemStyle(index)"
                @touchstart="(event: TouchEvent) => onTouchStart(event, index, 'touch')"
                @longpress="(event: TouchEvent) => onTouchStart(event, index, 'longpress')"
                @touchmove.stop.prevent="onTouchMove"
                @touchend="onTouchEnd"
                @touchcancel="onTouchEnd"
                @mousedown.prevent="mouseDown($event, index)"
            >
                <slot name="item" :item="current.raw" :index="index" :dragging="dragging" :dragIndex="dragIndex" :insertIndex="insertIndex"></slot>
            </view>
        </template>
        <template v-else>
            <view
                v-for="(current, index) in list"
                :key="current.uid"
                class="ste-drag-sort-item"
                :class="getItemClass(index)"
                :style="getItemStyle(index)"
                @touchstart="(event: TouchEvent) => onTouchStart(event, index, 'touch')"
                @longpress="(event: TouchEvent) => onTouchStart(event, index, 'longpress')"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd"
                @touchcancel="onTouchEnd"
                @mousedown.prevent="mouseDown($event, index)"
            >
                <slot name="item" :item="current.raw" :index="index" :dragging="dragging" :dragIndex="dragIndex" :insertIndex="insertIndex"></slot>
            </view>
        </template>
    </view>
</template>

<style lang="scss" scoped>
.ste-drag-sort-root {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: visible;
    user-select: none;

    &.ste-drag-sort-columns {
        flex-direction: row;
        flex-wrap: wrap;
    }

    &.ste-drag-sort-root-dragging {
        touch-action: none;
    }
}

.ste-drag-sort-item {
    position: relative;
    z-index: 10;
    transition: opacity 0.12s ease;

    &.ste-drag-sort-item-dragging {
        opacity: 0.95;
        z-index: 20;
    }

    &.ste-drag-sort-item-ready {
        opacity: 0.98;
    }

    &.ste-drag-sort-item-disabled {
        opacity: 0.6;
    }

    &.ste-drag-sort-item-animating {
        transition: transform 0.2s ease;
    }
}
</style>
