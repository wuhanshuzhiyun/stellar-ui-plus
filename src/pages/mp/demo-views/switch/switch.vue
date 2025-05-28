<template>
    <page-layout title="开关">
        <view class="description">
            <view class="cmp-name">Switch 开关</view>
            <view class="cmp-desc">用于控制某个功能的开启和关闭。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-switch v-model="value1"></ste-switch>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">只读</view>
            <view class="item-block">
                <ste-switch v-model="value2" readonly></ste-switch>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">禁用</view>
            <view class="item-block">
                <ste-switch v-model="value2" disabled></ste-switch>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义大小</view>
            <view class="item-block">
                <ste-switch v-model="value3" size="100"></ste-switch>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义颜色</view>
            <view class="item-block">
                <ste-switch v-model="value4" activeColor="#13CE66" inactiveColor="#FF4949"></ste-switch>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">加载状态</view>
            <view class="item-block">
                <ste-switch v-model="value2" loading></ste-switch>
                <view style="margin: 0 20rpx"></view>
                <ste-switch v-model="value5" loading></ste-switch>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">回调事件</view>
            <view class="item-block switch-box">
                <ste-switch v-model="value6" @click="click1" @change="change"></ste-switch>
                <text>在click事件后，执行change事件</text>
                <ste-switch v-model="value7" @click="click2" @change="change"></ste-switch>
                <text>在click事件后，阻止change事件</text>
            </view>
        </view>
    </page-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
let value1 = ref(false);
let value2 = ref(true);
let value3 = ref(false);
let value4 = ref(false);
let value5 = ref(false);
let value6 = ref(false);
let value7 = ref(false);

function click1(value: any) {
    toast.showToast({
        icon: 'none',
        title: `点击：${value} 开关的值`,
    });
}

function click2(value: any, allowStop: any, resolve: any) {
    toast.showToast({
        icon: 'none',
        title: `点击：${value} 开关的值`,
    });
    // 阻止change事件
    allowStop();
}
function change(value: any) {
    setTimeout(() => {
        toast.showToast({
            icon: 'none',
            title: `改变：${value} 开关的值`,
        });
    }, 1000);
}
</script>

<style lang="scss" scoped>
.switch-box {
    flex-direction: column !important;
    row-gap: 20rpx;
    align-items: flex-start !important;
    justify-content: center;
}
</style>
