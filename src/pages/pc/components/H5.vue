<script setup lang="ts">
import { inject } from 'vue';
import type { MarkdownData } from '../types';
import bg from '@/static/iPhone13.png';

const datas = inject<MarkdownData>('datas');

const style = {
    backgroundImage: `url(${bg})`,
};
</script>

<template>
    <div class="h5-component" :style="style">
        <iframe :src="datas?.h5url.value" frameborder="0" width="100%" height="100%" />
    </div>
</template>

<style scoped lang="scss">
.h5-component {
    position: fixed;
    z-index: 10;
    top: calc(var(--pc-header-nav-height) + 32px);
    right: 20px;
    width: calc(var(--pc-view-width) + 28px);
    min-width: calc(var(--pc-view-width) + 28px);
    height: calc(var(--pc-view-height));
    padding: 50px 14px 30px;
    overflow: hidden;
    border-radius: 16px;
    background-image: url(/assets/iPhone13.0a51aa1d.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
