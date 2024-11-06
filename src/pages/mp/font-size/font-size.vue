<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import config from '../../../uni_modules/stellar-ui-plus/config';

const fontSize = ref(String(config.options.fontScale));

const fontsizes = [
    {
        value: '0.8',
        label: '小型字体',
    },
    {
        value: '1',
        label: '标准字体',
    },
    {
        value: '1.2',
        label: '大型字体',
    },
];

watch(
    () => fontSize.value,
    v => {
        config.setConfig({ fontScale: Number(v) });
    }
);

const rootStyle = computed(() => {
    // #ifdef MP | APP
    return config.rootStyle;
    // #endif
    // #ifndef MP
    return {};
    // #endif
});
</script>
<template>
    <view :style="[rootStyle]">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="字体大小配置"></page-nav>
        <ste-radio-group v-model="fontSize" direction="row">
            <ste-radio v-for="item in fontsizes" :key="item.value" :name="item.value">{{ item.label }}</ste-radio>
        </ste-radio-group>
        <ste-button>这是一个标准按钮</ste-button>
    </view>
</template>
