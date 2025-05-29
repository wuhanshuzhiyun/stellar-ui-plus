<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import setImage from '../ste-image/ste-image.vue';
import setPrice from '../ste-price/ste-price.vue';
import steStepper from '../ste-stepper/ste-stepper.vue';
import setCheckbox from '../ste-checkbox/ste-checkbox.vue';
import { useColorStore } from '../../store/color';
import propsData, { defaultSuggestData, type GoodsInfoType } from './props';
import utils from '../../utils/utils';

let { getColor } = useColorStore();

const props = defineProps(propsData);

const emits = defineEmits<{
    (e: 'update:number', number?: number): void;
    (e: 'update:checked', checked?: boolean): void;
    (e: 'change', change: { number?: number; checked?: boolean }, data: GoodsInfoType): void;
    (e: 'click', type: 'image' | 'title' | 'code' | 'price' | 'originalPrice'): void;
    (e: 'plus', value: number | string, suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'minus', value: number | string, suspend: () => void, next: () => void, stop: () => void): void;
}>();

const _number = ref(1);

const _checked = ref(false);

watch(
    () => _checked.value,
    () => checkboxChange()
);

watch(
    () => props.number,
    v => {
        if (v < 1 || isNaN(v)) {
            _number.value = 1;
        } else if (_number.value !== v) {
            _number.value = v;
        }
    },
    {
        immediate: true,
    }
);

watch(
    () => props.checked,
    v => {
        if (v !== _checked.value) {
            _checked.value = v;
        }
    },
    { immediate: true }
);

const rootStyle = computed(() => {
    let style: Record<string, string> = {
        // 图片大小，默认插槽存在的情况下160rpx，否则为110rpx
        '--image-size': utils.formatPx(props.imageSize, 'str'),
    };

    return style;
});

const detailClass = computed(() => ({
    checkbox: ['left', 'right'].includes(props.checkbox),
    checkboxleft: props.checkbox === 'left',
    checkboxright: props.checkbox === 'right',
}));

const showPriceRow = computed(() => props.stepper || !props.hidePrice);
const numberChange = () => {
    emits('update:number', _number.value);
    emits('change', { number: _number.value }, props.data);
};

const checkboxChange = () => {
    emits('update:checked', _checked.value);
    emits('change', { checked: _checked.value }, props.data);
};

const onClick = (type: 'image' | 'title' | 'code' | 'price' | 'originalPrice') => {
    emits('click', type);
};

const _tagBg = computed(() => (props.tagBg ? props.tagBg : getColor().steThemeColor));

const plus = (value: number | string, suspend: () => void, next: () => void, stop: () => void) => emits('plus', value, suspend, next, stop);
const minus = (value: number | string, suspend: () => void, next: () => void, stop: () => void) => emits('minus', value, suspend, next, stop);

const clickChecked = () => {
    if (props.checkboxDisabled) {
        return;
    }
    _checked.value = !_checked.value;
};

const showSuggest = computed(() => !!props.suggestData);

const suggesData = ref(defaultSuggestData());

watch(
    () => props.suggestData,
    val => {
        if (val) {
            suggesData.value = Object.assign(defaultSuggestData(), val || {});
        }
    },
    {
        immediate: true,
        deep: true,
    }
);

const showSuggestList = ref(false);

