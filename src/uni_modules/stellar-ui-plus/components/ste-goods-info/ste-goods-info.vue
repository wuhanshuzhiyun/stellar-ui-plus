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
    (e: 'change', change: { number?: number; checked?: boolean; applyForNumber?: number }, data: GoodsInfoType): void;
    (e: 'click', type: 'empty' | 'image' | 'title' | 'code' | 'price' | 'originalPrice' | 'stepper'): void;
    (e: 'plus', value: number | string, suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'minus', value: number | string, suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'click-suggest', type: 'method' | 'back' | 'item' | 'right', item?: { label: string; value: string | number }): void;
    (e: 'click-suggest-input'): void;
    (e: 'click-stepper-input'): void;
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
        background: props.background,
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

const onClick = (type: 'empty' | 'image' | 'title' | 'code' | 'price' | 'originalPrice' | 'stepper') => {
    emits('click', type);
};

const _tagBg = computed(() => (props.tagBg ? props.tagBg : getColor().steThemeColor));

const plus = (value: number | string, suspend: () => void, next: () => void, stop: () => void) => {
    emits('plus', value, suspend, next, stop);
};
const minus = (value: number | string, suspend: () => void, next: () => void, stop: () => void) => {
    emits('minus', value, suspend, next, stop);
};

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

// 记录applyForNumber变化历史
const applyForNumberHistory = ref<number[]>([]);

let timeout: any = 0;
const setApplyForNumberHistory = (v: number) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        applyForNumberHistory.value.push(v);
    }, 300);
};

watch(
    () => suggesData.value.applyForNumber,
    (v, old) => {
        emits('change', { applyForNumber: v }, props.data);
        if (old !== undefined && old !== v) {
            setApplyForNumberHistory(old);
        }
    }
);
const clickSuggest = (type: 'method' | 'back' | 'item' | 'right', item?: { label: string; value: string | number }) => {
    if (type === 'method') {
        showSuggestList.value = !showSuggestList.value;
    }
    if (type === 'back' && applyForNumberHistory.value.length > 0) {
        suggesData.value.applyForNumber = applyForNumberHistory.value.pop();
    }
    emits('click-suggest', type, item);
};

const clickStepperInput = () => emits('click-stepper-input');
const clickSuggestInput = () => emits('click-suggest-input');

const viewClass = computed(() => {
    const imgSize = utils.formatPx<'num'>(props.imageSize, 'num');
    return {
        'big-image': imgSize > 60,
        '--image-size': `${imgSize}px`,
    };
});

