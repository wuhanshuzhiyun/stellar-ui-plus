<template>
    <view class="ste-main-info--root" :style="[compRootStyle]">
        <view class="user-block">
            <view class="avatar" @click="handleAvatarClick">
                <ste-image :src="loginStatus == 1 ? avatar : loginSrc" width="92" height="92" radius="50%" />
            </view>
            <view class="user-info" @click="handleUserClick" v-if="loginStatus == 1">
                <view class="name">
                    <text class="name-text">{{ nickname }}</text>
                </view>
                <view class="desc">
                    <ste-icon v-if="subTitleIcon" :code="subTitleIcon" size="26" :color="compMainColor" marginRight="4" :fontFamily="fontFamily" />
                    <text>{{ subTitle }}</text>
                </view>
            </view>
            <view class="user-info user-info-login" @click="loginTitleClick" v-else>
                <view class="name">
                    <text class="name-text">{{ loginTitle }}</text>
                    <ste-icon code="&#xe674;" size="28" color="#000" marginLeft="8" :fontFamily="fontFamily" />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useColorStore } from '../../store/color';
// import utils from '../../utils/utils';

import propsData, { loginInfoEmits } from './props';
const props = defineProps(propsData);
const emits = defineEmits(loginInfoEmits);

const { getColor } = useColorStore();

const compMainColor = computed(() => {
    return getColor().steThemeColor;
});

const compRootStyle = computed(() => {
    return {
        '--main-color': compMainColor.value,
    };
});

const handleAvatarClick = () => {
    emits('avatar-click');
};

const handleUserClick = () => {
    emits('user-click');
};

const loginTitleClick = () => {
    emits('login-title-click');
};
</script>

<style lang="scss" scoped>
.ste-main-info--root {
    background-color: #fff;
    border-radius: 12rpx;

    padding: 0 20rpx 0 18rpx;
    display: flex;
    align-items: center;
    height: 148rpx;

    .user-block {
        width: 100%;
        display: flex;
        align-items: center;

        .avatar {
            border-radius: 50%;
            margin-right: 24rpx;
        }
        .user-info-login {
            justify-content: center;
        }
        .user-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
                display: flex;
                align-items: center;
                .name-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: var(--font-size-32, 32rpx);
                    font-weight: bold;
                }
            }

            .desc {
                display: inline-flex;
                align-items: center;
                color: var(--main-color);
                font-size: var(--font-size-24, 24rpx);
            }
        }
    }
}
</style>
