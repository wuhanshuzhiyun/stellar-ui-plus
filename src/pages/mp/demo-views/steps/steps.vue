<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
const active = ref(0);

function goToPrev() {
    if (active.value <= 0) return;
    active.value--;
}

function goToNext() {
    if (active.value >= 3) return;
    active.value++;
}
function toToast(index: number) {
    toast.showToast({
        title: `进度：${index}`,
    });
}
</script>

<template>
    <page-layout title="步骤条">
        <view style="text-align: center; margin-top: 30rpx; position: sticky; top: 30rpx; z-index: 100">
            <ste-button @click="goToPrev">上一步</ste-button>
            <ste-button @click="goToNext">下一步</ste-button>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-steps :active="active" @clickStep="toToast">
                    <ste-step></ste-step>
                    <ste-step></ste-step>
                    <ste-step></ste-step>
                </ste-steps>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">设置标题和描述信息</view>
            <view class="item-block">
                <ste-steps :active="active">
                    <ste-step title="步骤1" description="注册1个账号"></ste-step>
                    <ste-step title="步骤2" description="登录账号并绑定手机"></ste-step>
                    <ste-step title="步骤3" description="完善个人信息"></ste-step>
                </ste-steps>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">修改图标</view>
            <view class="item-block">
                <ste-steps :active="active">
                    <ste-step></ste-step>
                    <ste-step icon="&#xe6a2;"></ste-step>
                    <ste-step>
                        <template v-slot:icon>
                            <ste-icon class="ste-step-icon-inner" code="&#xe688;" :size="40" color="red"></ste-icon>
                        </template>
                    </ste-step>
                </ste-steps>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">竖向步骤条</view>
            <view class="item-block" style="height: 600rpx; padding: 30rpx 60rpx">
                <ste-steps :active="active" direction="column">
                    <ste-step description="注册1个账号"></ste-step>
                    <ste-step description="登录账号并绑定手机"></ste-step>
                    <ste-step description="完善个人信息"></ste-step>
                </ste-steps>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">点状步骤和垂直方向</view>
            <view class="item-block" style="height: 600rpx; padding: 30rpx 60rpx">
                <ste-steps :active="active" dot direction="column">
                    <ste-step></ste-step>
                    <ste-step></ste-step>
                    <ste-step></ste-step>
                </ste-steps>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">修改状态</view>
            <view class="item-block">
                <ste-steps :active="active">
                    <ste-step title="绑定手机" status="error"></ste-step>
                    <ste-step title="重新绑定手机"></ste-step>
                    <ste-step title="步骤3"></ste-step>
                </ste-steps>
            </view>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
//
</style>
