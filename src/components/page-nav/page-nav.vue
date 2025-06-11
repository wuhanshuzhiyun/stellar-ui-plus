<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'page-nav',
});
</script>

<script setup lang="ts">
import propsData from './props';
const props = defineProps(propsData);

function navBack() {
    if (props.isHome) {
        uni.redirectTo({
            url: '/pages/mp/index',
        });
    } else {
        uni.navigateBack();
    }
}
</script>

<template>
    <ste-navbar :title="title" @backClick="navBack" :isHome="isHome"></ste-navbar>
</template>

<style lang="scss" scoped></style>
