<script setup lang="ts">
import { computed } from 'vue';
import propData from './props';

const props = defineProps(propData);

const rootStyle = computed(() => {
    return {
        background: props.background,
        '--ste-function-list-content-bg': props.contentBg,
    };
});

const emits = defineEmits<{
    (e: 'click-header', type: 'title' | 'subhead' | 'more'): void;
    (e: 'click-item', type: 'image' | 'title' | 'subhead' | 'status' | 'button'): void;
    (e: 'click-empty', type: 'image' | 'text' | 'button'): void;
}>();

const onClickHeader = (type: 'title' | 'subhead' | 'more') => emits('click-header', type);

const onClickItem = (type: 'image' | 'title' | 'subhead' | 'status' | 'button') => emits('click-item', type);

const onClickEmpty = (type: 'image' | 'text' | 'button') => emits('click-empty', type);
</script>
<template>
    <view class="ste-function-list-root" :style="[rootStyle]"></view>
</template>

<style lang="scss" scoped>
.ste-function-list-root {
    padding: 24rpx 24rpx 20rpx 24rpx;
    border-radius: 12rpx;
}
</style>
