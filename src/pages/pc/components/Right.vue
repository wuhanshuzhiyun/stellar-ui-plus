<script setup lang="ts">
import { inject } from 'vue';
import CommentVue from './Comment.vue';
import type { MarkdownData } from '../types';

const datas = inject<MarkdownData>('datas');
</script>

<template>
    <div class="right-component">
        <div v-html="datas?.viewMarkdown.value" />
        <CommentVue v-if="datas?.isComponent.value" />
    </div>
</template>

<style scoped lang="scss">
.right-component {
    width: 100%;
    padding: 20px;
}
</style>
