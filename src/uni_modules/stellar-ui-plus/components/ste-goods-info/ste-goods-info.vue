<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import setImage from '../ste-image/ste-image.vue';
import setPrice from '../ste-price/ste-price.vue';
import steStepper from '../ste-stepper/ste-stepper.vue';
import setCheckbox from '../ste-checkbox/ste-checkbox.vue';
import { useColorStore } from '../../store/color';
import propsData from './props';

let { getColor } = useColorStore();

const props = defineProps(propsData);

const emits = defineEmits<{
    (e: 'update:number', number?: number): void;
    (e: 'update:checked', checked?: boolean): void;
    (e: 'change', data: { number?: number; checked?: boolean }): void;
    (e: 'click', type: 'image' | 'title' | 'code' | 'price' | 'originalPrice'): void;
}>();

const _number = ref(1);

const _checked = ref(false);

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

const rootClass = computed(() => ({
    checkbox: ['left', 'right'].includes(props.checkbox),
    checkboxleft: props.checkbox === 'left',
    checkboxright: props.checkbox === 'right',
}));

const numberChange = () => {
    emits('update:number', _number.value);
    emits('change', { number: _number.value });
};

const checkboxChange = () => {
    emits('update:checked', _checked.value);
    emits('change', { checked: _checked.value });
};

const onClick = (type: 'image' | 'title' | 'code' | 'price' | 'originalPrice') => {
    emits('click', type);
};

const _tagBg = computed(() => (props.tagBg ? props.tagBg : getColor().steThemeColor));
</script>
<template>
    <view class="ste-goods-info-root" :class="rootClass">
        <view class="ste-goods-info-checkbox left" v-if="checkbox === 'left'"><setCheckbox iconSize="30" v-model="_checked" @change="checkboxChange" /></view>
        <view class="ste-goods-info-image">
            <setImage :src="data.image" width="160" height="160" @click="onClick('image')" />
        </view>
        <view class="ste-goods-info-content">
            <view class="ste-goods-info-title" @click="onClick('title')">
                <view class="ste-goods-info-tag-box" v-if="data.tag">
                    <view class="ste-goods-info-tag" :style="{ background: _tagBg }">{{ data.tag }}</view>
                </view>
                {{ data.title }}
            </view>
            <view class="ste-goods-info-codes" @click="onClick('code')">
                {{ data.code }}
                <span>|</span>
                {{ data.barCode }}
            </view>
            <view class="ste-goods-info-slot">
                <slot></slot>
            </view>
            <view class="ste-goods-info-price">
                <view class="ste-goods-info-price-left">
                    <setPrice :value="data.price" :digits="2" bold :styleType="3" fontSize="26" @click="onClick('price')" />
                    <setPrice v-if="data.originalPrice" :value="data.originalPrice" isSuggestPrice linePriceColor="#666666" marginLeft="16" fontSize="20" @click="onClick('originalPrice')" />
                </view>
                <view class="ste-goods-info-price-right" v-if="stepper">
                    <steStepper v-model="_number" :precision="precision" :step="step" @change="numberChange" theme="line" :min="min" :max="max" />
                </view>
            </view>
        </view>
        <view class="ste-goods-info-checkbox right" v-if="checkbox === 'right'"><setCheckbox iconSize="30" v-model="_checked" @change="checkboxChange" /></view>
    </view>
</template>

<style lang="scss" scoped>
.ste-goods-info-root {
    width: 100%;
    background-color: #fff;
    padding: 24rpx 16rpx;
    border-radius: 12rpx;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .ste-goods-info-image {
        width: 160rpx;
        height: 160rpx;
    }
    .ste-goods-info-content {
        width: calc(100% - 176rpx);
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
                    font-size: 18rpx;
                    padding: 0 8rpx;
                    background-color: #f5f5f5;
                    color: #fff;
                    border-radius: 4rpx;
                }
            }
        }
        .ste-goods-info-slot,
        .ste-goods-info-codes {
            font-size: 22rpx;
            color: #555a61;
            line-height: 26rpx;
            margin-top: 8rpx;
        }

        .ste-goods-info-price {
            margin-top: 24rpx;
            display: flex;
            justify-content: space-between;
        }
    }

    &.checkbox {
        padding-left: 8rpx;
        .ste-goods-info-content {
            width: calc(100% - 222rpx);
        }
        .ste-goods-info-checkbox {
            width: 30rpx;
            display: flex;
            &.right {
                height: 100%;
                align-items: flex-start;
            }
        }
    }
}
</style>
