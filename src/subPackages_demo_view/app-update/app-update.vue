<script lang="ts" setup>
import type { RefAppUpdate } from '@/uni_modules/stellar-ui-plus/types/refComponents';
import { onHide } from '@dcloudio/uni-app';
import { ref } from 'vue';

const appUpdate = ref<RefAppUpdate>();
// 监听检查更新结果
const checkForUpdates = () => {
    appUpdate.value?.start(({ code, name }, version) => {
        console.log(`当前版本号：${version}`);
        console.log(`服务器版本号：${code}；服务器版本名称${name}`);
    });
};
</script>

<template>
    <page-layout title="动画">
        <view class="description">
            <view class="cmp-name">AppUpdate App更新</view>
            <view class="cmp-desc">此组件用于APP更新功能</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <ste-app-update ref="appUpdate" clientId="workbench_android" clientSecret="gkS6lEEncqAocYK2qsrvPQZykm3ISeMx"></ste-app-update>
                <ste-button @click="checkForUpdates">检查更新</ste-button>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                > view {
                    margin: 0 36rpx 36rpx 0;
                }
            }
        }
    }
}
</style>
