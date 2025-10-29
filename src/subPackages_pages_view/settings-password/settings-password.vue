<script setup>
import { ref } from 'vue';
const pwd = ref('123');
const pwdCopy = ref('');
const showPwd = ref(false);
const showCopyPwd = ref(false);

// 密码强度：0-弱，1-中，2-强
const passwordStrength = ref(0);

const triggerShow = show => {
    showPwd.value = show;
};

const triggerCopyShow = show => {
    showCopyPwd.value = show;
};
</script>
<template>
    <view class="settings-password-view">
        <ste-navbar title="设置密码" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <view class="pwd-box">
                <ste-input v-model="pwd" fontSize="32" :type="showPwd ? 'text' : 'password'" rootClass="password-input" clearable>
                    <template v-slot:suffix>
                        <ste-icon code="&#xe691;" size="36" color="#A7ABB0" v-if="!showPwd" @click="triggerShow(true)" />
                        <ste-icon code="&#xe68a;" size="36" color="#A7ABB0" v-else @click="triggerShow(false)" />
                    </template>
                </ste-input>
            </view>

            <view class="pwd-progress">
                <view class="pwd-strength-label">密码强度</view>
                <view class="pwd-strength-bars">
                    <view class="strength-bar" :class="{ active: passwordStrength >= 0 }"></view>
                    <view class="strength-bar" :class="{ active: passwordStrength >= 1 }"></view>
                    <view class="strength-bar" :class="{ active: passwordStrength >= 2 }"></view>
                </view>
            </view>

            <view class="pwd-box copy">
                <ste-input v-model="pwdCopy" fontSize="32" :type="showCopyPwd ? 'text' : 'password'" rootClass="password-input" clearable>
                    <template v-slot:suffix>
                        <ste-icon code="&#xe691;" size="36" color="#A7ABB0" v-if="!showCopyPwd" @click="triggerCopyShow(true)" />
                        <ste-icon code="&#xe68a;" size="36" color="#A7ABB0" v-else @click="triggerCopyShow(false)" />
                    </template>
                </ste-input>
            </view>

            <view class="tip">8-20位密码，至少包括英文字母、数字、特殊符号中的2种</view>

            <view>
                <ste-button width="100%" :round="false" :mode="300">保存</ste-button>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.settings-password-view {
    width: 100%;
    height: 100vh;
    background-color: #f4f5f6;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        padding: 28rpx;
        overflow-y: auto;

        :deep(.password-input) {
            .content {
                padding: 0 28rpx;
            }
            .input-box {
                letter-spacing: 6rpx;
            }
        }

        .pwd-progress {
            margin: 24rpx;

            display: flex;
            align-items: center;

            .pwd-strength-label {
                font-size: 24rpx;
                color: #a7abb0;
                margin-right: 16rpx;
            }

            .pwd-strength-bars {
                display: flex;

                .strength-bar {
                    height: 12rpx;
                    width: 80rpx;
                    background-color: #a7abb0;
                    transition: background-color 0.3s ease;

                    &:not(:last-child) {
                        margin-right: 4rpx;
                    }

                    &:first-child {
                        border-radius: 12rpx 0 0 12rpx;
                    }

                    &:last-child {
                        border-radius: 0 12rpx 12rpx 0;
                    }

                    &.active {
                        background-color: #1677ff;
                    }
                }
            }
        }

        .tip {
            margin: 40rpx 28rpx 64rpx 28rpx;
            color: #888c92;
            font-size: 24rpx;
        }
    }
}
</style>
