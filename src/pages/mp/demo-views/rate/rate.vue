<script setup lang="ts">
import { ref } from 'vue';
let value = ref(2);
let value1 = ref(2);
let value2 = ref(2);
let value3 = ref(2.6);
let value4 = ref(2.5);
let value5 = ref(2);
let iconData = ref(['&#xe686;', '', '&#xe671;', '&#xe66a;', '&#xe66b;']);
</script>

<template>
    <page-layout title="评分">
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-rate v-model="value"></ste-rate>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义图标</view>
            <view class="item-block">
                <div class="item-rate">
                    <!--选中和未选中 图标一样-->
                    <ste-rate v-model="value1" inactiveCode="&#xe685;" activeCode="&#xe685;"></ste-rate>
                    <text>选中和未选中 图标一样的情况</text>
                    <!--选中和未选中 图标不一样-->
                    <ste-rate v-model="value1" inactiveCode="&#xe685;" activeCode="&#xe687;"></ste-rate>
                    <text>选中和未选中 图标不一样的情况</text>
                </div>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义样式</view>
            <view class="item-block">
                <ste-rate v-model="value2" inactiveColor="#F8D5D5" activeColor="#d276a3" size="80" :gutter="20"></ste-rate>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">只读</view>
            <view class="item-block">
                <ste-rate v-model="value3" readonly></ste-rate>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">禁用</view>
            <view class="item-block">
                <ste-rate v-model="value3" disabled></ste-rate>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义数量和自定义分值</view>
            <view class="item-block">
                <div class="item-rate">
                    <!--星星数量为1，分值为5, 分数为2.5-->
                    <ste-rate v-model="value4" :count="1" :score="5"></ste-rate>
                    <text>图标数量为1，图标分值为5, 分数为2.5</text>
                </div>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义分值图标</view>
            <view class="item-block">
                <div class="item-rate">
                    <ste-rate v-model="value5" :iconData="iconData"></ste-rate>
                </div>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.item-rate {
    display: flex;
    flex-direction: column;

    text {
        font-size: 30rpx;
    }
}
</style>
