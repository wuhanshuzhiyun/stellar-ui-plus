<script setup lang="ts">
import { computed } from 'vue';
import steIcon from '../ste-icon/ste-icon.vue';
import propsData from './props';
const props = defineProps(propsData);
const totalData = computed(() => Math.max(props.total, props.comments.length));

const headRight = computed(() => {
    if (totalData.value === 0) {
        return '期待你的首评';
    }
    return '全部评价';
});
</script>
<template>
    <view class="ste-comment-root" :class="{ not: totalData === 0 }">
        <view class="comment-head">
            <view class="comment-head-title">商品评价({{ totalData }})</view>
            <view class="comment-head-right">
                {{ headRight }}
                <ste-icon v-if="headRight === '全部评价'" code="&#xe674;" />
            </view>
        </view>
        <view class="comment-content" v-if="totalData > 0 || comments.length > 0">
            <view class="comment-tags" v-if="tags.length > 0">
                <view class="comment-tag" v-for="(tag, index) in tags" :key="index">
                    {{ tag }}
                </view>
            </view>
            <view class="comment-list">
                <view class="comment-item" v-for="(item, index) in comments" :key="index">
                    <view class="comment-head-info">
                        <image class="comment-head-avatar" :src="item.userAvatar" mode="aspectFill" />
                        <view class="comment-head-right">
                            <view class="comment-head-name">{{ item.userName }}</view>
                            <view class="comment-head-time">{{ item.date }}</view>
                        </view>
                    </view>
                    <view class="comment-content">
                        {{ item.evaluateText }}
                    </view>
                    <view class="comment-images">
                        <image class="comment-image" v-for="(image, index) in item.imgList" :key="index" :src="image" mode="aspectFill" />
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-comment-root {
    width: 100%;
    background: #fff;
    &.not {
        background: linear-gradient(161deg, #ffffff 0%, #ffffff 42%, #fff1ed 100%);
    }
    .comment-head {
        width: 100%;
        height: 92rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 20rpx 0 24rpx;
        .comment-head-title {
            font-weight: 800;
            font-size: 32rpx;
            color: #000000;
        }
        .comment-head-right {
            font-size: 28rpx;
            color: #858585;
        }
    }
    .comment-content {
        width: 100%;
        padding: 0 24rpx 20rpx 24rpx;
        .comment-tags {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-weight: 500;
            font-size: 24rpx;
            color: #f65419;
            margin-top: 4rpx;
            .comment-tag {
                background: rgba($color: #f65419, $alpha: 0.08);
                padding: 10rpx 28rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
                border-radius: 26rpx;
            }
        }

        .comment-list {
            width: 100%;
            .comment-item {
                width: 100%;
                background: #f9f9fb;
                border-radius: 16rpx;
                padding: 24rpx 18rpx 16rpx 18rpx;
                .comment-head-info {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .comment-head-avatar {
                        width: 64rpx;
                        height: 64rpx;
                        border-radius: 50%;
                    }
                    .comment-head-right {
                        font-size: 24rpx;
                        line-height: 24rpx;
                        padding-left: 16rpx;
                        height: 64rpx;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .comment-head-name {
                            color: #000000;
                            font-weight: bold;
                        }
                        .comment-head-time {
                            color: #999999;
                            font-weight: 400;
                        }
                    }
                }
                .comment-content {
                    font-size: 28rpx;
                    color: #000000;
                    line-height: 42rpx;
                    margin-top: 18rpx;
                    margin-bottom: 16rpx;
                }

                .comment-images {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    .comment-image {
                        width: 150rpx;
                        height: 150rpx;
                        margin-right: 8rpx;
                        margin-bottom: 8rpx;
                        &:nth-child(4n) {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
