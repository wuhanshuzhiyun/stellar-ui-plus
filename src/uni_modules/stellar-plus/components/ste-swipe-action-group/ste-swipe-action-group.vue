<script setup lang="ts">
import { watch } from 'vue';
import propsData from './props';
import { STE_SWIPE_ACTION_KEY } from '../ste-swipe-action/props';
import { useProvide } from '../../utils/mixin';

const emits = defineEmits<{
    (e: 'close', index: number): void;
    (e: 'open', direction: 'left' | 'right', index: number): void;
}>();

const { internalChildren } = useProvide(STE_SWIPE_ACTION_KEY, 'ste-swipe-action')();
const props = defineProps(propsData);

const closeRestsChildren = (index: number) => {
    if (!props.autoClose) return;
    internalChildren.forEach((child, i) => {
        if (index !== i) {
            child.selfValue?.close();
        }
    });
};

const onchangeChildren = () => {
    internalChildren.forEach((child, index) => {
        child.selfValue?.onchange((x: number) => {
            if (x === 0) {
                emits('close', index);
            } else {
                emits('open', x > 0 ? 'left' : 'right', index);
                closeRestsChildren(index);
            }
        });
    });
};

watch(() => internalChildren, onchangeChildren, { immediate: true });

const open = (direction: 'left' | 'right', index: number) => {
    const child = internalChildren[index];
    if (!child) return;
    child.selfValue?.open(direction);
    closeRestsChildren(index);
};

const close = (index: number) => {
    const child = internalChildren[index];
    if (!child) return;
    child.selfValue?.close();
};
defineExpose({ open, close });
</script>
<template>
    <view class="ste-swipe-action-group-root">
        <slot></slot>
    </view>
</template>
