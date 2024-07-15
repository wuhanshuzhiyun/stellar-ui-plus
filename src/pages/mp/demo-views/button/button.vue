<template>
  <view class="page">
    <page-nav title="按钮" />
    <view class="content">
      <view class="demo-item">
        <view class="title">基础使用</view>
        <view class="item-block">基础使用</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  .content {
    .demo-item {
      .item-block {
        > view {
          margin: 0 8px 8px 0;
        }
      }
    }
  }
}
</style>
