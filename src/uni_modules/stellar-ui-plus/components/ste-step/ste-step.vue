<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useInject } from '../../utils/mixin';
import { type StepsProps, STEPS_KEY } from '../ste-steps/props';
import propsData from './props';
import type { Obj } from '../../types';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();

const componentName = `ste-step`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);

const Parent = useInject<{ props: Required<StepsProps>; onClickStep: (index: number) => void }>(STEPS_KEY);
const parent = Parent.parent;
const parentProps = Parent.parent?.props as StepsProps;

const childrenLen = ref(0);
const stepIndex = ref(0);

const cmpDirection = computed(() => parentProps.direction);
const cmpDot = computed(() => parentProps.dot);

watch(
    () => parent?.internalChildren,
    val => {
        stepIndex.value = val?.length || 0;
        nextTick(() => {
            childrenLen.value = val?.length || 0;
        });
    },
    {
        immediate: true,
    }
);

const cmpStatusObj = computed(() => {
    let obj = {} as Obj;
    let status = '';
    // status不是默认配置 优先级最高
    if (props.status) {
        status = props.status;
    } else {
        status = parentProps.active >= stepIndex.value ? 'finished' : 'process';
    }
    obj.textColor = parentProps.active + 1 >= stepIndex.value ? getColor().steThemeColor : '#cccccc';
    if (status == 'finished') {
        obj.color = getColor().steThemeColor;
        obj.icon = '&#xe67a;';
    }
    if (status == 'process') {
        obj.color = obj.textColor;
        obj.icon = '';
    }
    if (status == 'error') {
        obj.color = getColor().steThemeColor;
        obj.icon = '&#xe67b;';
        obj.textColor = getColor().steThemeColor;
    }
    obj.icon = props.icon ? props.icon : obj.icon;
    obj.bgColor = parentProps.active + 1 == stepIndex.value ? getColor().steThemeColor : '#ffffff';
    obj.numColor = parentProps.active + 1 >= stepIndex.value ? '#ffffff' : '#cccccc';
    obj.descColor = parentProps.active + 1 >= stepIndex.value ? '#999999' : '#cccccc';
    obj.lineColor = parentProps.active >= stepIndex.value ? getColor().steThemeColor : '#EEEEEE';
    obj.dotColor = parentProps.active + 1 >= stepIndex.value ? getColor().steThemeColor : '#DDDDDD';
    return obj;
});

const cmpRootStyle = computed(() => ({
    '---color': cmpStatusObj.value.textColor,
    '---bg-color': cmpStatusObj.value.bgColor,
    '---num-color': cmpStatusObj.value.numColor,
    '---desc-color': cmpStatusObj.value.descColor,
    '---line-color': cmpStatusObj.value.lineColor,
    '---dot-color': cmpStatusObj.value.dotColor,
}));

function clickStep() {
    parent?.onClickStep(stepIndex.value);
}
</script>

<template>
    <view class="ste-step" :class="[`ste-step-${cmpDirection}`]" :style="[cmpRootStyle]">
        <view class="ste-step-head" :class="cmpDot ? 'head-is-dot' : ''">
            <view class="ste-step-line" v-if="stepIndex < childrenLen"></view>
            <view class="ste-step-icon" :class="[!cmpDot ? ($slots.icon || icon ? '' : cmpStatusObj.icon ? 'is-icon' : 'is-text') : 'is-dot']" @click="clickStep">
                <template v-if="$slots.icon">
                    <slot name="icon"></slot>
                </template>
                <template v-else-if="cmpDot"></template>
                <template v-else-if="cmpStatusObj.icon">
                    <ste-icon class="ste-step-icon-inner" :code="cmpStatusObj.icon" :size="icon ? 40 : 20" :color="cmpStatusObj.color"></ste-icon>
                </template>
                <template v-else>
                    <view class="ste-step-inner">{{ stepIndex }}</view>
                </template>
            </view>
        </view>
        <view class="ste-step-content" :class="[`ste-step-content-${parentProps.direction}`]">
            <view class="ste-step-title" @click="clickStep">
                <span v-if="!$slots.title">
                    {{ title ? title : `第${stepIndex}步` }}
                </span>
                <slot name="title"></slot>
            </view>
            <view class="ste-step-desc" v-if="description || $slots.description">
                <span v-if="!$slots.description" v-html="description"></span>
                <slot name="description"></slot>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
@import './ste-step.scss';
</style>
