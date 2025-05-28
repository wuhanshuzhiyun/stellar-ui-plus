<script setup lang="ts">
import { ref } from 'vue';

const value2 = ref('1');
const value3 = ref('12');

function change(e: string | number) {
    console.log('change', e);
}

function finish(e: string | number) {
    console.log('change', e);
}
</script>

<template>
    <page-layout title="验证码输入">
        <view class="description">
            <view class="cmp-name">CodeInput 验证码输入</view>
            <view class="cmp-desc">用于验证码输入或短密码输入</view>
        </view>
        <view class="demo-item">
            <view class="type-block">
                <view>01 组件类型</view>
            </view>
            <view class="title">基础使用</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-code-input :maxlength="4" @change="change" @finish="finish"></ste-code-input>
                </view>
                <view style="width: 100%">
                    <ste-code-input :maxlength="4" borderColor="rgba(0, 0, 0,0)"></ste-code-input>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">横线模式</view>
            <view class="item-block">
                <view>
                    <ste-code-input mode="line" :maxlength="4"></ste-code-input>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">设置长度</view>
            <view class="item-block">
                <view>
                    <ste-code-input :maxlength="5"></ste-code-input>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">设置间距</view>
            <view class="item-block">
                <view>
                    <ste-code-input mode="box" :space="0" :maxlength="4"></ste-code-input>
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">调整颜色</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-code-input :maxlength="4" fontColor="#f56c6c" borderColor="#f56c6c"></ste-code-input>
                </view>
                <view style="width: 100%">
                    <ste-code-input mode="line" :maxlength="4" fontColor="#0090FF" borderColor="#0090FF"></ste-code-input>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义显示</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-code-input v-model="value2" formatter="·" fontSize="100" :maxlength="4"></ste-code-input>
                </view>
                <view style="width: 100%">
                    <ste-code-input v-model="value3" mode="line" formatter="*" :maxlength="4"></ste-code-input>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view:not(:last-child) {
            margin: 0 16rpx 32rpx 0;
        }
    }
}
</style>