const suggestClick = () => (showSuggestList.value = !showSuggestList.value);
</script>
<template>
    <view class="ste-goods-info-root" :style="[rootStyle]">
        <view class="ste-goods-info-details" :class="detailClass">
            <view @click="clickChecked" class="ste-goods-info-checkbox left" v-if="checkbox === 'left'">
                <setCheckbox :disabled="checkboxDisabled" iconSize="30" :model-value="_checked" />
            </view>
            <view class="ste-goods-info-view">
                <view class="ste-goods-info-image">
                    <setImage :src="data.image" :width="imageSize" :height="imageSize" @click="onClick('image')" />
                </view>
                <view class="ste-goods-info-content">
                    <view class="ste-goods-info-header">
                        <view class="ste-goods-info-title" @click="onClick('title')">
                            <view class="ste-goods-info-tag-box" v-if="data.tag">
                                <view class="ste-goods-info-tag" :style="{ background: _tagBg }">{{ data.tag }}</view>
                            </view>
                            {{ data.title }}
                        </view>
                        <view @click="clickChecked" class="ste-goods-info-checkbox right" v-if="checkbox === 'right'">
                            <setCheckbox :disabled="checkboxDisabled" iconSize="30" :model-value="_checked" />
                        </view>
                    </view>
                    <view class="ste-goods-info-codes" @click="onClick('code')">
                        {{ data.code }}
                        <span>|</span>
                        {{ data.barCode }}
                    </view>
                    <slot>
                        <view class="ste-goods-info-slot"></view>
                    </slot>
                    <view class="ste-goods-info-price" v-if="showPriceRow">
                        <view class="ste-goods-info-price-left" v-if="!hidePrice">
                            <setPrice :value="data.price" :digits="2" bold :styleType="3" fontSize="26" @click="onClick('price')" />
                            <setPrice
                                v-if="data.originalPrice"
                                :digits="2"
                                :value="data.originalPrice"
                                isSuggestPrice
                                linePriceColor="#666666"
                                marginLeft="16"
                                fontSize="20"
                                @click="onClick('originalPrice')"
                                :showUnit="false"
                            />
                        </view>
                        <view class="ste-goods-info-price-right" v-if="stepper">
                            <steStepper
                                v-model="_number"
                                :precision="precision"
                                :step="step"
                                theme="line"
                                :min="min"
                                :max="max"
                                btnSize="40"
                                :disableInput="disableInput"
                                @change="numberChange"
                                @plus="plus"
                                @minus="minus"
                            />
                        </view>
                    </view>
                    <view class="ste-goods-info-suggest" v-if="showSuggest">
                        <view class="ste-goods-info-suggest-content">
                            <view class="ste-goods-info-suggest-content-title" @click="suggestClick">{{ suggesData.title }}</view>
                            <view class="ste-goods-info-suggest-content-number">{{ suggesData.number }}</view>
                        </view>
                        <view class="ste-goods-info-apply-for" v-if="suggesData.applyForText">
                            <view class="ste-goods-info-apply-for-text">{{ suggesData.applyForText }}：</view>
                            <view class="ste-goods-info-apply-for-number">
                                <input class="ste-goods-info-apply-for-input" v-model="suggesData.applyForNumber" />
                                <view class="ste-goods-info-apply-for-back">
                                    <ste-icon />
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="ste-goods-info-suggest-list" v-show="showSuggestList">
            <view class="ste-goods-info-suggest-list-view">
                <view class="ste-goods-info-suggest-items">
                    <block v-for="(item, index) in suggesData.items" :key="index">
                        <view class="ste-goods-info-suggest-list-line" v-if="index > 0" />
                        <view class="ste-goods-info-suggest-list-item" :style="{ width: `${suggesData.items.length > 1 ? 100 / suggesData.items.length : 100}%` }">
                            <view class="ste-goods-info-suggest-list-item-label">{{ item.label }}</view>
                            <view class="ste-goods-info-suggest-list-item-value">{{ item.value }}</view>
                        </view>
                    </block>
                </view>
                <view class="ste-goods-info-suggest-icon"></view>
            </view>
        </view>
        <image v-if="watermark" class="ste-goods-info-watermark" :style="watermarkStyle" :src="watermark" />
    </view>
</template>

