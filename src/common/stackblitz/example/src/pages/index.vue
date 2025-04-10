<template>
    <view class="root-container">
        <iframe src="#/pages/demo" frameborder="0" width="100%" height="100%" />
    </view>
</template>
<style>
.root-container {
    position: fixed;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 375px;
    height: 812px;
    border: solid 1px #ccc;
}
</style>