const cmpMore = computed(() => props.mode === 'more');
</script>
<template>
    <view class="ste-goods-info-root" :class="{ less: mode === 'less' }" :style="[rootStyle]">
        <view class="ste-goods-info-details" :class="detailClass">
            <view v-if="cmpMore && checkbox === 'left'" @click="clickChecked" class="ste-goods-info-checkbox left">
                <setCheckbox :disabled="checkboxDisabled" iconSize="30" :model-value="_checked" />
            </view>
            <view class="ste-goods-info-view" :class="viewClass" @click="onClick('empty')">
                <view class="ste-goods-info-image" @click.stop="onClick('image')">
                    <setImage v-if="cmpMore" :radius="imageRadius" :src="data.image" :width="imageSize" :height="imageSize" />
                    <setImage v-else :radius="imageRadius" :src="data.image" width="176" height="240" />
                </view>
                <view class="ste-goods-info-content">
                    <view class="content-header">
                        <view class="ste-goods-info-header">
                            <view class="ste-goods-info-title" :style="[titleStyle]" @click.stop="onClick('title')">
                                <view class="ste-goods-info-tag-box" v-if="data.tag">
                                    <view class="ste-goods-info-tag" :style="{ background: _tagBg }">{{ data.tag }}</view>
                                </view>
                                {{ data.title }}
                            </view>
                            <view v-if="cmpMore && checkbox === 'right'" @click="clickChecked" class="ste-goods-info-checkbox right">
                                <setCheckbox :disabled="checkboxDisabled" iconSize="30" :model-value="_checked" />
                            </view>
                        </view>
                        <view class="ste-goods-info-codes" v-if="cmpMore && (data.code || data.barCode)" @click.stop="onClick('code')">
                            {{ data.code }}
                            <span style="color: #e6e8ea" v-if="data.code && data.barCode">|</span>
                            {{ data.barCode }}
                        </view>
                        <slot>
                            <view class="ste-goods-info-sub-title">{{ data.subTitle }}</view>
                        </slot>
                    </view>
                    <view class="content-footer">
                        <view class="ste-goods-info-price" v-if="showPriceRow">
                            <view class="ste-goods-info-price-left">
                                <block v-if="!hidePrice">
                                    <view @click.stop="onClick('price')">
                                        <setPrice :value="data.price" :digits="2" bold :styleType="3" :line-price-color="priceColor" :fontSize="priceSize" />
                                    </view>
                                    <view @click.stop="onClick('originalPrice')">
                                        <setPrice
                                            v-if="data.originalPrice"
                                            :digits="2"
                                            :value="data.originalPrice"
                                            isSuggestPrice
                                            line-price-color="#666666"
                                            :marginLeft="cmpMore ? 16 : 10"
                                            :fontSize="cmpMore ? 20 : 24"
                                            :showUnit="false"
                                        />
                                    </view>
                                </block>
                            </view>
                            <view class="ste-goods-info-price-right" @click.stop="onClick('stepper')">
                                <slot name="stepper">
                                    <view v-if="stepper" :class="{ readonly: readonlyStepper }" @click.stop="true">
                                        <steStepper
                                            v-model="_number"
                                            :precision="precision"
                                            :step="step"
                                            theme="line"
                                            :min="min"
                                            :max="max"
                                            btnSize="40"
                                            :disabled="disabledStepper"
                                            :disableInput="disableInput"
                                            :disablePlus="disablePlus"
                                            :disableMinus="disableMinus"
                                            :readonlyInput="readonlyStepperInput"
                                            @change="numberChange"
                                            @plus="plus"
                                            @minus="minus"
                                            @click-input="clickStepperInput"
                                        />
                                    </view>
                                </slot>
                            </view>
                        </view>
                        <view class="ste-goods-info-suggest" v-if="cmpMore && showSuggest">
                            <view class="ste-goods-info-suggest-method" @click="clickSuggest('method')">
                                <view class="ste-goods-info-suggest-method-title">
                                    <text class="suggest-method-title-text">
                                        {{ suggesData.title }}
                                    </text>
                                    <view class="suggest-method-title-icon" />
                                </view>
                                <view class="ste-goods-info-suggest-method-number">{{ suggesData.number }}</view>
                            </view>
                            <view class="ste-goods-info-apply-for" v-if="suggesData.applyForText">
                                <view class="ste-goods-info-apply-for-text">{{ suggesData.applyForText }}：</view>
                                <view class="ste-goods-info-apply-for-number">
                                    <view class="ste-goods-info-apply-for-input" @click.stop="clickSuggestInput">
                                        <input
                                            class="ste-goods-info-apply-for-input"
                                            placeholder="请输入"
                                            placeholder-style="font-size:22rpx;color:#ccc"
                                            :class="{ readonly: readonlySuggestInput }"
                                            type="number"
                                            v-model="suggesData.applyForNumber"
                                        />
                                    </view>
                                    <view class="ste-goods-info-apply-for-back" @click="clickSuggest('back')">
                                        <ste-icon code="&#xe632;" size="16" />
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view v-if="cmpMore" class="ste-goods-info-suggest-list" v-show="showSuggestList">
            <view class="ste-goods-info-suggest-list-view">
                <view class="ste-goods-info-suggest-items">
                    <block v-for="(item, index) in suggesData.items" :key="index">
                        <view class="ste-goods-info-suggest-list-line" v-if="index > 0" />
                        <view class="ste-goods-info-suggest-list-item" :style="{ width: `${suggesData.items.length > 1 ? 100 / suggesData.items.length : 100}%` }" @click="clickSuggest('item', item)">
                            <view class="ste-goods-info-suggest-list-item-label">{{ item.label }}</view>
                            <view class="ste-goods-info-suggest-list-item-value">{{ item.value }}</view>
                        </view>
                    </block>
                </view>
                <view class="ste-goods-info-suggest-icon" @click="clickSuggest('right')">
                    <ste-icon code="&#xe674;" size="20" />
                </view>
            </view>
        </view>
        <image v-if="cmpMore && watermark" class="ste-goods-info-watermark" :style="watermarkStyle" :src="watermark" />
    </view>
