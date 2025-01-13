<script lang="ts" setup>
import { watch, computed, useSlots, defineOptions } from 'vue';
import useData from './useData';
import type { BaseEvent } from '../../types/event';
import utils from '../../utils/utils';
import { ICON_OBJ, ANIMATION_PROP, DURATION } from './constants';
import type { MessageBoxOptions } from '../../types';
import { STE_MESSAGE_BOX_KEY } from './use-message-box';
import { useMsgBoxStore } from '../../store';
import useColor from '../../config/color';
let color = useColor();
defineOptions({
    name: 'ste-message-box',
});

const slots = useSlots();

const props = defineProps<{
    selector: string;
}>();
const customKey = props.selector || STE_MESSAGE_BOX_KEY;
const { getMessageBox, resetMessageBox } = useMsgBoxStore();
const messageBoxOption = getMessageBox(customKey);

const {
    animationData,
    maskAnimationData,
    inputValue,
    placeholderText,
    show,
    showCancel,
    title,
    content,
    cancelText,
    confirmText,
    icon,
    editable,
    cancelColor,
    confirmColor,
    confirm,
    cancel,
    complete,
    showInputPlaceholder,
} = useData();

// 用input自带占位符时，由于动画原因导致最终显示会有一个下降的效果
function handleInputFocus() {
    showInputPlaceholder.value = false;
}

function handleInputBlur() {
    if (!inputValue.value) {
        showInputPlaceholder.value = true;
    }
}

const cmpRootStyle = computed(() => {
    return {
        opacity: 0,
        '--cancel-color': cancelColor.value,
        '--confirm-color': confirmColor.value ? confirmColor.value : color.getColor().steThemeColor,
    };
});

const cmpRootClass = computed(() => {
    let classArr = [];
    if (icon.value) {
        classArr.push('icon-type');
    }
    if (!content.value && !slots.default) {
        classArr.push('no-content');
    }

    if (slots && slots.default) {
        classArr.push('slot-type');
    }
    return classArr.join(' ');
});

const cmpIconCode = computed(() => {
    if (icon.value) {
        return ICON_OBJ[icon.value] ? ICON_OBJ[icon.value] : ICON_OBJ.info;
    } else {
        return ICON_OBJ.info;
    }
});

async function showBox() {
    show.value = true;
    await utils.sleep(50);
    let animation = uni.createAnimation(ANIMATION_PROP);
    let maskAnimation = uni.createAnimation(ANIMATION_PROP);
    maskAnimation.opacity(1).step();
    animation.scale(1, 1).step();
    animationData.value = animation.export();
    maskAnimationData.value = maskAnimation.export();
}
function closeBox() {
    // 清除上次的值
    inputValue.value = '';
    cancelColor.value = '';
    confirmColor.value = '';

    showInputPlaceholder.value = true;

    let animation = uni.createAnimation(ANIMATION_PROP);
    let maskAnimation = uni.createAnimation(ANIMATION_PROP);
    maskAnimation.opacity(0).step({ duration: DURATION });
    animation.scale(0, 0).step();
    animationData.value = animation.export();
    maskAnimationData.value = maskAnimation.export();
    setTimeout(() => {
        show.value = false;
        resetMessageBox(customKey);
    }, DURATION);
}
function handleInput(e: Event) {
    const baseEvent = e as unknown as BaseEvent;
    inputValue.value = baseEvent.detail.value;
}
function handleConfirm() {
    confirm.value(inputValue.value);
    handleComplete();
}
function handleCancel() {
    cancel.value(inputValue.value);
    handleComplete();
}
function handleComplete() {
    complete.value(inputValue.value);
    closeBox();
}

function loadMessageBoxParams(options: MessageBoxOptions) {
    title.value = options.title || '';
    content.value = options.content || '';
    icon.value = options.icon || '';
    cancelText.value = options.cancelText || cancelText.value;
    confirmText.value = options.confirmText || confirmText.value;
    confirmColor.value = options.confirmColor || confirmColor.value;
    showCancel.value = options.showCancel === false ? false : true;
    cancelColor.value = options.cancelColor || cancelColor.value;
    editable.value = !!options.editable;
    placeholderText.value = options.placeholderText || placeholderText.value;

    confirm.value = options.confirm || confirm.value;
    cancel.value = options.cancel || cancel.value;
    complete.value = options.complete || complete.value;
}

