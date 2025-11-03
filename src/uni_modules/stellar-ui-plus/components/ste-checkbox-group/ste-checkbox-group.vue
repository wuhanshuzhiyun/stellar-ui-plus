<script lang="ts" setup>
import { computed, ref, type CSSProperties } from 'vue';
import propsData, { checkboxGroupEmits } from './props';
import { useProvide } from '../../utils/mixin';
import { CHECKBOX_KEY } from '../ste-checkbox/props';
const props = defineProps(propsData);
const emits = defineEmits(checkboxGroupEmits);

const childrenCount = ref(0);

// 注册子组件，返回索引
function registerChild() {
    const index = childrenCount.value;
    childrenCount.value++;
    return index;
}

// 卸载时减少计数
function unregisterChild() {
    childrenCount.value--;
}

useProvide(CHECKBOX_KEY, 'ste-checkbox')({ props, updateValue, registerChild, unregisterChild });

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
    <view class="ste-checkbox-group-root" :style="[cmpRootStyle]" :class="[direction]">
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
.ste-checkbox-group-root {
    display: flex;
}
</style>
