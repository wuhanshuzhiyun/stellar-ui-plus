<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  url: {
    type: String,
    default: "#/pages/mp/index",
  },
});
</script>

<template>
  <div class="h5-component">
    <iframe :src="props.url" frameborder="0" width="100%" height="100%" />
  </div>
</template>

<style scoped lang="scss">
.h5-component {
  position: fixed;
  width: 375px;
  height: 667px;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
