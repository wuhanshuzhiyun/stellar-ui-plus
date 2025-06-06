<template>
    <view class="ste-login--root">
        <view class="login mode-base" v-if="mode === 'base'">
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="120" mode="heightFix" />
            <view class="protocol-box">
                <ste-checkbox v-model="protocolCheck" />
                <text>
                    {{ baseProtocol }}
                    <text class="protocol" v-for="(item, k) in protocolData" :key="k" @click="handleProtocolClick(item)">《{{ item.title }}》</text>
                </text>
            </view>
            <view class="btn-group">
                <view class="btn-item primary" v-for="(item, k) in primaryBtn" :key="k">
                    <ste-button width="100%" :mode="300" @click="handleBtnClick(item, 'primary')">
                        <text class="btn-text">{{ item.title }}</text>
                    </ste-button>
                </view>
                <view class="btn-item secondary" v-for="(item, k) in secondaryBtn" :key="k">
                    <ste-button width="100%" :mode="300" background="#fff" borderColor="#CCCCCC" color="#000000" @click="handleBtnClick(item, 'secondary')">
                        <text class="btn-text">{{ item.title }}</text>
                    </ste-button>
                </view>
            </view>
        </view>

        <view class="login mode-1" v-else-if="mode === 'mode1'" :style="[{ backgroundImage: `url(${loginImgUrl})` }]">
            <view class="login-box" :style="[{ backgroundImage: `url(${loginBackground})` }]">
                <view class="tab-box">
                    <view :class="['tab', item.key === loginCurrentTab ? 'active-tab' : 'normal-tab']" @click="changeTab(item.key, index)" v-for="(item, index) in loginGroup" :key="item.title">
                        {{ item.title }}
                        <view :class="[item.key === loginCurrentTab ? 'bar-line' : '']"></view>
                    </view>
                </view>
                <view class="login-tabs-item">
                    <view class="login-module">
                        <template v-for="i in loginGroup[loginCurrentTabIndex].items" :key="i.key">
                            <view class="input-type select" v-if="i.type === 'select'">
                                <view class="label">选择账号</view>
                                <view class="system-account-number">
                                    <ste-select
                                        height="94"
                                        width="580"
                                        fontSize="32"
                                        borderRadius="16rpx"
                                        borderColor="#EBEBEB"
                                        optionsPosition="bottom"
                                        v-model="value1"
                                        :list="i.selectData"
                                        labelKey="title"
                                        valueKey="key"
                                    ></ste-select>
                                </view>
                            </view>
                            <view class="input-type txt" v-if="i.type === 'txt'">
                                <view class="label">提示</view>
                                <view class="tips">若账号列表为空或要登录的门店不在列表中，请先绑定账号。</view>
                            </view>
                            <view class="input-type number" v-if="i.type === 'number'">
                                <view class="label">账号</view>
                                <view class="account-number-input">
                                    <ste-input placeholder="请输入账号" confirmType="next" rootClass="my-input-root" fontSize="27" border borderColor="#EBEBEB">
                                        <template v-slot:prefix>
                                            <view style="margin-right: 20rpx">
                                                <ste-icon code="&#xe631;" size="40" color="#92C9FF"></ste-icon>
                                            </view>
                                        </template>
                                    </ste-input>
                                </view>
                            </view>
                            <view class="input-type password" v-if="i.type === 'password'">
                                <view class="label">密码</view>
                                <view class="account-number-input">
                                    <ste-input placeholder="请输入密码" type="password" confirmType="next" rootClass="my-input-root" fontSize="27" border borderColor="#EBEBEB">
                                        <template v-slot:prefix>
                                            <view style="margin-right: 20rpx">
                                                <ste-icon code="&#xe630;" size="40" color="#92C9FF"></ste-icon>
                                            </view>
                                        </template>
                                    </ste-input>
                                </view>
                            </view>
                        </template>
                    </view>
                    <view class="protocol-box">
                        <ste-checkbox v-model="protocolCheck" />
                        <text>
                            {{ baseProtocol }}
                            <text class="protocol" v-for="(item, k) in protocolData" :key="k" @click="handleProtocolClick(item)">《{{ item.title }}》</text>
                        </text>
                    </view>
                    <view class="btn-group">
                        <view class="btn-item primary" v-for="(item, k) in primaryBtn" :key="k">
                            <ste-button width="100%" :mode="300" @click="handleBtnClick(item, 'primary')" :round="false">
                                <text class="btn-text">{{ item.title }}</text>
                            </ste-button>
                        </view>
                        <view class="secondary-box" :class="[{ two: secondaryBtn.length === 2, one: secondaryBtn.length === 1 }]">
                            <view v-for="(item, k) in secondaryBtn" :key="k" class="btn-item secondary">
                                <text class="btn-text">{{ item.title }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="bottom-tip">{{ bottomTip }}</view>
    </view>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, computed } from 'vue';
