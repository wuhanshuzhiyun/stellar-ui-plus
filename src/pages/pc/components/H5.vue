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
        <div class="h5-content">
            <iframe :src="datas?.h5url.value" frameborder="0" width="100%" height="100%" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.h5-component {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    z-index: 100;
    background-size: 100% 100%;
    padding: 50px 14px 30px;
    .h5-content {
        width: var(--pc-view-width);
        height: var(--pc-view-height);
    }
}
</style>
