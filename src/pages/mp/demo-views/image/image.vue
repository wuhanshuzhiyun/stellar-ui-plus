<script setup lang="ts">
import { ref } from 'vue';

const src = ref('https://image.whzb.com/chain/StellarUI/图片.jpg');
</script>

<template>
    <view class="page">
        <page-nav title="图片" />
        <view class="content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <ste-image :src="src" width="200rpx" height="200rpx" />
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.page {
    .content {
        .demo-item {
        }
    }
}
</style>
