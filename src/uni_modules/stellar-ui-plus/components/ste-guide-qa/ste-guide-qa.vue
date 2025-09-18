<script setup lang="ts">
import { computed } from 'vue';
import propsData, { type GuideQaEmits, type GuideQaItem, type ClickType } from './props';

const props = defineProps(propsData);
const emits = defineEmits<GuideQaEmits>();

const compModeClass = computed(() => {
    let classStr = '';

    if (props.mode === '1') {
        classStr += 'mode-1';
    } else {
        classStr += 'mode-2';
    }

    return classStr;
});

const handleActionClick = () => {
    emits('click-all');
};

const handleItemClick = (type: ClickType, item: GuideQaItem) => {
    emits('click-item', type, item);
};
</script>

<template>
    <view class="ste-quide-qa-root">
        <view :class="['qa-box', compModeClass]" v-if="mode === '1'">
            <view class="title-box">
                <view class="title">
                    <text>{{ props.title }}</text>
                    <text v-if="showNum">({{ props.data.length }})</text>
                </view>
                <view class="action" @click="handleActionClick">
                    <text style="margin-right: 8rpx">{{ props.actionTitle }}</text>
                    <ste-icon code="&#xe674;" :size="24" color="#858585" />
                </view>
            </view>
            <view class="show-box">
                <view class="item question">
                    <view class="item-icon">
                        <slot name="prefix-q">
                            <ste-image src="https://image.whzb.com/chain/StellarUI/image/guide-q.png" mode="widthFix" width="32rpx" />
                        </slot>
                    </view>
                    <view class="item-text">{{ data[0].question }}</view>
                </view>
                <view class="item answer">
                    <view class="item-icon">
                        <slot name="prefix-a">
                            <ste-image src="https://image.whzb.com/chain/StellarUI/image/guide-a.png" mode="widthFix" width="32rpx" />
                        </slot>
                    </view>
                    <view class="item-text">{{ data[0].answer }}</view>
                </view>
            </view>
        </view>
        <view class="qa-box" :class="[compModeClass]" v-else>
            <view v-for="value in data" class="show-box">
                <view class="item question" @click="handleItemClick('q', value)">
                    <view class="item-icon">
                        <slot name="prefix-q">
                            <ste-image src="https://image.whzb.com/chain/StellarUI/image/guide-q.png" mode="widthFix" width="32rpx" />
                        </slot>
                    </view>
                    <view class="item-text">{{ value.question }}</view>
                </view>
                <view class="item answer" @click="handleItemClick('a', value)">
                    <view class="item-icon">
                        <slot name="prefix-a">
                            <ste-image src="https://image.whzb.com/chain/StellarUI/image/guide-a.png" mode="widthFix" width="32rpx" />
                        </slot>
                    </view>
                    <view class="item-text">{{ value.answer }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
// 单行文本超出省略号
@mixin single-row-ellipsis {
    text-overflow: ellipsis; // 文本超出省略号
    overflow: hidden; // 超出部分隐藏
    white-space: nowrap; // 超出不换行
}
.ste-quide-qa-root {
    .qa-box {
        .title-box {
            margin-bottom: 24rpx;
            display: flex;
            align-items: center;
            .title {
                font-size: 32rpx;
                font-weight: bold;
                @include single-row-ellipsis;
                flex: 1;
            }

            .action {
                text-align: right;
                @include single-row-ellipsis;
                color: #858585;
                font-size: 28rpx;
                width: 108rpx;
            }
        }

        .show-box {
            .item {
                display: flex;
                align-items: flex-start;
                .item-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32rpx;
                    min-height: 40rpx; // 设置最小高度，与文字首行高度匹配
                    margin-right: 16rpx;
                    flex-shrink: 0;
                }
                .item-text {
                    font-size: 28rpx;
                    line-height: 40rpx; // 设置行高，与图标容器高度匹配
                    flex: 1;
                }

                &.question {
                    .item-text {
                        font-weight: bold;
                    }
                }

                &.answer {
                    color: #666666;
                    margin-top: 16rpx;
                }
            }
        }

        &.mode-1 {
            background: #ffffff;
            border-radius: 16rpx;
            padding: 24rpx;
            font-size: 28rpx;
            .item-text {
                @include single-row-ellipsis;
            }
        }

        &.mode-2 {
            .show-box {
                background: #ffffff;
                border-radius: 16rpx;
                padding: 24rpx;
                margin-bottom: 16rpx;
                .item.question {
                    .item-text {
                        font-size: 32rpx;
                    }
                }
            }
        }
    }
}
</style>
