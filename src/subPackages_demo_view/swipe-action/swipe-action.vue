<script setup lang="ts">
import { ref } from 'vue';
import type { RefSwipeAction, RefSwipeActionGroup } from '../../../../uni_modules/stellar-ui-plus/types/refComponents';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
const datas = ['1111111111', '22222222222', '3333333333333333', '444444444444444444444'];

const swipe = ref<RefSwipeAction>();
const openSwipe = () => {
    swipe.value?.open();
};
const closeSwipe = () => {
    swipe.value?.close();
};

const swipeGroup = ref<RefSwipeActionGroup>();
const openSwipeGroup = (index: number) => {
    swipeGroup.value?.open('right', index);
};
const closeSwipeGroup = (index: number) => {
    swipeGroup.value?.close(index);
};
const onOpen = (direction: 'left' | 'right', index?: number) => {
    toast.showToast({
        title: index || index === 0 ? `第${index + 1}条的打开方向:${direction}` : `打开方向：${direction}`,
        icon: 'none',
    });
};
const onClose = (index?: number) => {
    toast.showToast({
        title: index || index === 0 ? `关闭第${index + 1}条` : '关闭',
        icon: 'none',
    });
};
</script>
<template>
    <page-layout title="滑动单元格" contentStyle="background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">SwipeAction 滑动单元格</view>
            <view class="cmp-desc">用来承载列表中的更多操作，通过左右滑动来展示.</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <ste-swipe-action @open="onOpen" @close="onClose">
                    <view class="content-view">内容区域</view>
                    <template v-slot:right>
                        <div class="test-btn">删除</div>
                    </template>
                </ste-swipe-action>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">调用方法打开或关闭</view>
            <view class="item-block">
                <ste-swipe-action ref="swipe">
                    <view class="content-view">内容区域</view>
                    <template v-slot:right>
                        <div class="test-btn">删除</div>
                    </template>
                </ste-swipe-action>
                <view class="btn-box">
                    <view class="btn-item-box">
                        <ste-button mode="200" @click="openSwipe" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">打开</ste-button>
                    </view>
                    <view class="btn-item-box">
                        <ste-button mode="200" @click="closeSwipe" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">关闭</ste-button>
                    </view>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">滑动方向,滑动按钮</view>
            <view class="item-block">
                <ste-swipe-action mode="all" @open="onOpen" @close="onClose" leftIcon rightIcon>
                    <template v-slot:left>
                        <div class="test-btn">收藏</div>
                    </template>
                    <view class="content-view">内容区域</view>
                    <template v-slot:right>
                        <div class="test-btn">删除</div>
                    </template>
                </ste-swipe-action>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">单元格组</view>
            <view class="item-block group">
                <ste-swipe-action-group @open="onOpen" @close="onClose" ref="swipeGroup">
                    <ste-swipe-action v-for="(m, i) in datas" :key="m">
                        <view class="content-view">{{ m }}</view>
                        <template v-slot:right>
                            <div class="test-btn" @click="datas.splice(i, 1)">删除</div>
                        </template>
                    </ste-swipe-action>
                </ste-swipe-action-group>
                <view class="btn-box">
                    <view class="btn-item-box">
                        <ste-button mode="200" @click="openSwipeGroup(0)" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">打开第1行</ste-button>
                    </view>
                    <view class="btn-item-box">
                        <ste-button mode="200" @click="closeSwipeGroup(0)" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">关闭第1行</ste-button>
                    </view>
                    <view class="btn-item-box">
                        <ste-button mode="200" @click="openSwipeGroup(1)" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">打开第2行</ste-button>
                    </view>
                    <view class="btn-item-box">
                        <ste-button mode="200" @click="closeSwipeGroup(1)" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">关闭第2行</ste-button>
                    </view>
                </view>
            </view>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                display: block;
                .content-view {
                    display: flex;
                    align-items: center;
                    height: 90rpx;
                    border-bottom: 1rpx solid #fff;
                    background-color: #ffffff;
                    padding-left: 36rpx;
                }
                &.group {
                    .content-view {
                        border: 1rpx solid #f5f5f5;
                    }
                }
                .test-btn {
                    background-color: #dd524d;
                    color: #fff;
                    line-height: 90rpx;
                    text-align: center;
                    width: 100rpx;
                    height: 100%;
                }
                .btn-box {
                    margin-top: 18rpx;
                    // display: flex;
                    // flex-wrap: wrap;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr); /* 两列，每列占用父元素宽度的一半 */
                    gap: 8px; /* 行间距和列间距都为8px */
                }
                .btn-item-box {
                    flex-basis: 50%;
                }
            }
        }
    }
}
</style>
