<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import propsData, { SCROLL_TO_KEY } from './props';
import useData from './useData';
import { useProvide } from '../../utils/mixin';

defineOptions({
    name: 'ste-search',
    options: {
        virtualHost: true,
    },
});

const emits = defineEmits<{
    (e: 'change', index: number): void;
    (e: 'update:active', index: number): void;
}>();

const props = defineProps(propsData);
const { internalChildren } = useProvide(SCROLL_TO_KEY, 'ste-scroll-to-item')({ activeKey: computed(() => props.active || 0) });
const thas = ref<globalThis.ComponentPublicInstance | null | undefined>();

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
});

const { scrollTop, cmpRootStyle, onScroll, initChildren } = useData({ thas, emits, props, children: internalChildren });

defineExpose({ init: () => initChildren(true) });
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
