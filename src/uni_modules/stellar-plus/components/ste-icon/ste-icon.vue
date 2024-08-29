<script setup lang="ts">
import { computed } from 'vue';
import propsData from './props';
import utils from '../../utils/utils';

const componentName = `ste-icon`;

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

let defaultFontFamily = 'ste-iconfont-1709689042473';

const cmpCode = computed(() => {
    // unicode编码转字符
    if (!props.code) return;
    if (/[a-zA-Z]/.test(props.code)) {
        return String.fromCharCode(props.code.replace('&#', '0').replace(';', '') as any);
    } else {
        return props.code;
    }
});

const cmpCssVar = computed(() => {
    return {
        '--border': props.showBorder ? '1px' : '0px',
        '--color': props.color,
        '--size': utils.formatPx(props.size),
        '--weight': props.bold ? 'bold' : 'normal',
        '--margin-left': utils.formatPx(props.marginLeft),
        '--margin-right': utils.formatPx(props.marginRight),
        '--margin-top': utils.formatPx(props.marginTop),
        '--margin-bottom': utils.formatPx(props.marginBottom),
        '--font-family': props.fontFamily ? props.fontFamily : defaultFontFamily,
        '--display': props.inlineBlock ? 'inline-block' : 'inline-flex',
    };
});

function handleClick(event: any) {
    emits('click', event);
}
</script>

<template>
    <view class="ste-icon-root" :style="[cmpCssVar]" @click="handleClick">{{ cmpCode }}</view>
</template>

<style lang="scss" scoped>
@import './iconfont.css';

.ste-icon-root {
    display: var(--display);
    justify-content: center;
    align-items: center;
    vertical-align: baseline;
    border-width: var(--border);
    border-color: #bbb;
    border-style: solid;

    margin-left: var(--margin-left) !important;
    margin-right: var(--margin-right) !important;
    transform: translateY(calc(var(--margin-bottom) - var(--margin-top))) !important;

    // height: calc(var(--size)) !important;
    width: calc(var(--size)) !important;
    line-height: calc(var(--size) - var(--border) * 2) !important;
    font-family: var(--font-family) !important;
    font-size: calc(var(--size) - var(--border) * 2) !important;
    color: var(--color);
    font-weight: var(--weight) !important;
}
</style>
