<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <page-layout title="搜索组件" contentStyle="background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">SearchBox 搜索组件</view>
            <view class="cmp-desc">集成多个功能的搜索组件</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-search-box type="date" v-model:value="value">
                    <template #right>
                        <view style="padding: 0 16rpx"><ste-icon code="&#xe69a;" color="#0275FF" size="36"></ste-icon></view>
                    </template>
                </ste-search-box>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">时间范围</view>
            <view class="item-block">
                <ste-search-box type="dateRange" v-model:value="value">
                    <template #right>
                        <view style="padding: 0 16rpx"><ste-icon code="&#xe69a;" color="#0275FF" size="36"></ste-icon></view>
                    </template>
                </ste-search-box>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">输入框字体</view>
            <view class="item-block">
                <ste-search-box type="date" v-model:value="value" textColor="#FF0000" placeholder="请输入搜索内容" placeholderColor="#FF0000">
                    <template #right>
                        <view style="padding: 0 16rpx"><ste-icon code="&#xe69a;" color="#0275FF" size="36"></ste-icon></view>
                    </template>
                </ste-search-box>
            </view>
        </view>
    </page-layout>
</template>
