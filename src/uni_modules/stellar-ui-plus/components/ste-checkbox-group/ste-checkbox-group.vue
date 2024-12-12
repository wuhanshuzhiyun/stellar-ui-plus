<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
import propsData, { checkboxGroupEmits } from './props';
import { useProvide } from '../../utils/mixin';
import { CHECKBOX_KEY } from '../ste-checkbox/props';
const props = defineProps(propsData);
const emits = defineEmits(checkboxGroupEmits);

useProvide(CHECKBOX_KEY, 'ste-checkbox')({ props, updateValue });

const cmpRootStyle = computed(() => {
    return {
        flexDirection: props.direction,
    } as CSSProperties;
});

function updateValue(value: any[]) {
    emits('change', value);
    emits('update:modelValue', value);
}
</script>

<template>
    <view class="ste-checkbox-group-root" :style="[cmpRootStyle]">
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
.ste-checkbox-group-root {
    display: grid;
    row-gap: 16rpx;
}
</style>
