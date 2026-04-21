<script lang="ts" setup>
import { useSlots, computed, ref, watch, type CSSProperties } from 'vue';
import { useColorStore } from '../../store/color';
import utils from '../../utils/utils';
import propsData, { RADIO_KEY, type RadioEmits } from './props';
import type { RadioGroupProps } from '../ste-radio-group/props';
import { useInject } from '../../utils/mixin';

// 🚀 模块级别调用，所有实例共享
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

// 🚀 优化: 使用 watch 而非 computed，避免频繁依赖追踪
const parentData = ref<{ props: Required<RadioGroupProps>; updateValue: (value: string) => void } | null>(null);

watch(
    () => Parent?.parent,
    newParent => {
        parentData.value = newParent || null;
    },
    { immediate: true }
);

// 是否在 group 中
const inGroup = computed(() => !!parentData.value);

// ─── 各 prop 单独 computed，直接使用 parentData ──────────────────────────

const cmpDisabled = computed(() => props.disabled ?? parentData.value?.props.disabled ?? false);
const cmpReadonly = computed(() => props.readonly ?? parentData.value?.props.readonly ?? false);
const cmpShape = computed(() => props.shape ?? parentData.value?.props.shape ?? 'circle');
const cmpIconSize = computed(() => props.iconSize ?? parentData.value?.props.iconSize ?? 36);
const cmpCheckedColor = computed(() => props.checkedColor ?? parentData.value?.props.checkedColor ?? themeColor);
const cmpTextPosition = computed(() => props.textPosition ?? parentData.value?.props.textPosition ?? 'right');
const cmpTextSize = computed(() => props.textSize ?? parentData.value?.props.textSize ?? 28);
const cmpTextInactiveColor = computed(() => props.textInactiveColor ?? parentData.value?.props.textInactiveColor ?? '#000000');
const cmpTextActiveColor = computed(() => props.textActiveColor ?? parentData.value?.props.textActiveColor ?? '#000000');
const cmpTextDisabled = computed(() => props.textDisabled ?? parentData.value?.props.textDisabled ?? false);
const cmpMarginLeft = computed(() => props.marginLeft ?? parentData.value?.props.marginLeft ?? '0');
const cmpMarginRight = computed(() => props.marginRight ?? parentData.value?.props.marginRight ?? '0');
const cmpColumnGap = computed(() => props.columnGap ?? parentData.value?.props.columnGap ?? '16');

// ─── 选中状态 ───────────────────────────────────────────────────────────────

const cmpChecked = computed(() => {
    if (inGroup.value) {
        return parentData.value!.props.modelValue == props.name;
    }
    return props.modelValue == props.name;
});

// ─── 根节点样式 ─────────────────────────────────────────────────────────────

const cmpRootStyle = computed(() => {
    const style: CSSProperties = {
        fontSize: `var(--font-size-${cmpTextSize.value},${utils.formatPx(cmpTextSize.value)})`,
        color: cmpChecked.value ? cmpTextActiveColor.value : cmpTextInactiveColor.value,
        flexDirection: cmpTextPosition.value === 'right' ? 'row' : 'row-reverse',
        marginLeft: utils.formatPx(cmpMarginLeft.value),
        marginRight: utils.formatPx(cmpMarginRight.value),
        columnGap: slots.default ? utils.formatPx(cmpColumnGap.value) : '0',
    };

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

// ─── 图标样式 ───────────────────────────────────────────────────────────────

const cmpInputStyle = computed(() => {
    const style: CSSProperties = {
        borderRadius: cmpShape.value === 'circle' ? '50%' : '0',
        border: `${utils.formatPx(2)} solid ${cmpChecked.value ? cmpCheckedColor.value : '#BBBBBB'}`,
        background: cmpChecked.value ? cmpCheckedColor.value : '#FFFFFF',
        width: `var(--font-size-${cmpIconSize.value},${utils.formatPx(cmpIconSize.value)})`,
        height: `var(--font-size-${cmpIconSize.value},${utils.formatPx(cmpIconSize.value)})`,
        lineHeight: `var(--font-size-${cmpIconSize.value},${utils.formatPx(cmpIconSize.value)})`,
    };

    // #ifdef H5
    style['cursor'] = cmpDisabled.value || cmpReadonly.value ? 'not-allowed' : 'pointer';
    // #endif

    if (cmpDisabled.value) {
        style['background'] = '#eeeeee';
        style['borderColor'] = '#bbbbbb';
    }
    return style;
});

// ─── slotProps & icon props ─────────────────────────────────────────────────

const cmpSlotProps = computed(() => ({
    checked: cmpChecked.value,
    disabled: cmpDisabled.value,
    readonly: cmpReadonly.value,
}));

const cmpIconProps = computed(() => ({
    size: (cmpIconSize.value as number) * 0.8,
    color: cmpDisabled.value ? '#bbbbbb' : '#fff',
}));

// ─── 点击处理 ───────────────────────────────────────────────────────────────

// 🚀 优化: 移除 async，简化 Promise 处理
function click() {
    if (cmpDisabled.value || cmpReadonly.value) {
        return;
    }

    let next = true;
    const stop = new Promise<void>(resolve => {
        emits(
            'click',
            props.modelValue,
            () => (next = false),
            () => resolve(),
            () => {}
        );
    });

    if (!next) {
        stop.catch(() => {});
        return;
    }

    if (!cmpChecked.value) {
        let value = String(props.name);
        if (inGroup.value) {
            parentData.value!.updateValue(value);
        } else {
            emits('update:modelValue', value);
        }
        emits('change', value);
    }
}

// ─── 工具函数（保留兼容）──────────────────────────────────────────────────────

type PropsKeyType = keyof typeof props;
/**
 * 优先使用子组件自身 prop，否则读父组件 props，最后取默认值。
 * 每个独立 computed 调用此函数，响应式系统会精准追踪对应字段。
 */
const getDefaultData = <T,>(key: PropsKeyType, defaultValue: T): T => {
    const value = props[key];
    if (value !== undefined && value !== null && value !== '') return value as T;
    const parentVal = parentProps.value?.[key as keyof RadioGroupProps];
    if (parentVal !== undefined && parentVal !== null && (parentVal as any) !== '') return parentVal as T;
    return defaultValue;
};
</script>

<template>
    <view class="ste-radio-root" :style="[cmpRootStyle]" @click="click">
        <view class="icon">
            <slot name="icon" :slotProps="cmpSlotProps">
                <view class="input-icon" :style="[cmpInputStyle]">
                    <ste-icon v-if="cmpChecked" :size="cmpIconProps.size" code="&#xe67a;" :color="cmpIconProps.color" bold></ste-icon>
                </view>
            </slot>
        </view>
        <view class="text">
            <!-- #ifndef MP -->
            <slot :slotProps="cmpSlotProps"></slot>
            <!-- #endif -->
            <!-- #ifdef MP -->
            <slot></slot>
            <!-- #endif -->
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
