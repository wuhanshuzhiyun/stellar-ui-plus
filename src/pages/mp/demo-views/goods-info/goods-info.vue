<script setup lang="ts">
import { ref, watch } from 'vue';

const data = ref({
    image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
    title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
    tag: '新品',
    code: '123456',
    barCode: '1234567890123',
    price: '88800',
    originalPrice: '99900',
});
const number = ref(10);
watch(
    () => number.value,
    v => {
        console.log(v);
    }
);
const checked = ref(false);
watch(
    () => checked.value,
    v => {
        console.log(v);
    }
);
const onChange = (d: { number?: number; checked?: boolean }) => {
    let msg = '';
    if (d.number !== undefined) {
        msg = `当前数量为：${d.number}`;
    }
    if (d.checked !== undefined) {
        msg = `当前选中状态为：${d.checked}`;
    }
    uni.showToast({
        title: msg,
        icon: 'none',
    });
};

const onClick = (type: 'image' | 'title' | 'code' | 'price' | 'originalPrice') => {
    uni.showToast({
        title: `点击了${type}`,
        icon: 'none',
    });
};
</script>
<template>
    <page-layout title="商品信息" contentStyle="padding: 12rpx;background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">GoodsList 商品信息</view>
            <view class="cmp-desc">商品信息组件用于展示商品信息</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-goods-info :data="data" />
        </view>
        <view class="demo-item">
            <view class="title">显示选择框</view>
            <ste-goods-info checkbox="right" v-model:checked="checked" :data="data" @change="onChange" />
        </view>
        <view class="demo-item">
            <view class="title">显示步进器</view>
            <ste-goods-info :data="data" stepper v-model:number="number" @change="onChange" />
        </view>
        <view class="demo-item">
            <view class="title">插槽</view>
            <ste-goods-info :data="data">插槽内容</ste-goods-info>
        </view>
        <view class="demo-item">
            <view class="title">点击事件</view>
            <ste-goods-info :data="data" @click="onClick" />
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
