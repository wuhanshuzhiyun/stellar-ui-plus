<template>
    <page-layout title="弹框">
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view>
                    <ste-button @click="msgBox">提示</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">带图标</view>
            <view class="item-block">
                <view>
                    <ste-button @click="msgBoxIcon1">图标1</ste-button>
                </view>
                <view>
                    <ste-button @click="msgBoxIcon2">图标2</ste-button>
                </view>
                <view>
                    <ste-button @click="msgBoxIcon3">图标3</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义按钮</view>
            <view class="item-block">
                <view>
                    <ste-button @click="msgBoxBtn1">按钮文字</ste-button>
                </view>
                <view>
                    <ste-button @click="msgBoxBtn2">按钮颜色</ste-button>
                </view>
                <view>
                    <ste-button @click="msgBoxBtn3">无取消按钮</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">带输入框</view>
            <view class="item-block">
                <view>
                    <ste-button @click="msgBoxInput">输入框</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">插槽</view>
            <view class="item-block">
                <view>
                    <ste-button @click="customClick">插槽</ste-button>
                    <ste-message-box selector="myMsgBox">
                        <view style="display: flex; justify-content: center; padding-bottom: 48rpx; width: 570rpx">
                            <ste-rate v-model="rate"></ste-rate>
                        </view>
                    </ste-message-box>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">回调事件</view>
            <view class="item-block">
                <view>
                    <ste-button @click="msgBoxCallback1">取消</ste-button>
                </view>
                <view>
                    <ste-button @click="msgBoxCallback2">确认</ste-button>
                </view>
                <view>
                    <ste-button @click="msgBoxCallback3">完成</ste-button>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessageBox } from '@/uni_modules/stellar-ui-plus/composables';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
const toast = useToast();
const msg = useMessageBox();
const msg2 = useMessageBox('myMsgBox');
const rate = ref(0);
//
function customClick() {
    msg2.showMsgBox({
        title: '评分',
    });
}
function msgBox() {
    msg.showMsgBox({
        title: '确认删除订单吗？',
    });
}
function msgBoxIcon1() {
    msg.showMsgBox({
        title: '提示1',
        icon: 'info',
    });
}
function msgBoxIcon2() {
    msg.showMsgBox({
        title: '提示2',
        icon: 'success',
    });
}
function msgBoxIcon3() {
    msg.showMsgBox({
        title: '提示3',
        icon: 'error',
    });
}
function msgBoxBtn1() {
    msg.showMsgBox({
        title: '提示1',
        content: '确认删除订单吗1？',
        cancelText: '算了',
        confirmText: '删吧',
    });
}
function msgBoxBtn2() {
    msg.showMsgBox({
        title: '提示2',
        content: '确认删除订单吗2？',
        cancelColor: '#e1e',
        confirmColor: '#a8ae1e',
    });
}
function msgBoxBtn3() {
    msg.showMsgBox({
        title: '提示3',
        content: '确认删除订单吗3？',
        showCancel: false,
    });
}
function msgBoxInput() {
    msg.showMsgBox({
        title: '提示',
        content: '确认删除订单吗？',
        editable: true,
        placeholderText: '请输入',
        confirm: value => {
            toast.showToast({
                title: `输入内容：${value}`,
            });
        },
    });
}
function msgBoxCallback1() {
    msg.showMsgBox({
        title: '提示1',
        cancel: () => {
            toast.showToast({
                title: '点击了取消',
            });
        },
    });
}
function msgBoxCallback2() {
    msg.showMsgBox({
        title: '提示2',
        confirm: () => {
            toast.showToast({
                title: '点击了确认',
            });
        },
    });
}
function msgBoxCallback3() {
    msg.showMsgBox({
        title: '提示3',
        complete: () => {
            toast.showToast({
                title: '弹框完成',
            });
        },
    });
}
</script>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 8px 8px 0;
        }
    }
}
</style>
