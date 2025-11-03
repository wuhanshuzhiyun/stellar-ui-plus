<script lang="ts" setup>
import { useSlots, computed, ref, nextTick, onMounted, onUnmounted, type CSSProperties } from 'vue';
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
const parentProps = computed(() => Parent?.parent?.props);

// 记录当前组件在 group 中的索引
const childIndex = ref<number>(-1);

onMounted(() => {
    if (Parent?.parent?.registerChild) {
        childIndex.value = Parent.parent.registerChild();
    }
});

onUnmounted(() => {
    if (Parent?.parent?.unregisterChild) {
        Parent.parent.unregisterChild();
    }
});

// 🚀 优化: 缓存 themeColor,避免每次调用 getColor()
const themeColor = getColor().steThemeColor;

// 强制更新选中状态
let num = ref(1);

// 🚀 优化: 只保留必要的 computed
const cmpChecked = computed(() => {
    let v = num.value && parentProps.value ? parentProps.value.modelValue.includes(props.name) : props.modelValue;
    return v;
});

const cmpDisabled = computed(() => {
    let disabled = getDefaultData('disabled', false);
    // 限制最大可选数
    if (parentProps.value && parentProps.value.max) {
        if (!cmpChecked.value && parentProps.value.modelValue.length >= parentProps.value.max) {
            disabled = true;
        }
    }
    return disabled;
});

// 🚀 优化: 合并所有样式计算,直接调用 getDefaultData
const cmpRootStyle = computed(() => {
    const textSize = getDefaultData('textSize', 28);
    const textPosition = getDefaultData('textPosition', 'right');
    const readonly = getDefaultData('readonly', false);
    const textDisabled = getDefaultData('textDisabled', false);

    let marginLeft = getDefaultData('marginLeft', '0');
    let marginRight = getDefaultData('marginRight', '0');

    // 如果在 checkbox-group 中，并且不是第一个元素，自动应用间距
    if (parentProps.value && childIndex.value > 0 && marginLeft === '0') {
        const direction = parentProps.value.direction || 'column';

        if (direction === 'row') {
            // 横向排列时，设置左间距 16rpx
            marginLeft = '16';
        }
    }

    const style: CSSProperties = {
        fontSize: `var(--font-size-${textSize},${utils.formatPx(textSize)})`,
        color: cmpChecked.value ? getDefaultData('textActiveColor', '#000000') : getDefaultData('textInactiveColor', '#000000'),
        flexDirection: textPosition === 'right' ? 'row' : 'row-reverse',
        marginLeft: utils.formatPx(marginLeft),
        marginRight: utils.formatPx(marginRight),
    };

    // 纵向排列时，设置上间距 16rpx
    if (parentProps.value && childIndex.value > 0) {
        const direction = parentProps.value.direction || 'column';
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
    return {
        marginRight: utils.formatPx(getDefaultData('columnGap', '16')),
    } as CSSProperties;
});

const cmpInputStyle = computed(() => {
    const shape = getDefaultData('shape', 'circle');
    const iconSize = getDefaultData('iconSize', 36);
    const checkedColor = getDefaultData('checkedColor', themeColor);
    const readonly = getDefaultData('readonly', false);
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
    readonly: getDefaultData('readonly', false),
}));

// 批处理更新相关
const isBatchUpdating = ref(false);
const pendingUpdate = ref(false);

// 批处理更新函数
const batchedUpdate = async (updateFn: () => Promise<void>) => {
    if (isBatchUpdating.value) {
        pendingUpdate.value = true;
        return;
    }

    isBatchUpdating.value = true;

    try {
        await updateFn();
    } finally {
        await nextTick();
        isBatchUpdating.value = false;

        // 处理待处理的更新
        if (pendingUpdate.value) {
            pendingUpdate.value = false;
            // 如果有待处理的更新，延迟一帧再处理
            requestAnimationFrame(() => {
                if (!isBatchUpdating.value) {
                    handleClick();
                }
            });
        }
    }
};

// 实际的点击处理逻辑
const handleClick = async () => {
    const readonly = getDefaultData('readonly', false);

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
        try {
            await stop;
        } catch (e) {
            return;
        }
    }

    let value: boolean | any[];
    if (parentProps.value) {
        // 使用浅拷贝避免直接修改原数组
        value = [...parentProps.value.modelValue];
        if (cmpChecked.value) {
            value = value.filter(v => v !== props.name);
        } else {
            value.push(props.name);
        }
        Parent.parent?.updateValue(value);
        num.value++;
    } else {
        value = !cmpChecked.value;
        emits('update:modelValue', value);
    }
    emits('change', value);
};

const click = () => {
    batchedUpdate(handleClick);
};

type PropsKeyType = keyof typeof props;
const getDefaultData = <T,>(key: PropsKeyType, defaultValue: T): T => {
    const value = props[key];
    return value !== undefined && value !== '' ? (value as T) : defaultValue;
};
</script>

<template>
    <view class="ste-checkbox--root" :style="[cmpRootStyle]" @click="click">
        <view class="icon" :style="[cmpIconStyle]">
            <slot name="icon" :slotProps="cmpSlotProps">
                <view class="input-icon" :style="[cmpInputStyle]">
                    <ste-icon v-if="cmpChecked" :size="getDefaultData('iconSize', 36) * 0.8" code="&#xe67a;" :color="cmpDisabled ? '#bbbbbb' : '#fff'" bold />
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
