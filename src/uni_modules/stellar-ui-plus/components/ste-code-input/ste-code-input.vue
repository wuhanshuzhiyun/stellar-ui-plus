<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';

const props = defineProps(propsData);
const inputValue = ref('');
const isFocus = ref(props.focus);
const componentName = `ste-code-input`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const emits = defineEmits<{
    (e: 'change', value: string | number): void;
    (e: 'input', value: string | number): void;
    (e: 'finish', value: string | number): void;
}>();

const cmpCodeLengthArray = computed(() => {
    return new Array(Number(props.maxlength));
});

const cmpCodeArray = computed(() => {
    return String(inputValue.value).split('');
});

const cmpRootStyle = computed(() => {
    const style = {
        '--font-size': `var(--font-size-${props.fontSize},${utils.formatPx(props.fontSize)})`,
        '--font-color': props.fontColor,
        '--line-width': utils.addUnit(props.size),
        '--line-background-color': props.borderColor,
    };
    return style;
});

watch(
    () => props.value,
    val => {
        // 转为字符串，超出部分截掉
        inputValue.value = String(val).substring(0, Number(props.maxlength));
    },
    { immediate: true }
);

function getItemStyle(index: number) {
    const style: { [key: string]: any } = {
        width: utils.addUnit(props.size),
        height: utils.addUnit(props.size),
    };
    // 盒子模式下，需要额外进行处理
    if (props.mode === 'box') {
        style.border = `2rpx solid ${props.borderColor}`;
        style.backgroundColor = '#F5F5F5';
        // 如果盒子间距为0的话
        if (props.space === 0) {
            // 给第一和最后一个盒子设置圆角
            if (index === 0) {
                style.borderTopLeftRadius = '3px';
                style.borderBottomLeftRadius = '3px';
            }
            if (index === Number(props.maxlength) - 1) {
                style.borderTopRightRadius = '3px';
                style.borderBottomRightRadius = '3px';
            }
            // 最后一个盒子的右边框需要保留
            if (index !== Number(props.maxlength) - 1) {
                style.borderRight = 'none';
            }
        } else {
            style.borderRadius = '10rpx';
        }
    }
    if (index !== Number(props.maxlength) - 1) {
        // 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
        style.marginRight = utils.addUnit(props.space);
    } else {
        // 最后一个盒子的有边框需要保留
        style.marginRight = 0;
    }

    return style;
}

function inputHandler(e: any) {
    const value = e.detail.value;
    inputValue.value = value;
    // 是否允许输入“.”符号
    if (props.disabledDot) {
        nextTick(() => {
            inputValue.value = value.replace('.', '');
        });
    }
    // 未达到maxlength之前，发送change事件，达到后发送finish事件
    emits('change', value);
    // 修改通过v-model双向绑定的值
    emits('input', value);
    // 达到用户指定输入长度时，发出完成事件
    if (String(value).length >= Number(props.maxlength)) {
        emits('finish', value);
    }
}
</script>

<template>
    <view class="ste-code-input-root" :style="[cmpRootStyle]">
        <view class="ste-code-input-item" :style="[getItemStyle(index)]" v-for="(item, index) in cmpCodeLengthArray" :key="index">
            <text class="ste-code-input-item-dot" v-if="formatter && cmpCodeArray.length > index">
                {{ formatter }}
            </text>
            <text class="ste-code-input-item-text" v-else>
                {{ cmpCodeArray[index] || '' }}
            </text>
            <view class="ste-code-input-item-line" v-if="mode === 'line'"></view>
            <view v-if="isFocus && cmpCodeArray.length === index" :style="{ backgroundColor: fontColor }" class="ste-code-input-item-cursor"></view>
        </view>
        <input
            v-if="!readOnly"
            type="number"
            :focus="focus"
            :value="inputValue"
            :maxlength="Number(maxlength)"
            adjustPosition
            class="ste-code-input-input"
            :cursor-spacing="30"
            @input="inputHandler"
            :style="{
                height: size + 'rpx',
            }"
            @focus="isFocus = true"
            @blur="isFocus = false"
        />
    </view>
</template>

<style lang="scss" scoped>
.ste-code-input {
    &-root {
        display: inline-flex;
        flex-direction: row;
        position: relative;
        overflow: hidden;
    }

    &-item {
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // position: relative;
        position: relative;

        &-text {
            font-size: var(--font-size);
            color: var(--font-color);

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &-dot {
            display: inline-flex;
            line-height: 1;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            font-size: var(--font-size);
            color: var(--font-color);
        }

        &-line {
            position: absolute;
            bottom: 0;
            height: 4rpx;
            border-radius: 40rpx;
            width: var(--line-width);
            background-color: var(--line-background-color);
        }

        &-cursor {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 2rpx;
            height: 55%;
            animation: 0.8s code-input-cursor-flicker infinite;
        }
    }

    &-input {
        position: absolute;
        left: -100vw;
        width: 200vw;
        top: 0;
        opacity: 0;
        background-color: transparent;
        text-align: left;
    }

    @keyframes code-input-cursor-flicker {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
}
</style>
