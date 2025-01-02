<script setup lang="ts">
import { inject, ref, watch, nextTick } from 'vue';
import type { MarkdownData } from '../types';

const datas = inject<MarkdownData>('datas');
let markdown = ref('');
// 兼容本地查看内容
let show = ref(false);
let loading = ref(false);
watch(
    () => datas?.active.value,
    (value: any) => {
        if (['handbook-介绍', 'handbook-其他插件'].includes(value)) {
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
let iframe: any = ref(null);
const load = () => {
    console.log('loading', loading.value);
    if (loading.value) {
        loading.value = true;
        setTimeout(() => {
            try {
                show.value = false;
                let text: any = iframe.value.contentDocument.querySelector('.pc-content').getAttribute('data-markdown');
                console.log('text', text);
                if (datas?.active.value.includes('介绍')) {
                    text = text.replaceAll('StellarUI', 'StellarPlus');
                    text = text.replaceAll('chain/StellarPlus', 'chain/StellarUI');
                    text = text.replaceAll('H5/小程序', 'H5/App/小程序');
                    text = text.replace('<td style="text-align:center">x</td>', '<td style="text-align:center">√</td>');
                }
                markdown.value = text;
            } catch (error) {
                console.error('error', error);
                show.value = true;
            }
        }, 300);
    }
};
</script>

<template>
    <div class="right-component">
        <div v-if="!show" v-html="markdown" />
        <iframe
            v-show="show && loading"
            id="v2"
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
