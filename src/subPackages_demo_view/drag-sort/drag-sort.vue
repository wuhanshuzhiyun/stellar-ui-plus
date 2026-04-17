<script setup lang="ts">
import { ref } from 'vue';

const basicList = ref([{ text: '商品 A' }, { text: '商品 B' }, { text: '商品 C' }]);

const gridList = ref([{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }, { text: '6' }]);

const disabledList = ref([{ text: '固定在这里', disabled: true }, { text: '可拖拽 1' }, { text: '可拖拽 2' }]);

const scrollList = ref(
    Array.from({ length: 14 }, (_, index) => ({
        text: `滚动验证 ${index + 1}`,
    }))
);

const multiDisabledList = ref([
    { text: '固定项 1', disabled: true },
    { text: '可拖拽 A' },
    { text: '固定项 2', disabled: true },
    { text: '可拖拽 B' },
    { text: '可拖拽 C' },
    { text: '固定项 3', disabled: true },
    { text: '可拖拽 D' },
]);
</script>

<template>
    <page-layout title="拖拽排序" contentStyle="padding: 0;background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">Drag Sort 拖拽排序</view>
            <view class="cmp-desc">用于列表、宫格等场景的拖拽排序组件。</view>
        </view>

        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-drag-sort v-model="basicList">
                    <template #item="{ item, index }">
                        <view class="demo-card-item">{{ index + 1 }}. {{ item.text }}</view>
                    </template>
                </ste-drag-sort>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">网格排序</view>
            <view class="item-block">
                <ste-drag-sort v-model="gridList" :columns="3" :longPress="true">
                    <template #item="{ item }">
                        <view class="grid-item">{{ item.text }}</view>
                    </template>
                </ste-drag-sort>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">禁用单项拖拽</view>
            <view class="item-block">
                <ste-drag-sort v-model="disabledList">
                    <template #item="{ item }">
                        <view class="demo-card-item" :style="{ opacity: item.disabled ? 0.5 : 1 }">
                            {{ item.text }}
                        </view>
                    </template>
                </ste-drag-sort>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">滚动区域验证</view>
            <view class="tips">在该区域上下滑动页面，同时可长按拖拽，用于验证列表区域不会提前拦截页面滚动。</view>
            <view class="item-block">
                <ste-drag-sort v-model="scrollList">
                    <template #item="{ item, index }">
                        <view class="demo-card-item demo-card-item-tight">{{ index + 1 }}. {{ item.text }}</view>
                    </template>
                </ste-drag-sort>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">多禁用项顺序验证</view>
            <view class="tips">将可拖拽项跨过禁用项移动，用于验证禁用项仍固定在原来的索引位置。</view>
            <view class="item-block">
                <ste-drag-sort v-model="multiDisabledList">
                    <template #item="{ item }">
                        <view class="demo-card-item" :style="{ opacity: item.disabled ? 0.5 : 1 }">
                            {{ item.text }}
                        </view>
                    </template>
                </ste-drag-sort>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.description {
    padding: 24rpx 32rpx 0;

    .cmp-name {
        margin-bottom: 8rpx;
        font-size: 36rpx;
        font-weight: bold;
    }

    .cmp-desc {
        font-size: 26rpx;
        color: #666;
    }
}

.demo-item {
    margin: 16rpx;
    padding: 24rpx;
    border-radius: 16rpx;
    background: #fff;
}

.title {
    margin-bottom: 16rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: #333;
}

.tips {
    margin-bottom: 16rpx;
    font-size: 24rpx;
    line-height: 1.6;
    color: #666;
}

.demo-card-item {
    margin-bottom: 16rpx;
    padding: 24rpx;
    border-radius: 16rpx;
    background: #f5f7fa;
}

.demo-card-item-tight {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
}

.grid-item {
    height: 120rpx;
    margin: 12rpx;
    border-radius: 16rpx;
    background: #eef3ff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
