<script setup lang="ts">
import { ref } from 'vue';

// 基础选项列表
const list1 = [
    { label: '全部订单', value: 'all' },
    { label: '待付款', value: 'pending' },
    { label: '待发货', value: 'unshipped' },
    { label: '待收货', value: 'unreceived' },
    { label: '已完成', value: 'completed' },
];

// 带禁用选项的列表
const list2 = [
    { label: '全部订单', value: 'all' },
    { label: '待付款', value: 'pending', disabled: true },
    { label: '待发货', value: 'unshipped', disabled: true },
    { label: '待收货', value: 'unreceived' },
    { label: '已完成', value: 'completed' },
];

// 自定义字段名的列表
const list3 = [
    { name: '全部订单', id: 'all' },
    { name: '待付款', id: 'pending' },
    { name: '待发货', id: 'unshipped' },
];

// 绑定的值
const value1 = ref('all');
const value2 = ref('all');
const value3 = ref('all');
const value4 = ref('all');

// 事件回调
const onChange = (val: string | number | undefined, option: any) => {
    console.log('change:', val, option);
    uni.showToast({
        title: `选中: ${val}`,
        icon: 'none'
    });
};

const onModelChange = (val: string | number | undefined) => {
    console.log('modelValue changed:', val);
};
</script>
<template>
    <page-layout title="订单选择">
        <view class="description">
            <view class="cmp-name">SelectOrder 订单选择</view>
            <view class="cmp-desc">用于选择订单状态的下拉选择组件。</view>
        </view>
        <view class="type-block">
            <view>01 基础用法</view>
        </view>
        <view class="demo-item">
            <view class="title">默认选中</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value1"></ste-select-order>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">未选中状态</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value4"></ste-select-order>
            </view>
        </view>
        <view class="type-block">
            <view>02 事件监听</view>
        </view>
        <view class="demo-item">
            <view class="title">change 事件</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value1" @change="onChange"></ste-select-order>
            </view>
            <view class="desc">选择选项时触发 change 事件，返回选中的值和选项对象</view>
        </view>
        <view class="demo-item">
            <view class="title">update:modelValue 事件</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value1" @update:modelValue="onModelChange"></ste-select-order>
            </view>
            <view class="desc">v-model 绑定值变化时触发</view>
        </view>
        <view class="type-block">
            <view>03 禁用状态</view>
        </view>
        <view class="demo-item">
            <view class="title">组件禁用</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value1" disabled></ste-select-order>
            </view>
            <view class="desc">disabled 属性设置为 true 时，整个组件被禁用</view>
        </view>
        <view class="demo-item">
            <view class="title">单项禁用</view>
            <view class="item-block">
                <ste-select-order :list="list2" v-model="value2"></ste-select-order>
            </view>
            <view class="desc">选项中 disabled 属性为 true 的选项不可选择（灰色显示）</view>
        </view>
        <view class="type-block">
            <view>04 自定义配置</view>
        </view>
        <view class="demo-item">
            <view class="title">自定义字段名</view>
            <view class="item-block">
                <ste-select-order :list="list3" v-model="value3" label-key="name" value-key="id"></ste-select-order>
            </view>
            <view class="desc">通过 labelKey 和 valueKey 自定义选项的字段名</view>
        </view>
        <view class="demo-item">
            <view class="title">自定义占位符</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value4" placeholder="请选择订单状态"></ste-select-order>
            </view>
            <view class="desc">通过 placeholder 属性自定义占位符文本</view>
        </view>
        <view class="type-block">
            <view>05 遮罩控制</view>
        </view>
        <view class="demo-item">
            <view class="title">点击遮罩关闭（默认）</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value1" mask-close></ste-select-order>
            </view>
            <view class="desc">maskClose 默认值为 true，点击遮罩层关闭弹窗</view>
        </view>
        <view class="demo-item">
            <view class="title">点击遮罩不关闭</view>
            <view class="item-block">
                <ste-select-order :list="list1" v-model="value1" :mask-close="false"></ste-select-order>
            </view>
            <view class="desc">maskClose 设置为 false，点击遮罩层不会关闭弹窗，只能选择选项或再次点击标题关闭</view>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                background-color: #fff;
                border-radius: 16rpx;
                padding: 0 24rpx;
            }
            .desc {
                font-size: 24rpx;
                color: #999;
                margin-top: 16rpx;
                padding: 0 16rpx;
            }
        }
    }
}
</style>