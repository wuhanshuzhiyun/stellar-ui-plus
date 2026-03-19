<script setup lang="ts">
import { ref } from 'vue';

const handleClick = (dateInfo: any) => {
    console.log('点击日期:', dateInfo);
};
</script>

<template>
    <page-layout title="简单日历">
        <view class="description">
            <view class="cmp-name">SimpleCalendar 简单日历</view>
            <view class="cmp-desc">轻量级日期展示组件，由日期数字、星期、年月三部分组成。点击可弹出日历选择日期。</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">默认样式（点击弹出日历）</view>
            <view class="item-block">
                <ste-simple-calendar />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">指定日期</view>
            <view class="item-block">
                <ste-simple-calendar date="2026-02-24" />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">禁用日历弹窗</view>
            <view class="item-block">
                <ste-simple-calendar :showCalendar="false" @click="handleClick" />
            </view>
        </view>
        <view class="type-block">
            <view>02 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">自定义格式</view>
            <view class="item-block">
                <ste-simple-calendar formatter="YYYY/MM" />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义颜色</view>
            <view class="item-block">
                <ste-simple-calendar color="#0090FF" />
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped></style>
