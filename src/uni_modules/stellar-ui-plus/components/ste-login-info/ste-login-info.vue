<template>
    <view class="ste-main-info--root">
        <view class="user-block">
            <view class="avatar" @click="handleAvatarClick">
                <ste-image :src="compAvatarSrc" width="92" height="92" radius="50%" />
            </view>
            <view class="user-info">
                <view class="name" @click="handleUserClick">
                    <text class="name-text">{{ compLoginTitle }}</text>
                    <ste-icon code="&#xe674;" size="28" color="#000" marginLeft="8" :fontFamily="fontFamily" v-if="showTitleIcon" />
                </view>
                <view class="desc" v-if="compShowDesc">
                    <template v-if="loginStatus === 1"><slot name="desc"></slot></template>
                    <text v-else>{{ loginInfo }}</text>
                </view>
            </view>
            <view class="user-info" @click="loginTitleClick" v-else>
                <view class="name">
                    <text class="name-text">{{ loginTitle }}</text>
                    <ste-icon code="&#xe674;" size="28" color="#000" marginLeft="8" :fontFamily="fontFamily" />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

import propsData, { loginInfoEmits } from './props';
const props = defineProps(propsData);
const emits = defineEmits(loginInfoEmits);
const slots = useSlots();

const compAvatarSrc = computed(() => {
    if (props.loginStatus === 0) {
        return props.loginSrc;
    } else {
        return props.avatar;
    }
});

const compLoginTitle = computed(() => {
    if (props.loginStatus === 0) {
        return props.loginTitle;
    } else {
        return props.nickname;
    }
});

const compShowDesc = computed(() => {
    return (props.loginStatus === 0 && props.loginInfo) || (props.loginStatus === 1 && slots.desc);
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
        .user-info {
            flex: 1;
            .name {
                display: flex;
                flex-wrap: nowrap;
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
                margin-top: 10rpx;
                color: #757575;
                font-size: var(--font-size-24, 24rpx);
            }
        }
    }
}
</style>
