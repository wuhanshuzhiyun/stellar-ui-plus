<script setup lang="ts">
import { watch, nextTick, onMounted, getCurrentInstance, computed, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import propsData from './props';
import { useData } from './useData';
import { useColorStore } from '../../store/color';
import utils from '../../utils/utils';
import TouchScaleing from '../ste-media-preview/TouchScaleing';
import type { SteSelectSeatItem, SteSelectSeatValue, SteSelectSeatMoveEvent } from './types';
import { drawRoundRect, drawCheck } from './canvasUtils';
import { getSafeGridSize } from './internals/gridUtils';
import {
    INTERNAL_MAX_SCALE,
    buildRowLabelItems,
    clampSeatScale,
    getDefaultSeatViewport,
    getFitScale,
    getLabelWidth,
    getRowLabelTrackStyle,
    getScreenTranslateX as getSeatScreenTranslateX,
    getSeatContentSize,
    getSeatTranslateBounds,
} from './internals/seatLayout';
import { useSeatInteraction } from './internals/useSeatInteraction';
import { getTouchX, getTouchY } from './useTouchCompat';

const componentName = 'ste-select-seat';
const { getColor } = useColorStore();
const themeColor = getColor()?.steThemeColor || '#0090FF';

defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const props = defineProps(propsData);
const emit = defineEmits<{
    (e: 'update:modelValue', value: SteSelectSeatValue[]): void;
    (e: 'seat-click', seat: SteSelectSeatItem): void;
    (e: 'move', data: SteSelectSeatMoveEvent): void;
}>();

const { getSeat, setSeat, getSeats, isSelected, toggleSeat } = useData(props);

const canvasId = 'ste-select-seat-' + utils.guid(8);
const touchHandler = new TouchScaleing();

// ─── 手势状态变量 ────────────────────────────────────────────────────────────
let canvasCtx: any = null;
let dpr = 1;
type SeatPaintCache = { seat: SteSelectSeatItem; x: number; y: number; w: number; h: number; radius: number };
const seatPaintCache = new Map<string, SeatPaintCache>();
let seatPaintCacheKey = '';

const invalidateSeatPaintCache = () => {
    seatPaintCache.clear();
    seatPaintCacheKey = '';
};

const getSeatPaintCacheKey = () => [safeRows.value, safeCols.value, seatSizePx.value, seatGapPx.value, borderRadiusPx.value, labelWidthPx.value, props.width, props.height].join('|');

const getSeatStyleKey = (seat: SteSelectSeatItem) => [seat.row, seat.col, seat.empty, seat.disabled, seat.bgColor, seat.borderColor].join('|');

// ─── 响应式视口状态 ───────────────────────────────────────────────────────────
const viewportTranslateY = ref(0);
const viewportScale = ref(1);

// ─── 尺寸 / 布局计算 ─────────────────────────────────────────────────────────
const seatSizePx = computed(() => utils.formatPx(props.seatSize, 'num') as number);
const seatGapPx = computed(() => utils.formatPx(props.seatGap, 'num') as number);
const borderRadiusPx = computed(() => utils.formatPx(props.borderRadius, 'num') as number);
const safeGrid = computed(() => getSafeGridSize(props.rows, props.cols));
const safeRows = computed(() => safeGrid.value.rows);
const safeCols = computed(() => safeGrid.value.cols);
const labelWidthPx = computed(() => getLabelWidth(props.showRowLabels, seatSizePx.value, seatGapPx.value));
const rowLabelTrackWidthPx = computed(() => 18);
const labelOverlayWidth = computed(() => `${rowLabelTrackWidthPx.value}px`);

const canvasStyle = computed(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
}));

const getContentSize = () => {
    return getSeatContentSize({
        rows: safeRows.value,
        cols: safeCols.value,
        seatSize: seatSizePx.value,
        seatGap: seatGapPx.value,
        labelWidth: labelWidthPx.value,
    });
};

