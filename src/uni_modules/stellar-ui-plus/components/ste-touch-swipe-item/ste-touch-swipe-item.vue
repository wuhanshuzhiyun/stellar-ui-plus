<script setup lang="ts">
import { defineOptions, defineProps } from 'vue';
import { useInject } from '../../utils/mixin';
import { TOUCH_SWIPE_KEY } from '../ste-touch-swipe/props';

defineOptions({
    name: 'ste-touch-swipe-item',
    options: {
        virtualHost: true,
    },
});

defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
});
useInject(TOUCH_SWIPE_KEY);
</script>
<template>
    <view class="ste-touch-swipe-item-root">
        <slot />
    </view>
</template>
<style lang="scss" scoped>
.ste-touch-swipe-item-root {
    width: 100%;
    height: 100%;
    display: inline-block;
}
</style>
