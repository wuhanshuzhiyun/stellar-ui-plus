<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
const val = ref({
    value1: 10,
    value2: 7,
    value3: 2,
    value4: 5.8,
    value5: 5,
    value6: 6,
    value7: 7,
    value8: 8,
    value9: 9,
    value10: 10,
    value11: 11,
    value12: 12,
    value13: 13,
    value14: 14,
    value15: 15,
    value16: 16,
    value17: 17,
    value18: 18,
    value19: 19,
});

function blur(_event: number) {
    toast.showToast({
        icon: 'none',
        title: `失焦事件`,
    });
}
function focus() {
    toast.showToast({
        icon: 'none',
        title: `聚焦事件`,
    });
}
function click1(value: number, suspend: () => void, next: () => void, _stop: () => void) {
    toast.showToast({
        icon: 'none',
        title: `点击按钮：${value} 输入值`,
    });
    suspend();
    setTimeout(() => {
        toast.showToast({
            icon: 'none',
            title: `执行成功`,
        });
        next();
    }, 1500);
}
function click2(value: number, suspend: () => void, _next: () => void, stop: () => void) {
    toast.showToast({
        icon: 'none',
        title: `点击按钮：${value} 输入值`,
    });
    // 阻止change事件
    suspend();
    setTimeout(() => {
        toast.showToast({
            icon: 'none',
            title: `执行成功`,
        });
        stop();
    }, 1500);
}
function change(value: number) {
    setTimeout(() => {
        toast.showToast({
            icon: 'none',
            title: `改变：${value} 输入值`,
        });
    }, 1000);
}
</script>

<template>
    <page-layout title="步进器">
        <view class="description">
            <view class="cmp-name">Stepper 步进器</view>
            <view class="cmp-desc">用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-stepper v-model="val.value1"></ste-stepper>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">限制输入范围</view>
            <view class="item-block">
                <ste-stepper v-model="val.value2" :min="5" :max="15"></ste-stepper>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">步长设置</view>
            <view class="item-block">
                <ste-stepper v-model="val.value3" :step="2"></ste-stepper>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">数值精度</view>
            <view class="item-block">
                <ste-stepper v-model="val.value4" :precision="1"></ste-stepper>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义大小</view>
            <view class="item-block">
                <ste-stepper v-model="val.value5" inputWidth="100" btnSize="70"></ste-stepper>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">设置主色</view>
            <view class="item-block">
                <ste-stepper v-model="val.value6" mainColor="#f73131"></ste-stepper>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">禁用状态</view>
            <view class="item-block stepper-box">
                <div class="box">
                    <div>
                        <ste-stepper v-model="val.value7" disabled></ste-stepper>
                        <ste-text class="text">禁用步进器</ste-text>
                    </div>
                    <div>
                        <ste-stepper v-model="val.value8" disablePlus></ste-stepper>
                        <ste-text class="text">禁用增加按钮</ste-text>
                    </div>
                </div>
                <div class="box">
                    <div>
                        <ste-stepper v-model="val.value10" disableInput></ste-stepper>
                        <ste-text class="text">禁用输入框</ste-text>
                    </div>
                    <div>
                        <ste-stepper v-model="val.value9" disableMinus></ste-stepper>
                        <ste-text class="text">禁用减少按钮</ste-text>
                    </div>
                </div>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">样式风格：线性风格</view>
            <view class="item-block stepper-box">
                <ste-stepper v-model="val.value11" theme="line"></ste-stepper>
                <div class="box">
                    <div>
                        <ste-stepper v-model="val.value12" theme="line" disabled></ste-stepper>
                        <ste-text class="text">禁用步进器</ste-text>
                    </div>
                    <div>
                        <ste-stepper v-model="val.value13" theme="line" disablePlus></ste-stepper>
                        <ste-text class="text">禁用增加按钮</ste-text>
                    </div>
                </div>
                <div class="box">
                    <div>
                        <ste-stepper v-model="val.value14" theme="line" disableInput></ste-stepper>
                        <ste-text class="text">禁用输入框</ste-text>
                    </div>
                    <div>
                        <ste-stepper v-model="val.value15" theme="line" disableMinus></ste-stepper>
                        <ste-text class="text">禁用减少按钮</ste-text>
                    </div>
                </div>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">样式风格：纯加购按钮</view>
            <view class="item-block">
                <ste-stepper v-model="val.value16" theme="add"></ste-stepper>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">回调事件</view>
            <view class="item-block stepper-box">
                <ste-stepper v-model="val.value17" @blur="blur" @focus="focus"></ste-stepper>
                <ste-text>失焦事件和聚焦事件</ste-text>
                <ste-stepper v-model="val.value18" @plus="click1" @minus="click1" @change="change"></ste-stepper>
                <text>在plus或minus事件后，执行change事件</text>
                <ste-stepper v-model="val.value19" @plus="click2" @minus="click2" @change="change"></ste-stepper>
                <text>在plus或minus事件后，阻止change事件</text>
            </view>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.stepper-box {
    flex-direction: column !important;
    row-gap: 20rpx;
    align-items: flex-start !important;
    justify-content: center;

    .box {
        display: flex;
        column-gap: 40rpx;
    }

    .text {
        font-size: 20rpx;
    }
}
</style>
