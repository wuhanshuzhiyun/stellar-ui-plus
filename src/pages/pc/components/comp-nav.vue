<template>
    <view class="comp-nav">
        <view class="nav-box">
            <view class="slider-bg" :style="sliderStyle"></view>
            <view class="nav-item" :class="item.key === active ? 'active' : ''" v-for="item in navData" :key="item.key" @click="clickNav(item)">
                {{ item.title }}
            </view>
        </view>
        <view class="line" />
    </view>
</template>

<script lang="ts" setup>
import utils from '@/common/utils';
import config from '@/common/config';
import { onMounted, ref, watch, nextTick, getCurrentInstance } from 'vue';
import type { CSSProperties } from 'vue';
import type { NavItem } from '../types';
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const props = defineProps<{
    mode: string;
}>();

const emits = defineEmits<{
    (e: 'update:mode', value: string): void;
    (e: 'change', value: any): void;
}>();

const navData = ref(config.NAV_COMP_DATA);
const active = ref('');
const sliderStyle = ref<CSSProperties>({
    transform: 'translateX(0)',
    width: '0px',
});

watch(
    () => props.mode,
    val => {
        if (val) {
            active.value = val;
            nextTick(() => {
                updateSliderPosition();
            });
        }
    },
    {
        immediate: true,
    }
);

watch(
    () => active.value,
    () => {
        nextTick(() => {
            updateSliderPosition();
        });
    }
);

onMounted(() => {
    nextTick(() => {
        updateSliderPosition();
    });
});

const clickNav = (item: NavItem) => {
    active.value = item.key;
    emits('update:mode', item.key);
    emits('change', item);
};

const updateSliderPosition = async () => {
    const navBox = await utils.querySelector<false>('.nav-box', instance);
    const data = await utils.querySelector<false>(`.nav-item.active`, instance);

    if (data && navBox) {
        // 计算相对位置
        const relativeLeft = (data.left || 0) - (navBox.left || 0) - 4;
        sliderStyle.value = {
            transform: `translateX(${relativeLeft}px)`,
            width: `${data.width}px`,
        };
    }
};
</script>

<style lang="scss" scoped>
.comp-nav {
    // padding-left: var(--pc-padding);
    display: flex;
    align-items: center;
    width: 100%;
    .line {
        flex: 1;
        border-bottom: 1px solid #ddd;
    }
    .nav-box {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background: rgb(244, 244, 245);
        height: 48px;
        cursor: pointer;
        border: 1px solid rgb(220, 223, 230);
        position: relative;

        .slider-bg {
            position: absolute;
            height: calc(100% - 8px);
            top: 4px;
            left: 4px;
            background-color: #fff;
            border-radius: 3px;
            transition: all cubic-bezier(0.38, 0, 0.24, 1) 0.24s;
            box-shadow: 0 2px 4px #00000026;
            z-index: 1;
        }

        .nav-item {
            margin: 4px;
            padding: 8px 24px;
            font-size: 16px;
            box-sizing: border-box;
            border-radius: 3px;
            position: relative;
            word-break: keep-all;
            white-space: nowrap;
            z-index: 2;

            &.active {
                color: #000;
            }
        }
    }
}
</style>
