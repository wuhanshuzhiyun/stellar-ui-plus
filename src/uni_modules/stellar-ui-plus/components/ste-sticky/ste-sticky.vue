<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
import type { Obj } from '../../types';
import utils from '../../utils/utils';
import propsData from './props';

defineOptions({
    name: 'ste-sticky',
    options: {
        virtualHost: true,
    },
});

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
        customNavHeight = utils.System.getNavbarBottom();
    } else {
        customNavHeight = utils.formatPx(props.customNavHeight, 'num');
    }
    return customNavHeight + utils.formatPx(props.offsetTop, 'num');
});

const disconnectObserver = () => {
    if (observe.value) {
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
    // 测试环境屏蔽uni
    if (process.env.NODE_ENV == 'test') {
        return;
    }
    disconnectObserver();
    observe.value = uni.createIntersectionObserver(thas.value, { thresholds: [0.8, 1] });
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
    <div class="ste-sticky-root" data-test="sticky" :id="elId" :style="cmpRootStyle">
        <slot />
    </div>
</template>
<style scoped lang="scss">
.ste-sticky-root {
    width: 100%;
}
</style>
