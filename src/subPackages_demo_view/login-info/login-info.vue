<script lang="ts" setup>
const handleAvatarClick = () => {
    console.log('avatar click');
};

const handleUserClick = () => {
    console.log('user click');
};
</script>

<template>
    <page-layout title="登录信息展示" contentStyle="background: #F2F3F5;">
        <view class="description">
            <view class="cmp-name">LoginInfo 登录信息</view>
            <view class="cmp-desc">登录信息展示</view>
        </view>

        <view class="demo-item">
            <view class="title">完整展示</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info
                        nickname="中百食堂"
                        avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                        sub-title="中百食堂厨师"
                        subTitleIcon="&#xe670;"
                        @avatar-click="handleAvatarClick"
                        @user-click="handleUserClick"
                    ></ste-login-info>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">未登录</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info mainColor="#757575" :loginStatus="0" loginSrc="https://image.whzb.com/chain/StellarUI/%E5%9B%BE%E7%89%87.jpg" loginTitle="请登录" />
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        margin: 0 -30rpx;
        > view {
            // margin: 0 8rpx 8rpx 0;

            .desc {
                display: flex;
                align-items: center;
                .title {
                    font-size: 24rpx;
                    color: #ec3e1a;
                    margin: 4rpx;
                    margin-right: 14rpx;
                }
            }
        }
    }
}
</style>
