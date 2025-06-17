<script setup lang="ts">
import { computed } from 'vue';
import propData, { type FunctionListItem } from './props';

const props = defineProps(propData);

const rootStyle = computed(() => {
    return {
        background: props.background,
        '--ste-function-list-content-bg': props.contentBg,
    };
});

const emits = defineEmits<{
    (e: 'click-header', type: 'empty' | 'title' | 'subhead' | 'more'): void;
    (e: 'click-item', type: 'empty' | 'image' | 'title' | 'subhead' | 'status' | 'button', item: FunctionListItem): void;
    (e: 'click-empty', type: 'image' | 'text' | 'button'): void;
}>();

const onClickHeader = (type: 'empty' | 'title' | 'subhead' | 'more') => emits('click-header', type);

const onClickItem = (type: 'empty' | 'image' | 'title' | 'subhead' | 'status' | 'button', item: FunctionListItem) => emits('click-item', type, item);

const onClickEmpty = (type: 'image' | 'text' | 'button') => emits('click-empty', type);
</script>
<template>
    <view class="ste-function-list-root" :style="[rootStyle]" data-test="function-list">
        <view class="ste-function-list-header" @click="onClickHeader('empty')">
            <view class="ste-function-list-header-l">
                <view class="ste-function-list-title" @click.stop="onClickHeader('title')">{{ title }}</view>
                <view class="ste-function-list-subhead" @click.stop="onClickHeader('subhead')">
                    <slot name="subhead">
                        {{ subhead }}
                    </slot>
                </view>
            </view>
            <view class="ste-function-list-header-r">
                <slot name="header-right">
                    <view class="ste-function-list-more" @click.stop="onClickHeader('more')">
                        更多
                        <ste-icon code="&#xe674;" color="#353535"></ste-icon>
                    </view>
                </slot>
            </view>
        </view>
        <view class="ste-function-list-content" v-if="data?.length">
            <scroll-view scroll-x class="content-list" :class="{ multiple: data?.length > 1 }">
                <view class="content-list-item" v-for="(item, index) in data" :key="index" @click="onClickItem('empty', item)">
                    <view class="content-list-item-image" @click.stop="onClickItem('image', item)">
                        <ste-image :src="item.image" mode="aspectFill"></ste-image>
                    </view>
                    <view class="content-list-item-info">
                        <view class="content-list-item-info-title" @click.stop="onClickItem('title', item)">{{ item.title }}</view>
                        <view class="content-list-item-info-subhead" v-if="item.subhead" @click.stop="onClickItem('subhead', item)">{{ item.subhead }}</view>
                        <view class="content-list-item-info-footer">
                            <view class="content-list-item-info-status" @click.stop="onClickItem('status', item)">{{ item.statusText }}</view>
                            <view class="content-list-item-info-button" v-if="item.buttonText || buttonText || item.buttonIcon || buttonIcon" @click.stop="onClickItem('button', item)">
                                <ste-button :mode="100" :rootStyle="{ height: '56rpx' }" type="primary" :background="item.buttonBg || buttonBg" :color="item.buttonColor || buttonColor">
                                    <ste-icon :code="item.buttonIcon || buttonIcon" :color="item.buttonColor || buttonColor" size="24.5" :fontFamily="fontFamily" />
                                    <text style="margin-left: 8rpx">{{ item.buttonText || buttonText }}</text>
                                </ste-button>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="ste-function-list-empty" v-else>
            <ste-image :src="emptyImage" width="96" height="96" @click="onClickEmpty('image')" />
            <view class="empty-message" @click="onClickEmpty('text')">{{ emptyText }}</view>
            <ste-button :mode="100" :rootStyle="{ height: '56rpx' }" type="primary" :background="buttonBg" :color="buttonColor" @click="onClickEmpty('button')">
                {{ emptyButtonText }}
            </ste-button>
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
                        .content-list-item-info-status {
                            flex: 1;
                            padding-right: 20rpx;
                        }
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
    .ste-function-list-empty {
        width: 100%;
        height: 120rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 12rpx;
        background-color: var(--ste-function-list-content-bg);
        padding: 0 20rpx;
        margin-top: 24rpx;
        .empty-message {
            flex: 1;
            padding: 0 20rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 28rpx;
            color: #000000;
        }
    }
}
</style>
