<script setup lang="ts">
import { SELECTION_COLOR_CONFIG } from '../ste-table/props';
import type { PropType } from 'vue';

const CHECK_ICON_SIZE = 36;
const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    iconColorConfig: {
        type: Object as PropType<typeof SELECTION_COLOR_CONFIG>,
        default: () => SELECTION_COLOR_CONFIG,
    },
});
</script>

<template>
    <view class="ste-table-checkbox-icon">
        <ste-icon code="&#xe6ae;" :color="iconColorConfig.disabled || SELECTION_COLOR_CONFIG.disabled" :size="CHECK_ICON_SIZE" v-if="disabled" />
        <ste-icon code="&#xe6ac;" :color="iconColorConfig.readonly || SELECTION_COLOR_CONFIG.readonly" :size="CHECK_ICON_SIZE" v-else-if="props.readonly" />
        <template v-else>
            <ste-icon code="&#xe6ac;" :color="iconColorConfig.main || SELECTION_COLOR_CONFIG.main" :size="CHECK_ICON_SIZE" v-if="checked" />
            <ste-icon code="&#xe6af;" :color="iconColorConfig.unSelected || SELECTION_COLOR_CONFIG.unSelected" :size="CHECK_ICON_SIZE" v-else />
        </template>
    </view>
</template>
