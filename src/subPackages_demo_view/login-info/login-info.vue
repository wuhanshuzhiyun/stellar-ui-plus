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
                    <ste-login-info nickname="小百食的名称" avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" :login-status="1" @avatar-click="handleAvatarClick" @user-click="handleUserClick">
                        <template #desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26" margin-bottom="2"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-login-info>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">类型1</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info
                        loginSrc="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png"
                        loginTitle="欢迎来到中百食堂~"
                        loginInfo="马上登录，在线即点"
                        @avatar-click="handleAvatarClick"
                        @user-click="handleUserClick"
                    />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">类型2</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info
                        loginSrc="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png"
                        loginTitle="请登录"
                        show-title-icon
                        @avatar-click="handleAvatarClick"
                        @user-click="handleUserClick"
                    />
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
