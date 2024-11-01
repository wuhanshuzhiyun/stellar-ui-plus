<script lang="ts" setup>
import type { CloumnType } from '@/uni_modules/stellar-ui-plus/components/ste-date-picker/types';

function change(e: string) {
    // console.log('datetime change', e)
}
function formatter(type: CloumnType, value: any) {
    if (type === 'year') {
        return `${value}年`;
    }
    if (type === 'month') {
        return `${value}月`;
    }
    if (type === 'day') {
        return `${value}日`;
    }
    return value;
}
function filter(mode: CloumnType, options: any[]) {
    if (mode === 'year') {
        return options.filter(option => option % 5 === 0);
    }
    if (mode === 'month') {
        return options.filter(option => option % 4 === 0);
    }
    if (mode === 'day') {
        return options.filter(option => option % 2 === 0);
    }

    return options;
}
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="时间选择"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础使用</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker @change="change" title="基础使用" value="2015-05-20 xxx:00:01"></ste-date-picker>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">不显示操作栏</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker :showToolbar="false" mode="date"></ste-date-picker>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">时间类型</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker title="年月日时分" mode="datetime"></ste-date-picker>
                    </view>
                    <view>
                        <ste-date-picker title="年月日" mode="date"></ste-date-picker>
                    </view>
                    <view>
                        <ste-date-picker title="年月" mode="year-month"></ste-date-picker>
                    </view>
                    <view>
                        <ste-date-picker title="月日" mode="month-day"></ste-date-picker>
                    </view>
                    <view>
                        <ste-date-picker title="时分秒" mode="time"></ste-date-picker>
                    </view>
                    <view>
                        <ste-date-picker title="时分" mode="hour-minute"></ste-date-picker>
                    </view>
                    <view>
                        <ste-date-picker title="分秒" mode="minute-second"></ste-date-picker>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">最大值 & 最小值</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker maxDate="2030-01-01 00:00:00" minDate="2022-01-01 00:00:00"></ste-date-picker>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">过滤</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker :filter="filter" mode="date" title="过滤"></ste-date-picker>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">格式化</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker :formatter="formatter" mode="date" title="格式化"></ste-date-picker>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">选项高度</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker mode="date" itemHeight="50"></ste-date-picker>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">每列可见数量</view>
                <view class="item-block">
                    <view>
                        <ste-date-picker mode="date" :visibleItemCount="10"></ste-date-picker>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page {
    background-color: #f7f8fa;
    .content {
        .demo-item {
            .item-block {
                > view {
                    width: 100%;
                    margin: 0 8px 8px 0;
                }
            }
        }
    }
}
</style>
