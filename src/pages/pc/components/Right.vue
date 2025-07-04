<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import type { MarkdownData, Content } from '../types';
import CompNav from './comp-nav.vue';
import config from '@/common/config';
import CommentVue from './Comment.vue';
import { btnCopy, btnDebug } from '../markdown/utils';

const props = defineProps<{
    mode: 'page' | 'component' | 'handbook';
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
        console.log('compMarkdonwHtml', datas);
        if (['handbook-介绍', 'handbook-其他插件'].includes(value)) {
            loading.value = true;
            markdown.value = '';
        } else if (props.mode === 'page') {
            compMarkdonwHtml.value = datas?.viewMarkdown.value;
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
                    text = text.replaceAll('StellarUI', 'StellarUI-Plus');
                    text = text.replaceAll('chain/StellarUI-Plus', 'chain/StellarUI');
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

const copyCode = (e: MouseEvent) => {
    btnCopy(e.target as HTMLButtonElement);
};
const debugCode = (e: MouseEvent) => {
    btnDebug(e.target as HTMLButtonElement);
};
</script>

<template>
    <div class="right-component">
        <template v-if="mode === 'component'">
            <div v-html="compMarkdonwHtml?.htmlDesc" class="markdown-view"></div>
            <comp-nav v-model:mode="compNavActive" style="margin-bottom: 10px"></comp-nav>
            <div v-html="compMarkdonwHtml?.htmlDemo" v-if="compNavActive === config.NAV_COMP_KEY_DEMO" class="markdown-view content"></div>
            <div v-html="compMarkdonwHtml?.htmlApi" v-if="compNavActive === config.NAV_COMP_KEY_API" class="markdown-view content"></div>
            <div v-html="compMarkdonwHtml?.htmlGuide" v-if="compNavActive === config.NAV_COMP_KEY_GUIDE" class="markdown-view content"></div>
            <comment-vue />
        </template>
        <template v-if="mode === 'page'">
            <div class="markdown-view content">
                <code class="hljs language-html" style="max-height: 600px; overflow-y: auto">
                    <pre>{{ compMarkdonwHtml?.code }}</pre>
                </code>
                <div class="btn-box" :content="compMarkdonwHtml?.code">
                    <a class="btn debug" @click="debugCode">
                        <img class="img" src="https://image.whzb.com/chain/StellarUI/image/debug.png" />
                        <div class="tip">debug</div>
                    </a>
                    <a class="btn copy" @click="copyCode">
                        <img class="img" src="https://image.whzb.com/chain/StellarUI/image/copy.png" />
                        <div class="tip">复制</div>
                    </a>
                </div>
                <comment-vue />
            </div>
        </template>
        <template v-else-if="mode === 'handbook'">
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