<style lang="scss" scoped>
.ste-goods-info-root {
    width: 100%;
    position: relative;
    background-color: #fff;
    border-radius: 12rpx;
    .ste-goods-info-details {
        width: 100%;
        padding: 24rpx 16rpx;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .ste-goods-info-view {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .ste-goods-info-image {
                width: var(--image-size);
                height: var(--image-size);
            }
            .ste-goods-info-content {
                width: calc(100% - var(--image-size) - 8rpx);
                .ste-goods-info-header {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .ste-goods-info-title {
                        font-weight: bold;
                        font-size: 28rpx;
                        line-height: 28rpx;
                        color: #1c1f23;
                        // 文字溢出隐藏显示省略号
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .ste-goods-info-tag-box {
                            display: inline-flex;
                            margin-right: 8rpx;

                            .ste-goods-info-tag {
                                transform: translateY(-2rpx);
                                height: 26rpx;
                                line-height: 26rpx;
                                font-size: 18rpx;
                                padding: 0 8rpx;
                                background-color: #f5f5f5;
                                color: #fff;
                                border-radius: 4rpx;
                            }
                        }
                    }
                }

                .ste-goods-info-codes {
                    font-size: 22rpx;
                    color: #555a61;
                    line-height: 26rpx;
                    margin-top: 8rpx;
                }

                .ste-goods-info-slot + .ste-goods-info-price {
                    margin-top: 16rpx;
                }

                .ste-goods-info-price {
                    margin-top: 24rpx;
                    width: 100%;
                    height: 34rpx;
                    display: flex;
                    justify-content: space-between;
                }

                .ste-goods-info-suggest {
                    margin-top: 16rpx;
                    line-height: 34rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 20rpx;
                    color: #555a61;
                    .ste-goods-info-suggest-content {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .ste-goods-info-suggest-content-title {
                            padding: 0 10rpx;
                            background: #f4f5f6;
                            // #ifdef H5
                            cursor: pointer;
                            // #endif
                        }
                        .ste-goods-info-suggest-content-number {
                            margin-left: 4rpx;
                            font-size: 22rpx;
                        }
                    }
                    .ste-goods-info-apply-for {
                        display: flex;
                        .ste-goods-info-apply-for-number {
                            width: 124rpx;
                            height: 34rpx;
                            border-radius: 4rpx;
                            border: 2rpx solid #e6e8ea;
                            display: flex;
                            align-items: center;
                            .ste-goods-info-apply-for-input {
                                width: calc(100% - 32rpx);
                                height: 30rpx;
                                min-height: 30rpx;
                                font-size: 22rpx;
                                text-align: center;
                            }
                            .ste-goods-info-apply-for-back {
                                width: 32rpx;
                                border-left: 2rpx solid #e6e8ea;
                            }
                        }
                    }
                }
            }
        }

        &.checkbox {
            padding-left: 8rpx;

            &.checkboxright {
                padding-right: 8rpx;
                align-items: flex-start;
                .ste-goods-info-view .ste-goods-info-content .ste-goods-info-header .ste-goods-info-title {
                    width: calc(100% - 54rpx);
                }
            }

            &.checkboxleft {
                padding-left: 0;
                align-items: center;
                .ste-goods-info-view {
                    width: calc(100% - 54rpx);
                }
            }

            .ste-goods-info-checkbox {
                width: 46rpx;
                padding: 8rpx;
                display: flex;
                overflow: hidden;
                &.right {
                    height: 100%;
                    padding: 0 8rpx 8rpx 8rpx;
                }
            }
        }
    }

    .ste-goods-info-suggest-list {
        width: 100%;
        padding: 0 16rpx 16rpx 16rpx;
        .ste-goods-info-suggest-list-view {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 72px;
            background: #f4f5f6;
            border-radius: 4px;
            .ste-goods-info-suggest-items {
                width: calc(100% - 34rpx);
                height: 100%;
                display: flex;
                align-items: center;
                overflow-x: auto;
                .ste-goods-info-suggest-list-line {
                    width: 2rpx;
                    height: 50rpx;
                    background-color: #e6e8ea;
                    min-width: 2rpx;
                }
                .ste-goods-info-suggest-list-item {
                    text-align: center;
                    min-width: 120rpx;

                    .ste-goods-info-suggest-list-item-label {
                        font-size: 16rpx;
                        color: #888c92;
                        line-height: 22rpx;
                    }
                    .ste-goods-info-suggest-list-item-value {
                        font-size: 22rpx;
                        color: #1c1f23;
                        line-height: 22rpx;
                        margin-top: 6rpx;
                    }
                }
            }
            .ste-goods-info-suggest-icon {
                width: 34rpx;
                height: 50rpx;
                border-left: 2rpx solid #e6e8ea;
            }
        }
    }

    .ste-goods-info-watermark {
        width: 80rpx;
        height: 80rpx;
        position: absolute;
        right: 2rpx;
        bottom: 12rpx;
        opacity: 0.4;
        z-index: 10;
    }
}
</style>
