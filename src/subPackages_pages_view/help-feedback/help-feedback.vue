<script setup>
import { reactive, ref } from 'vue';
const qList = reactive([{ title: '商品如何加入橱窗视频教程？' }, { title: '如何选品、带货视频教程？' }, { title: '橱窗收益如何体现' }, { title: '使用反馈' }]);
const qCategoryList = reactive([
    { title: '猜你想问', key: '1' },
    { title: '热门活动', key: '2' },
    { title: '电子产品', key: '3' },
    { title: '电子商城', key: '4' },
    { title: '内容介绍', key: '5' },
    { title: '公司介绍', key: '6' },
    { title: '售后问题', key: '7' },
    { title: '物流信息', key: '8' },
]);
const curKey = ref('1');

const handleCategoryChange = item => {
    curKey.value = item.key;
};
</script>
<template>
    <view class="help-feedback-view">
        <ste-navbar title="我要反馈" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <view class="tip">常见问题</view>
            <view class="q-box">
                <view class="q-category-box">
                    <view class="q-category-item" :class="[{ active: curKey === item.key }]" v-for="(item, key) in qCategoryList" :key="key" @click="handleCategoryChange(item)">{{ item.title }}</view>
                </view>
                <view class="q-item" v-for="(item, key) in qList" :key="key">
                    <view class="q-item-title">{{ item.title }}</view>
                    <ste-icon size="24" code="&#xe674;" color="#888C92" marginBottom="4" />
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.help-feedback-view {
    width: 100%;
    height: 100vh;
    background-color: #f4f5f6;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        padding: 0 28rpx;
        overflow-y: auto;

        .tip {
            color: #888c92;
            font-size: 28rpx;
            margin-top: 24rpx;
            margin-bottom: 16rpx;
        }

        .q-box {
            background-color: #fff;
            border-radius: 12rpx;

            .q-item {
                width: 100%;
                height: 104rpx;
                padding: 0 28rpx;
                display: flex;
                align-items: center;
                cursor: pointer;

                .q-item-title {
                    flex: 1;
                    font-size: 32rpx;
                    color: #1c1f23;
                }
            }
            .q-item + .q-item {
                border-top: solid 1rpx #f4f5f6;
            }

            .q-category-box {
                display: flex;
                flex-wrap: wrap;
                padding-top: 28rpx;
                padding-left: 28rpx;

                .q-category-item {
                    cursor: pointer;
                    width: calc(25% - 28rpx);
                    height: 66rpx;
                    font-size: 24rpx;
                    margin-bottom: 28rpx;
                    margin-right: 28rpx;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background-color: #f4f5f6;
                    border-radius: 8rpx;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    &.active {
                        color: #fff;
                        background-color: #1482ff;
                    }
                }
            }
        }
    }
}
</style>
