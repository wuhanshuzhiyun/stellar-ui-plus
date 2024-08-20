<script setup lang="ts">
import { ref } from 'vue';
</script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="滚动锚点"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础使用</view>

                <ste-scroll-to></ste-scroll-to>
            </view>
        </view>
    </view>
</template>
<style scoped lang="scss">
.page {
}
</style>
