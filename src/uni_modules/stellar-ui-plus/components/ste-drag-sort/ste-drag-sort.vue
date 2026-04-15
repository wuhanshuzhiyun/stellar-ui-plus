<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, ref, watch, type ComponentPublicInstance, type CSSProperties } from 'vue';
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

function calculateGridOffset(index: number, dragIdx: number, insertIdx: number): TranslateOffset {
    const cols = columns.value;
    const currentRow = Math.floor(index / cols);
    const currentCol = index % cols;

    let nextIndex = index;

    if (dragIdx < insertIdx) {
        if (index > dragIdx && index <= insertIdx) nextIndex = index - 1;
    } else if (dragIdx > insertIdx) {
        if (index >= insertIdx && index < dragIdx) nextIndex = index + 1;
    }

    const nextRow = Math.floor(nextIndex / cols);
    const nextCol = nextIndex % cols;

    return {
        x: (nextCol - currentCol) * itemWidth.value,
        y: (nextRow - currentRow) * itemHeight.value,
    };
}

function calculateGridInsertIndex(centerX: number, centerY: number) {
    if (!itemPositions.value.length) return dragIndex.value;

    let closestIndex = dragIndex.value;
    let minDistance = Infinity;

    itemPositions.value.forEach((position, index) => {
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

function calculateSingleColumnOffset(index: number, dragIdx: number, insertIdx: number): TranslateOffset {
    if (dragIdx < insertIdx) {
        if (index > dragIdx && index <= insertIdx) return { x: 0, y: -itemHeight.value };
    } else if (dragIdx > insertIdx) {
        if (index >= insertIdx && index < dragIdx) return { x: 0, y: itemHeight.value };
    }

    return { x: 0, y: 0 };
}

function getItemTranslateOffset(index: number): TranslateOffset {
    if (!dragging.value || !sortingStarted.value) return { x: 0, y: 0 };
    if (index === dragIndex.value || dragIndex.value === insertIndex.value) return { x: 0, y: 0 };

    if (columns.value > 1) {
        return calculateGridOffset(index, dragIndex.value, insertIndex.value);
    }

    return calculateSingleColumnOffset(index, dragIndex.value, insertIndex.value);
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
        style.transform = `translate(${offsetX.value}px, ${offsetY.value}px)`;
        style.zIndex = 100;
        return style;
    }

    const offset = getItemTranslateOffset(index);
    if (offset.x || offset.y) {
        style.transform = `translate(${offset.x}px, ${offset.y}px)`;
    }

    return style;
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
    if (props.disabled) return;
    if (index < 0 || index >= list.value.length) return;
    if (getItemDisabled(index)) return;

    await measureItemPositions();

    dragging.value = true;
    dragIndex.value = index;
    insertIndex.value = index;
    startX.value = clientX;
    startY.value = clientY;
    offsetX.value = 0;
    offsetY.value = 0;
    sortingStarted.value = false;

    emits('start', index);
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
    const newIndex = insertIndex.value >= 0 ? insertIndex.value : oldIndex;

    if (oldIndex !== newIndex && oldIndex >= 0) {
        const nextList = [...list.value];
        const current = nextList.splice(oldIndex, 1)[0];
        nextList.splice(newIndex, 0, current);
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

    const touch = event.touches?.[0];
    if (!touch) return;

    await startDrag(index, touch.clientX, touch.clientY);
    event.stopPropagation();
    event.preventDefault();
}

function onTouchMove(event: TouchEvent) {
    const touch = event.touches?.[0];
    if (!touch) return;

    moveDrag(touch.clientX, touch.clientY);
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
    <view class="ste-drag-sort-root" :class="[rootClass]" data-test="drag-sort">
        <view
            v-for="(current, index) in list"
            :key="current.uid"
            class="ste-drag-sort-item"
            :class="[
                {
                    'ste-drag-sort-item-disabled': props.disabled || !!current.raw.disabled,
                    'ste-drag-sort-item-dragging': dragging && dragIndex === index,
                    'ste-drag-sort-item-animating': dragging && dragIndex !== index,
                },
            ]"
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
    </view>
</template>

<style lang="scss" scoped>
.ste-drag-sort-root {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: visible;

    &.ste-drag-sort-columns {
        flex-direction: row;
        flex-wrap: wrap;
    }
}

.ste-drag-sort-item {
    position: relative;
    z-index: 10;

    &.ste-drag-sort-item-dragging {
        opacity: 0.82;
        z-index: 20;
    }

    &.ste-drag-sort-item-disabled {
        opacity: 0.6;
    }

    &.ste-drag-sort-item-animating {
        transition: transform 0.2s ease;
    }
}
</style>
