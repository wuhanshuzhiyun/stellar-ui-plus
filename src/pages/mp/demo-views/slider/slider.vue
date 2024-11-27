<script setup lang="ts">
import { ref } from 'vue';
const marks = ref({
    10: '0°C',
    20: '8°C',
    37: '37°C',
    80: {
        style: {
            color: '#1989FA',
        },
        label: '合格',
    },
});

const marks2 = ref({
    10: '0°C',
    20: '8°C',
    37: '37°C',
    80: {
        style: {
            color: '#1989FA',
        },
        label: '合格',
    },
});
</script>

<template>
    <page-layout title="滑块">
        <view class="description">
            <view class="cmp-name">Slider 滑动选择器</view>
            <view class="cmp-desc">用于选择横轴或者竖轴上的数值、区间、档位。</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-slider value="30"></ste-slider>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">竖向</view>
            <view class="item-block" style="padding-left: 30rpx; height: 300rpx">
                <ste-slider vertical value="30"></ste-slider>
            </view>
        </view>
        、
        <view class="type-block">
            <view>02 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">滑块条高度 & 滑块大小</view>
            <view class="item-block" style="margin-bottom: 30rpx">
                <view style="width: 100%">
                    <ste-slider barHeight="26" value="30"></ste-slider>
                </view>
            </view>
            <view class="item-block">
                <ste-slider buttonSize="50" value="30"></ste-slider>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">进度条颜色</view>
            <view class="item-block">
                <ste-slider value="30" activeColor="#ff0000" inactiveColor="#a9ee13"></ste-slider>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">范围选择</view>
            <view class="item-block">
                <ste-slider :value="[10, 20]" range></ste-slider>
            </view>
        </view>
        <view class="type-block">
            <view>03 组件状态</view>
        </view>
        <view class="demo-item">
            <view class="title">禁用</view>
            <view class="item-block" style="">
                <ste-slider disabled value="30"></ste-slider>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">只读</view>
            <view class="item-block">
                <ste-slider readonly value="30"></ste-slider>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">间断点</view>
            <view class="item-block">
                <ste-slider showStops :step="10" value="30"></ste-slider>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">标记</view>
            <view class="item-block" style="margin-bottom: 50rpx">
                <ste-slider showStops :marks="marks" value="30"></ste-slider>
            </view>
        </view>
        <view class="type-block">
            <view>03 组件自定义</view>
        </view>
        <view class="demo-item">
            <view class="title">自定义滑块</view>
            <view class="item-block" style="margin-bottom: 30rpx">
                <ste-slider :step="10" showStops value="30" activeColor="#ff0000">
                    <template v-slot:button>
                        <view class="c-slider-1">
                            <view class="content">
                                <text>滑块</text>
                            </view>
                        </view>
                    </template>
                </ste-slider>
            </view>
            <view class="item-block">
                <ste-slider :step="10" showStops :value="[10, 40]" range>
                    <template v-slot:leftButton>
                        <view class="c-slider-2">
                            <view class="content">
                                <ste-icon code="&#xe673;" color="#fff"></ste-icon>
                            </view>
                        </view>
                    </template>
                    <template v-slot:rightButton>
                        <view class="c-slider-2">
                            <view class="content">
                                <ste-icon code="&#xe674;" color="#fff"></ste-icon>
                            </view>
                        </view>
                    </template>
                </ste-slider>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 8px 8px 0;
        }

        .c-slider-1 {
            .content {
                padding: 0 16rpx;
                background-color: #ff0000;
                border-radius: 20rpx;

                color: #ffffff;
                font-size: 24rpx;

                text {
                    white-space: nowrap;
                }
            }
        }

        .c-slider-2 {
            .content {
                background-color: #0090ff;
                border-radius: 50%;
                height: 40rpx;
                width: 40rpx;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
