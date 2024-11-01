<script setup lang="ts">
import { computed, defineOptions, type CSSProperties } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';

const componentName = `ste-badge`;

defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);

const emits = defineEmits<{
    (e: 'click', event?: Event): void;
}>();

const cmpContentStyle = computed(() => {
    let style = {} as CSSProperties;
    if (props.background) {
        style = { backgroundColor: 'transparent', ...utils.bg2style(props.background) };
    }

    const offsetX = String(props.offsetX);
    const offsetY = String(props.offsetY);
    if ((offsetX !== 'auto' && offsetX !== '0') || (offsetY !== 'auto' && offsetY !== '0')) {
        style.transform = 'translate(0, 0)';
        style[props.position === 'topLeft' || props.position === 'bottomLeft' ? 'left' : 'right'] = utils.addUnit(props[props.position.includes('Left') ? 'offsetX' : 'offsetY']);
        style[props.position === 'topRight' || props.position === 'topLeft' ? 'top' : 'bottom'] = utils.addUnit(props[props.position.includes('Top') ? 'offsetX' : 'offsetY']);
    }
    if (props.showBorder) {
        style.border = 'solid 1px ' + props.borderColor;
    }
    style['z-index'] = props.zIndex;

    return style;
});

const cmpShowContent = computed(() => {
    return props.showZero ? true : props.content && props.content != '0';
});

const cmpContent = computed(() => {
    if (utils.isNumber(String(props.content)) && Number(props.content) > props.max) {
        return `${props.max}+`;
    } else {
        return String(props.content);
    }
});

const cmpIsSmall = computed(() => {
    return (props.content && String(props.content).length == 1) || Number(props.content) < 10;
});
</script>

<template>
    <view class="ste-badge-root" :style="[rootStyle as any, { display: isInline ? 'inline-block' : 'block' }]">
        <view class="ste-badge-content" :style="[cmpContentStyle]" :class="'ste-badge-' + position" v-if="showDot || cmpShowContent || $slots.content">
            <view v-if="showDot" class="dot-box" />
            <view v-else class="content-box" :class="{ 'no-padding': $slots.content || cmpIsSmall }">
                <slot name="content">
                    <view class="ste-badge-content-text">{{ cmpContent }}</view>
                </slot>
            </view>
        </view>
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
$default-size: 28rpx;

.ste-badge-root {
    position: relative;

    .ste-badge-content {
        display: inline-block;
        position: absolute;
        font-size: 24rpx;
        color: #ffffff;
        background-color: #ee0a24;
        border-radius: 99999rpx;
        width: fit-content;
        background-size: cover;

        .content-box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: $default-size;
            max-height: $default-size;
            min-height: $default-size;
            width: auto;
            min-width: $default-size;
            overflow: hidden;

            padding: 0 8rpx;
            line-height: 0;

            &.no-padding {
                padding: 0;
            }
        }

        .dot-box {
            height: 12rpx;
            width: 12rpx;
        }

        &-text {
            font-size: 22rpx;
            color: #ffffff;
            line-height: $default-size;
            vertical-align: middle;
            position: relative;
            // #ifdef  H5
            top: -0.5rpx;
            // #endif
            // #ifdef  MP-WEIXIN
            // top: -0.5rpx;
            // #endif
            // #ifdef  MP-ALIPAY
            // top: 0.5rpx;
            // #endif
        }
    }

    .ste-badge- {
        &topRight {
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
        }

        &topLeft {
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
        }

        &bottomLeft {
            bottom: 0;
            left: 0;
            transform: translate(-50%, 50%);
        }

        &bottomRight {
            bottom: 0;
            right: 0;
            transform: translate(50%, 50%);
        }
    }
}
</style>
