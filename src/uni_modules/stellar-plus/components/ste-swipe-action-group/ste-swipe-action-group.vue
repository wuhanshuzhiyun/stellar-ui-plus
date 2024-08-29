<script setup lang="ts">
import propsData from './props';
import { STE_SWIPE_ACTION_KEY } from '../ste-swipe-action/props';
import { useProvide } from '../../utils/mixin';

const { internalChildren } = useProvide(STE_SWIPE_ACTION_KEY, 'ste-swipe-action')();
const props = defineProps(propsData);
</script>
<template>
    <view class="ste-swipe-action-group-root">
        <slot></slot>
    </view>
</template>
