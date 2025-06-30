<script setup lang="ts">
import { ref } from 'vue';
const list = ref([
    {
        id: 1,
        name: '张三',
        phone: '17777777777',
        address: '湖北省武汉市硚口区古田二路XX号招商江湾国际中心XX栋XXX室',
        default: true,
        tag: '家',
    },
    {
        id: 2,
        name: '李四',
        phone: '18888888888',
        address: '湖北省武汉市武昌区东湖风景区XXX路XXX小区XX期XX栋XXX单元XXX室',
        default: false,
        tag: '公司',
    },
    {
        id: 3,
        name: '王五',
        phone: '19999999999',
        address: '湖北省武汉市洪山区白沙洲XXX路XXX小区XX期XX栋XXX单元XXX室',
        default: false,
        tag: '',
    },
]);

const setDefaultLocation = (i: number) => {
    list.value.forEach((item, index) => {
        item.default = index === i;
    });
};
</script>
<template>
    <view class="page-location-list-view">
        <ste-navbar title="地址管理" :titleAlignment="2" backgroundColor="#fff" />
        <view class="location-list-content">
            <view class="location-item" v-for="(item, i) in list" :key="i">
                <view class="item-head-row">
                    <view class="item-head-name">{{ item.name }}</view>
                    <view class="item-head-phone">{{ item.phone }}</view>
                    <view class="item-head-tags">
                        <view class="tag-item default" v-if="item.default">默认</view>
                        <view class="tag-item home" v-if="item.tag">{{ item.tag }}</view>
                    </view>
                </view>
                <view class="item-addr-row">{{ item.address }}</view>
                <view class="item-methods-row">
                    <view class="methods-left">
                        <view class="methods-set-default" @click="setDefaultLocation(i)">
                            <ste-checkbox shape="square" iconSize="30" :modelValue="item.default" />
                            <text>{{ item.default ? '已默认' : '设为默认' }}</text>
                        </view>
                    </view>
                    <view class="methods-right">
                        <view class="methods-button">删除</view>
                        <view class="methods-button">复制</view>
                        <view class="methods-button">修改</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.page-location-list-view {
    width: 750rpx;
    min-height: 100vh;
    background-color: #f5f5f5;
    .location-list-content {
        padding: 20rpx 24rpx;
        .location-item {
            background-color: #fff;
            border-radius: 12px;
            padding: 28rpx 24rpx;
            & + .location-item {
                margin-top: 22rpx;
            }
            .item-head-row {
                width: 100%;
                display: flex;
                align-items: center;
                font-weight: bold;
                font-size: 32rpx;
                color: #000000;
                .item-head-phone {
                    margin-left: 20rpx;
                }
                .item-head-tags {
                    display: flex;
                    margin-left: 24rpx;
                    .tag-item {
                        height: 34rpx;
                        border-radius: 4rpx;
                        border: 2rpx solid #e32b11;
                        font-weight: 500;
                        font-size: 24rpx;
                        line-height: 28rpx;
                        padding: 0 8rpx;
                        color: #e32b11;
                        &.default {
                            border-color: #e32b11;
                            color: #e32b11;
                        }
                        &.home {
                            border-color: #368dff;
                            color: #368dff;
                            margin-left: 12rpx;
                        }
                    }
                }
            }
            .item-addr-row {
                margin-top: 12rpx;
                font-weight: 500;
                font-size: 28rpx;
                color: #000000;
                line-height: 42rpx;
            }
            .item-methods-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .methods-left,
                .methods-right {
                    display: flex;
                    align-items: center;
                    .methods-set-default {
                        display: flex;
                        align-items: center;
                        font-weight: 500;
                        font-size: 28rpx;
                        color: #666666;
                        // #ifdef H5
                        cursor: pointer;
                        // #endif
                    }
                    .methods-button {
                        height: 56rpx;
                        line-height: 54rpx;
                        background: #f5f5f5;
                        border-radius: 8rpx;
                        padding: 0 28rpx;
                        font-weight: 500;
                        font-size: 28rpx;
                        color: #000000;
                        // #ifdef H5
                        cursor: pointer;
                        // #endif
                        & + .methods-button {
                            margin-left: 24rpx;
                        }
                    }
                }
            }
        }
    }
}
</style>
