<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'page-nav',
});
</script>

<script setup lang="ts">
import propsData from './props';
const props = defineProps(propsData);
const pages = getCurrentPages();

function navBack() {
    if (pages.length > 2) {
        uni.navigateBack();
    } else {
        uni.redirectTo({
            url: '/pages/mp/index',
        });
    }
}
</script>

<template>
    <ste-navbar :title="title" @backClick="navBack"></ste-navbar>
</template>

<style lang="scss" scoped></style>
