<script lang="ts" setup>
import { computed, ref, watch, useSlots, onMounted, type CSSProperties } from 'vue';
import propsData from './props';
import utils from '../../utils/utils';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();

let hasStage = false;

const slots = useSlots();
const props = defineProps(propsData);

const MIN = 0;
const MAX = 100;

const realPercentage = ref(0);
const haveSlot = ref(false);

onMounted(() => {
    haveSlot.value = !!slots.default;
});

const cmpRootCssVar = computed(() => {
    let style: CSSProperties = {
        '--progress-width': utils.addUnit(props.width),
        '--progress-height': utils.addUnit(props.strokeWidth),
        '--active-width': realPercentage.value + '%',
        '--active-text-align': props.textAlign == 'right' ? 'flex-end' : props.textAlign,
        '--active-text-color': props.textColor,
        '--active-text-font-size': `var(--font-size-${props.textSize},${utils.addUnit(props.textSize)})`,
        '--active-transition-duration': `${props.duration}s`,
    };

    // #ifdef MP-WEIXIN || MP-ALIPAY || APP
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
        const bg = utils.bg2style(props.activeBg ? props.activeBg : getColor().steThemeColor);
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

const getPercentage = (value: number): number => {
    if (!(typeof value === 'number')) {
        return MIN;
    }
    if (value >= MAX) {
        return MAX;
    } else if (value <= MIN) {
        return MIN;
    } else {
        return value;
    }
};

const getStageStyle = (stageValue: number, index: number, value: any): CSSProperties => {
    let style: CSSProperties = { width: `${getPercentage(stageValue)}%`, zIndex: Object.keys(props.stageData).length - index };

    if (value instanceof Object && value.style) {
        const { background, ...restStyle } = value.style;
        style = {
            ...style,
            ...utils.bg2style(background),
            ...restStyle,
        };
    }

    return style;
};

const getStageTextWidth = (index: number, value: any): CSSProperties => {
    let style: CSSProperties = { width: '100%' };
    if (index > 0) {
        const stageValues = Object.keys(props.stageData);
        const widthPercentage = (Number(stageValues[index]) - Number(stageValues[index - 1])) / Number(stageValues[index]);
        style.width = `${widthPercentage * 100}%`;
        style.textAlign = value.style?.textAlign;
    }
    return style;
};

watch(
    () => props.stageData,
    val => {
        hasStage = Object.keys(val || {}).length > 0;
    },
    { immediate: true }
);

watch(
    () => props.percentage,
    val => {
        realPercentage.value = getPercentage(val);
    },
    { immediate: true }
);
</script>

<template>
    <view class="ste-progress-root" :style="[cmpRootCssVar]" data-test="progress">
        <view class="inactive-box" :style="[cmpInactiveStyle]"></view>
        <view class="stage-box" v-if="hasStage">
            <view class="stage" v-for="(item, index) in Object.keys(stageData)" :style="[getStageStyle(Number(item), index, stageData[item])]">
                <text class="text" :style="[getStageTextWidth(index, stageData[item])]">{{ stageData[item].label }}</text>
            </view>
        </view>
        <view class="active-box line" :style="[cmpActiveStyle]" v-if="realPercentage > 0 && !hasStage">
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

    > .inactive-box,
    > .active-box,
    > .stage-box,
    > .stage-box > .stage {
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

    .stage-box {
        position: absolute;
        left: 0;
        top: 0;

        .stage {
            position: absolute;
            left: 0;
            top: 0;

            text-align: right;

            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: var(--progress-padding) 0;
            .text {
                color: var(--active-text-color);
                font-size: var(--active-text-font-size);
                text-align: center;

                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
            }
        }
    }
}
</style>
