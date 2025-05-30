<script setup lang="ts">
import { reactive } from 'vue';
import { data1, data2, data3, data4, data21 } from './data';

const subFilters = reactive(data1);
const subFilters2 = reactive(data2);
const subFilters3 = reactive(data21);
const checkboxFilters = reactive(data3);
const checkboxFilters2 = reactive(data4);

const handleFilterClick = (item: any) => {
    console.log('点击了筛选项:', item);
};

const handleConfirm = (values: any) => {
    console.log('点击了确认按钮:', values);
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
                <view>
                    <ste-filter-tool :data="subFilters" @item-click="handleFilterClick" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>基础筛选</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
                <view>
                    <ste-filter-tool :data="subFilters2" @item-click="handleFilterClick" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>带折叠&一行数量</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
                <view>
                    <ste-filter-tool :data="subFilters3" @item-click="handleFilterClick" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>多选</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">勾选类型</view>
            <view class="item-block">
                <view>
                    <ste-filter-tool :data="checkboxFilters" filter-type="checkbox" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>带分类筛选</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
                <view>
                    <ste-filter-tool :data="checkboxFilters2" filter-type="checkbox" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>无分类筛选</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
            </view>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;
        }
        display: flex;
    }
}
</style>
