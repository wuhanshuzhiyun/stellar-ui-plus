<script setup lang="ts">
import propsData, { type SelectOption, type SelectValue } from './props';
import useData from './useData';
import DateTime from './datetime.vue';

const props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'update:modelValue', value: SelectValue): void;
    (e: 'change', value: SelectValue, option: SelectOption): void;
    (e: 'cancel'): void;
    (e: 'confirm', value: SelectValue): void;
}>();
const thas = ref<globalThis.ComponentPublicInstance | null>();

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
});

const {
    dataOptions,
    confirmValue,
    selected,
    inputView,
    onUserFilterable,
    inputPlaceholder,
    dataAllowCreate,
    showOptions,
    cmpRootStyle,
    clickMask,
    contentStyle,
    openOptions,
    cmpMultiple,
    cmpFilterable,
    cmpViewValue,
    clickOpenIcon,
    optionsStyle,
    cmpShowDate,
    cmpMultiseriateValue,
    onMultiseriateChange,
    viewOptions,
    onSelect,
    active,
    clickCancel,
    clickConfirm,
} = useData({ props, emits, thas });
const stop = () => {};
</script>
<template>
    <view class="ste-select-root" :class="{ open: showOptions, disabled }" :style="[cmpRootStyle]">
        <view class="select-mask" @click="clickMask" @touchmove.stop="stop">
            <view class="select-content" :style="[contentStyle]" @click.stop="stop" @click="openOptions">
                <slot>
                    <scroll-view scroll-x class="content-text" :class="{ multiple: cmpMultiple }">
                        <block v-if="cmpFilterable">
                            <block v-if="cmpMultiple">
                                <block v-for="(v, i) in cmpViewValue">
                                    <view class="view-item" :key="v" v-if="v">
                                        {{ v }}
                                    </view>
                                </block>
                            </block>
                            <input
                                v-model="inputView"
                                class="filterable-input"
                                :class="{ content: cmpMultiple && cmpViewValue.length }"
                                :disabled="disabled"
                                :placeholder="inputPlaceholder"
                                @input="onUserFilterable"
                            />
                        </block>
                        <block v-else>
                            <block v-if="confirmValue && confirmValue.length">
                                <block v-if="cmpMultiple">
                                    <block v-for="(v, i) in cmpViewValue">
                                        <view class="view-item" :key="v" v-if="v">
                                            {{ v }}
                                        </view>
                                    </block>
                                </block>
                                <text v-else>{{ cmpViewValue }}</text>
                            </block>
                            <view class="placeholder-text" v-else>{{ placeholder }}</view>
                        </block>
                    </scroll-view>
                </slot>
                <view class="open-icon-event" @click.stop="clickOpenIcon">
                    <view class="open-icon">
                        <view class="open-icon-transform">
                            <ste-icon code="&#xe676;" size="20" />
                        </view>
                    </view>
                </view>
            </view>

            <view class="options-content" :style="[optionsStyle]" @click.stop="stop">
                <view class="select-options">
                    <DateTime v-if="cmpShowDate" v-model="selected" :mode="mode" :minDate="minDate" :maxDate="maxDate" :dateUnit="dateUnit" />
                    <block v-else-if="dataOptions.length > 1">
                        <picker-view style="height: 450rpx" indicator-style="height: 43px" :value="cmpMultiseriateValue" @change="onMultiseriateChange">
                            <picker-view-column v-for="(col, index) in viewOptions" :key="index">
                                <view class="time-item" style="height: 43px" v-for="(item, i) in col" :key="i">
                                    {{ item[labelKey] }}
                                </view>
                            </picker-view-column>
                        </picker-view>
                    </block>

                    <block v-else>
                        <view class="one-col-options">
                            <scroll-view scroll-y class="options-col" v-for="(col, index) in viewOptions" :key="index">
                                <view class="options-item" v-if="dataAllowCreate" @click="onSelect(index, dataAllowCreate, true)">
                                    {{ dataAllowCreate[labelKey] }}
                                </view>
                                <view class="options-item" v-for="(item, i) in col" :key="item[valueKey]" :class="{ active: active(index, item) }" @click="onSelect(index, item)">
                                    {{ item[labelKey] }}
                                </view>
                                <block v-if="!dataAllowCreate && !col.length">
                                    <view class="options-empty">暂无数据</view>
                                </block>
                            </scroll-view>
                        </view>
                    </block>
                </view>
                <view class="options-btns" v-if="cmpShowDate || dataOptions.length > 1">
                    <view class="options-cancel" @click="clickCancel">取消</view>
                    <view class="options-confirm" @click="clickConfirm">确定</view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-select-root {
    width: var(--ste-select-width);
    height: var(--ste-select-height);
    position: relative;
    &.disabled .select-content {
        background-color: #eee;
    }
    &.open {
        .select-mask {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 996;
            .select-content {
                .open-icon-event > .open-icon {
                    transform: rotate(180deg);
                }
            }
        }
    }
    .select-mask {
        width: var(--ste-select-width);
        height: var(--ste-select-height);
    }
    .select-content {
        width: var(--ste-select-width);
        height: var(--ste-select-height);
        line-height: var(--ste-select-line-height);
        background-color: var(--ste-select-background);
        border: var(--ste-select-border);
        border-radius: var(--ste-select-border-radius);
        padding-right: var(--ste-select-multiple-line-height);
        position: relative;
        z-index: 1;
        padding-left: 20rpx; // 调整内边距，以适应不同的选项高度。
        overflow: hidden;
        .content-text {
            width: 100%;
            height: 100%;
            white-space: nowrap;
            font-size: var(--ste-select-font-size);
            &.multiple {
                padding: 2px 0;
                .view-item {
                    max-width: 100%;
                    line-height: var(--ste-select-multiple-line-height);
                    display: inline-block;
                    padding: 0 12rpx;
                    border-radius: 6rpx;
                    border: 1px solid #eee;
                    margin-right: 8px;
                    font-size: 24rpx; // 设置字体大小
                    text-overflow: ellipsis;
                    white-space: nowrap; // 文本不换行，防止文字溢出
                    overflow: hidden; // 隐藏溢出内容，并显示省略号
                }
                .filterable-input {
                    height: var(--ste-select-multiple-placeholder-height);
                    display: inline-block;
                    &.content {
                        width: 50%;
                    }
                }
                .placeholder-text {
                    line-height: var(--ste-select-multiple-placeholder-height);
                }
            }
        }
        .filterable-input {
            width: 100%;
            height: 100%;
        }
        .placeholder-text {
            color: #999999;
        }
        .open-icon-event {
            width: var(--ste-select-multiple-line-height);
            height: var(--ste-select-multiple-line-height);
            position: absolute;
            display: flex;
            z-index: 100;
            align-items: center;
            justify-content: center;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            .open-icon {
                background-color: #ebebeb; // 设置一个背景颜色，以便在开发过程中能够看到这个元素。
                border-radius: 16rpx;
                width: 32rpx;
                height: 32rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 300ms;
                .open-icon-transform {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translateY(2rpx);
                }
            }
        }
    }
    .options-content {
        display: none;
        position: absolute;
        z-index: 2;
        border-radius: 8rpx;
        background-color: #fff;
        overflow: hidden;
        .select-options {
            width: 100%;
            max-height: 546rpx;
            .one-col-options {
                padding: 20rpx 0;
            }
            .options-col {
                padding: 0 16rpx;
                height: 100%;
                max-height: 450rpx;
                .options-item {
                    width: 100%;
                    line-height: 42rpx;
                    padding: 20rpx 0;
                    font-size: var(--ste-select-font-size);
                    // 文本溢出省略号
                    text-overflow: ellipsis;
                    white-space: nowrap; // 文本不换行，防止文字溢出
                    overflow: hidden; // 隐藏溢出内容，并显示省略号

                    &.active {
                        color: #3491fa;
                    }

                    & + .options-item {
                        border-top: 1px solid #f5f5f5;
                    }

                    &:nth-child(1) {
                        padding-top: 0;
                    }
                    &:nth-last-child(1) {
                        padding-bottom: 0;
                    }
                }
                .options-empty {
                    width: 100%;
                    height: 82rpx;
                    line-height: 82rpx;
                    text-align: center;
                    color: #999999;
                }
            }
            .time-item {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--ste-select-font-size);
            }
        }
        .options-btns {
            width: 100%;
            height: 96rpx;
            line-height: 96rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: var(--ste-select-font-size);
            .options-cancel {
                color: #999999;
                padding: 0 40rpx;
            }
            .options-confirm {
                color: #0090ff;
                padding: 0 40rpx;
            }
        }
    }
}
</style>