</template>

<style lang="scss" scoped>
.ste-goods-info-root {
    width: 100%;
    position: relative;
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
            &.big-image {
                .ste-goods-info-content {
                    width: calc(100% - var(--image-size) - 16rpx);
                }
            }
            .ste-goods-info-image {
                width: var(--image-size);
                height: var(--image-size);
            }
            .ste-goods-info-content {
                width: calc(100% - var(--image-size) - 8rpx);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
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
                        padding-bottom: 2rpx;
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
                    margin-top: 6rpx;
                }

                .ste-goods-info-sub-title {
                    font-weight: 500;
                    font-size: 24rpx;
                    color: #757575;
                    margin-top: 12rpx;
                    line-height: 36rpx;
                    // 三行溢出隐藏
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }

                .ste-goods-info-price {
                    width: 100%;
                    line-height: 34rpx;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .ste-goods-info-price-left {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                    }

                    .ste-goods-info-price-right .readonly {
                        pointer-events: none;
                    }
                    & + .ste-goods-info-suggest {
                        margin-top: 16rpx;
                    }
                }

                .ste-goods-info-suggest {
                    line-height: 40rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 22rpx;
                    color: #555a61;
                    .ste-goods-info-suggest-method {
                        min-width: 180rpx;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .ste-goods-info-suggest-method-title {
                            padding: 0 10rpx;
                            background: #f4f5f6;
                            // #ifdef H5
                            cursor: pointer;
                            // #endif
                            position: relative;
                            overflow: hidden;
                            .suggest-method-title-text {
                                position: relative;
                                z-index: 5;
                            }
                            .suggest-method-title-icon {
                                position: absolute;
                                z-index: 5;
                                width: 12rpx;
                                height: 12rpx;
                                background: #555a61;
                                bottom: -6rpx;
                                right: -6rpx;
                                transform: rotate(45deg);
                            }
                        }
                        .ste-goods-info-suggest-method-number {
                            margin-left: 4rpx;
                            font-size: 24rpx;
                        }
                    }
                    .ste-goods-info-apply-for {
                        display: flex;
                        .ste-goods-info-apply-for-number {
                            width: 150rpx;
                            height: 40rpx;
                            border-radius: 4rpx;
                            border: 2rpx solid #e6e8ea;
                            display: flex;
                            align-items: center;
                            .ste-goods-info-apply-for-input {
                                width: calc(100% - 48rpx);
                                height: 36rpx;
                                min-height: 36rpx;
                                font-size: 24rpx;
                                text-align: center;
                                &.readonly {
                                    pointer-events: none;
                                }
                                .ste-goods-info-apply-for-input {
                                    width: 100%;
                                }
                            }
                            .ste-goods-info-apply-for-back {
                                width: 48rpx;
                                border-left: 2rpx solid #e6e8ea;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
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
            height: 90rpx;
            background: #f4f5f688;
            border-radius: 4px;
            .ste-goods-info-suggest-items {
                width: calc(100% - 48rpx);
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
                        font-size: 20rpx;
                        color: #888c92;
                        line-height: 24rpx;
                    }
                    .ste-goods-info-suggest-list-item-value {
                        font-size: 24rpx;
                        color: #1c1f23;
                        line-height: 26rpx;
                        margin-top: 6rpx;
                    }
                }
            }
            .ste-goods-info-suggest-icon {
                width: 48rpx;
                height: 50rpx;
                border-left: 2rpx solid #e6e8ea;
                display: flex;
                align-items: center;
                justify-content: center;
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
        pointer-events: none;
    }
}
</style>
<style lang="scss" scoped>
.ste-goods-info-root.less {
    .ste-goods-info-details {
        padding: 16rpx !important;

        .ste-goods-info-view {
            .ste-goods-info-image {
                width: 176rpx;
                height: 240rpx;
            }
            .ste-goods-info-content {
                width: calc(100% - 200rpx);

                .ste-goods-info-header {
                    .ste-goods-info-title {
                        color: #171717;
                    }
                }
            }
        }

        &.checkbox {
            &.checkboxright {
                .ste-goods-info-view .ste-goods-info-content .ste-goods-info-header .ste-goods-info-title {
                    width: 100%;
                }
            }

            &.checkboxleft {
                .ste-goods-info-view {
                    width: 100%;
                }
            }
        }
    }
}
</style>
