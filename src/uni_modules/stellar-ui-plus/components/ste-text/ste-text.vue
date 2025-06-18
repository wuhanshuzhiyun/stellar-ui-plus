<script setup lang="ts">
import { computed } from 'vue';
import propsData from './props';
import { createOptions } from '../../utils/mixin';

defineOptions(createOptions('ste-text'));

const props = defineProps(propsData);

const cmpRootCssVar = computed(() => {
    return { '--overflow-lines': props.lines };
});
</script>
"

<template>
    <text
        :style="[cmpRootCssVar]"
        class="ste-text-root"
        :class="{ 'ste-text-lines': Number(lines) > 0 }"
        :selectable="selectable"
        :user-select="selectable"
        :space="space"
        :decode="decode"
        :number-of-lines="lines"
        data-test="text"
    >
        <template v-if="!value">
            <slot></slot>
        </template>
        <text v-else class="text-value">
            {{ value }}
        </text>
    </text>
</template>

<style lang="scss" scoped>
.ste-text-root {
    &.ste-text-lines {
        /* #ifdef MP-WEIXIN || H5 || MP-TOUTIAO */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--overflow-lines);
        overflow: hidden;
        /* #endif */
    }
}
</style>
