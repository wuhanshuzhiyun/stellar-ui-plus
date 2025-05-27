<script setup lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { getDateInfo } from '@swjs/chinese-holidays';
import propsData from './props';
defineComponent({
    name: 'ste-date-user',
});

const props = defineProps(propsData);
let time: any = ref(props.date);
let day = ref('');
let year = ref('');
onMounted(async () => {
    time.value = await getDateInfo(time.value);
    let date = time.value.date.split('-');
    day.value = date[date.length - 1];
    year.value = `${date[0]}年${date[1]}月`;
    console.log('time', time.value);
});
</script>

<template>
    <view class="ste-date-user-root">
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
                        <view class="time">{{ time.day }}</view>
                        <view class="line" v-if="time.type == 3"></view>
                        <view class="time" v-if="time.type == 3">{{ time.name }}</view>
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
    background-color: 'red';

    .box {
        min-width: 336rpx;
        height: 128rpx;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        background-color: #fff;
        padding-right: 20rpx;

        .left {
            width: 80rpx;
            height: 80rpx;
            background: #e6e8ea;
            border-radius: 8rpx;
            margin: 0 28rpx;
            display: flex;
            justify-content: center;
            align-items: center;

            .day {
                font-size: 40rpx;
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
                font-size: 28rpx;
                color: #1c1f23;
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
                    font-size: 24rpx;
                    color: #1c1f23;
                }

                .desc {
                    width: 96rpx;
                    height: 38rpx;
                    background: #ebf4ff;
                    border-radius: 4rpx;
                }
            }
        }
    }
}
</style>
