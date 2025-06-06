<script lang="ts" setup>
import { reactive } from 'vue';

const data1 = reactive({
    avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
    title: '嗨，小百百百',
    subTitle: '中百食堂',
    // infoUser: {
    //     title: '嗨，小百百百',
    //     subTitle: '中百食堂',
    //     subTitleIcon: '&#xe677;',
    // },
    // infoData: [
    //     { name: '数据1', value: '100', key: '1' },
    //     { name: '数据2', value: '8', key: '2' },
    //     { name: '数据3', value: '10', key: '3' },
    // ],
    // infoCode: {
    //     name: '核销码',
    //     img: 'https://image.whzb.com/chain/StellarUI/image/code1.png',
    // },
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
                        mainColor="#EC3E1A"
                        @data-click="handleDataClick"
                        @avatar-click="handleAvatarClick"
                        @user-click="handleUserClick"
                    />
                </view>
            </view>
        </view>
        <!-- <view class="demo-item">
            <view class="title">2数据&有核销码</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info mainColor="#EC3E1A" :infoData="data2.infoData" :infoUser="data2.infoUser" :infoCode="data2.infoCode" :avatarUrl="data2.avatarUrl" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">3数据&无核销码</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info mainColor="#EC3E1A" :infoData="data3.infoData" :infoUser="data3.infoUser" :avatarUrl="data2.avatarUrl" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">无头像名称&有3个数据&有核销码</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info mainColor="#EC3E1A" :infoData="data4.infoData" :infoCode="data4.infoCode" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">无头像名称&有3个数据&无核销码</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-login-info mainColor="#EC3E1A" :infoData="data5.infoData" />
                </view>
            </view>
        </view> -->
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
