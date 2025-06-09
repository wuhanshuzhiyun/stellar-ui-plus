<template>
    <page-layout title="登录示例1" contentStyle="padding: 0">
        <view class="demo-1">
            <ste-login
                :baseProtocol="base"
                :protocolData="protocolData"
                :primaryBtn="primaryBtnData"
                :secondaryBtn="secondaryBtnData"
                :bottomTip="baseTip"
                @primaryBtnClick="handleClick"
                @secondary-btn-click="handleClick"
                @protocol-click="protocolClick"
            />
        </view>
    </page-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const baseTip = '版本信息 V1.0.0';
const base = '我已认真阅读、理解并同意';
const protocolData = reactive([
    { title: '中心仓储用户注册协议', key: 'p1' },
    { title: '数智云隐私政策', key: 'p2' },
]);

const primaryBtnData = reactive([
    {
        title: '微信一键登录',
        key: 'wx',
    },
]);

const secondaryBtnData = reactive([
    {
        title: '其他号码登录/注册',
        key: 'other',
    },
    {
        title: '暂不登录',
        key: 'no',
    },
]);

const handleClick = (item: any) => {
    console.log(item);
};

const protocolClick = (item: any) => {
    console.log(item);
};
</script>

<style lang="scss" scoped>
.demo-1 {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    padding-top: 186rpx;
}
</style>
