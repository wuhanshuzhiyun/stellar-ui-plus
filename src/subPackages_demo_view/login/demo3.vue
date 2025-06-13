<template>
    <page-layout title="登录示例3" contentStyle="padding: 0" :isHome="false">
        <view class="demo-2">
            <ste-login
                ref="myLogin"
                mode="mode1"
                color="#EC3E1A"
                :baseProtocol="base"
                :protocolData="protocolData"
                :primaryBtn="primaryBtnData"
                :secondaryBtn="secondaryBtnData"
                :bottomTip="baseTip"
                :loginGroup="loginGroup"
                loginImgUrl="https://image.whzb.com/chain/StellarUI/image/食堂登录.png"
                loginBoxBackground="rgba(255, 255, 255, .75)"
                @primaryBtnClick="handleClick"
                @secondary-btn-click="handleClick"
                @protocol-click="protocolClick"
                @form-data-change="formDataChange"
                @get-code="getCode"
            />
        </view>
    </page-layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { RefLogin } from '@/uni_modules/stellar-ui-plus/types/refComponents';
const baseTip = '版本信息 V1.0.0';

const myLogin = ref<RefLogin>();

const base = '登录即同意';
const protocolData = reactive([{ title: '中百食堂隐私郑策', key: 'p1' }]);

const loginGroup = reactive([
    {
        title: '登陆',
        key: 'bind',
        items: [
            {
                title: '手机号',
                key: 'username',
                type: 'number' as const,
                style: {
                    iconColor: '#FFAFA4',
                },
            },
            {
                title: '验证码',
                key: 'validate',
                type: 'validate' as const,
                style: {
                    iconColor: '#FFAFA4',
                },
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
        title: '微信一键登录',
        key: 'wxOneKey',
    },
]);

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

const getCode = (suspend: () => {}, next: () => {}) => {
    suspend();
    console.log('调用获取验证码接口');

    setTimeout(() => {
        console.log('验证码发送成功，开始倒计时');
        next();
    }, 2000);
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
