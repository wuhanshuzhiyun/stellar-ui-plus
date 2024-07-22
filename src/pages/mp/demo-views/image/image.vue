<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
    <view class="page">
        <page-nav title="图片" />
        <view class="content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <ste-image />
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
