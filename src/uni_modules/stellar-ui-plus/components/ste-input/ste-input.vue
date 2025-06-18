<script lang="ts" setup>
import { computed, ref, watch, nextTick, type CSSProperties } from 'vue';

import utils from '../../utils/utils';
import { createOptions } from '../../utils/mixin';
import propsData, { type InputEmits } from './props';
import type { BaseEvent } from '../../types/event';
import type { InputType } from '@uni-helper/uni-app-types';
const componentName = `ste-input`;
defineOptions(createOptions(componentName));

const props = defineProps(propsData);
const emits = defineEmits<InputEmits>();

const focused = ref(props.focus);
const dataValue = ref<string | number>();
const tmpDataValue = ref<string | number>();

const cmpRootClass = computed(() => {
    let classStr = '';
    if (props.disabled) {
        classStr += 'ste-input-disabled ';
    }
    if (props.readonly) {
        classStr += 'ste-input-readonly ';
    }

    classStr += `ste-input-${props.shape} `;

    if (props.rootClass) {
        classStr += `${props.rootClass} `;
    }

    if (props.type == 'textarea') {
        classStr += 'textarea-type ';
    }

    return classStr;
});

const cmpRootStyle = computed(() => {
    let style = utils.bg2style(props.background) as CSSProperties;

    switch (props.shape) {
        case 'circle':
            style.borderRadius = utils.addUnit(40);
            break;
        case 'square':
            style.borderRadius = utils.addUnit(16);
            break;
        default:
            break;
    }
    return style;
});

const cmpRootCssVar = computed(() => {
    return {
        '--input-font-size': `var(--font-size-${props.fontSize},${utils.formatPx(props.fontSize)})`,
        '--input-font-color': props.fontColor,
        '--input-text-align': props.inputAlign,
        '--input-line-color': props.borderColor || '#eeeeee',
        '--input-border-color': props.border ? props.borderColor : 'transparent',
    };
});

const cmpShowClear = computed(() => {
    return !props.disabled && !props.readonly && props.clearable && dataValue.value && focused.value;
});

watch(
    () => [props.value, props.modelValue],
    vals => {
        const val = vals[0] || vals[1];
        dataValue.value = val;
        tmpDataValue.value = val;
    },
    {
        immediate: true,
    }
);

watch(
    () => props.focus,
    val => {
        setTimeout(() => {
            focused.value = val;
        }, 50);
    }
);

function onInput(e: any) {
    const baseEvent = e as unknown as BaseEvent;

    if (!props.allowSpace) {
        baseEvent.detail.value = baseEvent.detail.value.replace(/\s*/g, '');
    }

    // 应用自定义过滤函数（如果提供）
    if (typeof props.filter === 'function') {
        baseEvent.detail.value = props.filter(baseEvent.detail.value);
    }

    if (props.maxlength > 0) {
        baseEvent.detail.value = baseEvent.detail.value.substring(0, props.maxlength);
    }

    nextTick(() => {
        dataValue.value = baseEvent.detail.value;
        tmpDataValue.value = dataValue.value;
        emits('input', dataValue.value);
        emits('update:modelValue', dataValue.value);
    });
}

function onClear() {
    if (props.disabled && !props.readonly) return;

    dataValue.value = '';
    emits('input', dataValue.value);
    emits('update:modelValue', dataValue.value);
    emits('clear');
}

function onFocus() {
    if (props.disabled && !props.readonly) return;
    focused.value = true;
    emits('update:focus', true);
    emits('focus', dataValue.value);
}

function onBlur() {
    setTimeout(() => {
        emits('update:focus', false);
        focused.value = false;
        emits('blur');
    }, 200);
}

function onConfirm() {
    emits('confirm', dataValue.value);
}

function inputClick() {
    onFocus();
}
</script>

<template>
    <view class="ste-input-root" :class="cmpRootClass" :style="[cmpRootStyle, cmpRootCssVar]" @click="inputClick">
        <view class="content">
            <view class="prefix-box">
                <slot name="prefix"></slot>
            </view>
            <view class="input-box">
                <template v-if="type == 'textarea'">
                    <textarea
                        class="ste-input-input textarea"
                        :type="type"
                        :focus="focus"
                        v-model="dataValue"
                        :disabled="disabled || readonly"
                        :placeholder="placeholder"
                        :placeholder-style="placeholderStyle"
                        :placeholder-class="placeholderClass"
                        :confirm-type="confirmType"
                        :cursor-spacing="cursorSpacing"
                        @input="onInput"
                        @focus="onFocus"
                        @blur="onBlur"
                        @confirm="onConfirm"
                    />
                    <!-- #ifdef H5 || MP-WEIXIN || APP || MP-TOUTIAO -->
                    <text
                        class="count-text"
                        :style="{
                            'background-color': 'transparent',
                        }"
                        v-if="showWordLimit && maxlength > 0"
                    >
                        {{ String(tmpDataValue).length }}/{{ maxlength }}
                    </text>
                    <!-- #endif -->
                </template>
                <template v-else>
                    <input
                        class="ste-input-input"
                        :type="type as InputType"
                        :focus="focused"
                        v-model="dataValue"
                        :disabled="disabled || readonly"
                        :placeholder="placeholder"
                        :placeholder-style="placeholderStyle"
                        :placeholder-class="placeholderClass"
                        :confirm-type="confirmType"
                        @input="onInput"
                        @focus="onFocus"
                        @blur="onBlur"
                        @confirm="onConfirm"
                        :style="[{ width: cmpShowClear ? 'calc(100% - 48rpx)' : 'calc(100% - 8rpx)' }]"
                        :cursor-spacing="cursorSpacing"
                        :cursor="cursor"
                        :password="password"
                        @click.stop="() => {}"
                    />
                    <view v-if="cmpShowClear" class="clear-icon" @click="onClear">
                        <ste-icon code="&#xe694;" color="#bbbbbb" size="34" />
                    </view>
                </template>
            </view>
            <view class="suffix-box">
                <slot name="suffix"></slot>
            </view>
        </view>
        <view class="line" v-if="shape == 'line'" />
    </view>
</template>

<style scoped lang="scss">
@import './ste-input.scss';
</style>
