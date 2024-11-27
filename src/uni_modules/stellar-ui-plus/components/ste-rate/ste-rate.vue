<script setup lang="ts">
import utils from '../../utils/utils.js';
import propsData from './props';
import { computed, defineEmits, defineProps, defineOptions, type CSSProperties } from 'vue';

defineOptions({
    name: 'ste-rate',
});

const props = defineProps(propsData);

const cmpListStyle = computed(() => {
    const style: CSSProperties = {};
    style['columnGap'] = utils.formatPx(props.gutter);
    // #ifdef H5
    if (props.disabled || props.readonly) {
        style['cursor'] = 'not-allowed';
    } else {
        style['cursor'] = 'pointer';
    }
    // #endif
    return style;
});

const cmpCount = computed(() => {
    // 兼容浏览器和微信 对数字循环的处理不同
    return Array.from({ length: props.count }, (_, index) => index);
});

const cmpActiveCode = computed(() => {
    let code = getIconCode();
    if (code) return code;
    return props.activeCode;
});

const cmpInactiveCode = computed(() => {
    let code = getIconCode();
    if (code) return code;
    return props.inactiveCode;
});

// 根据iconData来算出每个分值对应的iconCode
function getIconCode() {
    if (!props.iconData || props.iconData.length === 0) return;

    let curScroeIndex = Math.ceil(props.modelValue / props.score) - 1;
    // 如果索引在数组范围内且对应的值不为空，直接返回该值
    if (curScroeIndex < props.iconData.length && props.iconData[curScroeIndex] !== '') {
        return props.iconData[curScroeIndex];
    }

    // 否则，从索引位置向左搜索最近的非空值
    for (let i = curScroeIndex; i >= 0; i--) {
        if (props.iconData[i] !== '') {
            return props.iconData[i];
        }
    }
    return '';
}

function onSelect(index: number) {
    if (!props.disabled && !props.readonly) {
        let value = (index + 1) * props.score;
        if (props.modelValue != value) {
            // 更新 model
            emits('update:modelValue', value);
            // change回调
            emits('change', value);
        }
    }
}

const emits = defineEmits<{
    (e: 'change', value: number | string): void;
    (e: 'update:modelValue', value: number | string): void;
}>();

// 计算已评分占未评分的宽度
function getWidth(index: number) {
    let value = (index + 1) * props.score;
    let diff = props.modelValue - value;
    // 全部占据
    if (diff >= 0) {
        return '100%';
    }
    // 部分占据
    else if (Math.abs(diff) > 0 && Math.abs(diff) < props.score) {
        return Number((1 - Math.abs(diff) / props.score).toFixed(2)) * 100 + '%';
    }
    // 未占据
    else {
        return 0;
    }
}
</script>

<template>
    <view class="ste-rate-root">
        <view class="list" :style="[cmpListStyle]">
            <view v-for="index in cmpCount" class="item">
                <view class="icon-box inactive" @click="onSelect(index)">
                    <ste-icon :code="cmpInactiveCode" :color="inactiveColor" :size="size"></ste-icon>
                </view>
                <view class="icon-box active" @click="onSelect(index)" :style="{ width: getWidth(index) }">
                    <ste-icon :code="cmpActiveCode" :color="disabled ? '#C8C9CC' : activeColor" :size="size"></ste-icon>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-rate-root {
    .list {
        display: flex;

        .item {
            position: relative;

            .active {
                position: absolute;
                overflow: hidden;
                top: 0;
            }
        }
    }
}
</style>
