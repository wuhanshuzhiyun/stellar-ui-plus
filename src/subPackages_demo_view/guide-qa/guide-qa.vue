<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
    {
        id: 0,
        question: '如何快速上手这个组件？',
        answer: '请查看我们的快速入门指南，按照步骤操作即可。请查看我们的快速入门指南，按照步骤操作即可。',
    },
    {
        id: 1,

        question: '支持哪些浏览器？',
        answer: '支持 Chrome 80+、Firefox 78+、Safari 14+、Edge 88+ 等现代浏览器。支持 Chrome 80+、Firefox 78+、Safari 14+、Edge 88+ 等现代浏览器。',
    },
    {
        id: 2,

        question: '如何自定义样式？',
        answer: '可以通过 CSS 变量或者传入自定义的 class 来覆盖默认样式。可以通过 CSS 变量或者传入自定义的 class 来覆盖默认样式。',
    },
    {
        id: 3,

        question: '遇到问题如何反馈？',
        answer: '可以通过 GitHub Issues 或者官方交流群进行反馈。可以通过 GitHub Issues 或者官方交流群进行反馈。',
    },
]);

const handleClick1 = () => {
    console.log('点击所有');
};

const handleClick2 = (type: any, item: any) => {
    console.log('点击', type, item);
};
</script>

<template>
    <page-layout title="引导服务区" contentStyle="background: #F9F9F9;">
        <view class="description">
            <view class="cmp-name">GuideQA 引导服务区</view>
            <view class="cmp-desc">问答</view>
        </view>
        <view class="demo-item">
            <view class="title">简单模式</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-guide-qa :data="data" @click-all="handleClick1"></ste-guide-qa>
                </view>
            </view>
            <view class="title">完整模式</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-guide-qa :data="data" mode="2" @click-item="handleClick2"></ste-guide-qa>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        margin-bottom: 16rpx;
    }
}
</style>
