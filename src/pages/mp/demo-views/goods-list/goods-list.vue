<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
import type { RefCalendar } from '@/uni_modules/stellar-ui-plus/types/refComponents';
import utils from '@/uni_modules/stellar-ui-plus/utils/utils';
import type { SignType } from '@/uni_modules/stellar-ui-plus/components/ste-calendar/date';
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);
const show7 = ref(false);
const show8 = ref(false);
const show9 = ref(false);
const show10 = ref(false);
const show11 = ref(false);
const show12 = ref(false);
const show13 = ref(false);
let taost = useToast();
const handleConfirm = (v: (string | number)[]) => {
    taost.showToast({
        title: '确定选择：' + v.join(' '),
        icon: 'none',
        duration: 1500,
    });
};

const defaultMonth = ref<RefCalendar>();

const setViewMonth = () => {
    defaultMonth.value?.showMonth('2024-07');
};

const defaultDate = ref(utils.dayjs().format('YYYY-MM'));

const signs = reactive<{ [key: string]: SignType }>({
    [utils.dayjs().format('YYYY-MM-DD')]: [
        { content: 'XXXXX', className: 'test-signs' },
        { content: 'XXXXX', className: 'test-signs' },
        { content: 'XXXXX', className: 'test-signs' },
    ],
    [utils.dayjs(Date.now() + 1000 * 60 * 60 * 24).format('YYYY-MM-DD')]: [
        { content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
        { content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
    ],
});
</script>
<template>
    <page-layout title="商品列表" contentStyle="padding: 0">
        <view class="description">
            <view class="cmp-name">GoodsList 商品列表</view>
            <view class="cmp-desc">商品列表组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-goods-list height="720" :showTitle="false" @confirm="handleConfirm" ref="Calendar" />
        </view>
    </page-layout>
</template>
<style scoped lang="scss">
.content {
    padding: 0;

    .description {
        padding: 0 30rpx;
    }

    .type-block {
        margin: 30rpx 0;
    }

    .demo-item {
        .title {
            padding: 0 30rpx;
        }

        .item-content {
            padding: 0 30rpx;

            .demo-code {
                // display: inline-block;
                margin: 0 12rpx 12rpx 0;
            }
        }

        :deep(.test-signs) {
            color: #fff;
            background-color: #000;
        }
    }
}
</style>
