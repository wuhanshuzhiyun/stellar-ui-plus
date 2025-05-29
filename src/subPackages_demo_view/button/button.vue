<script setup lang="ts">
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
function handleClick(v: any) {
    toast.showToast({
        title: '点击按钮' + ' ' + v,
        icon: 'none',
        duration: 1500,
    });
}
</script>

<template>
    <page-layout title="按钮">
        <view class="description">
            <view class="cmp-name">Button 按钮</view>
            <view class="cmp-desc">基础按钮组件</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">按钮大小</view>
            <view class="item-block">
                <view>
                    <ste-button :mode="400" @click="handleClick('超大按钮')">超大按钮</ste-button>
                </view>
                <view>
                    <ste-button :mode="300" @click="handleClick('大按钮')">大按钮</ste-button>
                </view>
                <view>
                    <ste-button :mode="200" @click="handleClick('中按钮')">中按钮</ste-button>
                </view>
                <view>
                    <ste-button :mode="100" @click="handleClick('小按钮')">小按钮</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">宽度</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-button width="100%" @click="handleClick('宽度填满')">宽度填满</ste-button>
                </view>
                <view>
                    <ste-button width="500" @click="handleClick('自定义宽度')">自定义宽度-500rpx</ste-button>
                </view>
                <view>
                    <ste-button @click="handleClick('自适应宽度')">自适应宽度</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">圆角按钮</view>
            <view class="item-block">
                <view>
                    <ste-button @click="handleClick('圆角按钮')">圆角按钮</ste-button>
                </view>
                <view>
                    <ste-button :round="false" @click="handleClick('非圆角按钮')">非圆角按钮</ste-button>
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件状态</view>
        </view>
        <view class="demo-item">
            <view class="title">禁止按钮</view>
            <view class="item-block">
                <view>
                    <ste-button disabled @click="handleClick('禁止按钮')">禁止按钮</ste-button>
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">文本颜色</view>
            <view class="item-block">
                <view style="width: 40%">
                    <ste-button color="#000000" @click="handleClick('文本颜色按钮')">文本颜色按钮</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">背景</view>
            <view class="item-block">
                <view>
                    <ste-button background="#FF1E19" @click="handleClick('领取')">领取</ste-button>
                </view>
                <view>
                    <ste-button background="https://image.whzb.com/chain/StellarUI/image/精选会员瓷片.png" @click="handleClick('背景图')">背景图</ste-button>
                </view>
                <view>
                    <ste-button background="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="handleClick('渐变色')">渐变色</ste-button>
                </view>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">边框颜色</view>
            <view class="item-block">
                <view style="width: 40%">
                    <ste-button borderColor="#FF1E19" @click="handleClick('边框颜色按钮')">边框颜色按钮</ste-button>
                </view>
            </view>
        </view>

        <view class="type-block">
            <view>04 组件自定义</view>
        </view>
        <view class="demo-item">
            <view class="title">加载中</view>
            <view class="item-block">
                <view>
                    <ste-button loading>按钮</ste-button>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">插槽</view>
            <view class="item-block">
                <view>
                    <ste-button @click="handleClick('按钮')">
                        <view class="btn-box-1">
                            <ste-icon code="&#xe68f;" :size="32" color="#FFFFFF" :marginRight="8"></ste-icon>
                            <text>购卡</text>
                        </view>
                    </ste-button>
                </view>
                <view>
                    <ste-button @click="handleClick('按钮')">提交订单</ste-button>
                </view>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">超长文字</view>
            <view class="item-block">
                <view style="width: 40%">
                    <ste-button width="100%" @click="handleClick('文字超长按钮')">提交-按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮</ste-button>
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
                > view {
                    margin: 0 8px 8px 0;
                }
            }
        }
    }
}
</style>
