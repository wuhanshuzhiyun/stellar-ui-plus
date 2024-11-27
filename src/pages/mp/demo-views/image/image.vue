<script setup lang="ts">
import { ref, onMounted } from 'vue';

const imgUrl = ref<string>();

const errorUrl = ref<string>();
const demoUrl = ref<string>('https://image.whzb.com/chain/StellarUI/图片.jpg');

onMounted(() => {
    setTimeout(() => {
        imgUrl.value = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
        errorUrl.value = 'https://image.whzb.com/chain/StellarUI/none.png';
    }, 1500);
});

function onloading() {
    imgUrl.value = '';
    errorUrl.value = '';
    setTimeout(() => {
        imgUrl.value = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
        errorUrl.value = 'https://image.whzb.com/chain/StellarUI/error.png';
    }, 1500);
}
</script>

<template>
    <page-layout title="图片" contentStyle="padding-bottom: 86rpx;">
        <view class="description">
            <view class="cmp-name">Image 图片</view>
            <view class="cmp-desc">用于展示图片素材。</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">不同填充模式的图片</view>
            <view class="item-block">
                <view class="image-box">
                    <ste-image :src="demoUrl" width="200" height="200" />
                </view>
                <view class="image-box">
                    <ste-image :src="demoUrl" width="200" height="200" mode="aspectFit" />
                </view>
                <view class="image-box">
                    <ste-image :src="demoUrl" width="200" height="200" mode="aspectFill" />
                </view>
                <view class="image-box">
                    <ste-image :src="demoUrl" width="200" mode="widthFix" />
                </view>
                <view class="image-box">
                    <ste-image :src="demoUrl" height="200" mode="heightFix" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">圆角</view>
            <view class="item-block">
                <ste-image :src="demoUrl" radius="50%" width="200" height="200" />
            </view>
        </view>
        <view class="type-block">
            <view>02 组件状态</view>
        </view>
        <view class="demo-item">
            <view class="title">加载效果</view>
            <view class="item-block">
                <view class="image-box">
                    <ste-image :src="imgUrl" width="200" height="200" />
                    <view class="msg">加载中提示</view>
                </view>
                <view class="image-box">
                    <ste-image :src="imgUrl" hiddenLoading width="200" height="200" />
                    <view class="msg">隐藏加载中提示</view>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">加载失败</view>
            <view class="item-block">
                <view class="image-box">
                    <ste-image :src="errorUrl" width="200" height="200" />
                    <view class="msg">加载失败提示</view>
                </view>
                <view class="image-box">
                    <ste-image :src="errorUrl" hiddenError width="200" height="200" />
                    <view class="msg">隐藏加载失败提示</view>
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件自定义</view>
        </view>
        <view class="demo-item">
            <view class="title">具名插槽</view>
            <view class="item-block">
                <ste-image :src="errorUrl" width="200" height="200">
                    <template v-slot:loading>Loading...</template>
                    <template v-slot:error>Error</template>
                </ste-image>
            </view>
        </view>
        <view class="bottom-box">
            <ste-button @click="onloading" width="100%" :mode="300">重新加载</ste-button>
        </view>
    </page-layout>
</template>

<style scoped lang="scss">
.page {
    .content {
        .demo-item {
            .image-box {
                display: inline-block;

                .msg {
                    text-align: center;
                    color: #888;
                    font-size: 24rpx;
                }

                & + .image-box {
                    margin-left: 20rpx;
                }
            }
        }
    }
}

.demo-item {
    .item-block {
        display: block;
        margin-bottom: 12rpx;
        & > .image-box {
            margin: 0 16rpx 16rpx 0;
            display: inline-block;
        }
        .msg {
            font-size: 24rpx;
            color: #bbbbbb;
            text-align: center;
        }
    }
}

.bottom-box {
    width: calc(100% - 80rpx);
    position: absolute;
    z-index: 99999;
    bottom: 0;
    padding-bottom: 26rpx;
}
</style>