const fitScale = computed(() => {
    const contentSize = getContentSize();
    return getFitScale({
        width: props.width,
        height: props.height,
        contentWidth: contentSize.width,
        contentHeight: contentSize.height,
    });
});

const effectiveMinScale = computed(() => fitScale.value);

const clampScale = (scale: number): number => {
    return clampSeatScale(scale, effectiveMinScale.value, INTERNAL_MAX_SCALE);
};

// ─── Canvas 绘制 ───────────────────────────────────────────────────────────────

const draw = () => {
    const ctx = canvasCtx;
    if (!ctx) return;

    const userScale = clampScale(touchHandler.scale);
    viewportTranslateY.value = touchHandler.translateY;
    viewportScale.value = userScale;
    const tx = touchHandler.translateX;
    const ty = touchHandler.translateY;
    const size = seatSizePx.value;
    const gap = seatGapPx.value;
    const radius = borderRadiusPx.value;
    const labelWidth = labelWidthPx.value;
    const defaultSelectedBg = props.selectedBgColor || themeColor;
    const cacheKey = getSeatPaintCacheKey();
    if (cacheKey !== seatPaintCacheKey) {
        seatPaintCache.clear();
        seatPaintCacheKey = cacheKey;
    }

    // 仅遍历当前视口覆盖的网格范围，避免大座位图每次重绘扫描整张网格。
    const visibleLeft = Math.max(0, -tx + (0 - labelWidth) / userScale);
    const visibleRight = Math.min(safeCols.value * (size + gap), -tx + (props.width / userScale - labelWidth));
    const visibleTop = Math.max(0, -ty);
    const visibleBottom = Math.min(safeRows.value * (size + gap), -ty + props.height / userScale);
    const firstCol = Math.max(0, Math.floor(visibleLeft / (size + gap)) - 1);
    const lastCol = Math.min(safeCols.value - 1, Math.ceil(visibleRight / (size + gap)));
    const firstRow = Math.max(0, Math.floor(visibleTop / (size + gap)) - 1);
    const lastRow = Math.min(safeRows.value - 1, Math.ceil(visibleBottom / (size + gap)));

    ctx.clearRect(0, 0, props.width, props.height);

    // #ifndef APP
    ctx.save();
    ctx.translate(tx * userScale, ty * userScale);
    ctx.scale(userScale, userScale);
    // #endif

    for (let r = firstRow; r <= lastRow; r++) {
        for (let c = firstCol; c <= lastCol; c++) {
            const seat = getSeat(r, c);
            if (!seat || seat.empty) continue;

            const key = `${r}-${c}`;
            let paint = seatPaintCache.get(key);
            if (!paint || getSeatStyleKey(paint.seat) !== getSeatStyleKey(seat)) {
                paint = {
                    seat,
                    x: labelWidth + c * (size + gap) + gap / 2,
                    y: r * (size + gap) + gap / 2,
                    w: size,
                    h: size,
                    radius,
                };
                seatPaintCache.set(key, paint);
            }

            const selected = isSelected(r, c);

            // #ifndef APP
            const x = paint.x;
            const y = paint.y;
            const w = paint.w;
            const h = paint.h;
            const r_ = paint.radius;
            // #endif
            // #ifdef APP
            const x = tx * userScale + paint.x * userScale;
            const y = ty * userScale + paint.y * userScale;
            const w = paint.w * userScale;
            const h = paint.h * userScale;
            const r_ = paint.radius * userScale;
            // #endif

            if (seat.disabled) {
                ctx.fillStyle = props.disabledBgColor;
            } else if (selected) {
                ctx.fillStyle = seat.selectedBgColor || defaultSelectedBg;
            } else {
                ctx.fillStyle = seat.bgColor || props.bgColor;
            }

            drawRoundRect(ctx, x, y, w, h, r_);
            ctx.fill();

            if (!seat.disabled && !selected) {
                ctx.strokeStyle = seat.borderColor || props.borderColor;
                ctx.lineWidth = props.borderWidth;
                drawRoundRect(ctx, x, y, w, h, r_);
                ctx.stroke();
            }

            if (selected && !seat.disabled) {
                drawCheck(ctx, x + w / 2, y + h / 2, w, seat.selectedColor || props.selectedColor);
            }
        }
    }

    // #ifndef APP
    ctx.restore();
    // #endif

    // #ifdef H5 || APP
    if (ctx.draw) ctx.draw(true);
    // #endif
};

