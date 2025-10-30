<script setup>
import { reactive } from 'vue';

const qList = reactive([
    {
        content: `1.增值税普通发票:
a. 通过App提交开具【增值税普通发票】的申请后，系统会自动开票，具体操作路径:我的订单-开发票-对应服务-选择订单-去开票。您可通过开票历史页查看电子发票，同时，发票将被推送至您开票时填写的邮箱，b.【增值税普通发票】是税务局认可的有效收付款凭证其法律效力、基本用途及使用规定同纸质普通发票，可用作单位报销使用。
2.增值税专用发票:
a.首次开具【增值税专用发票】的顾客，需要填写并保存增票资质，具体操作路径:我的订单-开发票-发票抬头管理-添加抬头-增值税专用发票。b.【增值税专用发票】抬头审核通过后，请通过App提交开具【增值税专用发票】的申请，系统会自动开票，具体操作路径:我的订单-开发票-对应服务-选择订单-去开票-增值税专用发票。您可通过开票历史页查看电子发票，同时，发票将被推送至您开票时填写的邮箱。c.【增值税专用发票】属于增值税专用发票，其法律效力、基本用途、基本使用规定等与增值税纸质专用发票相同。
d.有效【增值税专用发票】开票资质仅为一个。【增值税专用发票】开票资质提交审批后，72小时内暂不支持修改。
e.线上暂仅支持部分商城订单，充电订单，服务包订单开具【增值税专用发票】`,
        title: '如何获得发票？',
    },
    {
        title: '开具发票需要多长时间？',
        content: `发票开具需要1-2个工作日，请耐心等待, 订单完成后会通过邮件发送发票。 订单完成后会通过邮件发送发票。 订单完成后会通过邮件发送发票。 订单完成后会通过邮件发送发票。 订单完成后会通过邮件发送发票。  `,
    },
]);
</script>
<template>
    <view class="help-feedback-view">
        <ste-navbar title="常见问题" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <view class="title">FAQ常见问题与帮助</view>

            <view class="q-item" v-for="(e, i) in qList">
                <view class="q-title">{{ e.title }}</view>
                <view class="q-content">
                    <ste-text>{{ e.content }}</ste-text>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.help-feedback-view {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1;
        padding: 0 28rpx;
        overflow-y: auto;

        .title {
            font-size: 38rpx;
            font-weight: bold;
            margin-top: 64rpx;
            margin-bottom: 32rpx;
        }

        .q-item {
            margin-bottom: 28rpx;
            .q-title {
                color: #1c1f23;
                font-size: 32rpx;
                margin-bottom: 16rpx;
            }

            .q-content {
                color: #a7abb0;
                font-size: 24rpx;
            }
        }
    }
}
</style>
