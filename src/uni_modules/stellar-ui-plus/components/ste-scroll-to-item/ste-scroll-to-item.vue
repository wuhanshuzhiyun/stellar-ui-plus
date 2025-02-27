<script setup lang="ts">
import { useInject } from '../../utils/mixin';
import { SCROLL_TO_KEY } from '../ste-scroll-to/props';

defineOptions({
    name: 'ste-scroll-to-item',
    options: {
        virtualHost: true,
    },
});

useInject(SCROLL_TO_KEY);
</script>
<template>
    <view class="ste-scroll-to-item-root">
        <slot />
    </view>
</template>
<style lang="scss" scoped>
.ste-scroll-to-item-root {
    width: 100%;
}
</style>
