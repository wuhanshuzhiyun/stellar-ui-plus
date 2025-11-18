<template>
    <view class="code-page">
        <!-- #ifdef MP-WEIXIN -->
        <view class="content">
            <view class="logo"></view>
            <view class="code-message">
                授权后，将在电脑端登录，若非本人操作，
                <br />
                请忽略申请
            </view>
            <view class="submit-button" :class="{ loading }" @click="login">
                {{ loading ? '登录中...' : '授权登录' }}
            </view>
            <view class="cancel-button" @click="cancel">取消</view>
        </view>
        <view class="uuid-text">UUID:{{ uuid }}</view>
        <!-- #endif -->
    </view>
</template>

<script>
import { isLogin, login } from '@/common/account';
import request from '@/common/request';
export default {
    data() {
        return {
            uuid: '',
            code: '',
            loading: false,
        };
    },
    onLoad({ scene }) {
        // #ifdef MP-WEIXIN
        if (scene) {
            this.uuid = scene;
            this.open(this.uuid);
        }
        // #endif
    },
    mounted() {},
    methods: {
        async open(uuid) {
            try {
                const { code } = await wx.login();
                await request('/client/openLogin', { uuid, code });
            } catch (e) {
                //TODO handle the exception
                console.error(e);
            }
        },
        async login() {
            // #ifdef MP-WEIXIN
            if (!this.uuid) return;
            if (this.loading) return;
            this.loading = true;
            try {
                let token = await isLogin();
                if (!token) {
                    await login();
                }
                await request('/client/wechatLogin', { uuid: this.uuid }, 'POST');
                uni.navigateTo({ url: '/pages/user/user' });
            } catch (e) {
                //TODO handle the exception
            }
            this.loading = false;
            // #endif
        },
        cancel() {
            uni.navigateTo({ url: '/pages/mp/index' });
        },
    },
};
</script>

<style lang="scss" scoped>
.code-page {
    text-align: center;
    background-image: url(https://image.whzb.com/chain/StellarUI/image/mp-pc-login-bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    background-color: #f6f9ff;
    position: relative;
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo {
            width: 160rpx;
            height: 160rpx;
            background-image: url(https://image.whzb.com/chain/StellarUI/mp-logo.png);
            background-size: 100% 100%;
        }
        .code-message {
            margin-top: 54rpx;
            width: 608rpx;
            text-align: center;
            font-family:
                PingFang SC,
                PingFang SC;
            font-weight: 400;
            font-size: 32rpx;
            color: #666666;
        }

        .submit-button {
            margin-top: 64rpx;
            width: 438rpx;
            height: 80rpx;
            background: #0090ff;
            box-shadow: 0rpx 12rpx 40rpx 2rpx rgba(0, 144, 255, 0.1);
            border-radius: 48rpx;
            font-family:
                PingFang SC,
                PingFang SC;
            font-weight: bold;
            font-size: 32rpx;
            color: #ffffff;
            line-height: 80rpx;
            &.loading {
                background-color: #66bbff;
            }
        }
        .cancel-button {
            margin-top: 30rpx;
            width: 240rpx;
            height: 60rpx;
            line-height: 60rpx;
            color: #0090ff;
        }
    }

    .uuid-text {
        position: absolute;
        bottom: 180rpx;
        width: 100%;
        text-align: center;
        font-family:
            PingFang SC,
            PingFang SC;
        font-weight: 400;
        font-size: 30rpx;
        color: #666666;
        line-height: 0rpx;
    }
}
</style>
