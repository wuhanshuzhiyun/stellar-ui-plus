<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import propsData from './props';

const props = defineProps(propsData);
</script>
<template>
    <view class="ste-goods-list-root">
        <view class="ste-goods-list-header">
            <view class="ste-goods-list-title">
                <view class="ste-goods-list-title-icon">
                    <ste-icon v-if="titleIcon" :code="titleIcon"></ste-icon>
                    <view class="ste-goods-list-title-icon-empty" v-else></view>
                </view>
                <view class="ste-goods-list-title-text" :style="titleStyle">{{ title }}</view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-goods-list-root {
    width: 100%;
    background-color: #fff;
}
</style>
