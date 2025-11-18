<template>
    <view class="user-body">
        <view class="user-info" v-if="userInfo">
            <view class="info-message">
                <view class="message-title">
                    欢迎登录
                    <image src="https://image.whzb.com/chain/StellarUI/component-text.png" mode="widthFix"></image>
                </view>
                <view class="message-text">请填写您的基础信息</view>
            </view>
            <view class="info-content">
                <view class="user-avatar">
                    <ste-upload v-model="fileList" :maxCount="1" :deletable="false" preview-width="164" preview-height="164" radius="50%"></ste-upload>
                    <view class="reset-icon">
                        <image src="../../static/reset.png"></image>
                    </view>
                </view>
                <view class="info-form">
                    <view class="info-item">
                        <view class="item-label">账户</view>
                        <view class="item-data">{{ userInfo.account }}</view>
                    </view>
                    <view class="info-item">
                        <view class="item-label">昵称</view>
                        <view class="item-data">
                            <input class="user-name" type="text" v-model="userInfo.nickname" maxlength="20" placeholder="请输入昵称" />
                        </view>
                    </view>
                </view>
                <view class="submit-button" @click="save">保存信息</view>
                <view class="out-button" @click="outlogin">返回首页</view>
            </view>
        </view>
        <view class="not-info" v-else>
            <view class="button" @click="login">{{ isAjax ? '登录中...' : '微信一键登录' }}</view>
        </view>
    </view>
</template>

<script>
import uploadFile from '@/common/uploadFile';
import { getInfo, login, logout } from '@/common/account';
import request from '@/common/request';
export default {
    data() {
        return {
            isAjax: false,
            userInfo: null,
            fileList: [],
        };
    },
    watch: {
        fileList(val) {
            if (val && val[0] && val[0].status === 'uploading') {
                this.uploadFile(val[0]);
            }
        },
    },
    onLoad() {
        this.getInfo();
    },
    methods: {
        async getInfo(pull = false) {
            const info = await getInfo(pull);
            if (info) this.setUserInfo(info);
        },
        async login() {
            try {
                this.isAjax = true;
                await login();
                const info = await this.getInfo();
                if (info) this.setUserInfo(info);
            } catch (e) {}
            this.isAjax = false;
        },
        setUserInfo(info) {
            this.userInfo = Object.assign({}, info, { account: info.account.toLocaleUpperCase() });
            this.fileList = [{ url: info.avatar_url }];
        },
        uploadFile(file) {
            uploadFile(file.path).then(url => {
                const newInfo = { ...this.userInfo, avatar_url: url };
                this.setUserInfo(newInfo);
            });
        },
        save() {
            request('/client/account/update', this.userInfo, 'POST').then(() => {
                this.$showToast({
                    title: '保存成功',
                    icon: 'none',
                });
                this.getInfo(true);
            });
        },
        // 退出登录
        outlogin() {
            // uni.showModal({
            //     title: '提示',
            //     content: '确定退出登录吗？',
            //     success: async res => {
            //         if (res.confirm) {
            //             await logout();
            //             this.userInfo = null;
            //         }
            //     },
            // });
            uni.navigateTo({ url: '/pages/mp/index' });
        },
    },
};
</script>

<style lang="scss" scoped>
.user-body {
    width: 100vw;
    height: 100vh;
    background-image: url(https://image.whzb.com/chain/StellarUI/image/mp-pc-login-bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    .user-info {
        width: 100%;
        height: 100%;
        .info-message {
            padding-top: 198rpx;
            padding-left: 68rpx;
            .message-title {
                font-family:
                    PingFang SC,
                    PingFang SC;
                font-weight: 400;
                font-size: 32rpx;
                color: #000000;
                display: flex;
                flex-direction: row;
                image {
                    width: 174rpx;
                    height: 34rpx;
                    margin-left: 10rpx;
                }
            }
            .message-text {
                font-family:
                    PingFang SC,
                    PingFang SC;
                font-weight: 400;
                font-size: 40rpx;
                color: #000000;
                margin-top: 20rpx;
            }
        }

        .info-content {
            margin-top: 64rpx;
            width: 662rpx;
            height: calc(100% - 390rpx);
            margin-left: 44rpx;
            background: linear-gradient(180deg, #e9f1fd 0%, #ffffff 19%, #ffffff 100%);
            border-radius: 32rpx;
            border: 8rpx solid #ffffff;
            .user-avatar {
                width: 180rpx;
                height: 180rpx;
                margin: 50rpx auto 0 auto;
                border: 8rpx solid #e5f0fc;
                border-radius: 50%;
                background-color: #fff;
                position: relative;
                .reset-icon {
                    position: absolute;
                    width: 48rpx;
                    height: 48rpx;
                    background-color: #e5f0fc;
                    border-radius: 50%;
                    bottom: 0;
                    right: 0;
                    padding: 9rpx;
                    image {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .info-form {
                width: 614rpx;
                margin-left: 24rpx;
                margin-top: 84rpx;
                .info-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding-bottom: 20rpx;
                    border-bottom: 1px solid #eee;
                    & + .info-item {
                        margin-top: 54rpx;
                    }
                    .item-label {
                        width: 150rpx;
                        height: 32rpx;
                        font-family:
                            Alibaba PuHuiTi 2,
                            Alibaba PuHuiTi 20;
                        font-weight: normal;
                        font-size: 32rpx;
                        color: #000000;
                        line-height: 32rpx;
                        text-align: center;
                        border-right: 1px solid #eee;
                    }
                    .item-data {
                        text-align: left;
                        padding-left: 30rpx;
                        color: #b5b5b5;
                        .user-name {
                            font-size: 32rpx;
                            color: #000000;
                        }
                    }
                }
            }

            .submit-button {
                margin: 72rpx auto 0 auto;
                width: 438rpx;
                height: 80rpx;
                background: #0090ff;
                box-shadow: 0rpx 12rpx 40rpx 2rpx rgba(0, 144, 255, 0.1);
                border-radius: 48rpx;
                text-align: center;
                line-height: 80rpx;
                font-family:
                    PingFang SC,
                    PingFang SC;
                font-weight: bold;
                font-size: 32rpx;
                color: #fff;
            }
            .out-button {
                font-family:
                    PingFang SC,
                    PingFang SC;
                font-weight: bold;
                font-size: 32rpx;
                color: #0090ff;
                width: 150rpx;
                height: 60rpx;
                line-height: 60rpx;
                text-align: center;
                margin: 64rpx auto;
            }
        }
    }
    .not-info {
        width: 100%;
        height: 100%;
        background-image: url(https://image.whzb.com/chain/StellarUI/验证码背景.png);
        background-size: 100% auto;
        position: relative;
        .button {
            width: 690rpx;
            height: 90rpx;
            position: absolute;
            left: 30rpx;
            bottom: 100rpx;
            background-color: #0090ff;
            color: #fff;
            border-radius: 10rpx;
            font-size: 30rpx;
            text-align: center;
            line-height: 90rpx;
        }
    }
}
</style>
