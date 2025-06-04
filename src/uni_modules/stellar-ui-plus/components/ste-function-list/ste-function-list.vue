<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import propData from './props';
import { useColorStore } from '../../store/color';

let { getColor } = useColorStore();

const props = defineProps(propData);

const rootStyle = computed(() => {
    return {
        background: props.background,
        '--ste-function-list-content-bg': props.contentBg,
    };
});
</script>
<template>
    <view class="ste-function-list-root" :style="[rootStyle]">
        <view class="ste-function-list-header">
            <view class="ste-function-list-header-l">
                <view class="ste-function-list-title">{{ title }}</view>
                <view class="ste-function-list-subhead">
                    <slot name="subhead">
                        {{ subhead }}
                    </slot>
                </view>
            </view>
            <view class="ste-function-list-header-r">
                <slot name="header-right">
                    <view class="ste-function-list-more">
                        更多
                        <ste-icon code="&#xe674;" color="#353535"></ste-icon>
                    </view>
                </slot>
            </view>
        </view>
        <view class="ste-function-list-content" v-if="data?.length">
            <scroll-view scroll-x class="content-list" :class="{ multiple: data?.length > 1 }">
                <view class="content-list-item" v-for="(item, index) in data" :key="index">
                    <view class="content-list-item-image">
                        <ste-image :src="item.image" mode="aspectFill"></ste-image>
                    </view>
                    <view class="content-list-item-info">
                        <view class="content-list-item-info-title">{{ item.title }}</view>
                        <view class="content-list-item-info-subhead" v-if="item.subhead">{{ item.subhead }}</view>
                        <view class="content-list-item-info-footer">
                            <view class="content-list-item-info-status">{{ item.statusText }}</view>
                            <view class="content-list-item-info-button" v-if="item.buttonText || buttonText || item.buttonIcon || buttonIcon">
                                <ste-button :rootStyle="{ height: '56rpx' }" type="primary">
                                    <ste-icon :code="item.buttonIcon || buttonIcon" />
                                    {{ item.buttonText || buttonText }}
                                </ste-button>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-function-list-root {
    padding: 24rpx 24rpx 20rpx 24rpx;
    border-radius: 12rpx;
    .ste-function-list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .ste-function-list-header-l {
            display: flex;
            align-items: center;
            .ste-function-list-title {
                font-weight: bold;
                font-size: 32rpx;
                color: #000000;
            }
            .ste-function-list-subhead {
                font-size: 24rpx;
                color: #ac7900;
                line-height: 44rpx;
                height: 44rpx;
                background: rgba(252, 222, 151, 0.23);
                border-radius: 22rpx;
                padding: 0 12rpx;
                margin-left: 18rpx;
            }
        }
        .ste-function-list-header-r {
            font-size: 24rpx;
            color: #353535;
        }
    }
    .ste-function-list-content {
        width: 100%;
        margin-top: 24rpx;
        .content-list {
            width: 100%;
            white-space: nowrap;
            .content-list-item {
                width: 100%;
                display: inline-flex;
                border-radius: 12rpx;
                padding: 24rpx 20rpx 20rpx 20rpx;
                background-color: var(--ste-function-list-content-bg);
                justify-content: space-between;
                & + .content-list-item {
                    margin-left: 20rpx;
                }

                .content-list-item-image {
                    width: 140rpx;
                    overflow: hidden;
                    background: #dddddd;
                    border-radius: 12rpx;
                }
                .content-list-item-info {
                    width: calc(100% - 160rpx);
                    white-space: normal;
                    .content-list-item-info-title {
                        font-weight: bold;
                        font-size: 28rpx;
                        color: #000000;
                        line-height: 40rpx;
                    }
                    .content-list-item-info-subhead {
                        font-size: 24rpx;
                        color: #757575;
                        line-height: 34rpx;
                        margin-top: 12rpx;
                    }
                    .content-list-item-info-footer {
                        font-size: 24rpx;
                        color: #757575;
                        height: 56rpx;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 10rpx;
                    }
                }
            }

            &.multiple {
                .content-list-item {
                    width: calc(100% - 90rpx);
                }
            }
        }
    }
}
</style>
