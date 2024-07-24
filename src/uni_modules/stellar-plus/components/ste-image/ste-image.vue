<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ste-image',
});
</script>

<script setup lang="ts">
import { defineEmits, ref, defineProps, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';
import type { BaseEvent } from '../../types/event.d';

const props = defineProps(propsData);
const thas = ref<globalThis.ComponentPublicInstance | null>();

const status = ref(0); // 0:loading 1:success 2:fail
const iconSize = ref(50);
const initializing = ref(true);

const emits = defineEmits<{
    (e: 'click', event?: Event): void;
    (e: 'load', event?: BaseEvent): void;
    (e: 'error', event?: BaseEvent): void;
}>();

const cmpStyle = computed(() => {
    let width = utils.formatPx(props.width);
    let height = utils.formatPx(props.height);
    if (props.mode === 'widthFix') {
        if (status.value !== 1) {
            height = width;
        } else {
            height = 'auto';
        }
    } else if (props.mode === 'heightFix') {
        if (status.value !== 1) {
            width = height;
        } else {
            width = 'auto';
        }
    }
    return {
        '--image-root-width': width,
        '--image-root-height': height,
        '--image-root-display': props.display,
        '--image-root-radius': utils.formatPx(props.radius),
        '--image-root-background-color': status.value === 1 ? 'none' : 'rgba(127,127,127,.05)',
    };
});

watch(
    () => props.src,
    () => {
        status.value = 0;
        initializing.value = true;
    }
);

const onLoadOver = (e: BaseEvent) => {
    initializing.value = false;
    if (status.value !== 1) status.value = 1;
    emits('load', e);
};

const onFault = (e?: BaseEvent) => {
    if (status.value !== 2) status.value = 2;
    emits('error', e);
};

const click = (e: Event) => {
    emits('click', e);
};

function initIconSize() {
    nextTick(async () => {
        if (!thas.value) return;
        const dom = await utils.querySelector<false>('.ste-image-root', thas.value);
        if (!dom) return;
        const { width = 0, height = 0 } = dom;
        const size = width <= height ? width : height;
        if (size <= 30) iconSize.value = 12 * 2;
        else if (size <= 50) iconSize.value = 20 * 2;
        else if (size <= 100) iconSize.value = 30 * 2;
        else if (size <= 150) iconSize.value = 50 * 2;
        else iconSize.value = 70 * 2;
    });
}

console.log(props.hiddenError);

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
    initIconSize();
});
</script>
<template>
    <view class="ste-image-root" :style="[cmpStyle]">
        <view class="loading-icon" v-if="!props.hiddenLoading && status === 0">
            <slot name="loading">
                <ste-icon code="&#xe693;" :size="iconSize" />
            </slot>
        </view>

        <image
            class="content"
            :style="{ opacity: status === 1 ? '1' : '0' }"
            :src="props.src"
            :mode="props.mode"
            :lazy-load="props.lazyLoad"
            :show-menu-by-longpress="props.showMenuByLongpress"
            @load="onLoadOver"
            @error="onFault"
            @click="click"
        ></image>

        <view class="loading-icon" v-if="!props.hiddenError && status === 2">
            <slot name="error">
                <ste-icon code="&#xe692;" :size="iconSize" />
            </slot>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-image-root {
    width: var(--image-root-width);
    height: var(--image-root-height);
    display: var(--image-root-display);
    font-size: 24rpx;
    color: #bbbbbb;
    justify-content: center;
    align-items: center;
    background-color: var(--image-root-background-color);
    border-radius: var(--image-root-radius);
    overflow: hidden;
    line-height: 1;
    vertical-align: top;
    position: relative;

    & > image {
        width: var(--image-root-width);
        height: var(--image-root-height);
    }

    .loading-icon {
        position: absolute;
        z-index: 2;
    }
}
</style>
