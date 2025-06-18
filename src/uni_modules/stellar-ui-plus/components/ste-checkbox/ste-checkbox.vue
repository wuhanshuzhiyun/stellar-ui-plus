<script lang="ts" setup>
import { useSlots, computed, ref, nextTick, markRaw, type CSSProperties, onMounted } from 'vue';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();
import utils from '../../utils/utils';
import propsData, { CHECKBOX_KEY, type CheckboxEmits } from './props';
import type { CheckboxGroupProps } from '../ste-checkbox-group/props';
import { useInject, createOptions } from '../../utils/mixin';

const componentName = `ste-checkbox`;
defineOptions(createOptions(componentName));

const props = defineProps(propsData);
const emits = defineEmits<CheckboxEmits>();
const slots = useSlots();

// 静态配置使用 markRaw 避免不必要的响应式
const staticConfig = markRaw({
    defaultIconSizeMultiplier: 0.8,
    borderWidth: 2,
});

let Parent = ref<any>(null);
onMounted(() => {
    Parent.value = useInject<{ props: Required<CheckboxGroupProps>; updateValue: (value: any[]) => void }>(CHECKBOX_KEY);
});
const parentProps = computed(() => Parent.value?.parent?.props);

// 基础计算属性
const cmpReadonly = computed(() => getDefaultData('readonly', false));
const cmpShape = computed(() => getDefaultData('shape', 'circle'));
const cmpIconSize = computed(() => getDefaultData('iconSize', 36));
const cmpCheckedColor = computed(() => getDefaultData('checkedColor', getColor().steThemeColor));
const cmpTextPosition = computed(() => getDefaultData('textPosition', 'right'));
const cmpTextSize = computed(() => getDefaultData('textSize', 28));
const cmpTextInactiveColor = computed(() => getDefaultData('textInactiveColor', '#000000'));
const cmpTextActiveColor = computed(() => getDefaultData('textActiveColor', '#000000'));
const cmpTextDisabled = computed(() => getDefaultData('textDisabled', false));
const cmpMarginLeft = computed(() => getDefaultData('marginLeft', '0'));
const cmpMarginRight = computed(() => getDefaultData('marginRight', '0'));
const cmpColumnGap = computed(() => getDefaultData('columnGap', '16'));

const cmpSlotProps = computed(() => ({
    checked: cmpChecked.value,
    disabled: cmpDisabled.value,
    readonly: cmpReadonly.value,
}));

// 拆分计算属性依赖 - 静态样式
const baseRootStyle = computed(() => ({
    fontSize: `var(--font-size-${cmpTextSize.value},${utils.formatPx(cmpTextSize.value)})`,
    marginLeft: utils.formatPx(cmpMarginLeft.value),
    marginRight: utils.formatPx(cmpMarginRight.value),
}));

// 拆分计算属性依赖 - 动态样式
const dynamicRootStyle = computed(() => ({
    color: cmpChecked.value ? cmpTextActiveColor.value : cmpTextInactiveColor.value,
    flexDirection: cmpTextPosition.value == 'right' ? 'row' : 'row-reverse',
}));

// 拆分计算属性依赖 - 交互样式
const interactiveRootStyle = computed(() => {
    const style: CSSProperties = {};

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

// 合并所有根样式
const cmpRootStyle = computed(() => ({
    ...baseRootStyle.value,
    ...dynamicRootStyle.value,
    ...interactiveRootStyle.value,
}));

// 图标样式（相对简单，保持原样）
const cmpIconStyle = computed(() => ({
    marginRight: utils.formatPx(cmpColumnGap.value),
}));

// 拆分输入框样式 - 基础样式
const baseInputStyle = computed(() => ({
    borderRadius: cmpShape.value == 'circle' ? '50%' : '0',
    width: `var(--font-size-${cmpIconSize.value},${utils.formatPx(cmpIconSize.value)})`,
    height: `var(--font-size-${cmpIconSize.value},${utils.formatPx(cmpIconSize.value)})`,
    lineHeight: `var(--font-size-${cmpIconSize.value},${utils.formatPx(cmpIconSize.value)})`,
    columnGap: slots.default ? undefined : 0,
}));

// 拆分输入框样式 - 动态样式
const dynamicInputStyle = computed(() => ({
    border: `${utils.formatPx(staticConfig.borderWidth)} solid ${cmpChecked.value ? cmpCheckedColor.value : '#BBBBBB'}`,
    background: cmpChecked.value ? cmpCheckedColor.value : '#FFFFFF',
}));

// 拆分输入框样式 - 禁用状态样式
const disabledInputStyle = computed(() => {
    if (!cmpDisabled.value) return {};

    return {
        background: '#eeeeee',
        borderColor: '#bbbbbb',
    };
});

// 拆分输入框样式 - 交互样式
const interactiveInputStyle = computed(() => {
    const style: CSSProperties = {};

    // #ifdef H5
    if (cmpDisabled.value || cmpReadonly.value) {
        style['cursor'] = 'not-allowed';
    } else {
        style['cursor'] = 'pointer';
    }
    // #endif

    return style;
});

// 合并所有输入框样式
const cmpInputStyle = computed(() => ({
    ...baseInputStyle.value,
    ...dynamicInputStyle.value,
    ...disabledInputStyle.value,
    ...interactiveInputStyle.value,
}));

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

// 强制更新选中状态
let num = ref(1);

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
    if (cmpDisabled.value || cmpReadonly.value) {
        return;
    }

    try {
        await utils.asyncEvent(
            // 事件函数
            (pauseFn, resolveFn, rejectFn) => {
                emits('click', props.modelValue, pauseFn, resolveFn, rejectFn);
            },
            // 成功处理函数
            () => {
                let value: boolean | any[];
                if (parentProps.value) {
                    value = [...parentProps.value.modelValue];
                    if (cmpChecked.value) {
                        value = value.filter(v => v !== props.name);
                    } else {
                        value.push(props.name);
                    }
                    Parent.value.parent?.updateValue(value);
                    num.value++;
                } else {
                    value = !cmpChecked.value;
                    emits('update:modelValue', value);
                }
                emits('change', value);
            }
        );
    } catch (error) {}
};
const click = () => {
    batchedUpdate(handleClick);
};

type PropsKeyTypee = keyof typeof props;
function getDefaultData(key: PropsKeyTypee, value: any) {
    try {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            if (props[key]) {
                return props[key];
            } else {
                return value;
            }
        }
    } catch (e) {
        return value;
    }
}
</script>

<template>
    <view class="ste-checkbox--root" :style="[cmpRootStyle]" @click="click">
        <view class="icon" :style="[cmpIconStyle]">
            <slot name="icon" :slotProps="cmpSlotProps">
                <view class="input-icon" :style="[cmpInputStyle]">
                    <ste-icon v-if="cmpChecked && cmpIconSize" :size="cmpIconSize * staticConfig.defaultIconSizeMultiplier" code="&#xe67a;" :color="cmpDisabled ? '#bbbbbb' : '#fff'" bold />
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
