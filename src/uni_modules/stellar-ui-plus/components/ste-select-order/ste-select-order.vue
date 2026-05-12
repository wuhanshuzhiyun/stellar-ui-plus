<script setup lang="ts">
import { computed, ref, watch, nextTick, getCurrentInstance, onMounted } from 'vue';
import propsData, { type SelectOption } from './props';
import { useColorStore } from '../../store/color';
import utils from '../../utils/utils';

defineOptions({
    name: 'ste-select-order',
    options: {
        virtualHost: true,
    },
});

const thas = ref()

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy
})

const { getColor } = useColorStore();
const props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number | undefined): void;
    (e: 'change', value: string | number | undefined, option: SelectOption | undefined): void;
}>();

const open = ref(false);
const viewValue = ref(props.modelValue);
const isUpward = ref(false);

watch(() => props.modelValue, (newVal) => {
    if (newVal !== viewValue.value) {
        viewValue.value = newVal;
    }
});

const onTouchMove = (e: TouchEvent) => {
    // 只有在展开状态下才阻止动
    if (open.value) {
        e.preventDefault();
    }
};

const cmpRootStyle = computed(() => ({
    '--theme-color': getColor()?.steThemeColor || '#0090FF',
}));

const viewTitle = computed(() => {
    if (!viewValue.value) return '';
    const item = props.list.find(item => item[props.valueKey] === viewValue.value);
    return item ? (item[props.labelKey] as string) || String(item[props.valueKey]) : String(viewValue.value);
});

const calculatePosition = async () => {
    const header = await utils.querySelector(".ste-select-order-header", thas.value)
    if (!header) return;
    const vh = utils.System.getWindowHeight()
    const { top, height } = header as any
    const position = top + height / 2;
    const middle = vh / 2;
    isUpward.value = position > middle;
};

const onTitleClick = async () => {
    if (props.disabled) return;
    if (!open.value) {
        await calculatePosition();
    }
    await nextTick()
    open.value = !open.value;
};

const onShadeClick = () => {
    if (props.maskClose) {
        open.value = false;
    }
};

const onSelect = (item: SelectOption) => {
    if (item.disabled) return;
    const val = item[props.valueKey];
    if (val === viewValue.value || props.disabled) return;
    viewValue.value = val;
    emits('update:modelValue', val);
    emits('change', val, item);
    setTimeout(() => {
        open.value = false;
    }, 300);
};
</script>

<template>
    <view class="ste-select-order-root" :class="{ open, disabled: props.disabled }" :style="[cmpRootStyle]">
        <view class="ste-select-order-shade" @click="onShadeClick" @touchmove.stop="onTouchMove"></view>
        <view class="ste-select-order-content" :class="{ 'is-upward': isUpward }" @click.stop="onTitleClick"
            @touchmove.stop="onTouchMove">
            <view class="ste-select-order-header">
                <view class="ste-select-order-title" v-if="viewTitle">
                    <view class="ste-select-order-title-text">
                        {{ viewTitle }}
                    </view>
                    <ste-icon code="&#xe698;" v-if="open" />
                    <ste-icon code="&#xe699;" v-else />
                </view>
                <view class="ste-select-order-placeholder" v-else>{{ placeholder }}</view>
            </view>
            <view class="ste-select-order-list">
                <view v-for="item in props.list" :key="item[props.valueKey]" class="ste-select-order-item"
                    :class="{ 'active': item[props.valueKey] === viewValue, 'disabled': item.disabled }"
                    @click.stop="onSelect(item)">
                    <view>{{ (item[props.labelKey] as string) || item[props.valueKey] }}</view>
                    <view class="ste-select-order-item-icon">
                        <ste-icon code="&#xe67a;" />
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.ste-select-order-root {
    position: relative;
    z-index: 1;
    width: 100%;
    font-size: 32rpx;
    color: #000;
    transition: z-index 0.3s ease;

    &.open {
        z-index: 998;

        .ste-select-order-shade {
            display: block;
            opacity: 1;
        }

        .ste-select-order-content {

            .ste-select-order-header {
                background-color: #fff;
                border-radius: 16rpx 16rpx 0 0;
            }

            .ste-select-order-list {
                display: block;
                background-color: #fff;
                border-radius: 0 0 16rpx 16rpx;
                position: absolute;
                left: 0;
                top: 100%;
                width: 100%;
            }

            &.is-upward {
                .ste-select-order-header {
                    border-radius: 0 0 16rpx 16rpx;
                }

                .ste-select-order-list {
                    top: initial;
                    bottom: 100%;
                    border-radius: 16rpx 16rpx 0 0;
                }
            }
        }
    }

    &.disabled {
        opacity: 0.6;

        .ste-select-order-title,
        .ste-select-order-placeholder {
            color: #ccc;
        }
    }

    .ste-select-order-shade {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        opacity: 0;
        z-index: 1;
    }

    .ste-select-order-content {
        width: 100%;
        position: relative;
        z-index: 2;

        .ste-select-order-header {
            padding: 28rpx 24rpx 24rpx 24rpx;
            font-size: var(--font-size-32, 32rpx);
            line-height: var(--font-size-44, 44rpx);
            font-weight: bold;

            .ste-select-order-placeholder,
            .ste-select-order-title {
                display: flex;
                align-items: center;
            }

            .ste-select-order-title {
                color: #0A0A0A;

                .ste-select-order-title-text {
                    margin-right: 12rpx;
                }
            }

            .ste-select-order-placeholder {
                color: #999;
            }
        }

        .ste-select-order-list {
            display: none;

            z-index: 2;
            max-height: 480rpx;
            overflow-y: auto;
            border-top: 1px solid #F9F9F9;
            background-color: #fff;
            padding: 0 24rpx;

            .ste-select-order-item {
                padding: 24rpx 0;
                font-size: var(--font-size-28, 28rpx);
                line-height: var(--font-size-40, 40rpx);
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #0A0A0A;
                transition: color 0.2s ease;

                &+.ste-select-order-item {
                    border-top: 1px solid #F9F9F9;
                }

                .ste-select-order-item-icon {
                    width: 36rpx;
                    height: 36rpx;
                    border-radius: 50%;
                    border: 1px solid #CECECE;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                &.active {
                    color: var(--theme-color);

                    .ste-select-order-item-icon {
                        border-color: var(--theme-color);
                        background-color: var(--theme-color);
                    }
                }

                &.disabled {
                    color: #999;

                    .ste-select-order-item-icon {
                        border-color: #E0E0E0;
                        background-color: #F5F5F5;
                    }
                }
            }
        }
    }
}
</style>
