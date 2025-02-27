<script setup lang="ts">
import utils from '../../utils/utils.js';
import propsData from './props';
import { ref, computed, type CSSProperties } from 'vue';

defineOptions({
    name: 'ste-loading',
});

const props = defineProps(propsData);

const cmpStyle = computed(() => {
    let style: CSSProperties = {};
    style['flexDirection'] = props.vertical ? 'column' : 'row';
    return style;
});

const cmpLoadinStyle = computed(() => {
    let style: CSSProperties = {};
    style['width'] = utils.formatPx(props.size);
    style['height'] = utils.formatPx(props.size);
    style['color'] = props.color;
    if (props.type == 1) {
        style['animationTimingFunction'] = 'steps(8)';
    }
    if (props.type == 2) {
        style['border'] = `${utils.formatPx(4)} solid`;
        style['borderColor'] = (props.color + ' ').repeat(3) + 'transparent';
    }
    return style;
});

let count = ref(9);
const cmpCount = computed(() => {
    // 兼容浏览器和微信 对数字循环的处理不同
    return Array.from({ length: count.value }, (_, index) => index);
});

const cmpText = computed(() => {
    let style: CSSProperties = {};
    style['color'] = props.textColor ? props.textColor : props.color;
    style['fontSize'] = utils.formatPx(props.textSize);
    style['margin'] = props.vertical ? '16rpx 0 0 0 ' : '0 0 0 16rpx';
    return style;
});
</script>

<template>
    <view class="ste-loading-root" :style="[cmpStyle]">
        <view :class="'loading ' + 'loading-type-' + type" :style="[cmpLoadinStyle]">
            <block v-if="type == 1">
                <i v-for="(item, index) in cmpCount" :key="index" class="i" :style="{ transform: `rotate(${item * 40 + 80}deg)`, opacity: item == 0 ? 1 : (item + 1) / 10 }"></i>
            </block>
            <block v-if="type == 2">
                <view></view>
            </block>
        </view>
        <view v-if="$slots.default" class="text" :style="[cmpText]">
            <slot></slot>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-loading-root {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .loading {
        position: relative;
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;

        .i {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .i:before {
            display: block;
            width: 10%;
            height: 25%;
            margin: 0 auto;
            background-color: currentColor;
            border-radius: 40%;
            content: ' ';
        }
    }

    .loading-type-1 {
        animation: ste-rotate 0.8s linear infinite;
    }

    .loading-type-2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: ste-circular 1s linear infinite;
    }

    @keyframes ste-rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes ste-circular {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(1turn);
        }
    }
}
</style>
