<script lang="ts" setup>
import { defineEmits, defineProps, defineOptions } from 'vue';
import propsData, { STEPS_KEY, stepsEmits } from './props';
import { useProvide } from '../../utils/mixin';

const componentName = `ste-steps`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);
const emits = defineEmits(stepsEmits);
useProvide(STEPS_KEY, 'ste-step')({ props, onClickStep });

function onClickStep(index: number) {
    emits('click-step', index);
}
</script>

<template>
    <view class="ste-steps-root" :class="[`ste-steps-${direction}`]">
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
.ste-steps-root {
    display: flex;
    width: 100%;
    flex: 1;
}
.ste-steps-column {
    flex-flow: column;
    height: 100%;
}

.ste-steps-row {
    flex-direction: row;
    flex: 1;
}
</style>
