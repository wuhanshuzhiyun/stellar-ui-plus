<template>
    <view class="page">
        <page-nav :autoBack="true" title="Marquee 走马灯"></page-nav>

        <view class="content">
            <!-- 基础用法 -->
            <text class="title">基础用法</text>
            <view class="demo-item">
                <ste-marquee :list="list1" />
            </view>

            <!-- 自定义样式 -->
            <text class="title">自定义样式</text>
            <view class="demo-item">
                <ste-marquee :list="list1" containerBg="#FFF3E0" containerPadding="20rpx" containerRadius="32rpx" itemBg="#FF9800" itemPadding="16rpx 32rpx" itemRadius="32rpx" />
            </view>

            <!-- 填满屏幕 -->
            <text class="title">填满屏幕（数据少时使用）</text>
            <view class="demo-item">
                <ste-marquee :list="list2" :fillScreen="true" />
            </view>

            <!-- 调整速度 -->
            <text class="title">调整滚动速度</text>
            <view class="demo-item">
                <ste-marquee :list="list1" :speed="100" />
            </view>

            <!-- 点击事件 -->
            <text class="title">点击事件</text>
            <view class="demo-item">
                <ste-marquee :list="list1" @click="onClick" />
            </view>

            <!-- 使用插槽 -->
            <text class="title">使用插槽自定义</text>
            <view class="demo-item">
                <ste-marquee :list="list3">
                    <template #item="{ item }">
                        <view class="custom-item">
                            <image :src="item.icon" class="icon" mode="aspectFit" />
                            <text class="custom-text">{{ item.text }}</text>
                        </view>
                    </template>
                </ste-marquee>
            </view>

            <!-- 播放控制 -->
            <text class="title">播放控制</text>
            <view class="demo-item">
                <ste-marquee ref="controlRef" :list="list1" />
                <view class="control-btns">
                    <button class="control-btn" @click="play">播放</button>
                    <button class="control-btn" @click="pause">暂停</button>
                    <button class="control-btn" @click="stop">停止</button>
                </view>
            </view>

            <!-- 切换数据 -->
            <text class="title">切换数据</text>
            <view class="demo-item">
                <ste-marquee :list="currentList" />
                <view class="switch-btns">
                    <button class="switch-btn" :class="{ active: currentListType === 'list1' }" @click="switchList('list1')">数据1（4条）</button>
                    <button class="switch-btn" :class="{ active: currentListType === 'list2' }" @click="switchList('list2')">数据2（2条）</button>
                    <button class="switch-btn" :class="{ active: currentListType === 'list3' }" @click="switchList('list3')">数据3（3条带图标）</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 基础数据
const list1 = ref([
    { id: 1, text: '恭喜用户138****1234获得一等奖 iPhone 15' },
    { id: 2, text: '恭喜用户139****5678获得二等奖 iPad Air' },
    { id: 3, text: '恭喜用户137****9012获得三等奖 AirPods' },
    { id: 4, text: '恭喜用户136****3456获得参与奖 50元话费' },
]);

// 少量数据（用于演示 fillScreen）
const list2 = ref([
    { id: 1, text: '恭喜中奖！' },
    { id: 2, text: '欢迎参与！' },
]);

// 带图标数据
const list3 = ref([
    { id: 1, text: '恭喜张三获得一等奖', icon: 'https://image.whzb.com/chain/StellarUI/售罄.png' },
    { id: 2, text: '恭喜李四获得二等奖', icon: 'https://image.whzb.com/chain/StellarUI/已打印.png' },
    { id: 3, text: '恭喜王五获得三等奖', icon: 'https://image.whzb.com/chain/StellarUI/logo.png' },
]);

// 点击事件
const onClick = (item: any, index: number) => {
    uni.showToast({
        title: `点击了: ${item.text.slice(0, 10)}...`,
        icon: 'none',
    });
};

// 播放控制
const controlRef = ref();

const play = () => {
    controlRef.value?.play();
};

const pause = () => {
    controlRef.value?.pause();
};

const stop = () => {
    controlRef.value?.stop();
};

// 切换数据
const currentListType = ref<'list1' | 'list2' | 'list3'>('list1');
const currentList = ref(list1.value);

const switchList = (type: 'list1' | 'list2' | 'list3') => {
    currentListType.value = type;
    if (type === 'list1') {
        currentList.value = list1.value;
    } else if (type === 'list2') {
        currentList.value = list2.value;
    } else {
        currentList.value = list3.value;
    }
};
</script>

<style lang="scss" scoped>
.page {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.content {
    padding: 20rpx;
}

.title {
    display: block;
    font-size: 28rpx;
    color: #333;
    margin: 30rpx 0 20rpx;
    font-weight: bold;
}

.demo-item {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
}

.custom-item {
    display: flex;
    align-items: center;
    gap: 16rpx;
}

.icon {
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
}

.custom-text {
    font-size: 28rpx;
    color: #333;
}

.control-btns {
    display: flex;
    gap: 20rpx;
    margin-top: 20rpx;
}

.control-btn {
    flex: 1;
    background-color: #4caf50;
    color: #fff;
    font-size: 28rpx;
}

.switch-btns {
    display: flex;
    gap: 16rpx;
    margin-top: 20rpx;
    flex-wrap: wrap;
}

.switch-btn {
    flex: 1;
    min-width: 180rpx;
    background-color: #f0f0f0;
    color: #333;
    font-size: 26rpx;
    border: 2rpx solid #ddd;
}

.switch-btn.active {
    background-color: #2196f3;
    color: #fff;
    border-color: #2196f3;
}
</style>
