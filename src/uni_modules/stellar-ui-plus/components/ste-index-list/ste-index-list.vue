<script setup lang="ts">
import { ref, computed, watch, nextTick, getCurrentInstance, defineOptions, onMounted } from 'vue';
import propsData, { INDEX_LIST_KEY } from './props';
import useData from '../ste-scroll-to/useData';
import { useProvide } from '../../utils/mixin';

defineOptions({
    name: 'ste-index-list',
    options: { virtualHost: true },
});

const emits = defineEmits<{
    (e: 'change', index: number): void;
    (e: 'update:active', index: number): void;
    (e: 'clickItem', title: string, text: string): void;
}>();

const props = defineProps(propsData);

const { internalChildren } = useProvide(
    INDEX_LIST_KEY,
    'ste-scroll-to-item'
)({
    activeKey: computed(() => props.active || 0),
    sticky: props.sticky,
    onClickItem: (title: string, text: string) => emits('clickItem', title, text),
});

const thas = ref<globalThis.ComponentPublicInstance | null | undefined>();

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
});

const { dataActive, setDataActive, scrollTop, cmpRootStyle, onScroll, initChildren } = useData({ thas, emits, props, children: internalChildren });

const cmpIndexRootStyle = computed(() => ({ '--ste-index-list-inactive-color': props.inactiveColor, '--ste-index-list-active-color': props.activeColor }));
const cmpTitles = computed(() => internalChildren.map(c => c?.props?.title));

const activeChange = (index: number) => {
    nextTick(() => {
        internalChildren.forEach((c, i) => {
            c.selfValue?.setActive(i === index);
        });
    });
};

watch(
    () => internalChildren.length,
    () => activeChange(dataActive.value)
);

defineExpose({ init: () => initChildren(true) });
</script>
<template>
    <view class="ste-index-list-root" :style="[cmpRootStyle, cmpIndexRootStyle]">
        <scroll-view class="ste-scroll-to-root" scroll-y scroll-anchoring :scroll-top="scrollTop" @scroll="onScroll">
            <view class="ste-scroll-to-content">
                <slot />
            </view>
        </scroll-view>
        <view class="ste-index-list">
            <block v-for="(m, index) in cmpTitles" :key="index">
                <view v-if="m" class="ste-index-item" :class="{ active: index === dataActive }" @click="setDataActive(index)">
                    {{ m }}
                </view>
            </block>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.ste-index-list-root {
    width: 100%;
    height: var(--index-list-height);
    position: relative;
    .ste-scroll-to-root {
        width: 100%;
        height: var(--index-list-height);
    }
    .ste-index-list {
        position: absolute;
        right: 12rpx;
        top: 50%;
        transform: translateY(-50%);
        z-index: 101;
        background-color: #fff;
        width: 48rpx;
        text-align: center;
        border-radius: 24rpx;
        box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.15);

        .ste-index-item {
            margin: 0 auto;
            height: 44rpx;
            line-height: 44rpx;
            font-size: var(--font-size-24, 24rpx);
            color: var(--ste-index-list-inactive-color);
            &.active {
                color: var(--ste-index-list-active-color);
            }
        }
    }
}
</style>
