<template>
    <view class="ste-main-info--root" :style="[compRootStyle]">
        <view class="user-block">
            <view class="avatar" @click="handleAvatarClick">
                <ste-image :src="avatarUrl" width="92" height="92" radius="50%" />
            </view>
            <view class="user-info" @click="handleUserClick">
                <view class="name">
                    <text class="name-text">{{ title }}</text>
                    <ste-icon code="&#xe674;" size="28" color="#000" marginLeft="8" :fontFamily="fontFamily" />
                </view>
                <view class="desc" v-if="subTitle || subTitleIcon">
                    <ste-icon v-if="subTitleIcon" :code="subTitleIcon" size="26" :color="compMainColor" marginRight="4" :fontFamily="fontFamily" />
                    <text>{{ subTitle }}</text>
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
    return props.mainColor || getColor().steThemeColor;
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
                flex-warp: nowrap;
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
                color: var(--main-color);
                font-size: var(--font-size-24, 24rpx);
            }
        }
    }
}
</style>