import propsData, { loginEmits } from './props';

const value1 = ref(null);

const props = defineProps(propsData);
const emits = defineEmits(loginEmits);

const protocolCheck = ref(props.protocolCheck);
const loginGroup = reactive(props.loginGroup);

const loginCurrentTabIndex = ref(0);
const loginCurrentTab = ref(props.loginGroup[0]?.key);

const changeTab = (tabKey: string, index: number) => {
    loginCurrentTab.value = tabKey;
    loginCurrentTabIndex.value = index;
    const curTab = props.loginGroup[index];
    emits('tabChange', { title: curTab.title, key: curTab.key });
};

watch(
    () => protocolCheck.value,
    val => {
        emits('update:protocolCheck', val);
    }
);

const handleProtocolClick = (item: any) => {
    emits('protocolClick', item);
};

const handleBtnClick = (item: any, type: 'primary' | 'secondary') => {
    if (type === 'primary') {
        emits('primaryBtnClick', item);
    } else if (type === 'secondary') {
        emits('secondaryBtnClick', item);
    }
};
</script>

<style lang="scss" scoped>
.ste-login--root {
    position: relative;
    height: 100%;
    width: 100%;

    .login {
        height: 100%;
        width: 100%;

        .protocol-box {
            width: 100%;
            display: flex;
            padding: 0 84rpx;
            margin-top: 60rpx;
            font-size: var(--font-size-24, 24rpx);
            color: #a0a0a0;
            .protocol {
                color: #198cff;
            }
        }

        &.mode-base {
            display: flex;
            flex-direction: column;
            align-items: center;

            .btn-group {
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 0 84rpx;

                > .btn-item {
                    width: 100%;
                    margin-top: 24rpx;
                }
                .btn-text {
                    font-size: var(--font-size-28, 28rpx);
                }
            }
        }

        &.mode-1 {
            background-size: 100% auto;
            .login-box {
                width: 710rpx;
                height: 65%;
                position: absolute;
                bottom: 0;
                left: 20rpx;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                z-index: 1;
                .tab-box {
                    height: 96rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-size: 28rpx;
                    .tab {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 44rpx;
                        .bar-line {
                            width: 18rpx;
                            height: 6rpx;
                            background: #077edb;
                            border-radius: 18rpx;
                        }
                    }
                    .active-tab {
                        color: #077edb;
                        font-weight: bold;
                    }
                    .normal-tab {
                        color: #888888;
                        font-weight: normal;
                    }
                }
                .login-tabs-item {
                    // background-color: red;

                    padding: 0 66rpx;
                    padding-top: 60rpx;

                    .login-module {
                        // margin: 60rpx 66rpx 0;
                        .label {
                            width: 112rpx;
                            height: 40rpx;
                            font-size: 28rpx;
                        }
                        .system-account-number {
                            margin: 12rpx 0 24rpx;
                        }
                        .tips {
                            width: 580rpx;
                            // height: 120rpx;
                            background: #f5f8fb;
                            border-radius: 16rpx;
                            padding: 20rpx;
                            font-size: 28rpx;
                            margin-top: 20rpx;
                        }
                        .account-number-input {
                            width: 580rpx;
                            height: 92rpx;
                            background: #ffffff;
                            border-radius: 16rpx;
                            margin: 12rpx 0 24rpx;
                            :deep(.my-input-root) {
                                height: 92rpx;
                                line-height: 92rpx;
                                .content {
                                    padding: 0 0 0 24rpx !important;
                                    .input-box {
                                        height: 92rpx;
                                        input {
                                            height: 100%;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .protocol-box {
                    padding: 0;
                }

                .btn-group {
                    width: 100%;
                    display: flex;
                    flex-direction: column;

                    > .btn-item {
                        width: 100%;
                        margin-top: 24rpx;
                    }
                    .btn-text {
                        font-size: var(--font-size-28, 28rpx);
                    }

                    .secondary-box {
                        margin-top: 24rpx;
                        display: flex;
                        justify-content: space-between;
                        color: #077edb;

                        &.one {
                            justify-content: center;
                        }
                        &.two {
                            justify-content: space-around;
                        }
                    }
                }
            }
        }
    }

    .bottom-tip {
        position: absolute;
        color: #000;
        font-size: var(--font-size-28, 28rpx);
        bottom: 50rpx;
        text-align: center;
        width: 100%;
        z-index: 2;
    }
}
</style>
