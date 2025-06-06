<script setup lang="ts">
import { ref, defineComponent, computed, type CSSProperties } from 'vue';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();
import propsData from './props';
defineComponent({
    name: 'ste-user-info',
});

const emits = defineEmits<{
    (e: 'userClick'): void;
    (e: 'codeClick'): void;
    (e: 'dataClick', index: Number): Number;
}>();

const props = defineProps(propsData);

const cmpRootStyle = computed(() => {
    let style: CSSProperties = {};
    // 用户信息区域和核销码区域存在
    if (props.showUserInfo && props.showCode) {
        style.padding = '0 24rpx 0 18rpx';
    }
    // 核销码区域存在
    if (!props.showUserInfo && props.showCode) {
        style.padding = '0 44rpx 0 52rpx';
    }
    // 用户信息区域存在
    if (props.showUserInfo && !props.showCode) {
        style.padding = '0 48rpx 0 18rpx';
    }
    return style;
});

const cmpDataStyle = computed(() => {
    let style: CSSProperties = {};
    if (props.showUserInfo && props.showCode) {
        if (props.list.length == 1) {
            style['justify-content'] = 'center';
            style.margin = '0 0 0 54rpx';
        }
        if (props.list.length == 2) {
            style['justify-content'] = 'space-between';
            style.margin = '0 0 0 54rpx';
        }
        if (props.list.length == 3) {
            style['justify-content'] = 'space-between';
            style.margin = '0 0 0 24rpx';
        }
    }
    if (!props.showUserInfo && props.showCode) {
        style['justify-content'] = 'space-between';
        style.margin = '0 98rpx 0 0';
    }
    if (props.showUserInfo && !props.showCode) {
        style['justify-content'] = 'space-between';
        style.margin = '0 0 0 54rpx';
    }
    if (!props.showUserInfo && !props.showCode) {
        style['justify-content'] = 'space-around';
    }
    return style;
});

const cmpLineStyle = computed(() => {
    let style: CSSProperties = {};
    if (props.showUserInfo && props.showCode) {
        if (props.list.length == 0 || props.list.length == 1 || props.list.length == 2) {
            style.margin = '0 40rpx 0 44rpx';
        }
        if (props.list.length == 3) {
            style.margin = '0 22rpx 0 28rpx';
        }
    }
    return style;
});

const cmpCodeStyle = computed(() => {
    let style: CSSProperties = {};
    style.color = props.codeTitleColor ? props.codeTitleColor : getColor().steThemeColor;
    return style;
});

function userClick() {
    emits('userClick');
}
function codeClick() {
    emits('codeClick');
}
function dataClick(index: Number) {
    emits('dataClick', index);
}
</script>

<template>
    <view class="ste-user-info-root">
        <view class="box" :style="[cmpRootStyle]">
            <view class="user-box" v-if="showUserInfo" @click="userClick">
                <view class="left">
                    <ste-image :width="80" :height="80" :src="avatar"></ste-image>
                </view>
                <view class="right">
                    <view class="name">{{ nickname }}</view>
                    <view class="desc">
                        <slot name="desc"></slot>
                    </view>
                </view>
            </view>
            <view class="data-box" :style="[cmpDataStyle]">
                <view class="item" v-for="(item, index) in list" :key="index" @click="dataClick(index)">
                    <view class="value">{{ item.value }}</view>
                    <view class="title">{{ item.title }}</view>
                </view>
            </view>
            <view class="line" v-if="showUserInfo && showCode" :style="[cmpLineStyle]"></view>
            <view class="code-box" v-if="showCode" @click="codeClick">
                <view class="top">
                    <ste-image :src="codeSrc" :height="60" :width="60"></ste-image>
                </view>
                <view class="bottom" :style="[cmpCodeStyle]">
                    {{ codeTitle }}
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-user-info-root {
    .box {
        width: 702rpx;
        height: 148rpx;
        background: #ffffff;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .user-box {
            display: flex;
            flex-direction: row;

            .left {
                width: 80rpx;
                height: 80rpx;
                background: #dddddd;
                border-radius: 40rpx;
                overflow: hidden;
                margin-right: 12rpx;
            }
            .right {
                .name {
                    color: #000;
                    font-size: var(--font-size-24, 24rpx);
                    font-weight: Bold;
                    width: 140rpx; /* 设置固定宽度，也可以是百分比或者其他单位 */
                    white-space: nowrap; /* 禁止换行 */
                    overflow: hidden; /* 隐藏溢出内容 */
                    text-overflow: ellipsis; /* 溢出时显示省略号 */
                }
                .desc {
                    margin-top: 14rpx;
                }
            }
        }

        .data-box {
            display: flex;
            flex: 1;
            .item {
                .title {
                    height: 40rpx;
                    font-size: 28rpx;
                    color: #000000;
                    text-align: center;
                    margin-top: 12rpx;
                }

                .value {
                    height: 44rpx;
                    line-height: 44rpx;
                    font-weight: bold;
                    font-size: 36rpx;
                    color: #000000;
                    text-align: center;
                }
            }
        }
        .line {
            width: 0rpx;
            height: 50rpx;
            border-left: 4rpx solid #f1f1f1;
        }

        .code-box {
            display: flex;
            flex-direction: column;
            align-items: center;

            .top {
                text-align: center;
                width: 60rpx;
                height: 60rpx;
                background: #dddddd;
                border-radius: 12rpx;
            }

            .bottom {
                margin-top: 8rpx;
                height: 34rpx;
                line-height: 34rpx;
                font-size: 24rpx;
                color: #ec3e1a;
                text-align: center;
            }
        }
    }
}
</style>
