<script lang="ts" setup>
import { reactive } from 'vue';

const data1 = reactive({
    avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
    title: '小百食的名称',
    subTitle: '武汉数智云科技有限公司',
    subTitleIcon: '&#xe677;',
});

const handleDataClick = (item: any) => {
    console.log('item is 1', item);
};

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
            <view class="cmp-name">LoginInfo 登录信息展示</view>
            <view class="cmp-desc">登录信息展示</view>
        </view>

        <view class="demo-item">
            <view class="title">完整展示</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info
                        :title="data1.title"
                        :subTitle="data1.subTitle"
                        :avatarUrl="data1.avatarUrl"
                        :subTitleIcon="data1.subTitleIcon"
                        mainColor="#EC3E1A"
                        @data-click="handleDataClick"
                        @avatar-click="handleAvatarClick"
                        @user-click="handleUserClick"
                    />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">类型1</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info :title="data1.title" :avatarUrl="data1.avatarUrl" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">类型2</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info mainColor="#757575" :title="data1.title" :subTitle="data1.subTitle" :avatarUrl="data1.avatarUrl" />
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
        }
    }
}
</style>
