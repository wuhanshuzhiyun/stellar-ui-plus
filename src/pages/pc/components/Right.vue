<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import type { MarkdownData, Content } from '../types';
import CompNav from './comp-nav.vue';
import config from '@/common/config';
import CommentVue from './Comment.vue';

const props = defineProps<{
    isCompView: boolean;
}>();

const datas = inject<MarkdownData>('datas');
let markdown = ref('');
// 兼容本地查看内容
let show = ref(false);
let loading = ref(false);
const compNavActive = ref(config.NAV_COMP_KEY_DEMO);

const compMarkdonwHtml = ref<Content>();

watch(
    () => datas?.active.value,
    (value: any) => {
        if (['handbook-介绍', 'handbook-其他插件'].includes(value)) {
            loading.value = true;
            markdown.value = '';
        } else {
            compMarkdonwHtml.value = datas?.viewMarkdown.value;
            compNavActive.value = config.NAV_COMP_KEY_DEMO;
            markdown.value = datas?.viewMarkdown.value.html ?? '';
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
    if (loading.value) {
        loading.value = true;
        setTimeout(() => {
            try {
                show.value = false;
                let text: any = iframe.value.contentDocument.querySelector('.pc-content').getAttribute('data-markdown');

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
        <template v-if="props.isCompView">
            <div v-html="compMarkdonwHtml?.htmlDesc" class="markdown-view"></div>
            <comp-nav v-model:mode="compNavActive" style="margin-bottom: 10px"></comp-nav>
            <div v-html="compMarkdonwHtml?.htmlDemo" v-if="compNavActive === config.NAV_COMP_KEY_DEMO" class="markdown-view content"></div>
            <div v-html="compMarkdonwHtml?.htmlApi" v-if="compNavActive === config.NAV_COMP_KEY_API" class="markdown-view content"></div>
            <div v-html="compMarkdonwHtml?.htmlGuide" v-if="compNavActive === config.NAV_COMP_KEY_GUIDE" class="markdown-view content"></div>
            <comment-vue />
        </template>
        <template v-else>
            <div v-if="!show" v-html="markdown" class="markdown-view render" />
            <iframe
                v-show="show && loading"
                id="v2"
                @load="load"
                ref="iframe"
                :src="'https://stellar-ui.intecloud.com.cn/pc/index/index?name=' + datas?.active.value"
                frameborder="0"
                width="100%"
                height="100%"
            ></iframe>
        </template>
    </div>
</template>

<style scoped lang="scss">
.right-component {
    width: 100%;
    height: 100%;
    padding: 40px 0 48px 64px;
}
</style>