// 仅清除并重绘单个座位，供选中状态变化使用。
const drawDirtySeat = (row: number, col: number) => {
    const ctx = canvasCtx;
    const seat = getSeat(row, col);
    if (!ctx || !seat) return;
    const scale = clampScale(touchHandler.scale);
    const size = seatSizePx.value;
    const gap = seatGapPx.value;
    const labelWidth = labelWidthPx.value;
    const x = (touchHandler.translateX + labelWidth + col * (size + gap) + gap / 2) * scale;
    const y = (touchHandler.translateY + row * (size + gap) + gap / 2) * scale;
    const pad = 2;
    ctx.clearRect(x - pad, y - pad, size * scale + pad * 2, size * scale + pad * 2);
    if (seat.empty) return;
    const radius = borderRadiusPx.value * scale;
    const selected = isSelected(row, col);
    const defaultSelectedBg = props.selectedBgColor || themeColor;
    ctx.save();
    ctx.fillStyle = seat.disabled ? props.disabledBgColor : selected ? seat.selectedBgColor || defaultSelectedBg : seat.bgColor || props.bgColor;
    drawRoundRect(ctx, x, y, size * scale, size * scale, radius);
    ctx.fill();
    if (!seat.disabled && !selected) {
        ctx.strokeStyle = seat.borderColor || props.borderColor;
        ctx.lineWidth = props.borderWidth;
        drawRoundRect(ctx, x, y, size * scale, size * scale, radius);
        ctx.stroke();
    }
    if (selected && !seat.disabled) {
        drawCheck(ctx, x + (size * scale) / 2, y + (size * scale) / 2, size * scale, seat.selectedColor || props.selectedColor);
    }
    ctx.restore();
    if (ctx.draw) ctx.draw(true);
};

// ─── Canvas 初始化 / 生命周期 ──────────────────────────────────────────────────

const initCanvas = () => {
    nextTick(() => {
        // #ifdef H5 || APP
        canvasCtx = uni.createCanvasContext(canvasId, instance);
        dpr = 1;
        applyDefaultViewport();
        draw();
        // #endif

        // #ifdef MP-WEIXIN || MP-ALIPAY
        uni.createSelectorQuery()
            .in(instance)
            .select(`#${canvasId}`)
            .node((res: any) => {
                if (!res || !res.node) return;
                const canvasNode = res.node;
                dpr = utils.System.getWindowInfo().pixelRatio;
                canvasNode.width = props.width * dpr;
                canvasNode.height = props.height * dpr;
                canvasCtx = canvasNode.getContext('2d');
                canvasCtx.scale(dpr, dpr);
                applyDefaultViewport();
                draw();
            })
            .exec();
        // #endif
    });
};

// ─── 触摸命中检测 ────────────────────────────────────────────────────────────

const getTouchSeat = (touchX: number, touchY: number): SteSelectSeatItem | null => {
    const scale = clampScale(touchHandler.scale);
    const size = seatSizePx.value;
    const gap = seatGapPx.value;
    const labelWidth = labelWidthPx.value;
    const tx = touchHandler.translateX;
    const ty = touchHandler.translateY;

    const col = Math.floor((touchX / scale - tx - labelWidth - gap / 2) / (size + gap));
    const row = Math.floor((touchY / scale - ty - gap / 2) / (size + gap));

    if (row < 0 || row >= safeRows.value || col < 0 || col >= safeCols.value) return null;
    return getSeat(row, col) || null;
};

