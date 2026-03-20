<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';

const toast = useToast();

const value1 = ref(false);
const value2 = ref(false);
const value3 = ref(false);
const value4 = ref(false);
const value5 = ref(false);
const value6 = ref(false);

const statusTexts = reactive({
    basic: '未完成',
    noFail: '未完成',
    image: '未完成',
    disabled: '禁用状态下不可拖动',
    longFail: '未完成',
    custom: '未完成',
});

function updateStatus(key: keyof typeof statusTexts, text: string) {
    statusTexts[key] = text;
}

function handleSuccess(label: string, key: keyof typeof statusTexts) {
    updateStatus(key, `${label}：验证成功`);
    toast.showToast({
        icon: 'none',
        title: `${label}验证成功`,
    });
}

function handleFail(label: string, key: keyof typeof statusTexts) {
    updateStatus(key, `${label}：验证失败`);
    toast.showToast({
        icon: 'none',
        title: `${label}验证失败`,
    });
}

function handleChange(prefix: string, key: keyof typeof statusTexts, detail: { progress: number; angle: number }) {
    const progress = Math.round(detail.progress * 100);
    const angle = Math.round(detail.angle);
    statusTexts[key] = `${prefix}：进度 ${progress}% / 角度 ${angle}°`;
}
</script>

<template>
    <page-layout title="滑动验证" contentStyle="padding: 0;background-color: #f5f5f5;color: #0009;">
        <view class="description">
            <view class="cmp-name">Slide Verify 滑动验证</view>
            <view class="cmp-desc">通过拖动滑块完成验证，适合登录、提交、活动领取等需要轻量校验的场景。</view>
        </view>

        <view class="type-block">
            <view>01 组件类型</view>
        </view>

        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-slide-verify v-model="value1" @change="handleChange('基础用法', 'basic', $event)" @success="handleSuccess('基础', 'basic')" @fail="handleFail('基础', 'basic')"></ste-slide-verify>
                <view class="status-text">{{ statusTexts.basic }}</view>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">没有错误提示</view>
            <view class="item-block">
                <ste-slide-verify
                    v-model="value3"
                    text="向右滑动验证"
                    :showFail="false"
                    @change="handleChange('没有错误提示', 'noFail', $event)"
                    @success="handleSuccess('没有错误提示', 'noFail')"
                    @fail="handleFail('没有错误提示', 'noFail')"
                ></ste-slide-verify>
                <view class="status-text">{{ statusTexts.noFail }}</view>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">转动图片</view>
            <view class="item-block">
                <ste-slide-verify
                    v-model="value2"
                    mode="image"
                    imageUrl="https://image.whzb.com/chain/StellarUI/mp-logo.png"
                    successText="图片校验通过"
                    @change="handleChange('转动图片', 'image', $event)"
                    @success="handleSuccess('转动图片', 'image')"
                    @fail="handleFail('转动图片', 'image')"
                ></ste-slide-verify>
                <view class="status-text">{{ statusTexts.image }}</view>
            </view>
        </view>

        <view class="type-block">
            <view>02 组件状态</view>
        </view>

        <view class="demo-item">
            <view class="title">禁用状态</view>
            <view class="item-block">
                <ste-slide-verify v-model="value4" disabled text="当前不可操作"></ste-slide-verify>
                <view class="status-text">{{ statusTexts.disabled }}</view>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">失败态停留更久</view>
            <view class="item-block">
                <ste-slide-verify
                    v-model="value5"
                    failText="请慢一点再试"
                    :failDuration="1800"
                    @change="handleChange('失败停留', 'longFail', $event)"
                    @success="handleSuccess('失败停留', 'longFail')"
                    @fail="handleFail('失败停留', 'longFail')"
                ></ste-slide-verify>
                <view class="status-text">{{ statusTexts.longFail }}</view>
            </view>
        </view>

        <view class="type-block">
            <view>03 组件自定义</view>
        </view>

        <view class="demo-item">
            <view class="title">尺寸、颜色与文案</view>
            <view class="item-block">
                <ste-slide-verify
                    v-model="value6"
                    size="52"
                    imageSize="180"
                    text="拖动完成领取"
                    successText="领取成功"
                    failText="再试一次"
                    activeColor="linear-gradient(90deg, #ff7a18, #ffb800)"
                    successColor="#1f9d55"
                    failColor="#d93025"
                    @change="handleChange('自定义样式', 'custom', $event)"
                    @success="handleSuccess('自定义样式', 'custom')"
                    @fail="handleFail('自定义样式', 'custom')"
                ></ste-slide-verify>
                <view class="status-text">{{ statusTexts.custom }}</view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.content {
    .description,
    .type-block {
        padding: 0 40rpx;
    }
}
.demo-item {
    padding: 16rpx;
    margin: 0 16rpx;
    border-radius: 8rpx;
    background-color: #fff;
    .item-block {
        width: 100%;
    }
}

.status-text {
    margin-top: 20rpx;
    font-size: 24rpx;
    line-height: 1.6;
    color: #666666;
}
</style>
