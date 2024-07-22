<script setup lang="ts">
// #ifdef H5
import { provide } from 'vue';
import H5 from './components/H5.vue';
import Left from './components/Left.vue';
import Right from './components/Right.vue';
import useMarkdown from './composables/useMarkdown';

const datas = useMarkdown();

provide('datas', datas);
// #endif

// #ifndef H5
onLoad(() => {
    uni.redirectTo({ url: '/pages/mp/index' });
});
// #endif
</script>

<template>
    <!-- #ifdef H5 -->
    <div class="pc-page-body">
        <header>
            您正在浏览基于 Vue 3.x 的文档;
            <a href="https://stellar-ui.intecloud.com.cn/pc/index/index" target="_blank">点击查看Vue 2.x版本。</a>
        </header>
        <div class="content">
            <div class="left">
                <Left />
            </div>
            <div class="right">
                <Right />
                <div class="h5" />
            </div>
            <div class="content-h5">
                <H5 />
            </div>
        </div>
    </div>
    <!-- #endif -->
</template>

<style scoped lang="scss">
.pc-page-body {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    position: relative;

    header {
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #eee;
        width: 100%;
        background-color: #409eff;

        a {
            color: #fff;
            font-weight: bold;
        }
    }

    .content {
        width: 100%;
        height: calc(100% - 30px);
        display: flex;

        .left {
            width: 240px;
            height: 100%;
            background-color: #f5f5f5;
        }

        .content {
            width: 100%;
            height: 100%;
            display: flex;

            .left {
                width: 240px;
                height: 100%;
                background-color: #f5f5f5;
            }

            .right {
                width: calc(100% - 240px);
                height: 100%;
                background-color: #fff;
                overflow-y: auto;
                padding-right: calc(var(--pc-view-width) + 50px);
            }
        }
    }
}
</style>
