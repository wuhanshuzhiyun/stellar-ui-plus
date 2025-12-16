# CouponList 券列表

此组件用于券列表展示

---$

### 基础用法

- 属性`data`用于基础数据展示

```html
<script lang="ts" setup>
    import { ref } from 'vue';

    const data = ref({
        title: '满11-5乐事组合【外卖】',
        desc: '截至日期 2025.11.30',
        image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
        price: 500,
        constraint: '满11可用',
        footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使'],
    });
</script>
<template>
    <ste-coupon-list :data="data" />
</template>
```

### 倒计时

- 属性`endTime`用于设置倒计时结束时间

```html
<script lang="ts" setup>
    import { ref } from 'vue';

    const data = ref({
        title: '满11-5乐事组合【外卖】',
        desc: '截至日期 2025.11.30',
        image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
        price: 500,
        constraint: '满11可用',
        footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使'],
    });
    const endTime = computed(() => Date.now() + 60 * 60 * 1000 * 2);
</script>
<template>
    <ste-coupon-list :data="data" :endTime="endTime" />
</template>
```

### 按钮文字

- 属性`buttonText`用于设置按钮文字内容

```html
<script lang="ts" setup>
    import { ref } from 'vue';

    const data = ref({
        title: '满11-5乐事组合【外卖】',
        desc: '截至日期 2025.11.30',
        image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
        price: 500,
        constraint: '满11可用',
        footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使'],
    });
</script>
<template>
    <ste-coupon-list :data="data" buttonText="去使用" />
</template>
```

### 禁用按钮

- 属性`buttonDisabled`禁用按钮

```html
<script lang="ts" setup>
    import { ref } from 'vue';

    const data = ref({
        title: '满11-5乐事组合【外卖】',
        desc: '截至日期 2025.11.30',
        image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
        price: 500,
        constraint: '满11可用',
        footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使'],
    });
</script>
<template>
    <ste-coupon-list :data="data" buttonDisabled />
</template>
```

### 进度条

- 属性`progress`用于设置进度条值，0-100
- 属性`progressText`用于设置进度条文字内容

```html
<script lang="ts" setup>
    import { ref } from 'vue';

    const data = ref({
        title: '满11-5乐事组合【外卖】',
        desc: '截至日期 2025.11.30',
        image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
        price: 500,
        constraint: '满11可用',
        footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使'],
    });
</script>
<template>
    <ste-coupon-list :data="data" :progress="50" progressText="仅剩40件" />
</template>
```

### Position插槽

- 插槽`position`可以在任意位置插入内容

```html
<script lang="ts" setup>
    import { ref } from 'vue';

    const data = ref({
        title: '满11-5乐事组合【外卖】',
        desc: '截至日期 2025.11.30',
        image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
        price: 500,
        constraint: '满11可用',
        footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使'],
    });
</script>
<template>
    <ste-coupon-list :data="data">
        <template #position>
            <view class="position-slot">
                <ste-image src="https://image.whzb.com/chain/StellarUI/售罄.png" width="130" height="92" />
            </view>
        </template>
    </ste-coupon-list>
</template>
<style scoped>
    .position-slot {
        position: absolute;
        top: 6rpx;
        right: 6rpx;
    }
</style>
```

---$

### API

<!-- props -->

#### Slot

| 插槽名称   | 说明               | 支持版本 |
| ---------- | ------------------ | -------- |
| `position` | 在任意位置插入内容 | -        |

---$
{{xuyajun}}
