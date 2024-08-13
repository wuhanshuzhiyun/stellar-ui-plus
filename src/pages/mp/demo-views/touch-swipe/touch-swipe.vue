<script setup lang="ts">
import { ref } from 'vue';

const hIndex = ref(0);
const vIndex = ref(0);
const imgs = [
    'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
    'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
    'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
    'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
];

function hUp() {
    if (hIndex.value === 0) return;
    hIndex.value -= 1;
}
function hNext() {
    if (hIndex.value === imgs.length - 1) return;
    hIndex.value += 1;
}
function vUp() {
    if (vIndex.value === 0) return;
    vIndex.value -= 1;
}
function vNext() {
    if (vIndex.value === imgs.length - 1) return;
    vIndex.value += 1;
}
</script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="手势滑动"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">水平切换-固定宽度</view>
                <view class="item-block">
                    <view class="buttons">
                        <button size="mini" @click="hUp">上一页</button>
                        <text>{{ hIndex + 1 }}/{{ imgs.length }}</text>
                        <button size="mini" @click="hNext">下一页</button>
                    </view>
                    <ste-touch-swipe width="690" v-model:index="hIndex">
                        <ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
                            <image :src="img" mode="widthFix" style="width: 100%" />
                        </ste-touch-swipe-item>
                    </ste-touch-swipe>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">垂直切换-固定高度</view>
                <view class="item-block">
                    <view class="buttons">
                        <button size="mini" @click="vUp">上一页</button>
                        <text>{{ vIndex + 1 }}/{{ imgs.length }}</text>
                        <button size="mini" @click="vNext">下一页</button>
                    </view>
                    <ste-touch-swipe height="600" direction="vertical" v-model:index="vIndex">
                        <ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
                            <image :src="img" mode="heightFix" style="height: 100%" />
                        </ste-touch-swipe-item>
                    </ste-touch-swipe>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                display: block;
                margin-bottom: 12rpx;

                .buttons {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 12rpx;

                    text {
                        margin: 0 12rpx;
                    }
                }
            }
        }
    }
}
</style>
