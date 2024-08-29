<script lang="ts" setup>
import { useSlots, computed, type CSSProperties } from 'vue';
import utils from '../../utils/utils';
import propsData, { RADIO_KEY, radioEmits } from './props';
import type { RadioGroupProps } from '../ste-radio-group/props';
import { useInject } from '../../utils/mixin';
const componentName = `ste-radio`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});
const props = defineProps(propsData);
const emits = defineEmits(radioEmits);
const slots = useSlots();

const Parent = useInject<{ props: Required<RadioGroupProps>; updateValue: (value: string) => void }>(RADIO_KEY);

const parentProps = Parent?.parent?.props;

const cmpReadonly = computed(() => getDefaultData('readonly', false));
const cmpShape = computed(() => getDefaultData('shape', 'circle'));
const cmpIconSize = computed(() => getDefaultData('iconSize', 36));
const cmpCheckedColor = computed(() => getDefaultData('checkedColor', '#0090FF'));
const cmpTextPosition = computed(() => getDefaultData('textPosition', 'right'));
const cmpTextSize = computed(() => getDefaultData('textSize', 28));
const cmpTextInactiveColor = computed(() => getDefaultData('textInactiveColor', '#000000'));
const cmpTextActiveColor = computed(() => getDefaultData('textActiveColor', '#000000'));
const cmpTextDisabled = computed(() => getDefaultData('textDisabled', false));
const cmpMarginLeft = computed(() => getDefaultData('marginLeft', '0'));
const cmpMarginRight = computed(() => getDefaultData('marginRight', '0'));
const cmpColumnGap = computed(() => getDefaultData('columnGap', '16'));
const cmpDisabled = computed(() => getDefaultData('disabled', false));
const cmpSlotProps = computed(() => ({ checked: cmpChecked.value, disabled: cmpDisabled.value, readonly: cmpReadonly.value }));

const cmpRootStyle = computed(() => {
    let style: CSSProperties = {};
    style['fontSize'] = utils.formatPx(cmpTextSize.value);
    style['color'] = cmpChecked.value ? cmpTextActiveColor.value : cmpTextInactiveColor.value;
    style['flexDirection'] = cmpTextPosition.value == 'right' ? 'row' : 'row-reverse';
    style['columnGap'] = utils.formatPx(cmpColumnGap.value);
    style['marginLeft'] = utils.formatPx(cmpMarginLeft.value);
    style['marginRight'] = utils.formatPx(cmpMarginRight.value);
    // #ifdef H5
    if (cmpDisabled.value || cmpReadonly.value) {
        style['cursor'] = 'not-allowed';
    } else if (cmpTextDisabled.value) {
        style['cursor'] = 'default';
    } else {
        style['cursor'] = 'pointer';
    }
    // #endif
    if (cmpTextDisabled.value) {
        style['pointerEvents'] = 'none';
    }
    return style;
});

const cmpInputStyle = computed(() => {
    let style: CSSProperties = {};
    // 没有icon 则默认样式
    style['borderRadius'] = cmpShape.value == 'circle' ? '50%' : '0';
    style['border'] = `${utils.formatPx(2)} solid ${cmpChecked.value ? cmpCheckedColor.value : '#BBBBBB'}`;
    style['background'] = cmpChecked.value ? cmpCheckedColor.value : '#FFFFFF';
    style['width'] = utils.formatPx(cmpIconSize.value);
    style['height'] = utils.formatPx(cmpIconSize.value);
    style['lineHeight'] = utils.formatPx(cmpIconSize.value);
    // #ifdef H5
    if (cmpDisabled.value || cmpReadonly.value) {
        style['cursor'] = 'not-allowed';
    } else {
        style['cursor'] = 'pointer';
    }
    // #endif
    if (cmpDisabled.value) {
        style['background'] = '#eeeeee';
        style['borderColor'] = '#bbbbbb';
    }

    // 在没有使用插槽内容时去掉边距
    if (!slots.default) {
        style['columnGap'] = 0;
    }
    return style;
});

const cmpChecked = computed(() => {
    return parentProps ? parentProps.value == props.name : props.value == props.name;
});

async function click() {
    if (!cmpDisabled.value && !cmpReadonly.value) {
        let next = true;
        const stop = new Promise((resolve, reject) => {
            emits(
                'click',
                props.value,
                () => (next = false),
                () => resolve(props.value),
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

        // let value: string;
        // if (parentProps) {
        //     value = parentProps.value;
        //     if (cmpChecked.value) {
        //         value = value.filter(value => value != props.name);
        //     } else {
        //         value.push(props.name);
        //     }
        //     Parent.parent?.updateValue(value);
        // } else {
        //     value = !cmpChecked.value;
        //     emits('update:value', !cmpChecked.value);
        // }
        // emits('change', value);

        if (!cmpChecked.value) {
            let value = String(props.name);
            if (parentProps) {
                Parent.parent?.updateValue(value);
            } else {
                emits('update:value', value);
            }
            emits('change', value);
        }
    }
}

type PropsKeyTypee = keyof typeof props;
function getDefaultData(key: PropsKeyTypee, value: any) {
    try {
        if (Object.hasOwn(props, key)) {
            if (props[key]) {
                return props[key];
            } else {
                // return parent[key] ? parent[key] : value
                return value;
            }
        }
    } catch (e) {
        return value;
    }
}
</script>

<template>
    <view class="ste-radio-root" :style="[cmpRootStyle]" @click="click">
        <view class="icon">
            <slot name="icon" :slotProps="cmpSlotProps">
                <view class="input-icon" :style="[cmpInputStyle]">
                    <ste-icon v-if="cmpChecked && cmpIconSize" :size="cmpIconSize * 0.8" code="&#xe67a;" :color="cmpDisabled ? '#bbbbbb' : '#fff'" bold></ste-icon>
                </view>
            </slot>
        </view>
        <view class="text">
            <!-- #ifdef MP -->
            <slot></slot>
            <!-- #endif -->
            <slot :slotProps="cmpSlotProps"></slot>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-radio-root {
    width: auto;
    height: 100%;
    display: flex;
    column-gap: 16rpx;
    align-items: center;
    .input-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon {
        pointer-events: all;
    }
    .text {
        display: flex;
        align-items: center;
        height: 100%;
    }
}
</style>
