<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();
import propsData from './props';
import utils from '../../utils/utils';
import type {
    ButtonOnAddgroupappEvent,
    ButtonOnAgreeprivacyauthorizationEvent,
    ButtonOnChooseaddressEvent,
    ButtonOnChooseavatarEvent,
    ButtonOnChooseinvoicetitleEvent,
    ButtonOnGetphonenumberEvent,
    ButtonOnLaunchappEvent,
    ButtonOnLoginEvent,
    ButtonOnOpensettingEvent,
    ButtonOnSubscribeEvent,
    ButtonOnErrorEvent,
} from '@uni-helper/uni-app-types';

const componentName = `ste-button`;
defineOptions({
    name: componentName,
    options: {
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
    },
});

const props = defineProps(propsData);

const emits = defineEmits<{
    (e: 'click', event?: any): void;
    (e: 'getphonenumber', event?: ButtonOnGetphonenumberEvent): void;
    (e: 'getuserinfo', event?: any): void;
    (e: 'error', event?: ButtonOnErrorEvent): void;
    (e: 'opensetting', event?: ButtonOnOpensettingEvent): void;
    (e: 'launchapp', event?: ButtonOnLaunchappEvent): void;
    (e: 'contact', event?: any): void;
    (e: 'chooseavatar', event?: ButtonOnChooseavatarEvent): void;
    (e: 'agreeprivacyauthorization', event?: ButtonOnAgreeprivacyauthorizationEvent): void;
    (e: 'addgroupapp', event?: ButtonOnAddgroupappEvent): void;
    (e: 'chooseaddress', event?: ButtonOnChooseaddressEvent): void;
    (e: 'chooseinvoicetitle', event?: ButtonOnChooseinvoicetitleEvent): void;
    (e: 'subscribe', event?: ButtonOnSubscribeEvent): void;
    (e: 'login', event?: ButtonOnLoginEvent): void;
    (e: 'getrealtimephonenumber', event?: any): void;
    (e: 'greeprivacyauthorization', event?: any): void;
    (e: 'getAuthorize', event?: any): void;
    (e: 'followLifestyle', event?: any): void;
}>();

const cmpBtnStyle = computed(() => {
    let style = {} as CSSProperties;
    // 为解决支付宝动态类名时不兼容，尽量使用内联样式

    // 圆角 round
    if (props.round) {
        style.borderRadius = utils.formatPx(48);
    }

    // 宽度 width
    if (props.width == '100%' || props.width == 'auto') {
        style.width = props.width;
    } else {
        style.width = utils.formatPx(props.width);
    }

    // 边框色 borderColor
    if (props.borderColor) {
        style.border = `solid ${utils.formatPx(props.borderWidth)}`;
        style.borderColor = props.borderColor;
    }
    // 类型 mode
    switch (Number(props.mode)) {
        case 100:
            if (props.width == 'auto') {
                style.padding = `0 ${utils.formatPx(30)}`;
            }
            style.height = utils.formatPx(48);
            style.fontSize = 'var(--font-size-24, 24rpx)';
            break;
        case 300:
            if (props.width == 'auto') {
                style.padding = `0 ${utils.formatPx(72)}`;
            }
            style.height = utils.formatPx(80);
            style.fontSize = 'var(--font-size-32, 32rpx)';
            break;
        case 400:
            if (props.width == 'auto') {
                style.padding = `0 ${utils.formatPx(72)}`;
            }
            style.height = utils.formatPx(96);
            style.fontSize = 'var(--font-size-36, 36rpx)';
            break;
        case 450:
            if (props.width == 'auto') {
                style.padding = `0 ${utils.formatPx(72)}`;
            }
            style.height = utils.formatPx(96);
            style.fontSize = 'var(--font-size-40, 40rpx)';
            break;
        default:
            if (props.width == 'auto') {
                style.padding = `0 ${utils.formatPx(40)}`;
            }
            style.height = utils.formatPx(68);
            style.fontSize = 'var(--font-size-28, 28rpx)';
            break;
    }
    // 背景色 & 字体色
    style = { ...style, ...utils.bg2style(props.background ? props.background : getColor().steThemeColor) };
    style.color = props.color;

    // 禁用 disabled | 加载 loading
    // #ifdef H5
    if (props.disabled || props.loading) {
        style.cursor = 'not-allowed';
    }
    // #endif
    if (props.disabled) {
        style.opacity = 0.5;
    }

    // 是否粗体
    style.fontWeight = props.bold ? 'bold' : 'normal';

    return utils.deepMerge(style, props.rootStyle);
});

