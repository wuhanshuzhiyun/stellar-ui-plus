<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue';
defineOptions({
    virtualHost: true,
});

const emit = defineEmits(['loadMore']);

const props = defineProps({
    // 距离底部触发分页距离
    bottomDistance: {
        type: Number,
        default: 10,
    },
    rootStyle: {
        type: Object,
        default: () => ({}),
    },
});
onMounted(() => {
    const thas = getCurrentInstance()?.proxy;
    setTimeout(() => {
        uni.createIntersectionObserver(thas)
            .relativeTo('.datapager-root', { bottom: Math.abs(props.bottomDistance) > 5 ? props.bottomDistance : 5 })
            .observe('.datapager-footer', res => {
                if (res.intersectionRatio) {
                    emit('loadMore');
                }
            });
    });
});
</script>
<template>
    <scroll-view scroll-y class="datapager-root" :style="[props.rootStyle]">
        <view class="datapager-content">
            <slot></slot>
        </view>
        <view class="datapager-footer"></view>
    </scroll-view>
</template>
<style lang="scss" scoped>
.datapager-root {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .datapager-content {
        width: 100%;
    }
    .datapager-footer {
        width: 100%;
        height: 1px;
    }
}
</style>
