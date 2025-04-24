<script setup lang="ts">
import { reactive, ref } from 'vue';
const value1 = ref('');
const show1 = ref(false);
const value2 = ref('');
const show2 = ref(false);
const value3 = ref('');
const show3 = ref(false);
const value4 = ref('');
const show4 = ref(false);
const value5 = ref('');
const show5 = ref(false);
const value6 = ref('');
const show6 = ref(false);
const value7 = ref('');

const inputValues = reactive({
    value1: '123',
    value2: '321',
});

const activeInputRef = ref('value1');

const beforeinput = (v: string, suspend: () => void, next: () => void, stop: () => void) => {
    // 等待后续操作
    suspend();
    // 执行自定义操作
    if (v === '返回') {
        // 阻止默认后续操作
        stop();
        uni.showToast({
            title: '点击了返回',
            icon: 'none',
        });
    } else {
        // 继续默认后续操作
        next();
    }
};
</script>
<template>
    <page-layout title="数字键盘">
        <view class="description">
            <view class="cmp-name">NumberKeyboard 数字键盘</view>
            <view class="cmp-desc">虚拟数字键盘，用于输入数字、密码或身份证等场景。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="test-input" @click="show1 = true">
                <text v-if="value1">{{ value1 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <ste-number-keyboard v-model="value1" :show.sync="show1" />
        </view>
        <view class="demo-item">
            <view class="title">隐藏右侧功能键</view>
            <view class="test-input" @click="show2 = true">
                <text v-if="value2">{{ value2 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <ste-number-keyboard :rightKeys="false" v-model="value2" :show.sync="show2" />
        </view>
        <view class="demo-item">
            <view class="title">隐藏清除按钮,value最大长度</view>
            <view class="test-input" @click="show3 = true">
                <text v-if="value3">{{ value3 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <ste-number-keyboard :showClear="false" v-model="value3" :show.sync="show3" maxlength="6" />
        </view>
        <view class="demo-item">
            <view class="title">自定义按键（建议不超过两个）</view>
            <view class="test-input" @click="show4 = true">
                <text v-if="value4">{{ value4 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <ste-number-keyboard :customKeys="['00', '.']" v-model="value4" :show.sync="show4" />
        </view>
        <view class="demo-item">
            <view class="title">自定义颜色/字体大小/确认文本</view>
            <view class="test-input" @click="show5 = true">
                <text v-if="value5">{{ value5 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <ste-number-keyboard v-model="value5" :show.sync="show5" textColor="#f00" textSize="40" confirmBg="#f00" confirmColor="#0f0" confirmText="完成" />
        </view>
        <view class="demo-item">
            <view class="title">点击前事件（自定义功能）</view>
            <view class="test-input" @click="show6 = true">
                <text v-if="value6">{{ value6 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <ste-number-keyboard :customKeys="['返回']" v-model="value6" :show.sync="show6" @beforeinput="beforeinput" />
        </view>
        <view class="demo-item">
            <view class="title">在文档流中展示</view>
            <view class="test-input">
                <text v-if="value7">{{ value7 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <view style="padding: 30rpx; background-color: #f5f5f5; margin-top: 12rpx">
                <ste-number-keyboard mode="page" v-model="value7" />
            </view>
        </view>
        <view class="demo-item">
            <view class="title">绑定多个输入框</view>
            <view class="test-input" @click="activeInputRef = 'value1'">
                <text v-if="inputValues.value1">{{ inputValues.value1 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <view class="test-input" @click="activeInputRef = 'value2'">
                <text v-if="inputValues.value2">{{ inputValues.value2 }}</text>
                <text v-else class="placeholder">请输入</text>
            </view>
            <view style="padding: 30rpx; background-color: #f5f5f5; margin-top: 12rpx">
                <ste-number-keyboard mode="page" :inputValues="inputValues" :activeInputRef="activeInputRef" />
            </view>
        </view>
    </page-layout>
</template>

<style scoped lang="scss">
.test-input {
    height: 66rpx;
    line-height: 66rpx;
    background-color: #f5f5f5;
    padding: 0 18rpx;
    font-size: 24rpx;
    .placeholder {
        color: #999;
    }
}
</style>
