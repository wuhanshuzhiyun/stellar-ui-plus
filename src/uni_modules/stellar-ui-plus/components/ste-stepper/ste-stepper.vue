<script lang="ts" setup>
import type { BaseEvent } from '@uni-helper/uni-app-types';
import { computed, type CSSProperties, nextTick, defineModel } from 'vue';
import propsData, { stepperEmits } from './props';
import utils from '../../utils/utils';

const componentName = `ste-stepper`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);
const emits = defineEmits(stepperEmits);

// const model = defineModel<number>({ default: 0 });

const cmpBtnSize = computed(() => {
    return props.btnSize ? Number(props.btnSize) : props.theme == 'card' ? 48 : 60;
});

const cmpRootStyle = computed(() => {
    let style = {} as CSSProperties;
    if (props.theme == 'line') {
        style['border'] = `${utils.formatPx('0.6')} solid #EEEEEE`;
        style['height'] = utils.formatPx(cmpBtnSize.value);
        style['borderRadius'] = utils.formatPx(24);
        style['overflow'] = 'hidden';
    }
    return style;
});

const cmpDisablePlus = computed(() => {
    if (props.disabled || props.disablePlus) {
        return true;
    } else {
        return props.modelValue >= props.max;
    }
});

const cmpDisableMinus = computed(() => {
    if (props.disabled || props.disableMinus) {
        return true;
    } else {
        return props.modelValue <= props.min;
    }
});

const cmpButtonStyle = computed(() => {
    let style = {} as CSSProperties;
    style['width'] = utils.formatPx(cmpBtnSize.value);
    style['height'] = utils.formatPx(props.theme == 'card' ? cmpBtnSize.value : cmpBtnSize.value * 0.8);
    style['padding'] = '0';
    // #ifdef H5
    style['cursor'] = props.disabled || cmpDisablePlus.value ? 'not-allowed' : 'pointer';
    // #endif
    style['borderRadius'] = utils.formatPx(16);
    style['border'] = 'none';
    if (props.theme == 'line') {
        style['borderRadius'] = '0';
    }
    return style;
});

const cmpLeftButtonStyle = computed(() => {
    let style = {} as CSSProperties;
    if (props.theme == 'card') {
        style['border'] = `${utils.formatPx('2')} solid ${(cmpDisableMinus.value ? '#cccccc' : props.mainColor) + '80'}`;
    }
    if (props.theme == 'line') {
        style['border'] = `none`;
    }
    style['background'] = '#ffffff';
    style['backgroundColor'] = '#ffffff';
    // #ifdef H5
    style['cursor'] = cmpDisableMinus.value ? 'not-allowed' : 'pointer';
    // #endif
    return utils.deepMerge(utils.deepClone(cmpButtonStyle.value), style);
});

const cmpRightButtonStyle = computed(() => {
    let style = {} as CSSProperties;
    style['background'] = cmpDisablePlus.value ? '#cccccc' : props.mainColor;
    style['backgroundColor'] = cmpDisablePlus.value ? '#cccccc' : props.mainColor;
    if (props.theme == 'line') {
        style['background'] = '#ffffff';
        style['backgroundColor'] = '#ffffff';
    }
    return utils.deepMerge(utils.deepClone(cmpButtonStyle.value), style);
});

const cmpInputStyle = computed(() => {
    let style = {} as CSSProperties;
    style['width'] = utils.formatPx(props.inputWidth);
    style['height'] = utils.formatPx(props.theme == 'card' ? cmpBtnSize.value : cmpBtnSize.value * 0.8);
    style['margin'] = `0 ${utils.formatPx(4)}`;
    style['color'] = props.disabled || props.disableInput ? '#cccccc' : '#000000';
    // #ifdef H5
    style['cursor'] = props.disabled || cmpDisablePlus.value ? 'not-allowed' : 'pointer';
    // #endif
    if (props.theme == 'line') {
        style['borderLeft'] = `${utils.formatPx('2')} solid #EEEEEE`;
        style['borderRight'] = `${utils.formatPx('2')} solid #EEEEEE`;
        style['margin'] = `0`;
        style['padding'] = `0 ${utils.formatPx(8)}`;
        style['width'] = utils.formatPx(Number(props.inputWidth) + 16);
    }
    return style;
});

