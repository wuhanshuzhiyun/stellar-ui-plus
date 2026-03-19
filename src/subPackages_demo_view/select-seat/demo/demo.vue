<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { SteSelectSeatItem, SteSelectSeatMoveEvent, SteSelectSeatValue } from '@/uni_modules/stellar-ui-plus/components/ste-select-seat/types';

const rows = 12;
const cols = 20;
const stageWidth = 340;
const stageHeight = 200;
const seatSize = 30;
const seatGap = 6;
const screenWidth = 168;
const screenHeight = 28;
const screenFixedTop = -40;

const selected = ref<SteSelectSeatValue[]>([
    { row: 6, col: 7 },
    { row: 6, col: 8 },
]);
const viewport = ref<SteSelectSeatMoveEvent>({
    translateX: 0,
    translateY: 0,
    scale: 1,
    screenTranslateX: 0,
});
const screenVisible = ref(true);
let screenTimer: ReturnType<typeof setTimeout> | null = null;

type SeatCoord = { row: number; col: number };

const toSeatKey = ({ row, col }: SeatCoord) => `${row}-${col}`;
const createSeatKeySet = (coords: SeatCoord[]) => new Set(coords.map(toSeatKey));

// 已售座位坐标，row/col 均为 0 开始计数，用于演示禁用座位分布。
const soldSeatCoords: SeatCoord[] = [
    { row: 2, col: 3 },
    { row: 2, col: 4 },
    { row: 2, col: 7 },
    { row: 2, col: 12 },
    { row: 2, col: 15 },
    { row: 2, col: 16 },
    { row: 4, col: 2 },
    { row: 4, col: 6 },
    { row: 4, col: 13 },
    { row: 4, col: 17 },
    { row: 5, col: 4 },
    { row: 5, col: 7 },
    { row: 5, col: 12 },
    { row: 5, col: 15 },
    { row: 7, col: 1 },
    { row: 7, col: 5 },
    { row: 7, col: 14 },
    { row: 7, col: 18 },
    { row: 8, col: 3 },
    { row: 8, col: 7 },
    { row: 8, col: 12 },
    { row: 8, col: 16 },
    { row: 9, col: 2 },
    { row: 9, col: 6 },
    { row: 9, col: 13 },
    { row: 9, col: 17 },
];

// 优选区座位坐标，用于演示单独的高亮配色。
const vipSeatCoords: SeatCoord[] = [
    { row: 6, col: 6 },
    { row: 6, col: 7 },
    { row: 6, col: 8 },
    { row: 6, col: 11 },
    { row: 6, col: 12 },
    { row: 6, col: 13 },
];

// 情侣座坐标，按相邻双座成组配置。
const coupleSeatCoords: SeatCoord[] = [
    { row: 10, col: 5 },
    { row: 10, col: 6 },
    { row: 10, col: 13 },
    { row: 10, col: 14 },
    { row: 11, col: 5 },
    { row: 11, col: 6 },
    { row: 11, col: 13 },
    { row: 11, col: 14 },
];

const soldSeatSet = createSeatKeySet(soldSeatCoords);
const vipSeatSet = createSeatKeySet(vipSeatCoords);
const coupleSeatSet = createSeatKeySet(coupleSeatCoords);

const isAisleCol = (col: number) => col === 9 || col === 10;
const isFrontSideGap = (row: number, col: number) => (row === 0 || row === 1) && (col <= 1 || col >= 18);
const isBackCornerGap = (row: number, col: number) => row === 11 && (col === 0 || col === 19);
const isEmptySeat = (row: number, col: number) => isAisleCol(col) || isFrontSideGap(row, col) || isBackCornerGap(row, col);
const isSoldSeat = (row: number, col: number) => soldSeatSet.has(toSeatKey({ row, col }));
const isVipSeat = (row: number, col: number) => vipSeatSet.has(toSeatKey({ row, col }));
const isCoupleSeat = (row: number, col: number) => coupleSeatSet.has(toSeatKey({ row, col }));

