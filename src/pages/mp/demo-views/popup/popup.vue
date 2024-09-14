<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '@/uni_modules/stellar-plus/composables';
let toast = useToast();
const show = ref(false);
const bgShow = ref(false);
const maskShow1 = ref(false);
const maskShow2 = ref(false);
const sizeShow1 = ref(false);
const sizeShow2 = ref(false);
const showTop = ref(false);
const showBottom = ref(false);
const showLeft = ref(false);
const showRight = ref(false);
const roundShow = ref(false);
const offsetShow = ref(false);
const durationShow = ref(false);
const syncShow = ref(false);

function syncClose(suspend: () => void, next: () => void, stop: () => void) {
    suspend();
    toast.showToast({
        title: '加载中...',
        icon: 'loading',
    });
    setTimeout(() => {
        toast.hideToast();
        next();
    }, 2000);
}
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="弹出层"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础使用</view>
                <view class="item-block">
                    <ste-button @click="show = true" :mode="100">显示弹窗</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">背景色</view>
                <view class="item-block">
                    <ste-button @click="bgShow = true" :mode="100">背景色弹窗</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">是否遮罩关闭</view>
                <view class="item-block">
                    <view>
                        <ste-button @click="maskShow1 = true" :mode="100">遮罩可关闭</ste-button>
                    </view>
                    <view><ste-button @click="maskShow2 = true" :mode="100">遮罩不可关闭</ste-button></view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">大小</view>
                <view class="item-block">
                    <view>
                        <ste-button @click="sizeShow1 = true" :mode="100">宽: 300 高：500</ste-button>
                    </view>
                    <view><ste-button @click="sizeShow2 = true" :mode="100">宽: '100vw' 高：300</ste-button></view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">位置</view>
                <view class="item-block">
                    <view>
                        <ste-button @click="showTop = true" :mode="100">上</ste-button>
                    </view>
                    <view>
                        <ste-button @click="showBottom = true" :mode="100">下</ste-button>
                    </view>
                    <view>
                        <ste-button @click="showLeft = true" :mode="100">左</ste-button>
                    </view>
                    <view>
                        <ste-button @click="showRight = true" :mode="100">右</ste-button>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">圆角</view>
                <view class="item-block">
                    <ste-button @click="roundShow = true" :mode="100">圆角弹窗</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">偏移</view>
                <view class="item-block">
                    <ste-button @click="offsetShow = true" :mode="100">偏移</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">动画执行时间</view>
                <view class="item-block">
                    <ste-button @click="durationShow = true" :mode="100">动画执行时间</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">异步关闭</view>
                <view class="item-block">
                    <ste-button @click="syncShow = true" :mode="100">异步关闭</ste-button>
                </view>
            </view>
        </view>
        <!-- ******************** -->
        <!-- 弹窗 -->
        <ste-popup v-model:show="show" width="300" height="300">
            <view class="popup-content">正文</view>
        </ste-popup>
        <!-- 背景色 -->
        <ste-popup v-model:show="bgShow" width="300" height="300" backgroundColor="#eff3dd">
            <view class="popup-content">背景色</view>
        </ste-popup>
        <!-- 遮罩 -->
        <ste-popup v-model:show="maskShow1" width="300" height="300">
            <view class="popup-content">遮罩可关闭</view>
        </ste-popup>
        <ste-popup v-model:show="maskShow2" width="300" height="300" :isMaskClick="false">
            <view class="popup-content">遮罩不可关闭</view>
        </ste-popup>
        <!-- 大小 -->
        <ste-popup v-model:show="sizeShow1" width="300" height="500">
            <view class="popup-content">300*500</view>
        </ste-popup>
        <ste-popup v-model:show="sizeShow2" width="100vw" height="300">
            <view class="popup-content">100vw*300</view>
        </ste-popup>
        <!-- 位置 -->
        <ste-popup v-model:show="showTop" height="300" width="100vw" position="top">
            <view class="popup-content">上</view>
        </ste-popup>
        <ste-popup v-model:show="showBottom" height="300" width="100vw" position="bottom" round>
            <view class="popup-content">下</view>
        </ste-popup>
        <ste-popup v-model:show="showLeft" width="300" height="100vh" position="left">
            <view class="popup-content">左</view>
        </ste-popup>
        <ste-popup v-model:show="showRight" width="300" height="100vh" position="right">
            <view class="popup-content">右</view>
        </ste-popup>
        <!-- 圆角 -->
        <ste-popup v-model:show="roundShow" width="300" height="300" round>
            <view class="popup-content">圆角</view>
        </ste-popup>
        <!-- 偏移 -->
        <ste-popup v-model:show="offsetShow" width="300" height="300" offsetX="50" offsetY="-50">
            <view class="popup-content">偏移</view>
        </ste-popup>
        <!-- 动画执行时间 -->
        <ste-popup v-model:show="durationShow" width="300" height="300" :duration="800" :keepContent="false">
            <view class="popup-content">动画执行时间</view>
        </ste-popup>
        <!-- 异步关闭 -->
        <ste-popup v-model:show="syncShow" width="100vw" height="300" @close="syncClose" position="bottom">
            <view class="popup-content">异步关闭</view>
        </ste-popup>
    </view>
</template>

<style lang="scss" scoped>
.page {
    .popup-content {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 100%;
        width: 100%;
    }
    .content {
        .demo-item {
            .item-block {
                > view {
                    margin: 0 8px 8px 0;
                }
            }
        }
    }
}
</style>
