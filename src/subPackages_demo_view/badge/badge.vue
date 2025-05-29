<template>
    <page-layout title="徽标">
        <view class="description">
            <view class="cmp-name">Badge 徽标</view>
            <view class="cmp-desc">用于告知用户，该区域的状态变化或者待处理任务的数量。</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">徽标内容</view>
            <view class="item-block">
                <view>
                    <ste-badge content="1">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="99+">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="HOT">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">小红点</view>
            <view class="item-block">
                <view>
                    <ste-badge showDot>
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge showDot background="rgb(19, 183, 22)">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">背景</view>
            <view class="item-block">
                <view>
                    <ste-badge content="1" background="rgb(19, 183, 22)">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="99+" background="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="" showZero background="https://image.whzb.com/chain/StellarUI/image/fire.png">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>

        <view class="demo-item">
            <view class="title">徽标位置</view>
            <view class="item-block">
                <view>
                    <ste-badge content="1">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="1" position="topLeft">
                        <view class="avator"></view>
                    </ste-badge>
                </view>

                <view>
                    <ste-badge content="1" position="bottomLeft">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="1" position="bottomRight">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">偏移</view>
            <view class="item-block">
                <view>
                    <ste-badge content="1" :offsetX="5" :offsetY="5">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="1" position="topLeft" :offsetX="5" :offsetY="5">
                        <view class="avator"></view>
                    </ste-badge>
                </view>

                <view>
                    <ste-badge content="1" position="bottomLeft" :offsetX="5" :offsetY="5">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge content="1" position="bottomRight" :offsetX="5" :offsetY="5">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>03 组件自定义</view>
        </view>
        <view class="demo-item">
            <view class="title">为0时是否显示徽标</view>
            <view class="item-block">
                <view>
                    <ste-badge :content="0" showZero>
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">最大值</view>
            <view class="item-block">
                <view>
                    <ste-badge :content="100">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge :content="99">
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义内容</view>
            <view class="item-block">
                <view>
                    <ste-badge>
                        <template #content>
                            <ste-icon code="&#xe67a;" size="20"></ste-icon>
                        </template>
                        <view class="avator"></view>
                    </ste-badge>
                </view>
                <view>
                    <ste-badge>
                        <template #content>
                            <ste-icon code="&#xe67b;" size="16"></ste-icon>
                        </template>
                        <view class="avator"></view>
                    </ste-badge>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;

            .avator {
                height: 80rpx;
                width: 80rpx;
                border-radius: 8rpx;
                background-color: #f2f3f5;
            }
        }
    }
}
</style>
