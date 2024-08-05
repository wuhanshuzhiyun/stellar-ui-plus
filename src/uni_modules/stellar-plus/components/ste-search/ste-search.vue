<script setup lang="ts">
import { computed, watch, defineProps, defineEmits } from 'vue';
import type { SwiperOnChangeEvent } from '@uni-helper/uni-app-types';
import utils from '../../utils/utils';
import type { Obj } from '../../types/index.d';
import useData from './useData';
import propsData from './props';

const props = defineProps(propsData);
const { dataValue, setDataValue, switchIndex, setSwitchIndex } = useData();

const cmpRootStyle = computed(() => {
    const style: Obj = {
        '--search-root-height': utils.formatPx(props.height),
        '--search-root-radius': utils.formatPx(props.radius),
        '--search-btn-text-color': props.btnTextColor,
        '--search-placeholder-color': props.placeholderColor,
        '--search-input-color': props.inputTextColor,
        '--search-border-color': props.borderColor,
        background: props.background,
    };
    if (!props.hiddenBtn || !props.hiddenInput) {
        style['padding'] = `0 ${utils.formatPx(8)} 0 ${utils.formatPx(16)}`;
    }
    return style;
});

const cmpPlaceholder = computed(() => (props.hotWords?.length ? '' : props.placeholder));
const cmpShowSwitch = computed(() => props.hotWords?.length && !dataValue.value);
const cmpbtnBackground = computed(() => ({ background: props.btnBackground }));
const cmpHiddenLine = computed(() => props.hiddenLine || props.hiddenBtn);

watch(() => props.modelValue, setDataValue, { immediate: true });
watch(
    () => props.hotWords,
    () => setSwitchIndex(0)
);

const emits = defineEmits<{
    (e: 'input', value: string): void;
    (e: 'update:modelValue', value: string): void;
    (e: 'focus', value: string): void;
    (e: 'update:focus', bool: boolean): void;
    (e: 'blur', value: string): void;
    (e: 'search', value: string): void;
    (e: 'click', value: string): void;
    (e: 'clear'): void;
}>();

const onInput = () => {
    if (props.disabled) return;
    emits('input', dataValue.value);
    emits('update:modelValue', dataValue.value);
};
const onSearch = () => {
    if (props.disabled) return;
    let searchValue = dataValue.value;
    if (!searchValue && props.hotWords.length) {
        searchValue = props.hotWords[switchIndex.value];
    }
    emits('search', searchValue);
};
const onFocus = () => {
    if (props.disabled) return;
    emits('focus', dataValue.value);
    emits('update:focus', true);
};
const onBlur = () => {
    if (props.disabled) return;
    emits('blur', dataValue.value);
    emits('update:focus', false);
};
const onClear = () => {
    if (props.disabled) return;
    setDataValue('');
    emits('input', '');
    emits('update:modelValue', '');
    emits('clear');
};
const onSwitchChange = (e: SwiperOnChangeEvent) => {
    setSwitchIndex(e.detail.current);
};
const onClick = () => {
    if (props.disabled) return;
    let searchValue = dataValue.value;
    if (!searchValue && props.hotWords.length) {
        searchValue = props.hotWords[switchIndex.value];
    }
    emits('click', searchValue);
};
</script>
<template>
    <view class="ste-search-root" :class="{ disabled: props.disabled }" :style="[cmpRootStyle]" @click="onClick">
        <view class="content">
            <view class="icon-box">
                <ste-icon code="&#xe695;" :color="prefixIconColor" size="44" />
            </view>
            <view class="input-box" v-if="!hiddenInput">
                <input
                    class="ste-search-input"
                    placeholder-class="search-input-placeholder"
                    :disabled="props.disabled"
                    :placeholder="cmpPlaceholder"
                    v-model="dataValue"
                    @input="onInput"
                    @confirm="onSearch"
                    @focus="onFocus"
                    @blur="onBlur"
                    @clear="onClear"
                    :focus="focus"
                    :clearable="clearable"
                    :fontColor="inputTextColor"
                    background="transparent"
                />
                <swiper v-if="cmpShowSwitch" class="placeholder-list" :current="switchIndex" :autoplay="autoplay" :interval="interval" circular vertical @change="onSwitchChange">
                    <swiper-item class="placeholder-item" v-for="(item, i) in hotWords" :key="i">
                        {{ item }}
                    </swiper-item>
                </swiper>
            </view>
            <view v-if="!cmpHiddenLine" class="secrch-line" :class="{ disabled: props.disabled }" />
            <view v-if="!hiddenBtn" class="search-button" :class="{ disabled: props.disabled }" :style="[cmpbtnBackground]" @click="onSearch">
                {{ btnText }}
            </view>
        </view>
        <view class="nav-box" v-if="type === 'nav'" />
    </view>
</template>

<style lang="scss" scoped>
.ste-search-root {
    width: 100%;
    height: var(--search-root-height);
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: var(--search-root-radius);
    border: 1rpx solid var(--search-border-color);
    position: relative;

    &,
    view,
    input {
        box-sizing: border-box;
    }

    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;

        .icon-box {
            width: 28rpx;
            height: 28rpx;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            .image {
                width: 100%;
                height: 100%;
            }

            & + .input-box {
                margin-left: 16rpx;
            }
        }

        .input-box {
            position: relative;
            flex: 1;
            height: 100%;

            .ste-search-input {
                height: 100%;

                font-size: 28rpx;
                color: var(--search-input-color);
                // #ifdef MP-ALIPAY
                background-color: rgba(0, 0, 0, 0);
                // #endif

                .content {
                    padding: 0;
                    height: 100%;
                }
            }

            .search-input-placeholder {
                color: var(--search-placeholder-color);
                font-family:
                    Alibaba PuHuiTi 2,
                    Alibaba PuHuiTi 20;
                font-weight: normal;
            }

            .placeholder-list {
                width: 100%;
                height: 100%;
                pointer-events: none;
                position: absolute;
                top: 0;
                left: 0;

                .placeholder-item {
                    font-size: 28rpx;
                    color: var(--search-placeholder-color);
                    font-family:
                        Alibaba PuHuiTi 2,
                        Alibaba PuHuiTi 20;
                    font-weight: normal;
                    display: flex;
                    align-items: center;
                }
            }

            .clear-icon {
                width: 48rpx;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                position: absolute;
                right: 8rpx;
                top: 50%;
                z-index: 2;
                transform: translateY(-50%);
            }
        }

        .secrch-line {
            margin-left: 16rpx;
            width: 2rpx;
            flex-shrink: 0;
            height: 24rpx;
            background-color: var(--search-btn-text-color);

            &.disabled {
                background: #bbbbbb;
            }
        }

        .search-button {
            padding: 0 16rpx;
            height: 40rpx;
            font-size: 28rpx;
            line-height: 40rpx;
            flex-shrink: 0;
            text-align: center;
            font-family:
                Alibaba PuHuiTi 2,
                Alibaba PuHuiTi 20;
            font-weight: normal;
            color: var(--search-btn-text-color);
            border-radius: 20rpx;
            background-repeat: no-repeat;
            background-size: 100% 100%;

            &.disabled {
                color: #bbbbbb;
            }
        }
    }

    .nav-box {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
    }
}
</style>
