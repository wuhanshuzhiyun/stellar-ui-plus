<script lang="ts" setup>
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
const toast = useToast();

function backClick() {
    toast.showToast({
        icon: 'none',
        title: '导航栏点击事件',
    });
}
</script>

<template>
    <page-layout title="导航栏">
        <view class="description">
            <view class="cmp-name">Navbar 导航栏</view>
            <view class="cmp-desc">提供导航功能，常用于页面顶部。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view>
                    <ste-navbar title="标题">插槽</ste-navbar>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">返回按钮配置</view>
            <view class="item-block">
                <view>
                    <ste-navbar title="隐藏返回按钮" :autoBack="false"></ste-navbar>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-navbar title="返回按钮各配置" backColor="red" backCode="&#xe68d;" backBackgroundColor="green" backBorderColor="blue" :backOpacity="0.4"></ste-navbar>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">标题配置</view>
            <view class="item-block">
                <view>
                    <ste-navbar title="标题各配置" titleColor="red" :titleAlignment="2" :zIndex="100"></ste-navbar>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">导航栏配置</view>
            <view class="item-block">
                <view>
                    <ste-navbar title="导航栏配置" backgroundColor="red"></ste-navbar>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">回调事件</view>
            <view class="item-block">
                <view>
                    <ste-navbar title="返回按钮点击事件" @backClick="backClick"></ste-navbar>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                > view {
                    margin: 0 36rpx 36rpx 0;
                }
            }
        }
    }
}
</style>
