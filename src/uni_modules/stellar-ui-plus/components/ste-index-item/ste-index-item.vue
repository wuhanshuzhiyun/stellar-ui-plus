<script setup lang="ts">
import { defineOptions, ref, nextTick, onMounted } from 'vue';
import propsData from './props';
import { useInject } from '../../utils/mixin';
import { INDEX_LIST_KEY } from '../ste-index-list/props';

defineOptions({
    name: 'ste-index-list-item',
    options: {
        virtualHost: true,
    },
});
const active = ref(false);
const sticky = ref(true);

const setActive = (bool: boolean) => {
    active.value = bool;
};

const { parent } = useInject(INDEX_LIST_KEY, { setActive });

const props = defineProps(propsData);

const onClickItem = (text: string) => {
    (parent as any)?.onClickItem(props.title, text);
};

onMounted(() => {
    nextTick(() => {
        sticky.value = (parent as any)?.sticky;
    });
});
</script>
<template>
    <view class="ste-scroll-to-item-root">
        <slot name="title">
            <block v-if="title">
                <ste-sticky v-if="sticky">
                    <view class="index-item-title" :class="{ active }">{{ title }}</view>
                </ste-sticky>
                <view v-else class="index-item-title" :class="{ active }">{{ title }}</view>
            </block>
        </slot>
        <slot>
            <view class="index-item-text-list">
                <view class="index-item-text" v-for="(text, i) in list" :key="i" @click="onClickItem(text as string)">{{ text }}</view>
            </view>
        </slot>
    </view>
</template>
<style lang="scss" scoped>
.ste-scroll-to-item-root {
    width: 100%;
    .index-item-title {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 32rpx;
        padding: 0 32rpx;
        background-color: #f5f5f5;
        color: var(--ste-index-list-inactive-color);
        &.active {
            color: var(--ste-index-list-active-color);
        }
    }
    .index-item-text-list {
        padding: 0 32rpx;
        background-color: #fff;
        .index-item-text {
            width: 100%;
            height: 92rpx;
            line-height: 92rpx;
            font-family:
                PingFang SC,
                PingFang SC;
            font-weight: 400;
            font-size: 32rpx;
            color: #252525;
            border-bottom: 2rpx solid #f9f9f9;
        }
    }
}
</style>
