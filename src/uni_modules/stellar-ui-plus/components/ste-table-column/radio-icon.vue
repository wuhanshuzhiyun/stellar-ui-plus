<script lang="ts" setup>
import { computed } from 'vue';
import { SELECTION_COLOR_CONFIG } from '../ste-table/props';
import type { PropType } from 'vue';
import utils from '../../utils/utils';

const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    iconColorConfig: {
        type: Object as PropType<typeof SELECTION_COLOR_CONFIG>,
        default: () => SELECTION_COLOR_CONFIG,
    },
});

const cmpRootClass = computed(() => {
    let classArr = [];
    if (props.checked) {
        classArr.push('checked');
    }
    if (props.disabled) {
        classArr.push('disabled');
    }
    if (props.readonly) {
        classArr.push('readonly');
    }

    return classArr.join(' ');
});

const cmpRootStyle = computed(() => {
    return {
        '--main-color': props.iconColorConfig.main || SELECTION_COLOR_CONFIG.main,
        '--main-outer-color': utils.Color.formatColor(props.iconColorConfig.main || SELECTION_COLOR_CONFIG.main, 0.2),
        '--disabled-color': props.iconColorConfig.disabled || SELECTION_COLOR_CONFIG.disabled,
        '--un-selected-color': props.iconColorConfig.unSelected || SELECTION_COLOR_CONFIG.unSelected,
        '--readonly-color': props.iconColorConfig.readonly || SELECTION_COLOR_CONFIG.readonly,
        '--readonly-outer-color': utils.Color.formatColor(props.iconColorConfig.readonly || SELECTION_COLOR_CONFIG.readonly, 0.2),
    };
});
</script>

<template>
    <view class="radio-icon-root" :class="[cmpRootClass]" :style="cmpRootStyle">
        <view class="icon-1"></view>
    </view>
</template>

<style lang="scss" scoped>
.radio-icon-root {
    width: 32rpx;
    height: 32rpx;

    border-radius: 50%;
    border: 2rpx solid var(--un-selected-color);
    position: relative;

    &.checked {
        border: none;
        background-color: var(--main-outer-color);
        .icon-1 {
            background-color: var(--main-color);
        }
    }

    &.readonly {
        border: none;
        background-color: var(--readonly-outer-color);
        .icon-1 {
            background-color: var(--readonly-color);
        }
    }

    &.disabled {
        border: none;
        background-color: var(--disabled-color);
    }
    .icon-1 {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
