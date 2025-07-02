<script setup lang="ts">
import System from '@/uni_modules/stellar-ui-plus/utils/System';
import utils from '@/uni_modules/stellar-ui-plus/utils/utils';
import { computed } from 'vue';

// 获取底部安全距离
const safeBottom = System.getSystemSetting().safeAreaInsets.bottom;
const contentStyle = computed(() => ({
    paddingBottom: safeBottom ? `${safeBottom + utils.formatPx(234, 'num')}px` : '234rpx',
}));
const footerStyle = computed(() => ({
    paddingBottom: safeBottom ? `${safeBottom}px` : '0',
}));
</script>
<template>
    <view class="privacy-policy-view">
        <ste-navbar title="某种隐私协议标题" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="page-content" :style="[contentStyle]">
            <view class="test-item" v-for="(_, i) in Array.from({ length: 20 })" :key="i">{{ i + 1 }}.隐私协议内容隐私协议内容隐私协议内容隐私协议内容隐私协议内容隐私协议内容</view>
        </view>
        <view class="page-footer" :style="[footerStyle]">
            <view class="footer-view">
                <view class="footer-text">如果同意《某某隐私协议政策》，请点击“同意”开始使用我们的 产品和服务。如果您无法认同政策，可点击“不同意”并退出。</view>
                <view class="footer-btns">
                    <ste-button width="340" :mode="300" background="#fff" border-color="#DDD" color="#1D2129" @click="">不同意</ste-button>
                    <ste-button width="340" :mode="300" type="primary" @click="">同意</ste-button>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.privacy-policy-view {
    width: 750rpx;
    background-color: #fff;
    .page-content {
        padding: 10rpx 30rpx;
        .test-item {
            &:nth-child(odd) {
                color: #666;
            }
            &:nth-child(even) {
                color: #09f;
            }
        }
    }
    .page-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #ffffff;
        box-shadow: 0px -6px 12px 2px rgba(0, 0, 0, 0.04);
        .footer-view {
            padding: 20rpx 24rpx;
            width: 100%;
            height: 214rpx;
            .footer-text {
                font-weight: 500;
                font-size: 24rpx;
                color: #a0a0a0;
                line-height: 36rpx;
            }
            .footer-btns {
                margin-top: 24rpx;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>
