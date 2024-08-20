<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue';
import propsData, { SCROLL_TO_KEY } from './props';
import useData from './useData';
import { useProvide } from '../../utils/mixin';

const emits = defineEmits<{
    (e: 'change', index: number): void;
    (e: 'update:active', index: number): void;
}>();

const props = defineProps(propsData);
const { internalChildren } = useProvide(SCROLL_TO_KEY, 'ste-tab')({ activeKey: computed(() => props.active || 0) });
const thas = ref<globalThis.ComponentPublicInstance | null | undefined>();
thas.value = getCurrentInstance()?.proxy;

const { scrollTop, cmpRootStyle, onScroll } = useData({ thas: thas.value, emits, props, children: internalChildren });
</script>
<template>
    <scroll-view class="ste-scroll-to-root" scroll-y scroll-anchoring :scroll-top="scrollTop" :style="[cmpRootStyle]" @scroll="onScroll">
        <view class="ste-scroll-to-content">
            <slot />
        </view>
    </scroll-view>
</template>
<style scoped lang="scss">
.ste-scroll-to-root {
    width: 100%;
}
</style>
