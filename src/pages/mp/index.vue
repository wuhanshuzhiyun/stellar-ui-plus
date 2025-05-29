<script lang="ts" setup>
import type { Content } from '../pc/types';
import useComponents from './composables/useComponents';
import config from '@/uni_modules/stellar-ui-plus/package.json';

const datas = useComponents();
function toDemo(item: Content) {
    const url = `/subPackages_demo_view/${item.key}/${item.key}`;
    uni.navigateTo({ url });
}
function toConfig(url: string) {
    uni.navigateTo({ url });
}
</script>

<template>
    <view class="mp-home">
        <view class="home-title">Stellar Plus</view>
        <view class="home-content">
            <view class="home-subtitle">
                <image src="https://image.whzb.com/chain/StellarUI/logo.png" />
                <view>
                    <view class="subtitle-title">Stellar Plus {{ config.version }}</view>
                    <view class="subtitle-message">uniapp快速开发的UI框架</view>
                </view>
            </view>
            <view class="subtitle-message">Stellar Plus，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</view>
            <view class="conponents">
                <view class="components-group">
                    <view class="components-title">个性化</view>
                    <view class="components-content">
                        <view class="components-item" @click="toConfig('/pages/mp/font-size/font-size')">
                            <view class="item-title">
                                <image src="https://image.whzb.com/chain/StellarUI/组件图标/字体.png" mode="widthFix" />
                                <text>字体大小</text>
                            </view>
                            <view class="item-icon">
                                <image class="icon-image" src="https://image.whzb.com/chain/StellarUI/%E7%BB%84%E4%BB%B6%E5%9B%BE%E6%A0%87/r-arrow.png" />
                            </view>
                        </view>
                        <view class="components-item" @click="toConfig('/pages/mp/color/color')">
                            <view class="item-title">
                                <image src="https://image.whzb.com/chain/StellarUI/组件图标/color.png" mode="widthFix" />
                                <text>主题色</text>
                            </view>
                            <view class="item-icon">
                                <image class="icon-image" src="https://image.whzb.com/chain/StellarUI/%E7%BB%84%E4%BB%B6%E5%9B%BE%E6%A0%87/r-arrow.png" />
                            </view>
                        </view>
                    </view>
                </view>
                <view v-for="(item, index) in datas" :key="index" class="components-group">
                    <view class="components-title">
                        {{ item.group }}
                    </view>
                    <view class="components-content">
                        <view v-for="(m, i) in item.contents" :key="i" class="components-item" @click="toDemo(m)">
                            <view class="item-title">
                                <image :src="m.icon" mode="widthFix" />
                                <text>{{ m.name }}</text>
                            </view>
                            <view class="item-icon">
                                <image class="icon-image" src="https://image.whzb.com/chain/StellarUI/%E7%BB%84%E4%BB%B6%E5%9B%BE%E6%A0%87/r-arrow.png" />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.mp-home {
    width: 100vw;
    height: 100vh;

    .home-title {
        width: 100%;
        height: 120rpx;
        line-height: 90rpx;
        font-size: 42rpx;
        text-align: center;
        color: #333;
    }

    .home-content {
        width: 100%;
        height: calc(100vh - 120rpx);
        overflow-y: auto;
        padding: 42rpx;

        .home-subtitle {
            width: 100%;
            display: flex;
            align-items: center;

            image {
                width: 120rpx;
                height: 120rpx;
                margin-right: 20rpx;
            }

            .subtitle-title {
                font-size: 36rpx;
                line-height: 42rpx;
                color: #000;
                font-weight: bold;
            }
        }

        .subtitle-message {
            margin-top: 12rpx;
            line-height: 42rpx;
            font-size: 28rpx;
            color: #999;
        }

        .conponents {
            width: 100%;
            margin-top: 42rpx;

            .components-group {
                margin-bottom: 42rpx;

                .components-title {
                    font-size: 32rpx;
                    font-weight: bold;
                    line-height: 42rpx;
                    color: #000;
                    margin-bottom: 12rpx;
                }

                .components-content {
                    .components-item {
                        width: 100%;
                        font-size: 28rpx;
                        line-height: 42rpx;
                        color: #333;
                        padding: 12rpx 0;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        & + .components-item {
                            border-top: 1px solid #eee;
                        }

                        .item-title {
                            display: flex;
                            align-items: center;
                            image {
                                margin-right: 12rpx;
                                background-color: #f9f9f9;
                            }
                        }

                        image {
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
            }
        }
    }
}
</style>