const seats = computed<SteSelectSeatItem[]>(() => {
    const list: SteSelectSeatItem[] = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (isEmptySeat(row, col)) {
                list.push({ row, col, empty: true });
                continue;
            }

            if (isSoldSeat(row, col)) {
                list.push({
                    row,
                    col,
                    disabled: true,
                    bgColor: '#cfd4dc',
                    borderColor: '#cfd4dc',
                });
                continue;
            }

            if (isVipSeat(row, col)) {
                list.push({
                    row,
                    col,
                    bgColor: '#fff4d6',
                    borderColor: '#ffb400',
                    selectedBgColor: '#ffb400',
                });
                continue;
            }

            if (isCoupleSeat(row, col)) {
                list.push({
                    row,
                    col,
                    bgColor: '#ffe4ea',
                    borderColor: '#ff7a9d',
                    selectedBgColor: '#ff5c8a',
                });
                continue;
            }

            list.push({
                row,
                col,
                bgColor: '#ffffff',
                borderColor: '#d8dee9',
                selectedBgColor: '#2d6cdf',
            });
        }
    }

    return list;
});

const selectedLabels = computed(() => {
    return selected.value.map(item => `${String.fromCharCode(65 + item.row)}排${item.col + 1}座`).join('、');
});

const screenStyle = computed(() => {
    return {
        left: `${stageWidth / 2 - screenWidth / 2}px`,
        top: `${screenFixedTop}px`,
        width: `${screenWidth}px`,
        height: `${screenHeight}px`,
        lineHeight: `${screenHeight}px`,
        transform: `translateX(${viewport.value.screenTranslateX}px)`,
    };
});

const onMove = (event: SteSelectSeatMoveEvent) => {
    viewport.value = event;
};
</script>

<template>
    <page-layout title="电影院座位图">
        <view class="demo-item">
            <view class="legend">
                <view class="legend-item">
                    <view class="legend-dot seat-normal" />
                    <text>可选</text>
                </view>
                <view class="legend-item">
                    <view class="legend-dot seat-selected" />
                    <text>已选</text>
                </view>
                <view class="legend-item">
                    <view class="legend-dot seat-sold" />
                    <text>已售</text>
                </view>
                <view class="legend-item">
                    <view class="legend-dot seat-vip" />
                    <text>优选区</text>
                </view>
                <view class="legend-item">
                    <view class="legend-dot seat-couple" />
                    <text>情侣座</text>
                </view>
            </view>

            <view class="seat-stage-shell">
                <view class="seat-stage">
                    <view class="screen-floating" :class="{ 'is-visible': screenVisible }" :style="screenStyle">银幕中央</view>
                    <ste-select-seat
                        v-model="selected"
                        :rows="rows"
                        :cols="cols"
                        :width="stageWidth"
                        :height="stageHeight"
                        :seats="seats"
                        :seat-size="seatSize"
                        :seat-gap="seatGap"
                        :border-radius="8"
                        selected-bg-color="#2d6cdf"
                        @move="onMove"
                    />
                </view>
            </view>

            <view class="summary">
                <view class="summary-title">已选 {{ selected.length }} 个座位</view>
                <view class="summary-text">{{ selectedLabels || '请在座位图中选择座位' }}</view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    padding: 24rpx;
}

.legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx 24rpx;
    margin-bottom: 20rpx;
    padding: 20rpx 24rpx;
    background: #fff;
    border-radius: 20rpx;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 10rpx;
    font-size: 24rpx;
    color: #58677a;
}

.legend-dot {
    width: 22rpx;
    height: 22rpx;
    border-radius: 8rpx;
    border: 1px solid transparent;
}

.seat-normal {
    background: #fff;
    border-color: #d8dee9;
}

.seat-selected {
    background: #2d6cdf;
}

.seat-sold {
    background: #cfd4dc;
}

.seat-vip {
    background: #fff4d6;
    border-color: #ffb400;
}

.seat-couple {
    background: #ffe4ea;
    border-color: #ff7a9d;
}

.seat-stage-shell {
    width: 340px;
    margin: 0 auto;
    padding-top: 42px;
}

.seat-stage {
    position: relative;
    width: 340px;
    height: 200px;
    overflow: visible;
}

.screen-floating {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    text-align: center;
    font-size: 14px;
    color: #5e6b7a;
    border-radius: 999px 999px 16px 16px;
    background: linear-gradient(180deg, #eef4ff 0%, #ffffff 100%);
    box-shadow: 0 8px 20px rgba(45, 108, 223, 0.12);
    pointer-events: none;
    opacity: 0;
    transition: opacity 160ms ease;
}

.screen-floating.is-visible {
    opacity: 1;
}

.summary {
    margin-top: 24rpx;
    padding: 24rpx;
    background: #fff;
    border-radius: 20rpx;
}

.summary-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #25313d;
}

.summary-text {
    margin-top: 10rpx;
    font-size: 24rpx;
    line-height: 1.6;
    color: #5e6b7a;
}
</style>
