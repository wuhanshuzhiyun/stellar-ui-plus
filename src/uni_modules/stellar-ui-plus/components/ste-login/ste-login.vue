<template>
    <view class="ste-login--root" :style="[compRootStyle]">
        <slot name="header"></slot>
        <view class="login mode-base" v-if="mode === 'base'">
            <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="120" mode="heightFix" />
            <view class="protocol-box">
                <ste-checkbox v-model="protocolCheck" iconSize="32" :checkedColor="mainColor" />
                <text>
                    {{ baseProtocol }}
                    <text class="protocol" v-for="(item, k) in protocolData" :key="k" @click="handleProtocolClick(item)">《{{ item.title }}》</text>
                </text>
            </view>
            <view class="btn-group">
                <view class="btn-item primary" v-for="(item, k) in primaryBtn" :key="k">
                    <ste-button width="100%" :mode="300" @click="handleBtnClick(item, 'primary')" :round="item.round" :background="mainColor">
                        <text class="btn-text">{{ item.title }}</text>
                    </ste-button>
                </view>
                <view class="btn-item secondary" v-for="(item, k) in secondaryBtn" :key="k">
                    <ste-button width="100%" :mode="300" background="#fff" borderColor="#CCCCCC" color="#000000" @click="handleBtnClick(item, 'secondary')" :round="item.round">
                        <text class="btn-text">{{ item.title }}</text>
                    </ste-button>
                </view>
            </view>
        </view>

        <view class="login mode-1" v-else-if="mode === 'mode1'">
            <view class="login-box" :style="[compLoginBoxStyle]">
                <view class="tab-box" v-if="loginGroup.length > 1">
                    <view :class="['tab', item.key === loginCurrentTab ? 'active-tab' : 'normal-tab']" @click="changeTab(item.key, index)" v-for="(item, index) in loginGroup" :key="item.title">
                        {{ item.title }}
                        <view :class="[item.key === loginCurrentTab ? 'bar-line' : '']"></view>
                    </view>
                </view>
                <view class="login-tabs-item">
                    <view class="login-module">
                        <template v-for="i in loginGroup[loginCurrentTabIndex].items" :key="i.key">
                            <login-form-item :config="i" v-model="formData[i.key]" @change="formDataChange($event, i.key)" :color="mainColor" @get-code="handleGetCode" />
                        </template>
                    </view>
                    <view class="protocol-box">
                        <ste-checkbox v-model="protocolCheck" iconSize="32" :checkedColor="mainColor" />
                        <text>
                            {{ baseProtocol }}
                            <text class="protocol" v-for="(item, k) in protocolData" :key="k" @click="handleProtocolClick(item)">《{{ item.title }}》</text>
                        </text>
                    </view>
                    <view class="btn-group">
                        <view class="btn-item primary" v-for="(item, k) in primaryBtn" :key="k">
                            <ste-button
                                width="100%"
                                :mode="300"
                                @click="handleBtnClick(item, 'primary')"
                                :round="item.round"
                                :background="item.style?.background ? item.style?.background : mainColor"
                                :border-color="item.style?.borderColor"
                                :color="item.style?.color"
                            >
                                <text class="btn-text" :style="{ fontSize: item.style?.fontSize }">{{ item.title }}</text>
                            </ste-button>
                        </view>
                        <view class="secondary-box" :class="[{ two: secondaryBtn.length === 2, one: secondaryBtn.length === 1 }]">
                            <view v-for="(item, k) in secondaryBtn" :key="k" class="btn-item secondary" @click="handleBtnClick(item, 'secondary')">
                                <text class="btn-text" :style="{ color: item.style?.color, fontSize: item.style?.fontSize }">{{ item.title }}</text>
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
import { ref, watch, reactive, nextTick, computed, type CSSProperties } from 'vue';
import propsData, { loginEmits } from './props';
import LoginFormItem from './components/loginFormItem.vue';
import { useColorStore } from '../../store/color';
import utils from '../../utils/utils';

const { getColor } = useColorStore();
const props = defineProps(propsData);
const emits = defineEmits(loginEmits);

const protocolCheck = ref(props.protocolCheck);
const loginGroup = reactive(props.loginGroup);

const formData = reactive(
    (function () {
        const obj: { [key: string]: any } = {};
        props.loginGroup.forEach(item => {
            item.items.forEach(item => {
                if (item.type !== 'txt') {
                    obj[item.key] = item.value || item.type === 'select' ? null : '';
                }
            });
        });
        return obj;
    })()
);

const loginCurrentTabIndex = ref(0);
const loginCurrentTab = ref(props.loginGroup[0]?.key);

const mainColor = computed(() => props.color || getColor().steThemeColor);

const compRootStyle = computed(() => {
    const style: CSSProperties = {
        '--main-color': mainColor.value,
    };
    if (props.mode === 'mode1') {
        style.backgroundImage = `url(${props.loginImgUrl})`;
        style.backgroundSize = '100% auto';
    }
    return style;
});

const compLoginBoxStyle = computed(() => {
    const style: CSSProperties = {
        ...utils.bg2style(props.loginBoxBackground || '#ffffff'),
    };

    // 宽度 width
    // if (props.width == '100%' || props.width == 'auto') {
    //     style.width = props.width;
    // } else {
    //     style.width = utils.formatPx(props.width);
    // }
    if (typeof props.loginBoxHeight === 'number' || typeof Number(props.loginBoxHeight) === 'number') {
        style.height = utils.formatPx(props.loginBoxHeight);
    } else {
        style.height = props.loginBoxHeight;
    }
    return style;
});

const changeTab = (tabKey: string, index: number) => {
    loginCurrentTab.value = tabKey;
    loginCurrentTabIndex.value = index;
    const curTab = props.loginGroup[index];
    emits('tabChange', { title: curTab.title, key: curTab.key });
};

const formDataChange = (value: any, key: string) => {
    formData[key] = value;
    nextTick(() => {
        emits('formDataChange', formData);
    });
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

const handleGetCode = (suspend: () => void, next: () => void, reject: () => void) => {
    // 向更上层组件发出事件
    emits('getCode', suspend, next, reject);
};

defineExpose({ formData });
</script>

<style lang="scss" scoped>
.ste-login--root {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
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
                color: var(--main-color);
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
                width: calc(100% - 40rpx);
                position: absolute;
                bottom: 0;
                left: 20rpx;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                z-index: 1;
                border-radius: 40rpx 40rpx 0 0;
                .tab-box {
                    height: 96rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-size: var(--font-size-28, 28rpx);
                    .tab {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 44rpx;
                        .bar-line {
                            width: 18rpx;
                            height: 6rpx;
                            background: var(--main-color);
                            border-radius: 18rpx;
                        }
                    }
                    .active-tab {
                        color: var(--main-color);
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
                        color: var(--main-color);

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
