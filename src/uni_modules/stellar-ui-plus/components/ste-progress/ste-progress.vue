<script lang="ts" setup>
import { computed, ref, watch, useSlots, onMounted, type CSSProperties } from 'vue';
import propsData from './props';
import utils from '../../utils/utils';
const slots = useSlots();
const props = defineProps(propsData);

const MIN = 0;
const MAX = 100;

const realPercentage = ref(0);
const haveSlot = ref(false);

onMounted(() => {
    haveSlot.value = !!slots.default;
});

watch(
    () => props.percentage,
    val => {
        if (val >= MAX) {
            realPercentage.value = MAX;
        } else if (val <= MIN) {
            realPercentage.value = MIN;
        } else {
            realPercentage.value = val;
        }
    },
    { immediate: true }
);

const cmpRootCssVar = computed(() => {
    let style: CSSProperties = {
        '--progress-width': utils.addUnit(props.width),
        '--progress-height': utils.addUnit(props.strokeWidth),
        '--active-width': realPercentage.value + '%',
        '--active-text-align': props.textAlign == 'right' ? 'flex-end' : props.textAlign,
        '--active-text-color': props.textColor,
        '--active-text-font-size': utils.addUnit(props.textSize),
        '--active-transition-duration': `${props.duration}s`,
    };

    // #ifdef MP-WEIXIN || MP-ALIPAY
    style['--progress-padding'] = slots.default ? '0' : '0 16rpx';
    // #endif

    // #ifdef H5
    style['--progress-padding'] = slots.default ? '0' : '0 8px';
    // #endif

    return style;
});

const cmpInactiveStyle = computed(() => {
    let style: CSSProperties = {};
    if (props.disabled) {
        style.backgroundColor = '#eeeeee';
    } else {
        const bg = utils.bg2style(props.inactiveBg);
        style = { ...style, ...bg };
    }
    return style;
});

const cmpActiveStyle = computed(() => {
    let style: CSSProperties = {};
    if (props.disabled) {
        style.backgroundColor = '#cccccc';
    } else {
        const bg = utils.bg2style(props.activeBg);
        style = { ...style, ...bg };
    }
    return style;
});

const cmpActiveText = computed(() => {
    let str = props.pivotText ? props.pivotText : realPercentage.value <= MIN ? '' : `${realPercentage.value}%`;
    if (props.displayTextThreshold > 0 && realPercentage.value < props.displayTextThreshold) {
        return '';
    }
    return str;
});
</script>

<template>
    <view class="ste-progress-root" :style="[cmpRootCssVar]">
        <view class="inactive-box" :style="[cmpInactiveStyle]"></view>
        <view class="active-box line" :style="[cmpActiveStyle]" v-if="realPercentage > 0">
            <slot v-if="haveSlot"></slot>
            <text class="text" v-else>{{ cmpActiveText }}</text>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-progress-root {
    position: relative;
    width: var(--progress-width);
    height: var(--progress-height);

    > view {
        width: var(--progress-width);
        height: var(--progress-height);
        border-radius: 24rpx;

        background-repeat: repeat;
        background-size: contain;
    }

    .active-box {
        width: var(--active-width);
        position: absolute;
        left: 0;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: var(--active-text-align);
        padding: var(--progress-padding);

        transition: width var(--active-transition-duration) ease;

        .text {
            color: var(--active-text-color);
            font-size: var(--active-text-font-size);
            vertical-align: middle;
            line-height: 0;
        }
    }
}
</style>
