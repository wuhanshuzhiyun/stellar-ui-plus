<script lang="ts" setup>
import { computed } from 'vue';
import utils from '@/common/utils';

const props = defineProps({
    title: String,
    contentStyle: [String, Object],
    isHome: {
        type: Boolean,
        default: true,
    },
});

const cmpContentStyle = computed(() => {
    const { safeArea } = utils.getWindowInfo();
    const style = {
        // paddingTop: '32rpx',
        // #ifdef APP
        paddingBottom: `calc(100vh - ${safeArea.bottom - 16}px)`,
        // #endif
    };

    return style;
});
</script>

<template>
    <view class="page">
        <page-nav :title="props.title" :isHome="isHome"></page-nav>
        <view class="content" :style="[cmpContentStyle, props.contentStyle]">
            <slot></slot>
        </view>
    </view>
</template>

<style lang="scss">
/*
  demo页通用样式
*/
</style>
