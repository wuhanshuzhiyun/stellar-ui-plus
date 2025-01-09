<script setup lang="ts">
import utils from '../../utils/utils.js';
import propsData from './props';
import { ref, computed, defineOptions, type CSSProperties } from 'vue';
import useColor from '../../config/color';
let color = useColor();
defineOptions({
    name: 'ste-switch',
});

const props = defineProps(propsData);

const cmpStyle = computed(() => {
    let style: CSSProperties = {};
    style['width'] = utils.formatPx(Number(props.size) * 2 + 4);
    style['height'] = utils.formatPx(Number(props.size) + 4);
    style['borderRadius'] = utils.formatPx((Number(props.size) + 4) / 2);
    style['background'] = props.modelValue ? cmpActiveColor.value : props.inactiveColor;
    style['opacity'] = props.disabled ? '0.6' : '1';
    // #ifdef H5
    style['cursor'] = props.disabled || props.readonly ? 'not-allowed' : 'pointer';
    // #endif
    return style;
});

const cmpNodeStyle = computed(() => {
    let style: CSSProperties = {};
    style['width'] = utils.formatPx(Number(props.size));
    style['height'] = utils.formatPx(Number(props.size));
    if (props.modelValue) {
        style['transform'] = `translatex(${utils.formatPx(Number(props.size) + 2)})`;
    } else {
        style['marginLeft'] = utils.formatPx(2);
    }
    return style;
});

let cmpActiveColor = computed(() => {
    return props.activeColor ? props.activeColor : color.getColor().steThemeColor;
});

const emits = defineEmits<{
    (e: 'click', value: Boolean, allowStop: () => void, resolve: () => void): void;
    (e: 'change', value: Boolean): void;
    (e: 'update:modelValue', value: Boolean): void;
}>();

let clickTask: any = ref(null); // click完成任务和allowStopStatus搭配使用
let allowStopStatus = ref(false); // 允许阻止后续的事件触发

// 开关切换
async function click() {
    if (!props.disabled && !props.readonly && !props.loading) {
        allowStopStatus.value = false;
        clickTask.value = new Promise((resolve: any) => {
            emits('click', props.modelValue, allowStop, resolve);
        });
        if (allowStopStatus.value) {
            await clickTask.value;
        }
        emits('update:modelValue', !props.modelValue);
        emits('change', !props.modelValue);
    }
}

// 允许阻止后续操作
function allowStop() {
    allowStopStatus.value = true;
}
</script>

<template>
    <view class="ste-switch-root" :style="[cmpStyle]" @click="click">
        <view class="switch-node" :style="[cmpNodeStyle]">
            <ste-loading v-if="loading" :type="2" :color="modelValue ? cmpActiveColor : inactiveColor" :size="Number(size) / 2"></ste-loading>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-switch-root {
    display: inline-flex;
    align-items: center;
    transition: background-color 0.3s;
    .switch-node {
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 9rpx 6rpx 18rpx 3rpx rgba(0, 0, 0, 0.12);
        transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
        cursor: inherit;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
