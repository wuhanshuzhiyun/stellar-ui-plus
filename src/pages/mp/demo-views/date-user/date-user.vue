<script lang="ts" setup></script>

<template>
    <page-layout title="人员信息以及日期">
        <view class="description">
            <view class="cmp-name">DateUser 人员信息以及日期</view>
            <view class="cmp-desc">提供日期和用户信息展示。</view>
        </view>
        <view class="demo-item">
            <view class="title">日期类型</view>
            <view class="item-block">
                <view>
                    <ste-date-user date="2025-10-01"></ste-date-user>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">用户信息类型</view>
            <view class="item-block">
                <view>
                    <ste-date-user type="user" avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三">
                        <template v-slot:desc>
                            <view class="desc">
                                <view class="title">店长</view>
                                <ste-icon code="&#xe6c7;" color="#0275FF" size="15"></ste-icon>
                            </view>
                        </template>
                    </ste-date-user>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            background-color: #f0f2f5;
            .item-block {
                > view {
                    margin: 0 36rpx 36rpx 0;
                }
            }
            .desc {
                display: flex;
                align-items: center;
                .title {
                    font-size: 24rpx;
                    color: #0275ff;
                    margin: 4rpx;
                    margin-right: 14rpx;
                }
            }
        }
    }
}
</style>
