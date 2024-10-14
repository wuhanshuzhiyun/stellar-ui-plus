<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { setToken } from '../../common/token';
import { isLogin } from '@/common/account';
import config from '@/common/config';
import utils from '@/common/utils';
import SSE from './sse';

const initUUID = () => {
    let _uuid = uni.getStorageSync('uuid');
    if (_uuid) return _uuid;
    _uuid = Date.now().toString(32);
    for (let i = 0; i < 10; i++) {
        _uuid += Math.floor(Math.random() * 32).toString(32);
    }
    uni.setStorageSync('uuid', _uuid);
    return _uuid;
};

const uuid = ref('');
const sse = ref<SSE>();
const status = ref(0);
const qrImage = computed(() => {
    if (!uuid.value) return '';
    return `${config.BASE_URL}/wxcode?uuid=${uuid.value}`;
});

const toHome = () => {
    nextTick(() => {
        const back = utils.getUrlParam('back');
        console.log('back', back);
        uni.redirectTo({
            url: `/pages/pc/index?active=${back}`,
        });
    });
};

const initSSE = () => {
    sse.value = new SSE();
    sse.value.onmessage(data => {
        if (data === 'open-login') {
            // 微信已扫码
            status.value = 1;
        } else if (data && typeof data === 'string') {
            // 微信已确认登录
            setToken(data);
            sse.value?.close();
            toHome();
        }
    });
};

onMounted(async () => {
    const token = await isLogin();
    if (token) {
        console.log('已登录');
        // 跳转到首页
        toHome();
        return;
    }
    uuid.value = initUUID();
    initSSE();
});
</script>
<template>
    <view class="pc-login-body">
        <view class="login-form">
            <view class="title"><span>扫码登录</span></view>
            <view class="qr-image">
                <image :src="qrImage"></image>
                <div class="status-message" v-if="status === 1">
                    <div>已扫码</div>
                    <div>请确认登录</div>
                </div>
            </view>
        </view>
    </view>
</template>

<style lang="scss">
.pc-login-body {
    width: 100vw;
    height: 100vh;
    min-width: 1200px;
    overflow: hidden;
    background-image: url(https://image.whzb.com/chain/StellarUI/image/pc-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .login-form {
        width: 420px;
        height: 530px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 350px;
        border-radius: 12px;
        box-shadow: 10px 10px 10px 1px rgba(0, 0, 0, 0.1);
        border-radius: 16px 16px 16px 16px;
        overflow: hidden;

        .title {
            height: 110px;
            line-height: 110px;
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            color: #0090ff;
        }
        .qr-image {
            width: 100%;
            height: calc(100% - 110px);
            border-top: 1px solid #0090ff80;
            padding: 30px;
            position: relative;
            image {
                width: 100%;
                height: 100%;
            }
            .status-message {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
            }
        }
    }
}
</style>
