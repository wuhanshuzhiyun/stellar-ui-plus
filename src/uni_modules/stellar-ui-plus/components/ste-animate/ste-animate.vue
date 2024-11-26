<script lang="ts" setup>
import { computed, ref, type CSSProperties, nextTick, watch, defineProps, defineOptions } from 'vue';
import propsData from './props';

const props = defineProps(propsData);

const componentName = `ste-animate`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const animationFlag = ref(false); // 通过此标识控制动画执行

const cmpRootClass = computed(() => {
    let classArr: string[] = [];
    if (props.type && (props.action === 'initial' || animationFlag.value || props.loop)) {
        classArr.push(`ste-animate-${props.type}`);
    }
    if (props.loop) {
        classArr.push('loop');
    }
    return classArr.join(' ');
});

const cmpRootStyle = computed(() => {
    let style: CSSProperties = {};
    if (props.duration) {
        style.animationDuration = `${props.duration / 1000}s`;
    }
    return style;
});

watch(
    () => props.show,
    val => {
        if (val) {
            animated();
        }
    }
);

function handleClick() {
    if (props.action === 'click') {
        animated();
    }
}

function animated() {
    animationFlag.value = false;
    nextTick(() => {
        animationFlag.value = true;
    });
}
</script>

<template>
    <view class="ste-animate-root" :class="[cmpRootClass]" :style="[cmpRootStyle]" @click="handleClick">
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
@import './ste-animate.scss';
</style>
