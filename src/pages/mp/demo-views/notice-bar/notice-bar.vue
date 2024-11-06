<template>
    <page-layout title="公告栏" contentStyle="background: #fcfcfc;">
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-notice-bar :list="list"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义样式</view>
            <view class="item-block">
                <ste-notice-bar :list="list" background="#FBF8DC" color="red" :width="400"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">垂直滚动</view>
            <view class="item-block">
                <ste-notice-bar :list="list2" direction="vertical"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">滚动速率</view>
            <view class="item-block">
                <ste-notice-bar :list="list" :acrossSpeed="10"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">滚动的速度</view>
            <view class="item-block">
                <ste-notice-bar :list="list2" direction="vertical" :verticalSpeed="2000"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">延时滚动</view>
            <view class="item-block notice-bar">
                <ste-notice-bar :list="list" :delay="10000"></ste-notice-bar>
                <ste-notice-bar :list="list2" direction="vertical" :delay="10000"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">停留时间</view>
            <view class="item-block">
                <ste-notice-bar :list="list2" direction="vertical" :standTime="5000"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">是否可以滚动</view>
            <view class="item-block notice-bar">
                <ste-notice-bar :list="list" :scrollable="false"></ste-notice-bar>
                <ste-notice-bar :list="list2" direction="vertical" :scrollable="false"></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">关闭按钮</view>
            <view class="item-block">
                <ste-notice-bar :list="list" closeMode></ste-notice-bar>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">插槽</view>
            <view class="item-block">
                <ste-notice-bar :list="list">
                    <template #leftIcon>
                        <ste-icon color="#000000" code="&#xe682;" size="32"></ste-icon>
                    </template>
                    <template #rightIcon>
                        <ste-icon color="#000000" code="&#xe696;" size="32"></ste-icon>
                    </template>
                </ste-notice-bar>
            </view>
        </view>
    </page-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let list = ref(['第一条:1111111111111111111111111111', '第二条:2222222222222222222222', '第三条:3333333333333']);
let list2 = ref(['第一条:111', '第二条:222', '第三条:333', '第四条:444']);
</script>

<style lang="scss" scoped>
.notice-bar {
    flex-direction: row;
    row-gap: 10px;
}
</style>
