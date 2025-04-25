<template>
    <view class="charts-box">
        <qiun-wx-ucharts type="column" :opts="opts" :chartData="chartData"></qiun-wx-ucharts>
    </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.charts-box {
    width: 100%;
    height: 300px;
}
</style>