watch(
    () => messageBoxOption,
    val => {
        if (val.show) {
            loadMessageBoxParams(val);
            showBox();
        } else {
            closeBox();
        }
    },
    { deep: true }
);

function showMsgBox(options: MessageBoxOptions) {
    loadMessageBoxParams(options);
    showBox();
}

function hideMsgBox() {
    closeBox();
}
defineExpose({
    showMsgBox,
    hideMsgBox,
});
</script>

<template>
    <view class="ste-message-box-root" :style="[cmpRootStyle]" :class="[cmpRootClass]" :animation="maskAnimationData" v-if="show">
        <view class="ste-message-box-content" :animation="animationData">
            <view class="content-box">
                <view class="icon-box" v-if="icon">
                    <ste-icon :code="cmpIconCode" color="#999999" size="45"></ste-icon>
                </view>
                <view class="ste-message-title">{{ title }}</view>
                <view class="msg" v-if="!icon">
                    <slot>
                        <view class="text" v-if="!editable">{{ content }}</view>
                        <view v-else class="input-box">
                            <text class="placeholder-text" v-show="showInputPlaceholder">
                                {{ placeholderText }}
                            </text>
                            <input :value="inputValue" class="ste-message-box-input" @input="handleInput" @focus="handleInputFocus" @blur="handleInputBlur" />
                        </view>
                    </slot>
                </view>
            </view>
            <view class="footer">
                <view class="footer-btn cancel text" v-if="showCancel" @click="handleCancel">
                    {{ cancelText }}
                </view>
                <view class="footer-btn confirm text" @click="handleConfirm">
                    {{ confirmText }}
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-message-box-root {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99999;

    &.slot-type {
        .ste-message-title {
            padding-bottom: 24rpx !important;
        }

        .msg {
            padding: 0 !important;
        }
    }

    &.icon-type {
        .ste-message-title {
            padding: 24rpx 0 34rpx 0 !important;
        }
    }

    &.no-content {
        .ste-message-title {
            padding-bottom: 48rpx !important;
        }

        .msg {
            padding: 0 !important;
        }
    }

    .ste-message-box-content {
        background: #ffffff;
        border-radius: 16rpx;
        // border: 2rpx solid #eeeeee;
        min-width: 570rpx;
        max-width: 610rpx;
        display: inline-flex;
        flex-direction: column;
        transform: scale(0);

        .content-box {
            .icon-box {
                padding-top: 4rpx;
                height: 80rpx;
                width: 80rpx;
                border-radius: 50%;
                background: #f1f1f1;
                margin: 32rpx auto 0 auto;

                display: flex;
                align-items: center;
                justify-content: center;
            }

            .ste-message-title {
                width: 100%;
                padding-top: 48rpx;
                padding-bottom: 24rpx;
                font-weight: bold;
                font-size: var(--font-size-32, 32rpx);
                text-align: center;
            }

            .msg {
                padding: 0 32rpx 48rpx 32rpx;
                text-align: center;

                .text {
                    width: 100%;
                    font-size: var(--font-size-28, 28rpx);
                    text-align: center;
                }

                .input-box {
                    position: relative;
                }

                .placeholder-text {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    color: #999999;
                }

                .ste-message-box-input {
                    height: 80rpx;
                    width: 548rpx;
                    background: #f5f5f5;

                    border-radius: 8px 8px 8px 8px;
                    text-align: center;
                    padding: 0 24rpx;
                    font-size: var(--font-size-28, 28rpx);
                }
            }
        }

        .footer {
            display: flex;
            height: 96rpx;

            .footer-btn {
                height: 100%;
                border-top: 2rpx solid #eeeeee;
                border-right: 2rpx solid #eeeeee;
                flex: 1;

                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: var(--font-size-32, 32rpx);

                /* #ifdef H5 || WEB */
                cursor: pointer;
                /* #endif */

                &.cancel {
                    color: var(--cancel-color);
                }

                &.confirm {
                    color: var(--confirm-color);
                }

                & + .footer-btn {
                    border-right: none;
                }
            }
        }
    }
}
</style>
