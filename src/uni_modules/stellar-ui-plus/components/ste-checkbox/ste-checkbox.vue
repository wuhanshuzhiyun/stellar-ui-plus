<script lang="ts" setup>
import { useSlots, computed, ref, watch, onMounted, onUnmounted, type CSSProperties } from 'vue';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();
import utils from '../../utils/utils';
import propsData, { CHECKBOX_KEY, type CheckboxEmits } from './props';
import type { CheckboxGroupProps } from '../ste-checkbox-group/props';
import { useInject } from '../../utils/mixin';

const componentName = `ste-checkbox`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);
const emits = defineEmits<CheckboxEmits>();
const slots = useSlots();

const Parent = useInject<{
    props: Required<CheckboxGroupProps>;
    updateValue: (value: any[]) => void;
    registerChild: () => number;
    unregisterChild: () => void;
}>(CHECKBOX_KEY);

// 🚀 优化: 使用 watch 而非 computed，避免频繁依赖追踪
const parentData = ref<{
    props: Required<CheckboxGroupProps>;
    updateValue: (value: any[]) => void;
    registerChild: () => number;
    unregisterChild: () => void;
} | null>(null);

watch(
    () => Parent?.parent,
    newParent => {
        parentData.value = newParent || null;
    },
    { immediate: true }
);

// 记录当前组件在 group 中的索引
const childIndex = ref<number>(-1);

onMounted(() => {
    if (parentData.value?.registerChild) {
        childIndex.value = parentData.value.registerChild();
    }
});

onUnmounted(() => {
    if (parentData.value?.unregisterChild) {
        parentData.value.unregisterChild();
    }
});

// 🚀 优化: 缓存 themeColor
const themeColor = getColor().steThemeColor;

// 强制更新选中状态
const num = ref(1);

// 是否在 group 中
const inGroup = computed(() => !!parentData.value);

// 🚀 优化: 只保留必要的 computed，直接使用 parentData.value
const cmpChecked = computed(() => {
    if (inGroup.value) {
        return num.value > 0 && parentData.value!.props.modelValue.includes(props.name);
    }
    return props.modelValue;
});

const cmpDisabled = computed(() => {
    let disabled = props.disabled ?? parentData.value?.props.disabled ?? false;
    // 限制最大可选数
    if (inGroup.value && parentData.value!.props.max > 0) {
        if (!cmpChecked.value && parentData.value!.props.modelValue.length >= parentData.value!.props.max) {
            disabled = true;
        }
    }
    return disabled;
});

// 🚀 优化: 合并所有样式计算
const cmpRootStyle = computed(() => {
    const textSize = props.textSize ?? parentData.value?.props.textSize ?? 28;
    const textPosition = props.textPosition ?? parentData.value?.props.textPosition ?? 'right';
    const readonly = props.readonly ?? parentData.value?.props.readonly ?? false;
    const textDisabled = props.textDisabled ?? parentData.value?.props.textDisabled ?? false;

    let marginLeft = props.marginLeft ?? parentData.value?.props.marginLeft ?? '0';
    let marginRight = props.marginRight ?? parentData.value?.props.marginRight ?? '0';

    // 如果在 checkbox-group 中，并且不是第一个元素，自动应用间距
    if (inGroup.value && childIndex.value > 0 && marginLeft === '0') {
        const direction = parentData.value!.props.direction || 'column';
        if (direction === 'row') {
            marginLeft = '16';
        }
    }

    const style: CSSProperties = {
        fontSize: `var(--font-size-${textSize},${utils.formatPx(textSize)})`,
        color: cmpChecked.value ? (props.textActiveColor ?? parentData.value?.props.textActiveColor ?? '#000000') : (props.textInactiveColor ?? parentData.value?.props.textInactiveColor ?? '#000000'),
        flexDirection: textPosition === 'right' ? 'row' : 'row-reverse',
        marginLeft: utils.formatPx(marginLeft),
        marginRight: utils.formatPx(marginRight),
    };

    // 纵向排列时，设置上间距 16rpx
    if (inGroup.value && childIndex.value > 0) {
        const direction = parentData.value!.props.direction || 'column';
        if (direction === 'column') {
            style.marginTop = '16rpx';
        }
    }

    // #ifdef H5
    if (cmpDisabled.value || readonly) {
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
    const columnGap = props.columnGap ?? parentData.value?.props.columnGap ?? '16';
    return {
        marginRight: utils.formatPx(columnGap),
    } as CSSProperties;
});

const cmpInputStyle = computed(() => {
    const shape = props.shape ?? parentData.value?.props.shape ?? 'circle';
    const iconSize = props.iconSize ?? parentData.value?.props.iconSize ?? 36;
    const checkedColor = props.checkedColor ?? parentData.value?.props.checkedColor ?? themeColor;
    const readonly = props.readonly ?? parentData.value?.props.readonly ?? false;
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
    style['cursor'] = cmpDisabled.value || readonly ? 'not-allowed' : 'pointer';
    // #endif

    if (cmpDisabled.value) {
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
    disabled: cmpDisabled.value,
    readonly: props.readonly ?? parentData.value?.props.readonly ?? false,
}));

const cmpIconMargin = computed(() => {
    // #ifdef APP-PLUS
    return 2;
    // #endif

    // #ifndef APP-PLUS
    return 0;
    // #endif
});

// 🚀 优化: 简化点击处理，移除 batchedUpdate 和不必要的 async/await
const handleClick = () => {
    const readonly = props.readonly ?? parentData.value?.props.readonly ?? false;

    if (cmpDisabled.value || readonly) {
        return;
    }

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
        stop.catch(() => {});
        return;
    }

    let value: boolean | any[];
    if (inGroup.value) {
        // 使用浅拷贝避免直接修改原数组
        value = [...parentData.value!.props.modelValue];
        if (cmpChecked.value) {
            value = value.filter(v => v !== props.name);
        } else {
            value.push(props.name);
        }
        parentData.value!.updateValue(value);
        num.value++;
    } else {
        value = !cmpChecked.value;
        emits('update:modelValue', value);
    }
    emits('change', value);
};

const click = () => {
    handleClick();
};

// 获取配置值的快捷方法（保留兼容）
type PropsKeyType = keyof typeof props;
const getDefaultData = <T,>(key: PropsKeyType, defaultValue: T): T => {
    const value = props[key];
    if (value !== undefined && value !== null && value !== '') return value as T;
    const parentVal = parentData.value?.props[key as keyof typeof props];
    if (parentVal !== undefined && parentVal !== null && parentVal !== '') return parentVal as T;
    return defaultValue;
};

// 图标大小（用于模板中）
const iconSize = computed(() => props.iconSize ?? parentData.value?.props.iconSize ?? 36);
</script>

<template>
    <view class="ste-checkbox--root" :style="[cmpRootStyle]" @click="click">
        <view class="icon" :style="[cmpIconStyle]">
            <slot name="icon" :slotProps="cmpSlotProps">
                <view class="input-icon" :style="[cmpInputStyle]">
                    <ste-icon v-if="cmpChecked" :size="iconSize * 0.8" code="&#xe67a;" :color="cmpDisabled ? '#bbbbbb' : '#fff'" bold :marginBottom="cmpIconMargin" />
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
.ste-checkbox--root {
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
