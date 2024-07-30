<script setup lang="ts">
import { ref, computed, defineProps, onMounted, onBeforeUnmount, defineEmits, getCurrentInstance } from 'vue';
import type { Obj } from '../../types';
import utils from '../../utils/utils';
import propsData from './props';
const elId = utils.guid(8);
const props = defineProps(propsData);
const observe = ref<UniApp.IntersectionObserver>();
const thas = ref<globalThis.ComponentPublicInstance | null>();

const emits = defineEmits<{
    (e: 'fixed'): void;
    (e: 'unfixed'): void;
}>();

const cmpRootStyle = computed(() => {
    const style: Obj = {
        background: props.background,
    };
    if (!props.disabled) {
        style.position = 'sticky';
        style.top = utils.formatPx(props.offsetTop);
        style.zIndex = props.zIndex;
    }
    return style;
});

const relativeToViewportTop = computed(() => {
    let customNavHeight = 0;
    if (props.customNavHeight === null) {
        // #ifdef H5
        customNavHeight = 44;
        // #endif
        // #ifndef H5
        customNavHeight = utils.System.getNavbarBottom();
        // #endif
    } else {
        customNavHeight = utils.formatPx(props.customNavHeight, 'num');
    }
    return customNavHeight + utils.formatPx(props.offsetTop, 'num');
});

const disconnectObserver = () => {
    if (observe.value) {
        console.log('>?>??');
        observe.value.disconnect();
    }
};

const setFixed = (top: number) => {
    const bool = top <= relativeToViewportTop.value;
    if (bool) emits('fixed');
    else emits('unfixed');
};

onBeforeUnmount(() => {
    disconnectObserver();
});

const observeContent = () => {
    disconnectObserver();
    observe.value = uni.createIntersectionObserver(thas.value, { thresholds: [0.8, 1] });
    console.log(observe.value);
    observe.value.relativeToViewport({ top: -(relativeToViewportTop.value + 1) });
    observe.value.observe(`#${elId}`, res => {
        setFixed(res.boundingClientRect.top);
    });
};

onMounted(() => {
    if (props.disabled) return;
    thas.value = getCurrentInstance()?.proxy;
    setTimeout(() => {
        observeContent();
    }, 50);
});
</script>
<template>
    <div class="ste-sticky-root" :id="elId" :style="cmpRootStyle">
        <slot />
    </div>
</template>
<style scoped lang="scss">
.ste-sticky-root {
    width: 100%;
}
</style>