function handleValue(value: number) {
    // 处理最大和最小值
    if (value <= props.min) {
        value = props.min;
    }
    if (value >= props.max) {
        value = props.max;
    }
    return Number(Number(value).toFixed(props.precision));
}
function blur(event: BaseEvent) {
    let { value } = event.detail ? event.detail : 0;
    // 解决实际值没有变化 显示值不刷新的问题

    emits('update:modelValue', value);
    value = handleValue(value);
    nextTick(() => {
        emits('update:modelValue', value);
        event.detail.value = value;
        emits('blur', event);
    });
}
function focus(event: BaseEvent) {
    emits('focus', event);
}
async function plus() {
    if (!props.disabled && !cmpDisablePlus.value) {
        let next = true;
        const stop = new Promise((resolve, reject) => {
            emits(
                'plus',
                props.modelValue,
                () => (next = false),
                () => resolve(props.modelValue),
                () => reject()
            );
        });
        if (!next) {
            try {
                await stop;
            } catch (e) {
                return;
            }
        }
        let value = handleValue(props.modelValue + props.step);
        emits('update:modelValue', value);
        emits('change', value);
    }
}
async function minus() {
    if (!props.disabled && !cmpDisableMinus.value) {
        let next = true;
        const stop = new Promise((resolve, reject) => {
            emits(
                'minus',
                props.modelValue,
                () => (next = false),
                () => resolve(props.modelValue),
                () => reject()
            );
        });
        if (!next) {
            try {
                await stop;
            } catch (e) {
                return;
            }
        }
        let value = handleValue(props.modelValue - props.step);
        emits('update:modelValue', value);
        emits('change', value);
    }
}
</script>

<template>
    <view class="ste-stepper-root" :style="[cmpRootStyle]">
        <ste-button v-if="theme != 'add'" :rootStyle="cmpLeftButtonStyle" @click="minus" :disabled="cmpDisableMinus">
            <view class="button-icon">
                <ste-icon
                    code="&#xe67c;"
                    :size="(theme == 'card' ? cmpBtnSize : cmpBtnSize * 0.8) * 0.65"
                    :color="cmpDisableMinus ? '#cccccc' : theme == 'line' ? '#000000' : mainColor"
                    :inlineBlock="false"
                ></ste-icon>
            </view>
        </ste-button>
        <view v-if="theme != 'add'" class="input" :style="[cmpInputStyle]">
            <input :type="precision ? 'digit' : 'number'" :value="modelValue" @blur="blur" @focus="focus" :disabled="disabled || disableInput" />
        </view>
        <ste-button v-if="theme != 'add'" :rootStyle="cmpRightButtonStyle" @click="plus" :disabled="cmpDisablePlus">
            <view class="button-icon">
                <ste-icon
                    code="&#xe67e;"
                    :size="(theme == 'card' ? cmpBtnSize : cmpBtnSize * 0.8) * 0.65"
                    :color="theme != 'line' ? '#ffffff' : theme == 'line' && cmpDisablePlus ? '#cccccc' : '#000000'"
                    :inlineBlock="false"
                ></ste-icon>
            </view>
        </ste-button>
        <ste-badge v-else :content="modelValue" :background="background" :showDot="showDot" :position="position" :offsetX="offsetX" :offsetY="offsetY" :showZero="showZero" :max="badgeMax">
            <ste-button :rootStyle="cmpRightButtonStyle" @click="plus" :disabled="cmpDisablePlus">
                <view class="button-icon">
                    <ste-icon code="&#xe67e;" :size="cmpBtnSize * 0.8 * 0.65" color="#ffffff" :inlineBlock="false"></ste-icon>
                </view>
            </ste-button>
        </ste-badge>
    </view>
</template>
<style lang="scss" scoped>
.ste-stepper-root {
    display: flex;

    .input {
        font-weight: bold;
        color: #000000;
        text-align: center;
        input {
            height: 100%;
            font-size: var(--font-size-28, 28rpx);
        }
    }

    .button-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
