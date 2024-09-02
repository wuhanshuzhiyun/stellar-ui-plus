<script setup lang="ts">
import utils from '../../utils/utils';
import propsData from './props';

defineProps(propsData);

const replaceVerticalAlign = (text: string) => {
    let html = text;
    html = utils.richTextTagAddStyle(html, 'p', ['margin', 'margin-top'], ';margin-top:0');
    html = utils.richTextTagAddStyle(html, 'p', ['margin', 'margin-bottom'], ';margin-bottom:0');
    html = utils.richTextTagAddStyle(html, 'img', 'vertical-align', ';vertical-align:top');
    // 解决微信小程序会忽略空白换行的问题
    html = html.replace(/↵/g, '\n');
    html = html.replace(/&nbsp;/g, '\n');
    return html;
};
</script>
<template>
    <view class="rich-text-root">
        <rich-text :nodes="replaceVerticalAlign(text)" :user-select="userSelect" class="rich-text" :space="space"></rich-text>
    </view>
</template>
<style scoped lang="scss">
.rich-text-root {
    overflow: hidden;
    .rich-text {
        word-break: break-all;
    }
}
</style>
