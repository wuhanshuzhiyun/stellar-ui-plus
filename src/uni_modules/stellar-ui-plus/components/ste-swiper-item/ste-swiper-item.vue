<script setup lang="ts">
import { ref, computed } from 'vue';
import { useInject } from '../../utils/mixin';
import { SWIPER_KEY } from '../ste-swiper/props';

defineOptions({
    name: 'ste-swiper-item',
    options: {
        virtualHost: true,
    },
});

const transformX = ref(0);
const transformY = ref(0);
const transformZ = ref(0);
const scale = ref(1);

const cmpStyle = computed(() => {
    return {
        transform: `translate3d(${transformX.value}px, ${transformY.value}px, ${transformZ.value}px) scale(${scale.value})`,
    };
});

const setTransform = ({ x = 0, y = 0, z = 0 }) => {
    if (transformX.value !== x) transformX.value = x;
    if (transformY.value !== y) transformY.value = y;
    if (transformZ.value !== z) transformZ.value = z;
};

const setLinearScale = (scaleValue: number) => {
    if (scale.value !== scaleValue) scale.value = scaleValue;
};

useInject(SWIPER_KEY, { setTransform, setLinearScale });
</script>
<template>
    <view class="ste-swiper-item-root" :style="[cmpStyle]">
        <slot></slot>
    </view>
</template>
<style scoped lang="scss">
.ste-swiper-item-root {
    width: 100%;
    height: 100%;
    /* 添加此行以确保在循环播放时不会出现闪烁 */
    will-change: transform;
}
</style>
