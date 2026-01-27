<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
const props = defineProps({
    discounts: {
        type: Array as PropType<number[]>,
        default: () => [],
    },
});

const viewValue = (v: number) => {
    const n = Math.floor(v / 10);
    const d = v % 10;
    return { n, d, v };
};

const discountList = computed(() => (props.discounts || []).map(v => viewValue(v)));

const emit = defineEmits(['header-click']);

const headerClick = (v: number) => {
    emit('header-click', v);
};
</script>
<template>
    <view class="discount-btns" v-if="discounts?.length">
        <view class="discount-item" v-for="item in discountList" :key="item.v" @click="headerClick(item.v)">
            <text class="discount-n">{{ item.n }}</text>
            <text class="discount-d" v-if="item.d">{{ item.d }}</text>
            <text class="discount-t">折</text>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.discount-btns {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .discount-item {
        min-width: 120rpx;
        text-align: center;
        padding: 6rpx 24rpx;
        margin: 0 18rpx 18rpx 0;
        color: #fff;
        border-radius: 4px;
        cursor: default;
        background-color: var(--ste-number-keyboard-confirm-bg);
        color: var(--ste-number-keyboard-confirm-color);
        .discount-d {
            font-size: 24rpx;
            margin-left: 3rpx;
        }
        .discount-t {
            margin-left: 6rpx;
        }
        &:active {
            opacity: 0.8;
        }
    }
}
</style>
