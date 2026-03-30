<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
import propsData, { radioGroupEmits } from './props';
import { useProvide } from '../../utils/mixin';
import { RADIO_KEY } from '../ste-radio/props';
const props = defineProps(propsData);
const emits = defineEmits(radioGroupEmits);

useProvide(RADIO_KEY, 'ste-radio')({ props, updateValue });

const cmpRootStyle = computed(() => {
    return {
        flexDirection: props.direction,
    } as CSSProperties;
});

function updateValue(value: string) {
    emits('change', value);
    emits('update:modelValue', value);
}
</script>

<template>
    <view class="ste-radio-group-root" :style="[cmpRootStyle]">
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
.ste-radio-group-root {
    display: flex;
    column-gap: 16rpx;
    row-gap: 16rpx;
}
</style>
