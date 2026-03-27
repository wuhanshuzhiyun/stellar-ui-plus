<template>
    <view
        class="ste-skeleton"
        :class="[
            {
                'ste-skeleton--loading': loading,
            },
            `ste-skeleton--${type}`,
        ]"
    >
        <template v-if="loading">
            <ste-icon v-if="type == 'image'" :size="20" code="&#xe693;"></ste-icon>
        </template>

        <template v-else>
            <slot></slot>
        </template>
    </view>
</template>

<script setup lang="ts">
import propsData from './props';
const componentName = `ste-skeleton`;

defineOptions({
    name: componentName,
});
const props = defineProps(propsData);
</script>

<style lang="scss" scoped>
.ste-skeleton {
    &.ste-skeleton--loading {
        background-color: #fafafb;
        border-radius: 8rpx;

        &.ste-skeleton--text {
            height: 32rpx;
            width: 300rpx;
            border-radius: 8rpx;
        }

        &.ste-skeleton--image {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            width: 120rpx;
            height: 120rpx;
            border-radius: 16rpx;
        }

        &.ste-skeleton--circle {
            border-radius: 50%;
            width: 120rpx;
            height: 120rpx;
        }

        &.ste-skeleton--button {
            border-radius: 16rpx;
            height: 64rpx;
            width: 176rpx;
        }
    }
}

/* 定义骨架屏闪烁动画 */
@keyframes skeleton-blink {
    0% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
}

/* 骨架屏基础样式与动画绑定 */
.ste-skeleton--loading {
    /* 对应 duration: 2000ms */
    animation-duration: 2s;
    /* 对应 loop: -1 (无限循环) */
    animation-iteration-count: infinite;
    /* 对应 alternate: true (交替方向) */
    animation-direction: alternate;
    /* 动画名称 */
    animation-name: skeleton-blink;
    /* 保证动画平滑过渡 */
    animation-timing-function: ease-in-out;
}
</style>
