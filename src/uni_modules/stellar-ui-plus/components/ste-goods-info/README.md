# GoodsInfo 商品信息

商品信息组件用于展示商品信息

---$

### 基础用法

- 属性`data`用于接收商品数据

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const data = ref({
        image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
        title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        tag: '新品',
        code: '123456',
        barCode: '1234567890123',
        price: '88800',
        originalPrice: '99900',
    });
</script>
<template>
    <ste-goods-info :data="data" />
</template>
```

### 显示选择框

- 属性`checkbox`用于展示选择框位置
    - 默认值`none`，可选值`left`、`right`、`none`
- 属性`checked`用于展示选择框是否选中状态
    - 该属性可用`v-model:checked`双向绑定
- 事件`change`用于监听数据变化
    - 第一个参数为变化的数据
    - 第二个参数为当前商品数据

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const data = ref({
        image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
        title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        tag: '新品',
        code: '123456',
        barCode: '1234567890123',
        price: '88800',
        originalPrice: '99900',
    });
    const checked = ref(false);
    const onChange = (c: { number?: number; checked?: boolean }, data: any) => {
        uni.showToast({
            title: `当前选中状态为：${c.checked}`,
            icon: 'none',
        });
    };
</script>
<template>
    <ste-goods-info checkbox="right" v-model:checked="checked" :data="data" @change="onChange" />
</template>
```

### 显示步进器

- 属性`stepper`用于控制是否展示进步器
- 属性`number`为步进器当前值，默认值`1`
    - 该属性可用`v-model:number`双向绑定
- 属性`precision`为步进器精度，默认值`0`
- 属性`step`为步进器步长，默认值`1`
- 属性`min`为步进器最小值，默认值`1`
- 属性`max`为步进器最大值，默认值`9999`

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const data = ref({
        image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
        title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        tag: '新品',
        code: '123456',
        barCode: '1234567890123',
        price: '88800',
        originalPrice: '99900',
    });
    const number = ref(10);
    const onChange = (c: { number?: number; checked?: boolean }, data: any) => {
        uni.showToast({
            title: `当前选中状态为：${c.checked}`,
            icon: 'none',
        });
    };
</script>
<template>
    <ste-goods-info :data="data" stepper v-model:number="number" @change="onChange" />
</template>
```

### 插槽

- 默认插槽内容为商品编码下的其他展示项

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const data = ref({
        image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
        title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        tag: '新品',
        code: '123456',
        barCode: '1234567890123',
        price: '88800',
        originalPrice: '99900',
    });
</script>
<template>
    <ste-goods-info :data="data">插槽内容</ste-goods-info>
</template>
```

### 点击事件

- 默认插槽内容为商品编码下的其他展示项

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const data = ref({
        image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
        title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        tag: '新品',
        code: '123456',
        barCode: '1234567890123',
        price: '88800',
        originalPrice: '99900',
    });
    const onClick = (type: 'image' | 'title' | 'code' | 'price' | 'originalPrice') => {
        uni.showToast({
            title: `点击了${type}`,
            icon: 'none',
        });
    };
</script>
<template>
    <ste-goods-info :data="data" @click="onClick" />
</template>
```

---$

### API

<!-- props -->

#### 组件插槽(Slots)

| 名称    | 说明                               | 支持版本 |
| ------- | ---------------------------------- | -------- |
| default | 默认插槽，在编码下方出现的其他内容 | -        |

---$
{{xuyajun}}
