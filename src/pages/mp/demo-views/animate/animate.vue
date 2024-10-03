<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);

function click() {
    show.value = false;
    setTimeout(() => {
        show.value = true;
    }, 50);
}
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="动画"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础使用</view>
                <view class="item-block">
                    <view>
                        <ste-animate type="shakeX" loop>
                            <ste-button>shakeX-横向</ste-button>
                        </ste-animate>
                    </view>
                    <view>
                        <ste-animate type="shakeY" loop>
                            <ste-button>shakeY-竖向</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="ripple" loop>
                            <ste-button>ripple-心跳</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="breath" loop>
                            <ste-button>breath-呼吸灯</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="twinkle" loop>
                            <ste-button>twinkle-水波</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="flicker" loop>
                            <ste-button>flicker-擦亮</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="jump" loop>
                            <ste-button>jump-跳跃</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="float" loop>
                            <ste-button>float-漂浮</ste-button>
                        </ste-animate>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">点击触发</view>
                <view class="item-block">
                    <view style="width: 100%">
                        <ste-animate type="slide-right" action="click">
                            <ste-button :stopPropagation="false">由右向左划入</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="slide-left" action="click">
                            <ste-button :stopPropagation="false">由左向右划入</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="slide-top" action="click">
                            <ste-button :stopPropagation="false">由上向下划入</ste-button>
                        </ste-animate>
                    </view>
                    <view style="width: 100%">
                        <ste-animate type="slide-bottom" action="click">
                            <ste-button :stopPropagation="false">由下向上划入</ste-button>
                        </ste-animate>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">属性触发</view>
                <view class="item-block">
                    <view>
                        <ste-animate type="shakeY" :show="show">
                            <ste-button :stopPropagation="false">动画</ste-button>
                        </ste-animate>
                    </view>
                    <view>
                        <ste-button @click="click">触发</ste-button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                > view {
                    margin: 0 36rpx 36rpx 0;
                }
            }
        }
    }
}
</style>
