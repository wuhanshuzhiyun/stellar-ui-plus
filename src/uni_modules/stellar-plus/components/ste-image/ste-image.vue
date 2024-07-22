<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ste-image',
});
</script>

<script setup lang="ts">
import { defineProps } from 'vue';
import propsData from './props';

const props = defineProps(propsData);
</script>
<template>
    <div class="ste-image-root">ste-image-root</div>
</template>
<style scoped lang="scss">
.ste-image-root {
}
</style>
