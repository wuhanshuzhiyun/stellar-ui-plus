<script setup lang="ts">
import System from '@/uni_modules/stellar-ui-plus/utils/System';
import { computed, ref } from 'vue';
const form = ref({
    name: '王小百',
    sex: '',
    prefix: '+86',
    phone: '18866886868',
    address: '',
    defaultAddress: false,
    tag: '1',
});

const prefixs = ref([
    {
        label: '+86',
        value: '+86',
    },
]);
const tags = ref([
    { label: '家', value: '1' },
    { label: '公司', value: '2' },
    { label: '学校', value: '3' },
    { label: '自定义', value: '4' },
]);
// 获取底部安全距离
const safeBottom = System.getSystemSetting().safeAreaInsets.bottom;
const footerStyle = computed(() => ({
    paddingBottom: safeBottom ? `${safeBottom + 12}px` : '12px',
}));
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
                    <view class="form-item-label">手机号</view>
                    <view class="form-item-value">
                        <ste-select width="104" height="44" fontSize="32" paddingLeft="0" paddingRight="20" :list="prefixs" v-model="form.prefix" borderColor="transparency">
                            <template v-slot:icon>
                                <ste-icon code="&#xe676;"></ste-icon>
                            </template>
                        </ste-select>
                        <input
                            class="form-item-input"
                            placeholderClass="value-placeholder"
                            style="width: calc(100% - 118rpx); transform: translateY(-2rpx)"
                            placeholder="请输入手机号"
                            maxlength="11"
                            v-model="form.phone"
                        />
                    </view>
                </view>
            </view>
            <view class="page-block">
                <view class="form-item">
                    <ste-tabs tabPadding="0">
                        <ste-tab title="地图选址"></ste-tab>
                        <ste-tab title="地区选址"></ste-tab>
                    </ste-tabs>
                </view>
                <view class="form-item">
                    <view class="form-item-label">地址</view>
                    <view class="form-item-value">
                        <view class="value-placeholder">请选择收货地址</view>
                        <view class="form-item-value-icon">
                            <ste-icon size="20" code="&#xe674;" />
                        </view>
                    </view>
                </view>
                <view class="form-item">
                    <view class="form-item-label">门牌号</view>
                    <view class="form-item-value">
                        <input class="form-item-input" placeholderClass="value-placeholder" placeholder="例：2栋501室" maxlength="11" />
                    </view>
                </view>
            </view>
            <view class="page-block">
                <view class="form-item center">
                    <view class="form-item-label">
                        设为默认地址
                        <view class="reminder">提示：下单时会优先使用该地址</view>
                    </view>
                    <view class="form-item-value">
                        <ste-checkbox v-model="form.defaultAddress"></ste-checkbox>
                    </view>
                </view>
                <view class="form-item start">
                    <view class="form-item-label">标签</view>
                    <view class="form-item-value">
                        <view class="tag-item" v-for="(tag, i) in tags" :key="tag.value" :class="{ right: (i + 1) % 3 === 0, active: tag.value === form.tag }" @click="form.tag = tag.value">
                            {{ tag.label }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="page-footer" style="[footerStyle]">
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
        width: 100%;
        padding: 20rpx 24rpx 0 24rpx;
        .page-block {
            width: 100%;
            padding: 0 24rpx;
            background: #ffffff;
            border-radius: 12rpx;
            & + .page-block {
                margin-top: 20rpx;
            }

            .form-item {
                width: 100%;
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

                &.center {
                    .form-item-label,
                    .form-item-value {
                        width: initial;
                        height: initial;
                    }
                    .form-item-label .reminder {
                        font-weight: 500;
                        font-size: 28rpx;
                        color: #999999;
                        margin-top: 8rpx;
                    }
                }

                &.start {
                    align-items: flex-start;
                    padding: 0;
                    .form-item-label {
                        padding: 32rpx 0;
                        height: 108rpx;
                    }
                    .form-item-value {
                        height: initial;
                        padding-top: 32rpx;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        .tag-item {
                            width: 132rpx;
                            height: 60rpx;
                            border-radius: 8rpx;
                            border: 2rpx solid #f5f5f5;
                            background: #f5f5f5;
                            line-height: 58rpx;
                            text-align: center;
                            margin: 0 42rpx 20rpx 0;
                            // #ifdef H5
                            cursor: pointer;
                            // #endif
                            &.right {
                                margin-right: 0;
                            }
                            &.active {
                                background: #ffffff;
                                border-color: #e32b11;
                                color: #e32b11;
                            }
                        }
                    }
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
                    justify-content: space-between;
                    height: 44rpx;

                    .value-placeholder {
                        font-weight: 500;
                        font-size: 32rpx;
                        color: #999999;
                    }

                    .form-item-input {
                        font-weight: bold;
                        font-size: 32rpx;
                        height: 44rpx;
                        color: #000000;
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
    .page-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 24rpx;
        background: #fff;
    }
}
</style>
