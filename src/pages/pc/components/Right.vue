<script setup lang="ts">
import { inject } from "vue";
import type { MarkdownData } from "../types";

const datas = inject<MarkdownData>("datas");
console.log("right-datas", datas);
</script>

<template>
  <div class="right-component">
    <div v-html="datas?.viewMarkdown.value" />
  </div>
</template>

<style scoped lang="scss">
.right-component {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}
</style>
