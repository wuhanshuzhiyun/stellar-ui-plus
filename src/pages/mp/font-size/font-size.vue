<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import config from '../../../uni_modules/stellar-ui-plus/config';

const fontSize = ref(config.options.fontScale);

watch(
    () => fontSize.value,
    v => {
        config.setConfig({ fontScale: v });
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
const value1 = ref(null);
const list1 = [
    { label: '选项2011', value: 2011 },
    { label: '选项2012', value: 2012 },
    { label: '选项2013', value: 2013 },
    { label: '选项2014', value: 2014 },
    { label: '选项2015', value: 2015 },
    { label: '选项2016', value: 2016 },
    { label: '选项2017', value: 2017 },
    { label: '选项2018', value: 2018 },
    { label: '选项2019', value: 2019 },
];

const fontSizeChange = (v: number | number[]) => {
    console.log(v);
    if (Array.isArray(v)) {
        fontSize.value = v[0] / 10;
    } else {
        fontSize.value = v / 10;
    }
};
</script>
<template>
    <view :style="[rootStyle]">
        <ste-sticky>
            <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="字体大小配置"></page-nav>
            <view style="background-color: #fff; padding: 24rpx; display: flex; justify-content: center; border-bottom: 1px solid #eee">
                <ste-slider :value="fontSize * 10" :min="5" :max="20" :step="1" @change="fontSizeChange" />
            </view>
        </ste-sticky>
        <view class="demo-content">
            <ste-button>按钮</ste-button>
            <br />
            <br />
            <ste-image src="1111" width="200" height="200">
                <template v-slot:loading>Loading...</template>
                <template v-slot:error>Error</template>
            </ste-image>
            <br />
            <view style="width: 100%; height: 750rpx">
                <ste-calendar />
            </view>
            <br />
            <ste-search />
            <br />
            <ste-select :list="list1" v-model="value1"></ste-select>
            <br />
            <ste-upload />
            <br />
            <ste-number-keyboard mode="page" />
        </view>
    </view>
</template>

<style lang="scss">
.demo-content {
    padding-top: 20rpx;
}
</style>
