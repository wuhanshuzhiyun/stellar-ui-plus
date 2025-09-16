# Comment 评论组件

用于在商品详情页面展示评论信息

---$

### 基础用法

- 属性`tags`用于接收顶部标签列表，默认值`[]`
- 属性`total`用于接收评论总数，默认值`0`
- 属性`comments`用于接收评论列表，默认值`[]`

```html
<script setup lang="ts">
    import type { CommentType } from '@/uni_modules/stellar-ui-plus/components/ste-comment/props';
    import { ref } from 'vue';

    const comments = ref<CommentType[]>([
        {
            evaluateText: '牛肉很新鲜，价格便宜，质量不错，推荐',
            imgList: [
                'https://image.whzb.com/chain/StellarUI/image/comment_1.png',
                'https://image.whzb.com/chain/StellarUI/image/comment_2.png',
                'https://image.whzb.com/chain/StellarUI/image/comment_3.png',
                'https://image.whzb.com/chain/StellarUI/image/comment_4.png',
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
```

---$

### API

<!-- props -->

#### CommentType

| 属性         | 说明         | 类型       |
| ------------ | ------------ | ---------- |
| evaluateText | 评价内容     | `string`   |
| date         | 日期         | `string`   |
| imgList      | 评价图片列表 | `string[]` |
| type         | 1好评 2差评  | `1 / 2`    |
| userName     | 用户名       | `string`   |
| userAvatar   | 用户头像     | `string`   |

---$
{{xuyajun}}
