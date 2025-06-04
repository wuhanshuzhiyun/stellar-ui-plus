<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import propData from './props';
import { useColorStore } from '../../store/color';

let { getColor } = useColorStore();

const props = defineProps(propData);

const rootStyle = computed(() => {
    return {
        background: props.background,
        '--ste-function-list-content-bg': props.contentBg,
    };
});
</script>
<template>
    <view class="ste-function-list-root" :style="[rootStyle]">
        <view class="ste-function-list-header">
            <view class="ste-function-list-header-l">
                <view class="ste-function-list-title">{{ title }}</view>
                <view class="ste-function-list-subhead">
                    <slot name="subhead">
                        {{ subhead }}
                    </slot>
                </view>
            </view>
            <view class="ste-function-list-header-r">
                <slot name="header-right">
                    <view class="ste-function-list-more">
                        更多
                        <ste-icon code="&#xe674;" color="#353535"></ste-icon>
                    </view>
                </slot>
            </view>
        </view>
        <view class="ste-function-list-content">
            <view class="content-list">
                <view class="content-list-item" v-for="(item, index) in data" :key="index">
                    <view class="content-list-item-image"></view>
                    <view class="content-list-item-info">{{ item.title }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-function-list-root {
    padding: 24rpx 24rpx 20rpx 24rpx;
    border-radius: 12rpx;
    .ste-function-list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .ste-function-list-header-l {
            display: flex;
            align-items: center;
            .ste-function-list-title {
                font-weight: bold;
                font-size: 32rpx;
                color: #000000;
            }
            .ste-function-list-subhead {
                font-size: 24rpx;
                color: #ac7900;
                line-height: 44rpx;
                height: 44rpx;
                background: rgba(252, 222, 151, 0.23);
                border-radius: 22rpx;
                padding: 0 12rpx;
                margin-left: 18rpx;
            }
        }
        .ste-function-list-header-r {
            font-size: 24rpx;
            color: #353535;
        }
    }
    .ste-function-list-content {
        background-color: var(--ste-function-list-content-bg);
        padding: 24rpx 20rpx 20rpx 20rpx;
        margin-top: 24rpx;
        border-radius: 12rpx;
    }
}
</style>
