<script setup lang="ts">
import { ref, watch, onMounted, computed, nextTick } from 'vue';
import setImage from '../ste-image/ste-image.vue';
import setPrice from '../ste-price/ste-price.vue';
import steStepper from '../ste-stepper/ste-stepper.vue';
import propsData from './props';
import { useColorStore } from '../../store/color';

let { getColor } = useColorStore();

const props = defineProps(propsData);

const emits = defineEmits<{
    (e: 'update:number', value?: number): void;
}>();

const _number = ref(1);

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

const numberChange = () => {
    emits('update:number', _number.value);
};

const _tagBg = computed(() => (props.tagBg ? props.tagBg : getColor().steThemeColor));
</script>
<template>
    <view class="ste-goods-info-root" :class="{ checkboxleft: checkboxPositions === 'left', checkboxright: checkboxPositions === 'right' }">
        <view class="ste-goods-info-left" v-if="checkboxPositions === 'left'"></view>
        <view class="ste-goods-info-image">
            <setImage :src="data.image" width="160" height="160" />
        </view>
        <view class="ste-goods-info-content">
            <view class="ste-goods-info-title">
                <view class="ste-goods-info-tag" v-if="data.tag" :style="{ background: _tagBg }">{{ data.tag }}</view>
                {{ data.title }}
            </view>
            <view class="ste-goods-info-codes">
                {{ data.code }}
                <span>|</span>
                {{ data.barCode }}
            </view>
            <view class="ste-goods-info-slot">
                <slot></slot>
            </view>
            <view class="ste-goods-info-price">
                <view class="ste-goods-info-price-left">
                    <setPrice :value="data.price" :digits="2" bold :styleType="3" fontSize="26" />
                    <setPrice v-if="data.originalPrice" :value="data.originalPrice" isSuggestPrice linePriceColor="#666666" marginLeft="16" fontSize="20" />
                </view>
                <view class="ste-goods-info-price-right" v-if="stepper">
                    <steStepper v-model="_number" :precision="precision" :step="step" @change="numberChange" theme="line" :min="min" :max="max" />
                </view>
            </view>
        </view>
        <view class="ste-goods-info-right" v-if="checkboxPositions === 'right'"></view>
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
            // 文字向下对其
            vertical-align: bottom;

            .ste-goods-info-tag {
                height: 26rpx;
                font-size: 18rpx;
                padding: 0 8rpx;
                display: inline-block;
                background-color: #f5f5f5;
                color: #fff;
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
}
</style>
