<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import propsData from './props';

const props = defineProps(propsData);
</script>
<template>
    <view class="ste-goods-info-root">
        <view class="ste-goods-info-left" v-if="checkboxPositions === 'left'"></view>
        <view class="ste-goods-info-image"></view>
        <view class="ste-goods-info-center"></view>
        <view class="ste-goods-info-right" v-if="checkboxPositions === 'right'"></view>
    </view>
</template>

<style lang="scss" scoped>
.ste-goods-info-root {
    width: 100%;
    background-color: #fff;
}
</style>
