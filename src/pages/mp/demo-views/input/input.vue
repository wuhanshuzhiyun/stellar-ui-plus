<script lang="ts" setup>
import { ref } from 'vue';
const inputFocus = ref(false);
const count = ref(0);
const v = ref('123');
let codeTimer: any;

function focus() {
    inputFocus.value = !inputFocus.value;
}

function getCode() {
    count.value = 20;
    codeTimer = setInterval(() => {
        if (count.value <= 0) {
            clearInterval(codeTimer);
        }
        count.value--;
    }, 1000);
}

const onlyPositiveDecimal = (value: any) => {
    // 1. 移除所有负号
    // 2. 保留数字和最多一个小数点
    let result = value.replace(/-/g, '');

    // 检查是否已有小数点
    const dotIndex = result.indexOf('.');
    if (dotIndex !== -1) {
        // 如果有小数点，保留第一个小数点，删除后面的所有小数点
        const beforeDot = result.substring(0, dotIndex + 1);
        const afterDot = result.substring(dotIndex + 1).replace(/\./g, '');
        result = beforeDot + afterDot;
    }

    // 移除所有非数字和小数点的字符
    return result.replace(/[^\d.]/g, '');
};
</script>

<template>
    <page-layout title="输入框" contentStyle="background: #fcfcfc;">
        <view class="description">
            <view class="cmp-name">Input 输入框</view>
            <view class="cmp-desc">用于单行文本信息输入。</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">文本输入框</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input v-model="v" rootClass="my-input" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">密码输入框</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input type="password" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">数字输入框</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input type="number" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">占位符</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input placeholder="请输入" placeholderClass="my-input-holder" />
                </view>
                <view style="width: 100%">
                    <ste-input placeholder="请输入" placeholderStyle="color: #f00" />
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件状态</view>
        </view>
        <view class="demo-item">
            <view class="title">禁用&只读</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input disabled value="禁用" />
                </view>
                <view style="width: 100%">
                    <ste-input readonly value="只读" />
                </view>
                <view style="width: 100%">
                    <ste-input disabled shape="line" value="禁用" />
                </view>
                <view style="width: 100%">
                    <ste-input shape="line" readonly value="只读" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">字数统计</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input type="textarea" :maxlength="140" showWordLimit />
                </view>
                <view style="width: 100%">
                    <ste-input shape="line" type="textarea" :maxlength="140" showWordLimit />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">焦点</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input :focus.sync="inputFocus" />
                </view>

                <view style="width: 100%; text-align: center">
                    <ste-button width="100%" style="margin-right: 50rpx" @click="focus">焦点</ste-button>
                </view>
            </view>
        </view>
        <view class="type-block">
            <view>03 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">对齐方式</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input placeholder="请输入" inputAlign="center" />
                </view>
                <view style="width: 100%">
                    <ste-input placeholder="请输入" inputAlign="right" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">输入框字体</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input value="字体大小" fontSize="36" />
                </view>
                <view style="width: 100%">
                    <ste-input value="字体颜色" fontColor="#f00" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">输入框形状</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input shape="circle" />
                </view>
                <view style="width: 100%">
                    <ste-input shape="line" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">输入框边框</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input border />
                </view>
                <view style="width: 100%">
                    <ste-input border borderColor="#f00" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">背景色</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input background="linear-gradient(to right, #aaaaaa, #aaa000)" />
                </view>
                <view style="width: 100%">
                    <ste-input background="https://image.whzb.com/chain/StellarUI/背景1.png" />
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">前后插槽</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input placeholder="请输入内容" confirmType="next" rootClass="root-my-input" shape="line">
                        <template v-slot:prefix>
                            <view style="margin-right: 28rpx">
                                <ste-icon code="&#xe68c;" size="28" />
                                <text>文本</text>
                            </view>
                        </template>
                        <template v-slot:suffix>
                            <view>
                                <ste-icon code="&#xe672;" size="28" />
                            </view>
                        </template>
                    </ste-input>
                </view>
            </view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input placeholder="请输入验证码" confirmType="next" rootClass="root-my-input" shape="line">
                        <template v-slot:suffix>
                            <view>
                                <ste-button :mode="100" :round="false" @click="getCode" :disabled="count > 0">
                                    {{ count <= 0 ? '获取验证码' : count + '秒后获取' }}
                                </ste-button>
                            </view>
                        </template>
                    </ste-input>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">前置过滤</view>
            <view class="item-block">
                <view style="width: 100%">
                    <ste-input :filter="onlyPositiveDecimal" />
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 8px 8px 0;

            :deep(.my-input) {
                color: red;
            }
        }
    }
}
</style>