const getTouchLocalPoint = (touch: any, rect?: { left?: number; top?: number } | null) => {
    if (!touch) return { x: 0, y: 0 };
    if (typeof touch.x === 'number' && typeof touch.y === 'number') {
        return { x: touch.x, y: touch.y };
    }
    return {
        x: getTouchX(touch) - (rect?.left ?? 0),
        y: getTouchY(touch) - (rect?.top ?? 0),
    };
};

// ─── 视口变换辅助 ─────────────────────────────────────────────────────────────

const getScreenTranslateX = (scale = clampScale(touchHandler.scale), translateX = touchHandler.translateX) => {
    return getSeatScreenTranslateX({
        scale,
        translateX,
        width: props.width,
        defaultViewport: getDefaultViewport(),
    });
};

const emitMove = () => {
    const scale = clampScale(touchHandler.scale);
    emit('move', {
        translateX: touchHandler.translateX,
        translateY: touchHandler.translateY,
        scale,
        screenTranslateX: getScreenTranslateX(scale, touchHandler.translateX),
    });
};

const getTranslateBounds = (scale = touchHandler.scale) => {
    const contentSize = getContentSize();
    return getSeatTranslateBounds({
        scale: clampScale(scale),
        width: props.width,
        height: props.height,
        contentWidth: contentSize.width,
        contentHeight: contentSize.height,
    });
};

const applyAxisResistance = (value: number, min: number, max: number) => {
    const overscrollResistance = 0.35;
    if (value < min) {
        return min + (value - min) * overscrollResistance;
    }
    if (value > max) {
        return max + (value - max) * overscrollResistance;
    }
    return value;
};

const applyTranslateResistance = (x: number, y: number, scale = touchHandler.scale) => {
    const bounds = getTranslateBounds(scale);
    return {
        x: applyAxisResistance(x, bounds.minX, bounds.maxX),
        y: applyAxisResistance(y, bounds.minY, bounds.maxY),
    };
};

const clampTranslate = (x: number, y: number, scale = touchHandler.scale) => {
    const bounds = getTranslateBounds(scale);
    return {
        x: Math.min(bounds.maxX, Math.max(bounds.minX, x)),
        y: Math.min(bounds.maxY, Math.max(bounds.minY, y)),
    };
};

const aisleRows = computed(() => {
    const rows = new Set<number>();
    if (!safeCols.value) return rows;

    for (let row = 0; row < safeRows.value; row++) {
        let isAisle = true;
        for (let col = 0; col < safeCols.value; col++) {
            if (!getSeat(row, col)?.empty) {
                isAisle = false;
                break;
            }
        }
        if (isAisle) rows.add(row);
    }

    return rows;
});

const rowLabelItems = computed(() => {
    if (!props.showRowLabels) return [];
    return buildRowLabelItems({
        rows: safeRows.value,
        height: props.height,
        seatSize: seatSizePx.value,
        seatGap: seatGapPx.value,
        translateY: viewportTranslateY.value,
        scale: viewportScale.value,
        hiddenRows: aisleRows.value,
    });
});

const rowLabelTrackStyle = computed(() => {
    return getRowLabelTrackStyle(rowLabelItems.value, props.height);
});

const getDefaultViewport = () => {
    const contentSize = getContentSize();
    return getDefaultSeatViewport({
        fitScale: fitScale.value,
        width: props.width,
        height: props.height,
        contentWidth: contentSize.width,
        contentHeight: contentSize.height,
        maxScale: INTERNAL_MAX_SCALE,
    });
};

const applyDefaultViewport = () => {
    const viewport = getDefaultViewport();
    touchHandler.scale = viewport.scale;
    touchHandler.baseScale = viewport.scale;
    touchHandler.translateX = viewport.translateX;
    touchHandler.translateY = viewport.translateY;
    touchHandler.baseTranslateX = viewport.translateX;
    touchHandler.baseTranslateY = viewport.translateY;
};

