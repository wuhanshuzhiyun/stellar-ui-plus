<script setup lang="ts">
import type { CommentType } from '@/uni_modules/stellar-ui-plus/components/ste-comment/props';
import { ref } from 'vue';

const comments = ref<CommentType[]>([
    {
        evaluateText: '牛肉很新鲜，价格便宜，质量不错，推荐',
        imgList: [
            'https://image.whzb.com/chain/StellarUI/image/comment_1.png',
            'https://image.whzb.com/chain/StellarUI/image/comment_4.png',
            'https://image.whzb.com/chain/StellarUI/image/comment_3.png',
            'https://image.whzb.com/chain/StellarUI/image/comment_2.png',
        ],
        type: 1,
        date: '2024.10.05',
        userName: '匿名用户',
        userAvatar: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
    },
]);

const tags = ref(['牛肉很新鲜 22', '牛肉不错 13', '牛肉品质高 6']);
</script>
<template>
    <page-layout title="用户评论" contentStyle="padding: 20rpx;background-color: #f5f5f5;">
        <ste-comment :comments="comments" :tags="tags" :total="0"></ste-comment>
    </page-layout>
</template>
<style scoped lang="scss">
.content {
    padding: 0;

    .description {
        padding: 0 30rpx;
    }

    .type-block {
        margin: 30rpx 0;
    }

    .demo-item {
        .title {
            padding: 0 30rpx;
        }

        .item-content {
            padding: 0 30rpx;

            .demo-code {
                // display: inline-block;
                margin: 0 12rpx 12rpx 0;
            }
        }

        :deep(.test-signs) {
            color: #fff;
            background-color: #000;
        }
    }
}
</style>
