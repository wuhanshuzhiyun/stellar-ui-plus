<script setup lang="ts">
import { inject } from 'vue';
import type { MarkdownData } from '../types';

const datas = inject<MarkdownData>('datas');
</script>

<template>
    <div class="h5-component">
        <div class="h5-component-view">
            <iframe :src="datas?.h5url.value" frameborder="0" width="100%" height="100%" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.h5-component {
    background-image: url('https://image.whzb.com/chain/StellarUI/iPhone13.png');
    position: fixed;
    z-index: 10;
    top: calc(var(--pc-header-nav-height) + 32px);
    right: 20px;
    width: calc(var(--pc-view-width) + 28px);
    min-width: calc(var(--pc-view-width) + 28px);
    height: calc(var(--pc-view-height));
    padding: 41px 14px 23px;
    overflow: hidden;
    border-radius: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .h5-component-view {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 4px 4px 20px 20px / 30px 30px 34px 34px;
    }
}
</style>
