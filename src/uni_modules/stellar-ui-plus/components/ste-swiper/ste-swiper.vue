<script setup lang="ts">
import { defineOptions, defineEmits, getCurrentInstance, ref, defineProps } from 'vue';
import propsData, { SWIPER_KEY } from './props';
import { useProvide } from '../../utils/mixin';
import useData from './useData';

defineOptions({
    name: 'ste-swiper',
});

const emits = defineEmits<{
    (e: 'change', index: number, source: 'autoplay' | 'touch'): void;
}>();

const thas = ref<globalThis.ComponentPublicInstance | null | undefined>(getCurrentInstance()?.proxy);

const { internalChildren } = useProvide(SWIPER_KEY, 'ste-swiper-item')();

const props = defineProps(propsData);

const { initializing, dataIndex, cmpRootStyle, cmpBoxStyle, cmpBoxTransform, onTouchstart, onTouchmove, onTouchend } = useData({ props, children: internalChildren, thas: thas.value, emits });
</script>

<template>
    <view class="ste-swiper-root" :style="[cmpRootStyle, { opacity: initializing ? 0 : 1 }]">
        <view
            class="swipe-content"
            @mousedown="onTouchstart"
            @mousemove="onTouchmove"
            @mouseup="onTouchend"
            @mouseleave="onTouchend"
            @touchstart="onTouchstart"
            @touchmove.stop="onTouchmove"
            @touchend="onTouchend"
            @touchcancel="onTouchend"
        >
            <view class="swipe-content-view" :style="[cmpBoxStyle, cmpBoxTransform]">
                <slot></slot>
            </view>
        </view>
        <view class="ste-swiper-dots" v-if="indicatorDots">
            <view
                class="swiper-dots-item"
                v-for="(m, index) in internalChildren"
                :key="index"
                :class="{
                    active: dataIndex === index || (index === 0 && dataIndex >= internalChildren.length) || (index === internalChildren.length && dataIndex === -1),
                }"
            />
        </view>
    </view>
</template>
<style lang="scss" scoped>
.ste-swiper-root {
    width: var(--swiper-width);
    height: var(--swiper-height);
    overflow: hidden;
    padding: var(--swiper-root-padding);
    position: relative;

    .swipe-content {
        width: var(--swiper-width);
        height: var(--swiper-height);

        .swipe-content-view {
            width: var(--swiper-width);
            height: var(--swiper-height);
            display: grid;
        }
    }

    .ste-swiper-dots {
        position: absolute;
        bottom: 18rpx;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;

        .swiper-dots-item {
            width: 8rpx;
            height: 8rpx;
            border-radius: 6rpx;
            background-color: var(--swiper-indicator-color);

            &.active {
                width: 24rpx;
                background-color: var(--swiper-indicator-active-color);
            }

            & + .swiper-dots-item {
                margin-left: 8rpx;
            }
        }
    }
}
</style>