const { rowLabelsVisible, setShowRowLabelsVisible, onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, reset } = useSeatInteraction({
    instance,
    canvasId,
    getShowRowLabels: () => props.showRowLabels,
    touchHandler,
    clampScale,
    applyTranslateResistance,
    clampTranslate,
    getTouchSeat,
    getTouchLocalPoint,
    applyDefaultViewport,
    draw,
    drawDirtySeat,
    emitMove,
    emitSeatClick: seat => emit('seat-click', seat),
    emitModelValue: value => emit('update:modelValue', value),
    toggleSeat,
});

onMounted(() => {
    initCanvas();
});

watch(
    () => props.showRowLabels,
    value => {
        setShowRowLabelsVisible(value);
    }
);

watch(
    () => [
        props.modelValue,
        props.seats,
        props.emptyRows,
        props.emptyCols,
        props.rows,
        props.cols,
        props.width,
        props.height,
        props.seatSize,
        props.seatGap,
        props.borderRadius,
        props.borderWidth,
        props.bgColor,
        props.borderColor,
        props.selectedBgColor,
        props.selectedColor,
        props.disabledBgColor,
        props.showRowLabels,
    ],
    () => {
        invalidateSeatPaintCache();
        if (canvasCtx) draw();
    },
    { deep: true }
);

// ─── 对外暴露接口 ─────────────────────────────────────────────────────────────

defineExpose({
    setSeat: (row: number, col: number, data: Partial<SteSelectSeatItem>) => {
        setSeat(row, col, data);
        nextTick(() => drawDirtySeat(row, col));
    },
    getSeats,
    reset,
});
</script>

<template>
    <view class="ste-select-seat-root" :style="canvasStyle">
        <!-- #ifdef H5 -->
        <canvas
            :canvas-id="canvasId"
            :id="canvasId"
            :style="canvasStyle"
            class="seat-canvas"
            disable-scroll
            @touchstart="onTouchStart"
            @touchmove.stop.prevent="onTouchMove"
            @touchend="onTouchEnd"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseleave="onMouseUp"
        />
        <!-- #endif -->

        <!-- #ifdef APP -->
        <canvas
            :canvas-id="canvasId"
            :id="canvasId"
            :style="canvasStyle"
            class="seat-canvas"
            disable-scroll
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
        />
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
        <canvas
            type="2d"
            :id="canvasId"
            :style="canvasStyle"
            class="seat-canvas"
            disable-scroll
            @touchstart="onTouchStart"
            @touchmove.stop.prevent="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
        />
        <!-- #endif -->

        <view v-if="props.showRowLabels" class="row-label-overlay" :class="{ 'is-visible': rowLabelsVisible }">
            <view class="row-label-track" :style="rowLabelTrackStyle" />
            <view v-for="item in rowLabelItems" :key="item.row" class="row-label-item" :style="item.style">
                {{ item.label }}
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-select-seat-root {
    overflow: hidden;
    position: relative;
    touch-action: none;
    user-select: none;
}

.seat-canvas {
    display: block;
}

.row-label-overlay {
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: v-bind(labelOverlayWidth);
    pointer-events: none;
    opacity: 0;
    transform: translateX(-4px);
    transition:
        opacity 160ms ease,
        transform 160ms ease;
}

.row-label-overlay.is-visible {
    opacity: 1;
    transform: translateX(0);
}

.row-label-track {
    position: absolute;
    left: 0;
    width: 100%;
    border-radius: 999px;
    background: rgba(199, 199, 199, 0.68);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
    transition:
        opacity 160ms ease,
        transform 160ms ease;
}

.row-label-item {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: rgba(255, 255, 255, 0.98);
    font-weight: 400;
    letter-spacing: 0;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    transition:
        opacity 160ms ease,
        transform 160ms ease;
}
</style>
