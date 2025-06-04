<template>
    <view class="ste-main-info--root" :style="[compRootStyle]" :class="[{ 'full-mode': compClassFullMode, 'mode-1': compClassMode1, 'mode-2': compClassMode2 }]">
        <view class="user-block" v-if="compShowUser || compShowAvatar">
            <view class="avatar" v-if="compShowAvatar" @click="handleAvatarClick">
                <ste-image :src="avatarUrl" width="80" height="80" radius="50%" />
            </view>
            <view class="user-info" v-if="compShowUser" @click="handleUserClick">
                <view class="name">{{ infoUser.title }}</view>
                <view class="desc">
                    <view class="desc-icon">
                        <ste-icon :code="infoUser.subTitleIcon" size="26" :color="compMainColor" marginRight="4" />
                    </view>
                    <text>{{ infoUser.subTitle }}</text>
                </view>
            </view>
        </view>
        <template v-if="compShowUser || compShowAvatar">
            <view class="info-block" :class="[{ 'only-info': !compShowUser && !compShowCode }]">
                <view class="item-block" v-for="item in infoData" :key="item.key" @click="handleDataItemClick(item)">
                    <view class="info">{{ item.value }}</view>
                    <view class="desc">{{ item.name }}</view>
                </view>
            </view>
            <view class="divider" v-if="compShowDivider" />
            <view class="code-block" v-if="compShowCode" @click="handleDataItemClick(infoCode)">
                <view class="code-image">
                    <ste-image :src="infoCode.img" width="60" height="60" />
                </view>
                <view class="desc">
                    <text>{{ infoCode.name }}</text>
                </view>
            </view>
        </template>
        <template v-else>
            <view class="info-block" :class="[{ 'only-info': !compShowUser && !compShowCode }]">
                <view class="item-block" v-for="item in infoData" :key="item.key">
                    <view class="info">{{ item.value }}</view>
                    <view class="desc">{{ item.name }}</view>
                </view>
                <view class="code-block" v-if="compShowCode" @click="handleDataItemClick(infoCode)">
                    <view class="code-image">
                        <ste-image :src="infoCode.img" width="60" height="60" />
                    </view>
                    <view class="desc">
                        <text>{{ infoCode.name }}</text>
                    </view>
                </view>
            </view>
        </template>
    </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useColorStore } from '../../store/color';
// import utils from '../../utils/utils';
import type { InfoItem } from './type';

import propsData, { mainInfoEmits } from './props';
const props = defineProps(propsData);
const emits = defineEmits(mainInfoEmits);

const { getColor } = useColorStore();

const compMainColor = computed(() => {
    return props.mainColor || getColor().steThemeColor;
});

const compRootStyle = computed(() => {
    return {
        '--main-color': compMainColor.value,
    };
});

const compShowUser = computed(() => {
    return props.infoUser && props.infoUser.title;
});

const compShowAvatar = computed(() => {
    return props.showAvatar && props.avatarUrl;
});

const compShowCode = computed(() => {
    return props.infoCode && props.infoCode.img && props.infoCode.name;
});

const compShowDivider = computed(() => {
    return props.infoUser && props.infoUser.title && compShowCode.value;
});

const compClassFullMode = computed(() => {
    return compShowUser.value && compShowAvatar.value && compShowCode.value && props.infoData.length >= 3;
});

const compClassMode1 = computed(() => {
    return (props.infoData.length < 3 || !compShowCode.value) && compShowUser.value;
});

const compClassMode2 = computed(() => {
    return !compShowUser.value && !compShowAvatar.value;
});

const handleDataItemClick = (item: InfoItem) => {
    emits('data-click', item);
};

const handleAvatarClick = () => {
    emits('avatar-click');
};

const handleUserClick = () => {
    emits('user-click');
};
</script>

<style lang="scss" scoped>
@import './ste-main-info.scss';
.ste-main-info--root {
    background-color: #fff;
    border-radius: 12rpx;

    padding: 0 20rpx 0 18rpx;
    display: flex;
    align-items: center;
    height: 148rpx;

    .user-block {
        display: flex;
        align-items: center;

        .avatar {
            border-radius: 50%;
            margin-right: 14rpx;
        }
        .user-info {
            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .desc {
                display: inline-flex;
                align-items: center;
                margin-top: 10rpx;
                color: var(--main-color);
            }
        }
        margin-right: 34rpx;
    }

    .info-block {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-block {
            text-align: center;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            .info {
                font-weight: bold;
                margin-bottom: 12rpx;
            }
        }
    }

    .divider {
        width: 2rpx;
        height: 50rpx;
        background-color: #f1f1f1;
    }
    .code-block {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .desc {
            margin-top: 12rpx;
            color: var(--main-color);
        }
    }
}
</style>
