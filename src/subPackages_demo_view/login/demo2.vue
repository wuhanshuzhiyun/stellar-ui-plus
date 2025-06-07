<template>
    <page-layout title="登录示例2" contentStyle="padding: 0">
        <view class="demo-2">
            <ste-login
                ref="myLogin"
                mode="mode1"
                :baseProtocol="base"
                :protocolData="protocolData"
                :primaryBtn="primaryBtnData"
                :secondaryBtn="secondaryBtnData"
                :bottomTip="baseTip"
                :loginGroup="loginGroup"
                loginImgUrl="https://image.whzb.com/chain/inte-cloud-tour-uniapp/00-普通图片/00-开发版//login/bg2.png?202408121"
                loginBackground="https://image.whzb.com/chain/inte-cloud-tour-uniapp/00-普通图片/00-开发版//login/bg1.png?202408121"
                @tabChange="tabChange"
                @primaryBtnClick="handleClick"
                @secondary-btn-click="handleClick"
                @protocol-click="protocolClick"
                @form-data-change="formDataChange"
            />
        </view>
    </page-layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { RefLogin } from '@/uni_modules/stellar-ui-plus/types/refComponents';
const baseTip = '版本信息 V1.0.0';

const myLogin = ref<RefLogin>();

const base = '我已认真阅读、理解并同意';
const protocolData = reactive([
    { title: '中心仓储用户注册协议', key: 'p1' },
    { title: '数智云隐私政策', key: 'p2' },
]);

const loginGroup = reactive([
    {
        title: '登录账号',
        key: 'account',
        items: [
            {
                title: '选择账号',
                key: 'account',
                type: 'select' as const,
                selectData: [
                    { title: '账号1', key: '1' },
                    { title: '账号2', key: '2' },
                ],
            },
            {
                title: '提示',
                key: 'tip',
                type: 'txt' as const,
                value: '若账号列表为空或要登录的门店不在列表中，请先绑定账号。',
            },
        ],
    },
    {
        title: '账号绑定',
        key: 'bind',
        items: [
            {
                title: '账号',
                key: 'username',
                type: 'number' as const,
            },
            {
                title: '密码',
                key: 'password',
                type: 'password' as const,
            },
        ],
    },
]);

const primaryBtnData = reactive([
    {
        title: '登录',
        key: 'wx',
    },
]);

const secondaryBtnData = reactive([
    {
        title: '用户注册',
        key: 'other',
    },
    {
        title: '短信验证',
        key: 'no',
    },
    {
        title: '忘记密码',
        key: 'forget',
    },
]);

const tabChange = (item: any) => {
    console.log(item);
    if (item.key === 'account') {
        primaryBtnData[0].title = '去登录';
    }
    if (item.key === 'bind') {
        primaryBtnData[0].title = '去绑定';
    }
};
const handleClick = (item: any) => {
    console.log(item);
    if (item.key === 'wx') {
        console.log('点击了微信登录');
        console.log(myLogin.value?.formData);
    }
};

const formDataChange = (data: any) => {
    console.log(data);
};

const protocolClick = (item: any) => {
    console.log(item);
};
</script>

<style lang="scss" scoped>
.demo-2 {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
}
</style>
