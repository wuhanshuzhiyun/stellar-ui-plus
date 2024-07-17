<script setup lang="ts">
import { computed, defineProps } from 'vue';
import utils from '../../utils/utils';

const props = defineProps({
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 150,
  },
});

const cmpRootStyle = computed(() => ({
  width: utils.formatPx(props.width),
  height: utils.formatPx(props.height),
}));
</script>

<template>
  <canvas :style="cmpRootStyle" />
</template>

<style scoped lang="scss">
.ste-signature {
}
</style>
