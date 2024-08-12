<script setup lang="ts">
import { ref, computed } from 'vue';

const showData = ref(1);
const list1 = [
    {
        label: 'tab 1',
        value: 1,
    },
    {
        label: 'tab 2',
        value: 2,
    },
    {
        label: 'tab 3',
        value: 3,
    },
];
const list2 = [
    {
        label: 'tab 1',
        value: 1,
    },
    {
        label: 'tab 2',
        value: 2,
    },
    {
        label: 'tab 3',
        value: 3,
    },
    {
        label: 'tab 4',
        value: 4,
    },
    {
        label: 'tab 5',
        value: 5,
    },
    {
        label: 'tab 6',
        value: 6,
    },
];

const datas = computed(() => (showData.value === 1 ? list1 : list2));
</script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="标签页"></page-nav>
        <ste-tabs>
            <ste-tab v-for="item in datas" :key="item.value" :title="item.label">{{ item.label }} Content</ste-tab>
        </ste-tabs>
        <button @click="showData = showData === 1 ? 2 : 1">切换数据</button>
    </view>
</template>
<style scoped lang="scss">
.page {
}
</style>
