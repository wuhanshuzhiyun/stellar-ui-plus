<script setup lang="ts">
// #ifdef H5
import { provide } from 'vue';
import H5 from './components/H5.vue';
import Left from './components/Left.vue';
import Right from './components/Right.vue';
import useMarkdown from './composables/useMarkdown';

const datas = useMarkdown();

provide('datas', datas);
// #endif

// #ifndef H5
onLoad(() => {
  uni.redirectTo({ url: '/pages/mp/index' });
});
// #endif
</script>

<template>
  <!-- #ifdef H5 -->
  <div class="pc-page-body">
    <div class="content">
      <div class="left">
        <Left />
      </div>
      <div class="right">
        <Right />
        <div class="h5">
          <H5 />
        </div>
      </div>
    </div>
  </div>
  <!-- #endif -->
</template>

<style scoped lang="scss">
.pc-page-body {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: relative;

  .content {
    display: flex;
    height: 100%;

    .left {
      width: 240px;
      height: 100%;
      background-color: #f5f5f5;
    }

    .right {
      width: calc(100% - 240px);
      height: 100%;
      background-color: #fff;
      padding-right: 400px;
      overflow-y: auto;
    }
  }
}
@media screen and (max-width: 1280px) {
  .pc-page-body .content .right {
    padding-right: 0;
    .h5 {
      display: none;
    }
  }
}
</style>
