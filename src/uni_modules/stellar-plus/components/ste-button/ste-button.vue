<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { buttonEmits, buttonProps } from './props';
import { CLICK_EVENT } from '../../common/_constants/event';
import utils from '../../utils/utils';

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);

const cmpBtnStyle = computed(() => {
    let style = {} as any;
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
        style.border = `solid ${utils.formatPx(2)}`;
        style.borderColor = props.borderColor;
    }

    // 类型 mode
    switch (props.mode) {
        case 100:
            style.padding = `0 ${utils.formatPx(30)}`;
            style.height = utils.formatPx(48);
            style.fontSize = '24rpx';
            break;
        case 300:
            style.padding = `0 ${utils.formatPx(72)}`;
            style.height = utils.formatPx(80);
            style.fontSize = '32rpx';
            break;
        case 400:
            style.padding = `0 ${utils.formatPx(72)}`;
            style.height = utils.formatPx(96);
            style.fontSize = '36rpx';
            break;
        default:
            style.padding = `0 ${utils.formatPx(40)}`;
            style.height = utils.formatPx(68);
            style.fontSize = '28rpx';
            break;
    }

    // 背景色 & 字体色
    style = { ...style, ...utils.bg2style(props.background) };
    style.color = props.color;

    // 禁用 disabled
    if (props.disabled) {
        if (props.background == '#0091FF') {
            style.backgroundColor = '#666666';
        }
        style.color = '#ffffff';
        style.cursor = 'not-allowed';
    }

    // 加载 loading
    if (props.loading) {
        style.cursor = 'not-allowed';
    }
    return utils.deepMerge(style, props.rootStyle);
});

function handleClick(e: Event) {
    if (!props.disabled && !props.loading) {
        emit(CLICK_EVENT, e);
    }
}
</script>

<script lang="ts">
const componentName = `ste-button`;
export default defineComponent({
    name: componentName,
});
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
        @getuserinfo="emit('getuserinfo', $event)"
        @contact="emit('contact', $event)"
        @getphonenumber="emit('getphonenumber', $event)"
        @getrealtimephonenumber="emit('getrealtimephonenumber', $event)"
        @agreeprivacyauthorization="emit('agreeprivacyauthorization', $event)"
        @error="emit('error', $event)"
        @opensetting="emit('opensetting', $event)"
        @launchapp="emit('launchapp', $event)"
        @chooseavatar="emit('chooseavatar', $event)"
        @getAuthorize="emit('getAuthorize', $event)"
        @followLifestyle="emit('followLifestyle', $event)"
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
        @getuserinfo="emit('getuserinfo', $event)"
        @contact="emit('contact', $event)"
        @getphonenumber="emit('getphonenumber', $event)"
        @getrealtimephonenumber="emit('getrealtimephonenumber', $event)"
        @agreeprivacyauthorization="emit('agreeprivacyauthorization', $event)"
        @error="emit('error', $event)"
        @opensetting="emit('opensetting', $event)"
        @launchapp="emit('launchapp', $event)"
        @chooseavatar="emit('chooseavatar', $event)"
        @getAuthorize="emit('getAuthorize', $event)"
        @followLifestyle="emit('followLifestyle', $event)"
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

    &-100 {
        padding: 0 30rpx;
        height: 48rpx;
        font-size: 24rpx;
    }

    &-200 {
        padding: 0 40rpx;
        height: 68rpx;
        font-size: 28rpx;
    }

    &-300 {
        padding: 0 72rpx;
        height: 80rpx;
        font-size: 32rpx;
    }

    &-400 {
        padding: 0 72rpx;
        height: 96rpx;
        font-size: 36rpx;
    }
}
</style>
