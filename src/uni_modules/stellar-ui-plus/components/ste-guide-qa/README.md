# GuideQA 引导服务区

问答组件，用于展示常见问题和答案

---$

### 代码演示

#### 简单模式

通过`mode="1"`设置为简单模式，默认显示模式

```html
<template>
    <ste-guide-qa :data="data" @click-all="handleClickAll"></ste-guide-qa>
</template>

<script setup>
    import { ref } from 'vue';

    const data = ref([
        {
            question: '如何快速上手这个组件？',
            answer: '请查看我们的快速入门指南，按照步骤操作即可。',
        },
        {
            question: '支持哪些浏览器？',
            answer: '支持 Chrome 80+、Firefox 78+、Safari 14+、Edge 88+ 等现代浏览器。',
        },
        {
            question: '如何自定义样式？',
            answer: '可以通过 CSS 变量或者传入自定义的 class 来覆盖默认样式。',
        },
        {
            question: '遇到问题如何反馈？',
            answer: '可以通过 GitHub Issues 或者官方交流群进行反馈。',
        },
    ]);

    const handleClickAll = () => {
        console.log('点击查看全部');
    };
</script>
```

#### 完整模式

通过`mode="2"`设置为完整模式，支持点击问题和答案

```html
<template>
    <ste-guide-qa :data="data" mode="2" @click-item="handleClickItem"></ste-guide-qa>
</template>

<script setup>
    import { ref } from 'vue';

    const data = ref([
        {
            question: '如何快速上手这个组件？',
            answer: '请查看我们的快速入门指南，按照步骤操作即可。',
        },
        {
            question: '支持哪些浏览器？',
            answer: '支持 Chrome 80+、Firefox 78+、Safari 14+、Edge 88+ 等现代浏览器。',
        },
    ]);

    const handleClickItem = (type, item) => {
        console.log(`点击了${type === 'q' ? '问题' : '答案'}:`, item);
    };
</script>
```

#### 自定义标题

通过`title`设置标题文本，`actionTitle`设置操作按钮文本

```html
<template>
    <ste-guide-qa :data="data" title="帮助中心" actionTitle="查看更多" @click-all="handleClickAll"></ste-guide-qa>
</template>
```

#### 是否显示数量

通过`showNum`控制是否显示数量

```html
<template>
    <ste-guide-qa :data="data" :showNum="false"></ste-guide-qa>
</template>
```

---$

### API

<!-- props -->

#### Events

| 事件名     | 说明                   | 回调参数                                | 支持版本 |
| ---------- | ---------------------- | --------------------------------------- | -------- |
| click-item | 点击问题或答案时触发   | `(type: 'q' \| 'a', item: GuideQaItem)` | -        |
| click-all  | 点击查看全部按钮时触发 | `()`                                    | -        |

#### Types

```typescript
export interface GuideQaItem {
    question: string;
    answer: string;
    [key: string]: any;
}

export type ClickType = 'q' | 'a';
```

---$
{{fuyuwei}}

{{qinpengfei}}
