# OrderCard 订单卡片

此组件用于展示订单卡片

---$

### 基础用法(一条数据)

- 属性`title`用于设置组件标题
- 属性`image`用于设置标题图片
- 属性`data`用于设置组件数据
- 属性`statusText`用于设置状态文本内容
- 属性`tagText`用于设置标签文本内容
- 属性`helperText`用于设置标签辅助信息文本内容
- 属性`mainBtnText`用于设置主要按钮文本内容
- 属性`subBtnText`用于设置次要按钮文本内容

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
    ]);
</script>
<template>
    <ste-order-card
        title="梅姨家常菜馆"
        image="https://image.whzb.com/chain/StellarUI/bg1.jpg"
        :data="data"
        statusText="待核销"
        tagText="标签"
        helperText="辅助信息：XXXX-XX-XX"
        mainBtnText="主要功能"
        subBtnText="次要功能"
    />
</template>
```

### 显示详情(一条数据)

- 属性`show-detail`用于设置商品信息下是否显示详情字样(多条数据无效)

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
    ]);
</script>
<template>
    <ste-order-card
        title="梅姨家常菜馆"
        image="https://image.whzb.com/chain/StellarUI/bg1.jpg"
        :data="data"
        statusText="待核销"
        tagText="标签"
        helperText="辅助信息：XXXX-XX-XX"
        mainBtnText="主要功能"
        subBtnText="次要功能"
        show-detail
    />
</template>
```

### 基础用法(多条数据)

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
    ]);
</script>
<template>
    <ste-order-card
        title="梅姨家常菜馆"
        image="https://image.whzb.com/chain/StellarUI/bg1.jpg"
        :data="data"
        statusText="待核销"
        tagText="标签"
        helperText="辅助信息：XXXX-XX-XX"
        mainBtnText="主要功能"
        subBtnText="次要功能"
        show-detail
    />
</template>
```

### 显示更多

- 属性`show-more`设置下方按钮左侧是否显示更多字样

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
        {
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            title: '梅姨家常菜馆',
            subTitle: '商品描述',
        },
    ]);
</script>
<template>
    <ste-order-card
        title="梅姨家常菜馆"
        image="https://image.whzb.com/chain/StellarUI/bg1.jpg"
        :data="data"
        statusText="待核销"
        tagText="标签"
        helperText="辅助信息：XXXX-XX-XX"
        mainBtnText="主要功能"
        subBtnText="次要功能"
        show-more
    />
</template>
```

---$

### API

<!-- props -->

---$
{{xuyajun}}
