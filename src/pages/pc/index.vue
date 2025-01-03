<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
// #ifdef H5
import { provide, ref, computed } from 'vue';
import H5 from './components/H5.vue';
import Left from './components/Left.vue';
import Right from './components/Right.vue';
import HeaderNav from './components/header-nav.vue';
import VersionSelect from './components/version-select.vue';
import useMarkdown from './composables/useMarkdown';
import config from '@/common/config';
import type { NavItem } from './types';
import { rests, components } from './markdown';

const datas = useMarkdown();
provide('datas', datas);
const navActive = ref(config.NAV_KEY_DEV);

const isCompView = computed(() => {
    return navActive.value === config.NAV_KEY_COMP;
}); // 标识当前是否在组件预览页面

const cmpShowH5 = computed(() => {
    return isCompView.value || config.SHOW_H5_PAGE.find(e => datas?.active.value.indexOf(e) > -1);
});

const handleHeaderNavChange = (item: NavItem) => {
    if (item.key === config.NAV_KEY_DEV) {
        // 开发指南
        datas.contents.value = rests;
        datas.setActive(rests[0].contents[0].key);
    } else if (item.key === config.NAV_KEY_COMP) {
        // 组件
        datas.contents.value = components;
        datas.setActive(components[0].contents[0].key);
    }
};

onLoad(val => {
    if (val?.active) {
        if (val.active.indexOf('handbook') > -1) {
            navActive.value = config.NAV_KEY_DEV;
        } else {
            navActive.value = config.NAV_KEY_COMP;
        }
    }
});
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
        <view class="pc-page-header">
            <view class="left">
                <image class="logo" src="../../static/logo.png" mode="widthFix"></image>
                <text class="logo-text">StellarUI</text>
            </view>
            <view class="right">
                <header-nav v-model:mode="navActive" @change="handleHeaderNavChange" />
                <version-select style="margin-left: 32px"></version-select>
            </view>
        </view>
        <div class="content">
            <div class="left">
                <Left />
            </div>
            <div class="right">
                <Right :is-comp-view="isCompView" />
            </div>
            <div class="content-h5">
                <H5 v-if="cmpShowH5" />
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

    .pc-page-header {
        height: var(--pc-header-nav-height);
        padding: 0 48px;
        box-shadow:
            0 4px 8px #0000000d,
            inset 0 -1px 0 #dcdfe6;
        background-image: radial-gradient(transparent 1px, #fff 1px);
        position: fixed;
        top: 0;
        z-index: 99999;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            .logo {
                width: 50px;
            }
            .logo-text {
                font-size: 28px;
                font-weight: bold;
            }
            display: flex;
            align-items: center;
        }
        .right {
            display: flex;
            align-items: center;
        }
    }

    .content {
        overflow-y: hidden;
        margin-top: var(--pc-header-nav-height);
        width: 100%;
        height: calc(100% - var(--pc-header-nav-height));
        display: flex;
        // flex-direction: row;
        // background-color: #fff;
        // position: relative;

        .left {
            width: var(--pc-nav-width);
            height: 100%;
            background-color: #f5f5f5;
        }

        .right {
            flex: 1;

            height: 100%;
            background-color: #fff;
            overflow-y: auto;
            padding-right: calc(var(--pc-view-width) + 20px + 28px);
        }
    }
}
</style>
