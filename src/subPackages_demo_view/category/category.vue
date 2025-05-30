<script setup lang="ts">
import { reactive } from 'vue';

const data1 = reactive([
    { title: '全部商品', value: 'all', count: 11 },
    { title: '零食', value: 'linghsi', count: 3 },
    { title: '清洁用品', value: 'qingjie', count: 4 },
    { title: '粮油', value: 'liangyou', count: 10 },
    { title: '肉类', value: 'roulei', count: 12 },
    { title: '水果', value: 'shuiguo', count: 13 },
]);
// const handleFilterClick = (item: any) => {
//     console.log('点击了筛选项:', item);
// };

// const handleConfirm = (values: any) => {
//     console.log('点击了确认按钮:', values);
// };
</script>

<template>
    <page-layout title="分类列表">
        <view class="description">
            <view class="cmp-name">Category 分类列表</view>
            <view class="cmp-desc">分类列表</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <view>
                    <ste-category :data="data1"></ste-category>
                </view>
                <view>
                    <ste-category :data="data1">
                        <template v-slot="{ item }">
                            <view>
                                <text>({{ item.count }}/100)</text>
                                <ste-icon code="&#xe6c7;" color="#000" size="24" />
                            </view>
                        </template>
                    </ste-category>
                </view>
            </view>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            height: 500rpx;
            // width: 500rpx;
            margin: 0 36rpx 36rpx 0;
            padding-top: 16rpx;
        }
        display: flex;
    }
}
</style>
