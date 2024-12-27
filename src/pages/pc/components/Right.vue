<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import type { MarkdownData } from '../types';

const datas = inject<MarkdownData>('datas');
let iframe: any = ref(null);
let markdown = ref('');
// 兼容本地查看内容
let show = ref(false);
let loading = ref(false);
watch(
    () => datas?.active.value,
    (value: any) => {
        if (['介绍', '其他插件'].includes(value)) {
            loading.value = true;
            markdown.value = '';
        } else {
            markdown.value = datas?.viewMarkdown.value ?? '';
            show.value = false;
            loading.value = false;
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

// iframe加载完
const load = () => {
    if (loading.value) {
        loading.value = true;
        try {
            show.value = false;
            let text = iframe.value.contentDocument.querySelector('.pc-content').getAttribute('markdown');
            if (text.includes('介绍')) {
                text = text.replaceAll('StellarUI', 'StellarPlus');
            }
            markdown.value = text;
        } catch (error) {
            console.error('error', error);
            show.value = true;
        }
    }
};
</script>

<template>
    <div class="right-component">
        <div v-if="!show" v-html="markdown" />
        <iframe
            v-show="show && loading"
            @load="load"
            ref="iframe"
            :src="'https://stellar-ui.intecloud.com.cn/pc/index/index?name=' + datas?.active.value"
            frameborder="0"
            width="100%"
            height="500"
        ></iframe>
    </div>
</template>

<style scoped lang="scss">
.right-component {
    width: 100%;
    padding: 20px;
}
</style>
