<script setup lang="ts">
import { computed } from 'vue';
import propData, { type OrderGoods } from './props';

const props = defineProps(propData);

const rootStyle = computed(() => {
    return {
        background: props.background,
        '--ste-order-card-content-bg': props.contentBg || props.background,
    };
});

const emits = defineEmits<{
    (e: 'click-header', type: 'empty' | 'title' | 'image' | 'status' | 'tag' | 'helper'): void;
    (e: 'click-item', type: 'empty' | 'image' | 'title' | 'sub-title' | 'details', data: OrderGoods): void;
    (e: 'click-button', type: 'primary' | 'secondary' | 'more'): void;
}>();

const onClickHeader = (type: 'empty' | 'title' | 'image' | 'status' | 'tag' | 'helper') => emits('click-header', type);

const onClickItem = (type: 'empty' | 'image' | 'title' | 'sub-title' | 'details', data: OrderGoods) => emits('click-item', type, data);
const onClickBtns = (type: 'primary' | 'secondary' | 'more') => emits('click-button', type);

const oneData = computed(() => (props.data?.length === 1 ? props.data[0] : null));
</script>
<template>
    <view class="ste-order-card-root" :style="[rootStyle]">
        <view class="order-card-head" @click="onClickHeader('empty')">
            <view class="order-card-head-l">
                <view class="head-image" @click.stop="onClickHeader('image')">
                    <slot name="head-image">
                        <image :src="image" class="head-image-img" mode="aspectFill" />
                    </slot>
                </view>
                <view class="head-title" @click.stop="onClickHeader('title')">{{ title }}</view>
            </view>
            <view class="order-card-head-r" @click.stop="onClickHeader('status')">{{ statusText }}</view>
        </view>
        <view class="order-card-sub-header" v-if="tagText || helperText" @click="onClickHeader('empty')">
            <view class="sub-tag" v-if="tagText" @click.stop="onClickHeader('tag')">{{ tagText }}</view>
            <view class="sub-helper" v-if="helperText" @click.stop="onClickHeader('helper')">{{ helperText }}</view>
        </view>
        <view class="order-card-content">
            <view class="content-info" v-if="oneData" @click="onClickItem('empty', oneData)">
                <view @click.stop="onClickItem('image', oneData)">
                    <ste-image :src="oneData.image" width="132" height="132" radius="12" />
                </view>
                <view class="info-text">
                    <view class="info-t">
                        <view class="info-title" @click.stop="onClickItem('title', oneData)">{{ oneData.title }}</view>
                        <view class="info-sub-title" @click.stop="onClickItem('sub-title', oneData)">{{ oneData.subTitle }}</view>
                    </view>
                    <view class="info-f" v-if="showDetail" @click.stop="onClickItem('details', oneData)">
                        详情
                        <ste-icon code="&#xe674;" />
                    </view>
                </view>
            </view>
            <scroll-view scroll-x class="content-list" v-else>
                <view class="content-item" v-for="(item, index) in data" :key="index" @click="onClickItem('empty', item)">
                    <view @click.stop="onClickItem('image', item)">
                        <ste-image :src="item.image" width="132" height="132" radius="12" />
                    </view>
                    <view class="info-title" @click.stop="onClickItem('title', item)">{{ item.title }}</view>
                </view>
            </scroll-view>
        </view>
        <view class="order-card-footer">
            <view class="footer-data">
                <view class="footer-count">共{{ count }}件</view>
                <view class="footer-price">
                    合计：
                    <ste-price :value="price" color="#000000" fontSize="30" />
                </view>
            </view>
            <view class="footer-btns">
                <view class="footer-btns-l" @click="onClickBtns('more')"><block v-if="showMore">更多</block></view>
                <view class="footer-btns-r">
                    <ste-button v-if="subBtnText" background="transparent" borderColor="#000" color="#353535" @click="onClickBtns('secondary')">{{ subBtnText }}</ste-button>
                    <ste-button v-if="mainBtnText" :background="mainBtnBg" @click="onClickBtns('primary')">{{ mainBtnText }}</ste-button>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-order-card-root {
    border-radius: 12rpx;
    .order-card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx 28rpx 20rpx 30rpx;
        .order-card-head-l {
            display: flex;
            align-items: center;
            .head-image {
                width: 40rpx;
                height: 40rpx;
                background: #ec3e1a;
                border-radius: 50%;
                overflow: hidden;
                .head-image-img {
                    width: 100%;
                    height: 100%;
                }
            }
            .head-title {
                font-weight: bold;
                font-size: 32rpx;
                color: #000000;
                margin-left: 18rpx;
            }
        }
        .order-card-head-r {
            font-size: 28rpx;
            color: #ec3e1a;
        }
    }
    .order-card-sub-header {
        padding: 0 28rpx;
        display: flex;
        align-items: center;
        .sub-tag {
            background-color: #fcde9755;
            border-radius: 4rpx;
            padding: 0 12rpx;
            height: 38rpx;
            font-size: 24rpx;
            color: #8a1100;
            line-height: 38rpx;
        }
        .sub-helper {
            flex: 1;
            padding-left: 16rpx;
            font-size: 28rpx;
            color: #757575;
        }
    }
    .order-card-content {
        margin-top: 10rpx;
        padding: 20rpx 28rpx;
        background-color: var(--ste-order-card-content-bg);
        border-radius: 12rpx;
        .content-info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .info-text {
                width: calc(100% - 152rpx);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .info-t {
                    .info-title {
                        font-weight: bold;
                        font-size: 28rpx;
                        color: #000000;
                        line-height: 40rpx;
                    }
                    .info-sub-title {
                        margin-top: 8rpx;
                        font-weight: 500;
                        font-size: 24rpx;
                        color: #757575;
                        line-height: 34rpx;
                    }
                }
                .info-f {
                    font-weight: 500;
                    font-size: 24rpx;
                    color: #757575;
                    line-height: 34rpx;
                    cursor: pointer;
                }
            }
        }
        .content-list {
            // 不许换行
            white-space: nowrap;
            .content-item {
                display: inline-block;
                & + .content-item {
                    margin-left: 24rpx;
                }
                .info-title {
                    width: 132rpx;
                    // 溢出显示省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 8rpx;
                    font-size: 24rpx;
                    color: #757575;
                    height: 34rpx;
                    line-height: 34rpx;
                }
            }
        }
    }
    .order-card-footer {
        margin-top: 8rpx;
        padding: 0 28rpx 24rpx 28rpx;
        .footer-data {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            font-size: 28rpx;
            .footer-count {
                margin-right: 14rpx;
            }
        }
        .footer-btns {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 24rpx;
            .footer-btns-l {
                font-size: 28rpx;
                color: #353535;
                cursor: pointer;
            }

            .footer-btns-r {
                display: flex;
                gap: 24rpx;
            }
        }
    }
}
</style>
