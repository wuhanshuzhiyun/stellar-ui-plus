<script setup lang="ts">
import { defineProps, computed, watch } from 'vue';
import { useProvide } from '../../utils/mixin';
import propsData, { TAB_KEY } from './props';

const props = defineProps(propsData);

const { internalChildren } = useProvide(
    TAB_KEY,
    'ste-tab'
)({
    activeKey: computed(() => props.active || 0),
});
watch(
    () => internalChildren.length,
    v => {
        console.log('???????????', v);
    }
);

const tabs = computed(() =>
    internalChildren.map((item, index) => ({
        key: index,
        active: index === props.active,
        title: item.props.title,
    }))
);
</script>
<template>
    <view class="ste-tabs-root">
        <scroll-view scroll-x class="tabs-list">
            <view class="tab-item" v-for="tab in tabs" :key="tab.key">
                <view class="tab-image"></view>
                <view class="tab-title">{{ tab.title }}</view>
                <view class="tab-sub-title"></view>
            </view>
        </scroll-view>
        <slot />
    </view>
</template>
<style scoped lang="scss">
.ste-tabs-root {
    .tabs-list {
        width: 100%;
    }
}
</style>
