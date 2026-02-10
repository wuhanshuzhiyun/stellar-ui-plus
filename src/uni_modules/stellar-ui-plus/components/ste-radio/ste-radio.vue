<script lang="ts" setup>
import { useSlots, computed, type CSSProperties } from 'vue';
import { useColorStore } from '../../store/color';
import utils from '../../utils/utils';
import propsData, { RADIO_KEY, type RadioEmits } from './props';
import type { RadioGroupProps } from '../ste-radio-group/props';
import { useInject } from '../../utils/mixin';

// 🚀 优化: 模块级别调用，所有实例共享
const { getColor } = useColorStore();
const themeColor = getColor()?.steThemeColor || '#0090FF';

const componentName = `ste-radio`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});
const props = defineProps(propsData);
const emits = defineEmits<RadioEmits>();
const slots = useSlots();

const Parent = useInject<{ props: Required<RadioGroupProps>; updateValue: (value: string) => void }>(RADIO_KEY);

const parentProps = computed(() => Parent?.parent?.props);

// 🚀 优化: 只保留必要的 computed
const cmpChecked = computed(() => {
    return parentProps.value ? parentProps.value.modelValue == props.name : props.modelValue == props.name;
});

// 🚀 优化: 合并所有样式计算,直接调用 getDefaultData
const cmpRootStyle = computed(() => {
    const textSize = getDefaultData('textSize', 28);
    const textPosition = getDefaultData('textPosition', 'right');
    const readonly = getDefaultData('readonly', false);
    const disabled = getDefaultData('disabled', false);
    const textDisabled = getDefaultData('textDisabled', false);

    const style: CSSProperties = {
        fontSize: `var(--font-size-${textSize},${utils.formatPx(textSize)})`,
        color: cmpChecked.value ? getDefaultData('textActiveColor', '#000000') : getDefaultData('textInactiveColor', '#000000'),
        flexDirection: textPosition === 'right' ? 'row' : 'row-reverse',
        marginLeft: utils.formatPx(getDefaultData('marginLeft', '0')),
        marginRight: utils.formatPx(getDefaultData('marginRight', '0')),
    };

    // #ifdef H5
    if (disabled || readonly) {
        style['cursor'] = 'not-allowed';
    } else if (textDisabled) {
        style['cursor'] = 'default';
    } else {
        style['cursor'] = 'pointer';
    }
    // #endif

    if (textDisabled) {
        style['pointerEvents'] = 'none';
    }
    return style;
});

const cmpIconStyle = computed(() => {
    return {
        marginRight: utils.formatPx(getDefaultData('columnGap', '16')),
    } as CSSProperties;
});

const cmpInputStyle = computed(() => {
    const shape = getDefaultData('shape', 'circle');
    const iconSize = getDefaultData('iconSize', 36);
    const checkedColor = getDefaultData('checkedColor', themeColor);
    const readonly = getDefaultData('readonly', false);
    const disabled = getDefaultData('disabled', false);
    const checked = cmpChecked.value;

    const style: CSSProperties = {
        borderRadius: shape === 'circle' ? '50%' : '0',
        border: `${utils.formatPx(2)} solid ${checked ? checkedColor : '#BBBBBB'}`,
        background: checked ? checkedColor : '#FFFFFF',
        width: `var(--font-size-${iconSize},${utils.formatPx(iconSize)})`,
        height: `var(--font-size-${iconSize},${utils.formatPx(iconSize)})`,
        lineHeight: `var(--font-size-${iconSize},${utils.formatPx(iconSize)})`,
    };

    // #ifdef H5
    style['cursor'] = disabled || readonly ? 'not-allowed' : 'pointer';
    // #endif

    if (disabled) {
        style['background'] = '#eeeeee';
        style['borderColor'] = '#bbbbbb';
    }

    // 在没有使用插槽内容时去掉边距
    if (!slots.default) {
        style['columnGap'] = '0';
    }
    return style;
});

// 🚀 优化: slotProps 也直接计算
const cmpSlotProps = computed(() => ({
    checked: cmpChecked.value,
    disabled: getDefaultData('disabled', false),
    readonly: getDefaultData('readonly', false),
}));

// 🚀 优化: 缓存 ste-icon 需要的属性，避免模板中重复调用 getDefaultData
const cmpIconProps = computed(() => {
    const iconSize = getDefaultData('iconSize', 36);
    const disabled = getDefaultData('disabled', false);
    return {
        size: iconSize * 0.8,
        color: disabled ? '#bbbbbb' : '#fff',
    };
});

async function click() {
    const readonly = getDefaultData('readonly', false);
    const disabled = getDefaultData('disabled', false);

    if (!disabled && !readonly) {
        let next = true;
        const stop = new Promise((resolve, reject) => {
            emits(
                'click',
                props.modelValue,
                () => (next = false),
                () => resolve(props.modelValue),
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

        if (!cmpChecked.value) {
            let value = String(props.name);
            if (parentProps.value) {
                Parent.parent?.updateValue(value);
            } else {
                emits('update:modelValue', value);
            }
            emits('change', value);
        }
    }
}

type PropsKeyType = keyof typeof props;
const getDefaultData = <T,>(key: PropsKeyType, defaultValue: T): T => {
    const value = props[key];
    return value !== undefined && value !== '' ? (value as T) : defaultValue;
};
</script>

<template>
    <view class="ste-radio-root" :style="[cmpRootStyle]" @click="click">
        <view class="icon" :style="[cmpIconStyle]">
            <slot name="icon" :slotProps="cmpSlotProps">
                <view class="input-icon" :style="[cmpInputStyle]">
                    <ste-icon v-if="cmpChecked" :size="cmpIconProps.size" code="&#xe67a;" :color="cmpIconProps.color" bold></ste-icon>
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