function handleClick(e: any) {
    if (props.disabled || props.loading) return;
    emits('click', e);
}
</script>

<template>
    <button
        v-if="stopPropagation"
        class="ste-button--root"
        :disabled="disabled"
        :hover-class="!loading ? 'ste-button--root-active' : ''"
        @click.stop="handleClick"
        :style="[cmpBtnStyle]"
        :open-type="openType"
        :scope="scope"
        @getuserinfo="emits('getuserinfo', $event)"
        @contact="emits('contact', $event)"
        @getphonenumber="emits('getphonenumber', $event)"
        @getrealtimephonenumber="emits('getrealtimephonenumber', $event)"
        @agreeprivacyauthorization="emits('agreeprivacyauthorization', $event)"
        @error="emits('error', $event)"
        @opensetting="emits('opensetting', $event)"
        @launchapp="emits('launchapp', $event)"
        @chooseavatar="emits('chooseavatar', $event)"
        @getAuthorize="emits('getAuthorize', $event)"
        @followLifestyle="emits('followLifestyle', $event)"
        data-test="button"
    >
        <view class="btn-box">
            <text v-if="loading">加载中.......</text>
            <slot v-else></slot>
        </view>
    </button>
    <button
        v-else
        class="ste-button--root"
        :disabled="disabled"
        :hover-class="!loading ? 'ste-button--root-active' : ''"
        @click="handleClick"
        :style="[cmpBtnStyle]"
        :open-type="openType"
        :scope="scope"
        @getuserinfo="emits('getuserinfo', $event)"
        @contact="emits('contact', $event)"
        @getphonenumber="emits('getphonenumber', $event)"
        @getrealtimephonenumber="emits('getrealtimephonenumber', $event)"
        @agreeprivacyauthorization="emits('agreeprivacyauthorization', $event)"
        @error="emits('error', $event)"
        @opensetting="emits('opensetting', $event)"
        @launchapp="emits('launchapp', $event)"
        @chooseavatar="emits('chooseavatar', $event)"
        @getAuthorize="emits('getAuthorize', $event)"
        @followLifestyle="emits('followLifestyle', $event)"
        data-test="button"
    >
        <view class="btn-box">
            <text v-if="loading">加载中.......</text>
            <slot v-else></slot>
        </view>
    </button>
</template>

<style lang="scss" scoped>
.ste-button--root {
    position: relative;
    align-items: center;
    justify-content: center;
    display: inline-flex;
    flex-direction: row;
    box-sizing: border-box;
    flex-direction: row;
    background-size: cover;
    border-radius: 10rpx;
    margin: 0;

    // #ifndef MP-ALIPAY
    border-width: 10rpx;
    // #endif

    // #ifdef MP-ALIPAY
    border-width: 2rpx;
    // #endif

    .btn-box {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border: inherit;
        border-radius: inherit;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        opacity: 0;
        content: ' ';
        background-color: #000;
        border-color: #000;
    }

    &:after {
        border: none;
    }

    &-disabled {
        background: #666666;
        color: #ffffff;

        cursor: not-allowed;
    }

    &-loading {
        cursor: not-allowed;
    }

    &-active {
        &:before {
            opacity: 0.15;
        }
    }
}
</style>
