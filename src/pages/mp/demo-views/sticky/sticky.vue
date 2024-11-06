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

const onFixed = () => {
    console.log('fixed');
};

const onUnfixed = () => {
    console.log('unfixed');
};
</script>

<template>
    <page-layout title="吸顶">
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="title">滚动页面，即可看到下方标题栏目吸顶</view>
            <ste-sticky @fixed="onFixed" @unfixed="onUnfixed">
                <view style="width: 100%; height: 44px; line-height: 44px; text-align: center">这是一个吸顶的标题栏目</view>
            </ste-sticky>
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner1.png" height="360" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="360" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner1.png" height="360" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="360" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner1.png" height="360" />
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="360" />
        </view>
    </page-layout>
</template>

<style scoped lang="scss">
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
</style>
