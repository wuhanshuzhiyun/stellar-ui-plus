<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue';
import propsData from './props';
import useData from './useData';

const thas = ref<globalThis.ComponentPublicInstance | null>();

const emits = defineEmits<{
    (e: 'change', current: number): void;
    (e: 'update:show', show: boolean): void;
    (e: 'update:current', current: number): void;
    (e: 'close'): void;
}>();

const props = defineProps(propsData);

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
});

const { dataShow, cmpRootStyle, clickRoot, dataStyle, messageStyle, arrowsStyle, cmpStep, close, cmpShowFooter, dataCurrent, onUp, cmpShowPrevStep, onNext } = useData({
    thas,
    emits,
    props,
});
</script>
<template>
    <view class="ste-tour-root" @touchmove.stop="true" :class="{ show: dataShow }" :style="[cmpRootStyle]" @click="clickRoot">
        <view class="ste-tour-view" :style="[dataStyle]"></view>
        <view class="ste-tour-message" :style="[messageStyle]">
            <view class="message-arrows" :style="[arrowsStyle]" />
            <view class="message-content">
                <view class="message-head" v-if="showTitleBar" @click.stop="true">
                    <view class="head-title">{{ cmpStep.title }}</view>
                    <view class="head-close" @click="close">
                        <ste-icon code="&#xe67b;" size="30" />
                    </view>
                </view>
                <view class="message-content-text">
                    <slot>
                        <view class="message-text" @click.stop="true">
                            {{ cmpStep.message }}
                        </view>
                    </slot>
                </view>
                <view class="message-step-footer" @click.stop="true" v-if="cmpShowFooter">
                    <view class="step-num">{{ dataCurrent + 1 }}/{{ steps.length }}</view>
                    <view class="step-btns">
                        <ste-button
                            :round="false"
                            background="#fff"
                            borderColor="#0091ff"
                            color="#0091ff"
                            style="margin-right: 12rpx"
                            :mode="100"
                            @click="onUp"
                            v-if="cmpShowPrevStep"
                            :rootStyle="{ padding: '0 10px' }"
                        >
                            {{ prevStepTxt }}
                        </ste-button>
                        <ste-button :round="false" :rootStyle="{ padding: '0 10px', marginLeft: '10px' }" :mode="100" @click="onNext">
                            {{ dataCurrent < steps.length - 1 ? nextStepTxt : completeTxt }}
                        </ste-button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.ste-tour-root {
    position: fixed;
    z-index: 1001;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;
    display: none;
    &.show {
        display: block;
    }
    .ste-tour-view {
        border-radius: var(--ste-tour-radius);
        position: fixed;
        z-index: 1001;
        box-shadow: var(--ste-tour-mask);
        display: none;
    }
    .ste-tour-message {
        background-color: var(--ste-tour-message-bg);
        position: fixed;
        z-index: 1002;
        border-radius: var(--ste-tour-radius);
        display: none;
        box-shadow: var(--ste-tour-message-shadow);
        .message-arrows {
            position: absolute;
            width: 0;
            height: 0;
            border-width: 20rpx;
            border-style: solid;
            border-color: transparent transparent var(--ste-tour-message-bg);
        }
        .message-content {
            color: var(--ste-tour-message-color);
            font-size: 24rpx;

            .message-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-width: 360rpx;
                padding: 20rpx 24rpx;
                .head-title {
                    height: 60rpx;
                    line-height: 60rpx;
                    font-size: 30rpx;
                    margin-right: 30rpx;
                }

                .head-close {
                    width: 60rpx;
                    height: 60rpx;
                    padding: 15rpx;
                    line-height: 30rpx;
                }
            }
            .message-content-text {
                .message-text {
                    padding: 20rpx 24rpx;
                }
            }

            .message-step-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20rpx 24rpx;
                min-width: 360rpx;
                .step-num {
                    font-size: 24rpx;
                    color: var(--ste-tour-message-color);
                    margin-right: 30rpx;
                }
            }
        }
    }
}
</style>
