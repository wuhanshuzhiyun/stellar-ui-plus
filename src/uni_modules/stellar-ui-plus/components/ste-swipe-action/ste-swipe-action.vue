<script setup lang="ts">
import { ref, getCurrentInstance, defineProps, onMounted, defineEmits, defineExpose } from 'vue';
import propsData, { STE_SWIPE_ACTION_KEY } from './props';
import { useInject } from '../../utils/mixin';
import useData from './useData';

const selfValue: Object = {};

const thas = ref<globalThis.ComponentPublicInstance | null>();

const { parent } = useInject(STE_SWIPE_ACTION_KEY, selfValue);

const props = defineProps(propsData);

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
});

const emits = defineEmits<{
    (e: 'close'): void;
    (e: 'open', direction: 'left' | 'right'): void;
}>();

const { dataTranslateX, onTouchstart, onTouchmove, onTouchend, onchange, iconOpen, open, close, cmpLeftIcon, cmpRightIcon, cmpTransform } = useData({ props, thas, parent, emits });
Object.assign(selfValue, { onchange, open, close });
defineExpose({ open, close });
</script>
<template>
    <view class="ste-swipe-action-root">
        <view class="swipe-action-view" :style="[cmpTransform]">
            <view class="swipe-action-left-icon" v-if="cmpLeftIcon" @click="iconOpen('left')">
                <view class="swipe-icon" :class="{ active: dataTranslateX > 0 }">
                    <ste-icon code="&#xe674;" size="30rpx" />
                </view>
            </view>
            <view class="swipe-action-right-icon" v-if="cmpRightIcon" @click="iconOpen('right')">
                <view class="swipe-icon" :class="{ active: dataTranslateX < 0 }">
                    <ste-icon code="&#xe673;" size="30rpx" />
                </view>
            </view>
            <view
                @mousedown="onTouchstart"
                @mousemove="onTouchmove"
                @mouseup="onTouchend"
                @mouseleave="onTouchend"
                @touchstart="onTouchstart"
                @touchmove="onTouchmove"
                @touchend="onTouchend"
                @touchcancel="onTouchend"
            >
                <view class="swipe-action-left">
                    <slot name="left"></slot>
                </view>
                <view class="swipe-action-content">
                    <slot></slot>
                </view>
                <view class="swipe-action-right">
                    <slot name="right"></slot>
                </view>
            </view>
        </view>
    </view>
</template>
<style scoped lang="scss">
.ste-swipe-action-root {
    width: 100%;
    position: relative;
    overflow: hidden;

    .swipe-action-left-icon,
    .swipe-action-right-icon {
        width: 30rpx;
        height: 60rpx;
        position: absolute;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);
        overflow: hidden;
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .swipe-icon {
            width: 30rpx;
            height: 30rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 300ms;

            &.active {
                transform: rotate(180deg);
            }
        }
    }

    .swipe-action-left-icon {
        left: 0;
        border-radius: 0 30rpx 30rpx 0;
    }

    .swipe-action-right-icon {
        right: 0;
        border-radius: 30rpx 0 0 30rpx;
    }

    .swipe-action-view {
        width: 100%;
        position: relative;

        .swipe-action-left {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 2;
            transform: translateX(-100%);
        }

        .swipe-action-content {
            position: relative;
            width: 100%;
            z-index: 5;
        }

        .swipe-action-right {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 2;
            transform: translateX(100%);
        }
    }
}
</style>
