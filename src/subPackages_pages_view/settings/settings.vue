<script setup>
import { reactive } from 'vue';
const block1 = [
    { title: '我的岗位', titleIcon: '&#xe683;', value: '店长', key: 'position' },
    { title: '门店管理', titleIcon: '&#xe68f;', value: '212508中百仓储南泥湾店', hasNew: true, key: 'store' },
    { title: '修改密码', titleIcon: '&#xe68d;', value: '去修改', key: 'password' },
];

const block2 = [{ title: '模式切换', value: '标准模式', key: 'standard' }];

const block3 = [{ title: '常见问题', key: 'question' }];

const block4 = [{ title: '开启震动反馈', key: 'vibration', type: 'switch', value: false }];

const block5 = [
    { title: '意见反馈', key: 'feedback' },
    { title: '当前版本', value: 'v1.0.1', hasNew: true, key: 'about' },
    { title: '关于我们', key: 'about' },
];

const block6 = [{ title: '退出登录', noAction: true, key: 'logout' }];

const blockList = reactive([block1, block2, block3, block4, block5, block6]);

const handleClick = key => {
    console.log(key);
    // 通过key判断点击的内容
    if (key === 'logout') {
        console.log('退出登录');
    }
};

const handleUserinfoClick = () => {
    console.log('点击了用户信息');
    console.log(blockList[3][0].value);
};

const handleNotifyClose = () => {
    console.log('点击了通知关闭');
};

const handleNotifyOpen = () => {
    console.log('点击了通知开启');
};
</script>
<template>
    <view class="settings-view">
        <ste-navbar title="设置" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <view class="setting-block notify">
                <ste-icon code="&#xe67b;" size="28" color="#555A61" @click="handleNotifyClose" />
                <view class="text">
                    <view class="text-1">开启通知权限</view>
                    <view class="text-2">不在错过信息通知、信息更新、热点咨询</view>
                </view>
                <ste-button mode="100" :round="false" @click="handleNotifyOpen">开启</ste-button>
            </view>

            <view class="setting-block user-info">
                <view>
                    <ste-image src="https://image.whzb.com/chain/StellarUI/image/a1.png" width="80" height="80" radius="8" />
                </view>
                <view class="info" @click="handleUserinfoClick">
                    <view class="nickname">张三</view>
                    <view class="sub-title">21250878保成路店</view>
                </view>
                <ste-icon size="24" code="&#xe674;" color="#888C92" />
            </view>

            <view class="setting-block" v-for="(block, i) in blockList" :key="i">
                <view class="item" v-for="(e, k) in block" :key="k" @click="handleClick(e.key)">
                    <view class="title">
                        <ste-icon :code="e.titleIcon" size="40" marginBottom="4" v-if="e.titleIcon" />
                        <text class="title-text">{{ e.title }}</text>
                    </view>
                    <view class="value" v-if="!e.noAction">
                        <template v-if="e.type === 'switch'">
                            <ste-switch v-model="e.value" />
                        </template>
                        <template v-else>
                            <view class="value-text" v-if="e.value" :class="[{ dot: e.hasNew }]">
                                <text>{{ e.value }}</text>
                            </view>
                            <ste-icon size="24" code="&#xe674;" color="#888C92" marginBottom="4" />
                        </template>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.settings-view {
    width: 100%;
    height: 100vh;
    background-color: #f4f5f6;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        padding: 24rpx 28rpx;
        overflow-y: auto;

        .setting-block {
            background: #ffffff;
            border-radius: 12rpx;
        }

        .setting-block + .setting-block {
            margin-top: 24rpx;
        }

        .notify {
            padding: 28rpx;
            display: flex;
            align-items: center;
            .text {
                margin-left: 32rpx;
                margin-right: 16rpx;
                flex: 1;
                .text-1 {
                    font-size: 32rpx;
                    color: #1c1f23;
                    margin-bottom: 4rpx;
                }
                .text-2 {
                    font-size: 24rpx;
                    color: #a7abb0;
                }
            }
        }

        .user-info {
            display: flex;
            align-items: center;
            padding: 28rpx;
            .info {
                flex: 1;
                margin-left: 16rpx;
                margin-right: 16rpx;
                .nickname {
                    font-size: 32rpx;
                }
                .sub-title {
                    font-size: 24rpx;
                    color: #888c92;
                }
            }
        }

        .item + .item {
            border-top: 1rpx solid #f4f5f6;
        }

        .item {
            padding: 0 28rpx;
            width: 100%;
            height: 104rpx;
            display: flex;
            align-items: center;

            .title {
                font-size: 32rpx;
                color: #1c1f23;

                .title-text {
                    margin-left: 16rpx;
                }
            }
            .value {
                flex: 1;
                display: flex;
                justify-content: flex-end;
                align-items: center;

                color: #888c92;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .value-text {
                    font-size: 28rpx;
                    margin-right: 24rpx;
                    display: inline-flex;
                    align-items: center; /* 让红点垂直居中 */
                }

                .value-text.dot::after {
                    content: '';
                    width: 12rpx;
                    height: 12rpx;
                    background: red;
                    border-radius: 50%;
                    display: inline-block;
                    margin-left: 12rpx;
                }
            }
        }
    }
}
</style>
