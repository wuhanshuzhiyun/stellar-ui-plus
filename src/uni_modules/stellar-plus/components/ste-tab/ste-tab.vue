<script setup lang="ts">
import { defineOptions } from 'vue';
import { useInject } from '../../utils/mixin';
import propsData from './props';
import { TAB_KEY } from '../ste-tabs/props';

defineOptions({
    name: 'ste-tab',
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);
const { parent } = useInject(TAB_KEY);
</script>
<template>
    <view class="ste-tab-root">
        <slot></slot>
    </view>
</template>
<style scoped lang="scss">
.ste-tab-root {
    width: 100%;
}
</style>
