<script setup lang="ts">
// #ifdef H5
import { rests } from "./markdown/index";
import Left from "./components/Left.vue";

console.log(rests);
// #endif
</script>

<template>
  <!-- #ifdef H5 -->
  <div class="pc-page-body">
    <div class="left">
      <Left />
    </div>
  </div>
  <!-- #endif -->
</template>

<style scoped lang="scss">
.pc-page-body {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  position: relative;
  .left {
    width: 240px;
    height: 100%;
    background-color: #f5f5f5;
  }
}
</style>
