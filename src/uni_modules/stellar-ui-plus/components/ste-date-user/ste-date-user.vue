<script setup lang="ts">
import { ref, defineComponent, onMounted } from 'vue';

import propsData from './props';
defineComponent({
    name: 'ste-date-user',
});

const props = defineProps(propsData);
let time: any = ref({});
let day = ref('');
let year = ref('');
onMounted(async () => {
    uni.request({
        url: 'https://zboa.whzb.com/inte-cloud-test/inte-tour-base/api/calendar/getCalendar',
        method: 'get',
        success: (res: any) => {
            time.value = res.data.data;
            let date = time.value.today.split('-');
            day.value = date[date.length - 1];
            year.value = `${date[0]}年${date[1]}月`;
        },
        fail: error => {
            console.log('error', error);
        },
    });
});
</script>

<template>
    <view class="ste-date-user-root" data-test="date-user">
        <view class="box">
            <template v-if="type == 'date'">
                <view class="left">
                    <view class="day">{{ day }}</view>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="year">{{ year }}</view>
                    </view>
                    <view class="bottom">
                        <view class="time">{{ time.weekDay }}</view>
                        <view class="line" v-if="time.jieQiName"></view>
                        <view class="time" v-if="time.jieQiName">{{ time.jieQiName }}</view>
                    </view>
                </view>
            </template>
            <template v-if="type == 'user'">
                <view class="left">
                    <view class="image">
                        <ste-image :width="80" :height="80" :src="avatar"></ste-image>
                    </view>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="year">{{ nickname }}</view>
                    </view>
                    <view class="bottom">
                        <view class="desc">
                            <slot name="desc"></slot>
                        </view>
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-date-user-root {
    .box {
        width: 336rpx;
        height: 128rpx;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        background-color: #fff;
        padding-right: 20rpx;

        .left {
            width: 80rpx;
            height: 80rpx;
            background: #f4f5f6;
            border-radius: 8rpx;
            margin: 0 28rpx;
            display: flex;
            justify-content: center;
            align-items: center;

            .day {
                font-size: var(--font-size-40, 40rpx);
                color: #1c1f23;
                line-height: 56rpx;
                height: 56rpx;
            }

            .image {
                width: 80rpx;
                height: 80rpx;
                background: #ecf6ff;
                border-radius: 8rpx;
                overflow: hidden;
            }
        }

        .right {
            .year {
                line-height: 40rpx;
                height: 40rpx;
                font-size: var(--font-size-28, 28rpx);
                color: #1c1f23;
                width: 160rpx; /* 设置固定宽度，也可以是百分比或者其他单位 */
                white-space: nowrap; /* 禁止换行 */
                overflow: hidden; /* 隐藏溢出内容 */
                text-overflow: ellipsis; /* 溢出时显示省略号 */
            }

            .bottom {
                margin-top: 6rpx;
                display: flex;
                align-items: center;

                .line {
                    border-left: 4rpx solid #1c1f23;
                    border-radius: 2rpx;
                    width: 0;
                    height: 22rpx;
                    margin: 0 13rpx;
                }

                .time {
                    font-size: var(--font-size-28, 28rpx);
                    color: #1c1f23;
                }

                .desc {
                    min-width: 96rpx;
                    height: 38rpx;
                    background: #ebf4ff;
                    border-radius: 4rpx;
                }
            }
        }
    }
}
</style>
