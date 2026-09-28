<script setup lang="ts">
import { ref, reactive } from 'vue';
import { data1, data2, data3, data4, data21, data5, data6 } from './data';

const subFilters = reactive(data1);
const subFilters2 = reactive(data2);
const subFilters3 = reactive(data21);
const checkboxFilters = reactive(data3);
const checkboxFilters2 = reactive(data4);

const randomFilters = reactive(data5);
const inputFilters = reactive(data6);

const confirmDisabled = ref(true);
const disabledFilters = reactive(data3);

const handleFilterClick = (item: any) => {
    console.log('点击了筛选项:', item);
    confirmDisabled.value = false;
};

const handleConfirm = (values: any) => {
    console.log('点击了确认按钮:', values);
};
</script>

<template>
    <page-layout title="筛选选项">
        <view class="description">
            <view class="cmp-name">FilterTool 筛选选项</view>
            <view class="cmp-desc">可配置多选选项组件</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <view>
                    <ste-filter-tool
                        :data="subFilters"
                        @item-click="handleFilterClick"
                        @confirm="handleConfirm"
                        offset-top="20"
                        :value="[
                            {
                                key: 'category',
                                values: ['beauty'],
                            },
                        ]"
                    >
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
            <view class="title">输入框类型</view>
            <view class="item-block">
                <view>
                    <ste-filter-tool :data="inputFilters" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>按名称筛选</text>
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
                    <ste-filter-tool :data="checkboxFilters2" filter-type="checkbox" @confirm="handleConfirm" :show-category="false">
                        <view style="font-size: 24rpx">
                            <text>无分类筛选</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
                <view>
                    <ste-filter-tool filter-type="calendar" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>日历筛选</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">无规则排列</view>
            <view class="item-block">
                <view>
                    <ste-filter-tool :data="randomFilters" @confirm="handleConfirm" :show-category="false">
                        <view style="font-size: 24rpx">
                            <text>无规则</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                    </ste-filter-tool>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义菜单内容</view>
            <view class="item-block">
                <view>
                    <ste-filter-tool>
                        <view style="font-size: 24rpx">
                            <text>自定义菜单</text>
                            <ste-icon code="&#xe6c7;" color="#000" size="24" />
                        </view>
                        <template #content>
                            <view class="custom-menu-content">
                                <view class="custom-menu-options">
                                    <view class="custom-menu-option active">推荐</view>
                                    <view class="custom-menu-option">最新</view>
                                    <view class="custom-menu-option">价格优先</view>
                                </view>
                            </view>
                        </template>
                    </ste-filter-tool>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">禁用确认按钮</view>
            <view class="item-block">
                <view>
                    <ste-filter-tool :data="disabledFilters" filter-type="checkbox" :confirmDisabled="confirmDisabled" @item-click="handleFilterClick" @confirm="handleConfirm">
                        <view style="font-size: 24rpx">
                            <text>选择后可确认</text>
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

.custom-menu-content {
    padding: 24rpx;

    .custom-menu-title {
        color: #1d2129;
        font-size: 28rpx;
        font-weight: 500;
    }

    .custom-menu-options {
        display: flex;
        gap: 16rpx;
        margin-top: 24rpx;
    }

    .custom-menu-option {
        padding: 12rpx 20rpx;
        color: #555a61;
        font-size: 24rpx;
        background: #f4f5f6;
        border-radius: 8rpx;

        &.active {
            color: #0275ff;
            background: #e6f2ff;
        }
    }
}
</style>
