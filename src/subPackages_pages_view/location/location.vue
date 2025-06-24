<script setup lang="ts">
import { ref } from 'vue';
const form = ref({
    name: '王小百',
    sex: '',
    phone: '',
    address: '',
});
</script>
<template>
    <view class="page-user-info-view">
        <ste-navbar title="编辑收货地址" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="page-content">
            <view class="page-block">
                <view class="form-item">
                    <view class="form-item-label">收货人</view>
                    <view class="form-item-value">
                        <input class="form-item-input" style="width: 240rpx" placeholder="请输入收货人姓名" v-model="form.name" />
                        <view class="form-item-radio">
                            <ste-radio v-model="form.sex" name="a">先生</ste-radio>
                        </view>
                        <view class="form-item-radio">
                            <ste-radio v-model="form.sex" name="b">女士</ste-radio>
                        </view>
                    </view>
                </view>
                <view class="form-item">
                    <view class="form-item-label">性别</view>
                    <view class="form-item-value">女</view>
                </view>
                <view class="form-item">
                    <view class="form-item-label">地区</view>
                    <view class="form-item-value">湖北武汉</view>
                </view>
            </view>
            <view class="page-block">
                <view class="form-item">
                    <view class="form-item-label">出生日期</view>
                    <view class="form-item-value">
                        选择
                        <view class="form-item-value-icon">
                            <ste-icon size="20" code="&#xe674;" color="#333" />
                        </view>
                    </view>
                </view>
                <view class="form-item">
                    <view class="form-item-label">个性签名</view>
                    <view class="form-item-value disabled">暂未开放</view>
                </view>
            </view>
            <view class="page-block">
                <view class="form-item">
                    <view class="form-item-label">切换账户</view>
                    <view class="form-item-value">
                        13593771647
                        <view class="form-item-value-icon">
                            <ste-icon size="20" code="&#xe674;" />
                        </view>
                    </view>
                </view>
            </view>

            <ste-button class="submit-btn" background="#EC3E1A" width="100%" :mode="300">
                <text style="color: #ffffff">确定</text>
            </ste-button>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.page-user-info-view {
    width: 750rpx;
    min-height: 100vh;
    background-color: #f5f5f5;
    .page-content {
        padding: 20rpx 24rpx 0 24rpx;
        .page-block {
            padding: 0 24rpx;
            background: #ffffff;
            border-radius: 12rpx;
            & + .page-block {
                margin-top: 20rpx;
            }

            .form-item {
                display: flex;
                justify-content: space-between;
                padding: 32rpx 0;
                font-weight: 400;
                font-size: 28rpx;
                color: #000000;
                line-height: 44rpx;
                & + .form-item {
                    border-top: 1rpx solid #f8f8f8;
                }
                // 第一个上内边距36rpx
                &:first-child {
                    padding-top: 36rpx;
                }
                // 最后一个下内边距36rpx
                &:last-child {
                    padding-bottom: 36rpx;
                }
                .form-item-label {
                    width: 156rpx;
                    font-weight: 500;
                    font-size: 32rpx;
                    color: #000000;
                    height: 44rpx;
                }
                .form-item-value {
                    width: calc(100% - 156rpx);
                    display: flex;
                    align-items: flex-start;
                    height: 44rpx;

                    .form-item-input {
                        font-weight: bold;
                        font-size: 32rpx;
                        height: 100%;
                        line-height: 44rpx;
                        color: #000000;
                        flex: 1;
                    }
                    .form-item-radio {
                        flex-shrink: 0;
                        & + .form-item-radio {
                            margin-left: 32rpx;
                        }
                    }
                    .form-item-value-icon {
                        margin-left: 14rpx;
                        line-height: 36rpx;
                    }
                    &.disabled {
                        color: #bbbbbb;
                        // #ifdef H5
                        cursor: not-allowed;
                        // #endif
                    }
                }
            }
        }
        .submit-btn {
            margin-top: 48rpx;
        }
    }
}
</style>
