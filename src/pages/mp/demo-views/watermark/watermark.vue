<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<template>
    <page-layout title="水印">
        <view class="description">
            <view class="cmp-name">Watermark 水印</view>
            <view class="cmp-desc">当需要对文本、图片或页面等进行版权说明、所属权标识或防盗用时使用。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view><ste-button @click="show = !show">水印</ste-button></view>
                <ste-watermark v-if="show"></ste-watermark>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">多行水印</view>
            <view class="item-block" style="height: 150px; width: 400px">
                <ste-watermark :content="['watermark+', 'ste-watermark']" :fullPage="false"></ste-watermark>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">图片水印</view>
            <view class="item-block" style="height: 150px; width: 400px">
                <ste-watermark image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original" :full-page="false"></ste-watermark>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped></style>
