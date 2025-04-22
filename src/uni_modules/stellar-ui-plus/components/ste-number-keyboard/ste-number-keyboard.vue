<script setup lang="ts">
import useData from './useData';
import porpsData, { type NumberKeyboardProps } from './props';

import KeyboardVue from './KeyboardVue.vue';

const props: NumberKeyboardProps = defineProps(porpsData);
const emits = defineEmits<{
    (e: 'change', value: string): void;
    (e: 'input', value: string): void;
    (e: 'update:modelValue', value: string): void;
    (e: 'clear'): void;
    (e: 'backspace'): void;
    (e: 'confirm', value: string): void;
    (e: 'click', key: string): void;
    (e: 'beforeinput', key: string, suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'close'): void;
    (e: 'update:show', show: boolean): void;
    (e: 'open'): void;
}>();

const { cmpNumbers, cmpRootStyle, dataShow, onClose, onChange, onOpen } = useData({ props, emits });
</script>

<template>
    <view class="ste-number-keyboard-root" :style="[cmpRootStyle]" data-test="number-keyboard">
        <block v-if="mode === 'popup'">
            <ste-popup v-model:show="dataShow" @close="onClose" position="bottom" :show-close="false" @open="onOpen">
                <view style="padding: 30rpx 30rpx 60rpx 30rpx; background-color: #f5f5f5">
                    <view class="keyboard-popup-head">
                        <view></view>
                        <view class="keyboard-title">
                            <slot>数字键盘</slot>
                        </view>
                        <view class="keyboard-close" @click="onClose">
                            <ste-icon code="&#xe676;" size="36" />
                        </view>
                    </view>
                    <KeyboardVue
                        :list="cmpNumbers"
                        :confirmText="confirmText"
                        :disabled="confirmDisabled"
                        :showClear="showClear"
                        :textColor="textColor"
                        :textSize="textSize"
                        :rightKeys="rightKeys"
                        @change="onChange"
                    />
                </view>
            </ste-popup>
        </block>
        <block v-else>
            <KeyboardVue
                :list="cmpNumbers"
                :confirmText="confirmText"
                :disabled="confirmDisabled"
                :showClear="showClear"
                :textColor="textColor"
                :textSize="textSize"
                :rightKeys="rightKeys"
                @change="onChange"
            />
        </block>
    </view>
</template>
<style lang="scss" scoped>
.ste-number-keyboard-root {
    .keyboard-popup-head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 30rpx;
        color: #888;
        .keyboard-close {
            &:active {
                background: rgba(200, 200, 200, 0.5);
            }
        }
    }
}
</style>
