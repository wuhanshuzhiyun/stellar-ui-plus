<script setup>
import { reactive } from 'vue';

const updateList = reactive([
    { title: '1.1.0', time: '3天前', text: `门店营运管理平台最新版来啦，马上更新吧！` },
    {
        title: '1.0.9',
        time: '3周前',
        text: `门店营运管理平台最新版来啦，马上更新吧！
                - 补货功能：用户可根据不同的模式进行补货
                - 收货功能：新增审核流程`,
    },
    {
        title: '1.0.8',
        time: '3个月前',
        text: `门店营运管理平台最新版来啦，马上更新吧！
                - 补货功能：用户可根据不同的模式进行补货
                - 收货功能：新增审核流程`,
    },

    {
        title: '1.0.7',
        time: '6个月前',
        text: `门店营运管理平台最新版来啦，马上更新吧！
                - 补货功能：用户可根据不同的模式进行补货
                - 收货功能：新增审核流程
                - 关怀模式：文字更大，色彩更强
                - 供应商直供收货：货物进入仓库时，对到货商品进行数量核 对、质量检验、单据匹配，并完成入库登记的全过程，确认完 成后上账。`,
    },
]);
</script>
<template>
    <view class="version-update-view">
        <ste-navbar title="版本更新" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <view class="update-item" v-for="(e, i) in updateList" :key="i">
                <view class="update-title">
                    <view class="title-text">{{ e.title }}</view>
                    <view class="time">{{ e.time }}</view>
                </view>
                <view class="update-text">
                    <ste-text>{{ e.text }}</ste-text>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.version-update-view {
    width: 100%;
    height: 100vh;
    background-color: #f4f5f6;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        padding: 28rpx;
        overflow-y: auto;

        .update-item {
            background-color: #fff;
            border-radius: 12rpx;
            padding: 24rpx 16rpx;

            .update-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16rpx;
                .title-text {
                    font-size: 26rpx;
                    font-weight: bold;
                }
                .time {
                    font-size: 24rpx;
                    color: #888c92;
                }
            }

            .update-text {
                font-size: 24rpx;
                line-height: 42rpx;
            }
        }

        .update-item + .update-item {
            margin-top: 24rpx;
        }
    }
}
</style>
