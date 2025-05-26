<script setup lang="ts">
import { ref, reactive } from 'vue';
// 筛选选项
const filterOptions = reactive([
    { title: '全部', value: 'all' },
    { title: '已打印', value: 'printed' },
    { title: '未打印', value: 'unprinted' },
    { title: '促销调价', value: 'promotion' },
    { title: '促销回调', value: 'callback' },
]);

const subFilters = reactive([
    {
        title: '调价类型',
        children: [
            { title: '促销调价', value: 'promotion' },
            { title: '促销回调', value: 'callback' },
            { title: '促销回', value: 'callba' },
            { title: '促销回调3', value: 'callback3' },
        ],
        multiple: true,
    },
    {
        title: '打印状态',
        children: [
            { title: '已打印', value: 'printed' },
            { title: '未打印', value: 'unprinted' },
        ],
    },
]);

const handleFilterClick = (item: any) => {
    console.log('点击了筛选项:', item);
};
</script>

<template>
    <page-layout title="商品列表">
        <view class="description">
            <view class="cmp-name">FilterTool 筛选选项</view>
            <view class="cmp-desc">可配置多选选项组件</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-filter-tool :filterData="filterOptions" :menu-data="subFilters" @item-click="handleFilterClick" value="all" />
            </view>
        </view>
    </page-layout>
</template>
