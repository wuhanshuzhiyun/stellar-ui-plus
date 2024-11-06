<script setup lang="ts">
import { ref, onMounted } from 'vue';

const imgUrl = ref<string>();

const errorUrl = ref<string>();

onMounted(() => {
    setTimeout(() => {
        imgUrl.value = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
        errorUrl.value = 'https://image.whzb.com/chain/StellarUI/none.png';
    }, 1500);
});
</script>

<template>
    <page-layout title="图片">
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" mode="aspectFit" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" mode="aspectFill" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" mode="widthFix" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" height="200" mode="heightFix" />
        </view>
        <view class="demo-item">
            <view class="title">圆角</view>
            <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" radius="50%" width="200" height="200" />
        </view>
        <view class="demo-item">
            <view class="title">加载效果</view>
            <view class="image-box">
                <ste-image :src="imgUrl" width="200" height="200" />
                <view class="msg">加载中提示</view>
            </view>
            <view class="image-box">
                <ste-image :src="imgUrl" hiddenLoading width="200" height="200" />
                <view class="msg">隐藏加载中提示</view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">加载失败</view>
            <view class="image-box">
                <ste-image :src="errorUrl" width="200" height="200" />
                <view class="msg">加载失败提示</view>
            </view>
            <view class="image-box">
                <ste-image :src="errorUrl" hiddenError width="200" height="200" />
                <view class="msg">关闭加载失败提示</view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">具名插槽</view>
            <ste-image :src="errorUrl" width="200" height="200">
                <template v-slot:loading>Loading...</template>
                <template v-slot:error>Error</template>
            </ste-image>
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
</style>
