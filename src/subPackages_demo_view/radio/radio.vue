<script lang="ts" setup>
import { reactive } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
const val = reactive({
    value1: 'a',
    value2: 'a',
    value3: 'a',
    value4: 'a',
    value5: 'a',
    value6: 'a',
    value7: 'a',
    value8: '',
    value9: 'a',
    value10: 'a',
    value11: '',
    value12: '',
    value13: '',
    value14: '',
    value15: '',
});
function click1(value: any, suspend: () => void, next: () => void) {
    toast.showToast({
        icon: 'none',
        title: `点击：${value} 复选框的值`,
    });
    suspend(); // 阻止操作

    setTimeout(() => {
        next(); // 异步操作后，执行操作
    }, 1500);
}
function click2(value: any, suspend: () => void, _next: any, stop: () => void) {
    toast.showToast({
        icon: 'none',
        title: `点击：${value} 复选框的值`,
    });
    suspend(); // 阻止操作
    setTimeout(() => {
        // 异步操作后，停止操作
        stop();
    }, 200);
}

function change(value: any) {
    setTimeout(() => {
        toast.showToast({
            icon: 'none',
            title: `改变：${value} 复选框的值`,
        });
    }, 1000);
}
</script>

<template>
    <page-layout title="单选框" contentStyle="padding: 0;background-color: #f5f5f5;color: #0009;">
        <view class="description">
            <view class="cmp-name">Radio 单选框</view>
            <view class="cmp-desc">用于在预设的一组选项中执行单项选择，并呈现选择结果。</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">纵向排列</view>
            <view class="item-block radio-box">
                <ste-radio-group v-model="val.value15">
                    <ste-radio name="a">单选框a</ste-radio>
                    <ste-radio name="b">单选框b</ste-radio>
                    <ste-radio name="c">单选框c</ste-radio>
                </ste-radio-group>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">横向排列</view>
            <view class="item-block radio-box">
                <ste-radio-group v-model="val.value15" direction="row">
                    <ste-radio name="a">单选框a</ste-radio>
                    <ste-radio name="b">单选框b</ste-radio>
                    <ste-radio name="c">单选框c</ste-radio>
                </ste-radio-group>
            </view>
        </view>
        <view class="type-block">
            <view>02 组件状态</view>
        </view>
        <view class="demo-item">
            <view class="title">禁用</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value2" name="a" disabled>单选框a</ste-radio>
                <ste-radio v-model="val.value2" name="b" disabled>单选框b</ste-radio>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">只读</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value3" name="a" readonly>单选框a</ste-radio>
                <ste-radio v-model="val.value3" name="b" readonly>单选框b</ste-radio>
            </view>
        </view>
        <view class="type-block">
            <view>03 组件样式</view>
        </view>
        <view class="demo-item">
            <view class="title">自定义形状</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value4" name="a">圆形</ste-radio>
                <ste-radio v-model="val.value4" name="b" shape="square">方形</ste-radio>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义图标大小</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value5" name="a" iconSize="60">60rpx</ste-radio>
                <ste-radio v-model="val.value5" name="b" iconSize="60">60rpx</ste-radio>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义图标颜色</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value6" name="a" checkedColor="#ee0a24">红色</ste-radio>
                <ste-radio v-model="val.value6" name="b" checkedColor="#ee0a24">红色</ste-radio>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义图标</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value7" name="a">
                    <template #icon="{ slotProps }">
                        <ste-icon code="&#xe677;" size="50" :color="slotProps.checked ? '#ee0a24' : '#000000'"></ste-icon>
                    </template>
                    <template #default="{ slotProps }">
                        {{ slotProps.checked ? '已选中' : '未选中' }}
                    </template>
                </ste-radio>
                <ste-radio v-model="val.value7" name="b">
                    <template #icon="{ slotProps }">
                        <ste-icon code="&#xe677;" size="50" :color="slotProps.checked ? '#ee0a24' : '#000000'"></ste-icon>
                    </template>
                    <template #default="{ slotProps }">
                        {{ slotProps.checked ? '已选中' : '未选中' }}
                    </template>
                </ste-radio>
                <ste-radio v-model="val.value7" name="c" disabled>
                    <template #icon="{ slotProps }">
                        <ste-icon code="&#xe677;" size="50" :color="slotProps.disabled ? '#eeeeee' : '#000000'"></ste-icon>
                    </template>
                    <template #default="{ slotProps }">
                        {{ slotProps.disabled ? '禁止' : '未禁止' }}
                    </template>
                </ste-radio>
                <ste-radio v-model="val.value7" name="d" readonly>
                    <template #icon="{ slotProps }">
                        <ste-icon code="&#xe677;" size="50" :color="slotProps.readonly ? 'green' : '#000000'"></ste-icon>
                    </template>
                    <template #default="{ slotProps }">
                        {{ slotProps.readonly ? '只读' : '未只读' }}
                    </template>
                </ste-radio>
            </view>
        </view>
        <view class="type-block">
            <view>04 组件自定义</view>
        </view>
        <view class="demo-item">
            <view class="title">左侧文本</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value8" name="a">右边</ste-radio>
                <ste-radio v-model="val.value8" name="b" textPosition="left">左边</ste-radio>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义文本</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value9" name="a" textSize="50" textInactiveColor="green" textActiveColor="#d276a3">单选框</ste-radio>
                <ste-radio v-model="val.value9" name="b" textSize="50" textInactiveColor="green" textActiveColor="#d276a3">单选框</ste-radio>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">禁用文本点击</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value10" name="a" textDisabled>单选框</ste-radio>
                <ste-radio v-model="val.value10" name="b" textDisabled>单选框</ste-radio>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">回调事件</view>
            <view class="item-block radio-box">
                <ste-radio v-model="val.value11" name="a" @click="click1" @change="change">单选框</ste-radio>
                <ste-radio v-model="val.value11" name="b" @click="click1" @change="change">单选框</ste-radio>
                <text>在click事件后，执行change事件</text>
                <ste-radio v-model="val.value12" name="a" @click="click2" @change="change">单选框</ste-radio>
                <ste-radio v-model="val.value12" name="b" @click="click2" @change="change">单选框</ste-radio>
                <text>在click事件后，阻止change事件</text>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">单选框组</view>
            <view class="item-block radio-box">
                <ste-radio-group v-model="val.value13">
                    <ste-radio name="a">单选框a</ste-radio>
                    <ste-radio name="b">单选框b</ste-radio>
                    <ste-radio name="c">单选框c</ste-radio>
                </ste-radio-group>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">单选框组属性和单选框属性</view>
            <view class="item-block radio-box">
                <ste-radio-group v-model="val.value14" shape="square" textPosition="left">
                    <ste-radio name="a">单选框a</ste-radio>
                    <ste-radio name="b" disabled>单选框b</ste-radio>
                    <ste-radio name="c" shape="circle">单选框c</ste-radio>
                </ste-radio-group>
            </view>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.content {
    .description,
    .type-block {
        padding: 0 40rpx;
    }
}
.radio-box {
    flex-direction: column !important;
    row-gap: 20rpx;
    align-items: flex-start !important;
    justify-content: center;
}
// color: #0009;

.title {
    margin: 0;
    padding: 0 40rpx;
}
.item-block {
    column-gap: 16rpx;
    background-color: #ffffff;
    padding: 18rpx 40rpx;
}
</style>
