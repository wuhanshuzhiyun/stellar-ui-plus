<template>
    <view class="header-nav">
        <view class="nav-item" v-for="item in navData" :key="item.key" :class="active == item.key ? 'active' : ''" @click="toView(item)">
            {{ item.title }}
        </view>
    </view>
</template>

<script lang="ts" setup>
import config from '@/common/config';
import { ref, watch } from 'vue';
import type { NavItem } from '../types';

defineOptions({
    name: 'header-nav',
    virtualHost: true,
});

const props = defineProps({
    mode: { type: [String], default: '' },
});

const emits = defineEmits<{
    (e: 'update:mode', value: string): void;
    (e: 'change', value: any): void;
}>();

const active = ref('');
const navData = ref<NavItem[]>(config.NAV_DATA);

watch(
    () => props.mode,
    val => {
        active.value = val;
    },
    {
        immediate: true,
    }
);

const toView = (item: NavItem) => {
    emits('update:mode', item.key);
    active.value = item.key;
    emits('change', item);
};
</script>

<style lang="scss" scoped>
.header-nav {
    height: var(--pc-header-nav-height);
    display: flex;
    .nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0 12px;
        border-bottom: 2px solid transparent;

        font-size: 14px;
        font-weight: 500;

        cursor: pointer;

        &.active {
            border-bottom-color: var(--pc-main-color);
        }
    }
}
</style>
