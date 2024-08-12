<script setup lang="ts"></script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="手势滑动"></page-nav>
        <ste-touch-swipe>
            <ste-touch-swipe-item>111</ste-touch-swipe-item>
            <ste-touch-swipe-item>222</ste-touch-swipe-item>
            <ste-touch-swipe-item>333</ste-touch-swipe-item>
        </ste-touch-swipe>
    </view>
</template>
<style scoped lang="scss">
.page {
}
</style>
