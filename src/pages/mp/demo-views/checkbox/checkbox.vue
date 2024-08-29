<script lang="ts" setup>
import { reactive } from 'vue';
const val = reactive({
    value1: false,
    value2: true,
    value3: false,
    value4: true,
    value5: false,
    value6: true,
    value7: true,
    value8: false,
    value9: false,
    value10: false,
    value11: true,
    value12: true,
    value13: ['a'],
    value14: false,
    value15: false,
    value16: false,
    value17: false,
    value18: [],
    value19: [],
    value20: [],
    value21: [],
    value22: [],
});
function click1(value: any, suspend: () => void, next: () => void) {
    uni.showToast({
        icon: 'none',
        title: `点击：${value} 复选框的值`,
    });
    suspend(); // 阻止操作

    setTimeout(() => {
        next(); // 异步操作后，执行操作
    }, 1500);
}
function click2(value: any, suspend: () => void, _next: any, stop: () => void) {
    uni.showToast({
        icon: 'none',
        title: `点击：${value} 复选框的值`,
    });
    suspend(); // 阻止操作
    setTimeout(() => {
        // 异步操作后，停止操作
        stop();
    }, 200);
}

function change(value: any) {
    setTimeout(() => {
        uni.showToast({
            icon: 'none',
            title: `改变：${value} 复选框的值`,
        });
    }, 1000);
}
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="复选框"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <view class="item-block">
                    <ste-checkbox v-model:value="val.value1">复选框</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">禁用</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value2" disabled>复选框1</ste-checkbox>
                    <ste-checkbox v-model:value="val.value3" disabled>复选框2</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">只读</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value4" readonly>复选框1</ste-checkbox>
                    <ste-checkbox v-model:value="val.value5" readonly>复选框2</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">自定义形状</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value6">圆形</ste-checkbox>
                    <ste-checkbox v-model:value="val.value7" shape="square">方形</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">自定义图标大小</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value11" iconSize="60">60rpx</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">自定义图标颜色</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value12" checkedColor="#ee0a24">红色</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">自定义图标</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox-group v-model:value="val.value13">
                        <ste-checkbox name="a">
                            <template #icon="{ slotProps }">
                                <ste-icon code="&#xe677;" size="50" :color="slotProps.checked ? '#ee0a24' : '#000000'"></ste-icon>
                            </template>
                            <template #default="{ slotProps }">
                                {{ slotProps.checked ? '已选中' : '未选中' }}
                            </template>
                        </ste-checkbox>
                        <ste-checkbox name="b">
                            <template #icon="{ slotProps }">
                                <ste-icon code="&#xe677;" size="50" :color="slotProps.checked ? '#ee0a24' : '#000000'"></ste-icon>
                            </template>
                            <template #default="{ slotProps }">
                                {{ slotProps.checked ? '已选中' : '未选中' }}
                            </template>
                        </ste-checkbox>
                        <ste-checkbox name="c" disabled>
                            <template #icon="{ slotProps }">
                                <ste-icon code="&#xe677;" size="50" :color="slotProps.disabled ? '#eeeeee' : '#000000'"></ste-icon>
                            </template>
                            <template #default="{ slotProps }">
                                {{ slotProps.disabled ? '禁止' : '未禁止' }}
                            </template>
                        </ste-checkbox>
                        <ste-checkbox name="d" readonly>
                            <template #icon="{ slotProps }">
                                <ste-icon code="&#xe677;" size="50" :color="slotProps.readonly ? 'green' : '#000000'"></ste-icon>
                            </template>
                            <template #default="{ slotProps }">
                                {{ slotProps.readonly ? '只读' : '未只读' }}
                            </template>
                        </ste-checkbox>
                    </ste-checkbox-group>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">左侧文本</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value8">右边</ste-checkbox>
                    <ste-checkbox v-model:value="val.value9" textPosition="left">左边</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">自定义文本</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value14" textSize="50" textInactiveColor="green" textActiveColor="#d276a3">复选框</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">禁用文本点击</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value15" textDisabled>复选框</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">回调事件</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox v-model:value="val.value16" @click="click1" @change="change">复选框</ste-checkbox>
                    <text>在click事件后，执行change事件</text>
                    <ste-checkbox v-model:value="val.value17" @click="click2" @change="change">复选框</ste-checkbox>
                    <text>在click事件后，阻止change事件</text>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">复选框组</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox-group v-model:value="val.value18">
                        <ste-checkbox name="a">复选框a</ste-checkbox>
                        <ste-checkbox name="b">复选框b</ste-checkbox>
                        <ste-checkbox name="c">复选框c</ste-checkbox>
                    </ste-checkbox-group>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">复选框组属性和复选框属性</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox-group v-model:value="val.value19" shape="square" textPosition="left">
                        <ste-checkbox name="a">复选框a</ste-checkbox>
                        <ste-checkbox name="b" disabled>复选框b</ste-checkbox>
                        <ste-checkbox name="c" shape="circle">复选框c</ste-checkbox>
                    </ste-checkbox-group>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">水平排列</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox-group v-model:value="val.value20" direction="row">
                        <ste-checkbox name="a">复选框a</ste-checkbox>
                        <ste-checkbox name="b">复选框b</ste-checkbox>
                        <ste-checkbox name="c">复选框c</ste-checkbox>
                    </ste-checkbox-group>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">限制最大可选数</view>
                <view class="item-block checkbox-box">
                    <ste-checkbox-group v-model:value="val.value21" :max="2">
                        <ste-checkbox name="a">复选框a</ste-checkbox>
                        <ste-checkbox name="b">复选框b</ste-checkbox>
                        <ste-checkbox name="c">复选框c</ste-checkbox>
                    </ste-checkbox-group>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.page {
    .checkbox-box {
        flex-direction: column !important;
        row-gap: 20rpx;
        align-items: flex-start !important;
        justify-content: center;
    }
}
</style>
