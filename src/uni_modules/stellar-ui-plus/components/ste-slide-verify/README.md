# Slide Verify 滑动验证

通过拖动滑块完成验证，支持普通滑动验证和图片旋转验证两种模式。

---$

## 代码演示

## 基础用法

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const value1 = ref(false);
</script>

<template>
    <ste-slide-verify v-model="value1"></ste-slide-verify>
</template>
```

## 没有错误提示

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const value3 = ref(false);
</script>

<template>
    <ste-slide-verify v-model="value3" text="向右滑动验证" :showFail="false"></ste-slide-verify>
</template>
```

## 转动图片

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const value2 = ref(false);
</script>

<template>
    <ste-slide-verify v-model="value2" mode="image" imageUrl="https://image.whzb.com/chain/StellarUI/mp-logo.png" successText="图片校验通过"></ste-slide-verify>
</template>
```

## 禁用状态

```html
<template>
    <ste-slide-verify disabled text="当前不可操作"></ste-slide-verify>
</template>
```

## 失败态停留更久

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const value5 = ref(false);
</script>

<template>
    <ste-slide-verify v-model="value5" failText="请慢一点再试" :failDuration="1800"></ste-slide-verify>
</template>
```

## 尺寸、颜色与文案

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const value6 = ref(false);
</script>

<template>
    <ste-slide-verify
        v-model="value6"
        size="52"
        imageSize="180"
        text="拖动完成领取"
        successText="领取成功"
        failText="再试一次"
        activeColor="linear-gradient(90deg, #ff7a18, #ffb800)"
        successColor="#1f9d55"
        failColor="#d93025"
    ></ste-slide-verify>
</template>
```

---$

<!-- props -->

`detail` 数据结构：

```ts
{
    mode: 'slide' | 'image';
    progress: number;
    angle: number;
    left: number;
    maxLeft: number;
}
```

---$
{{fuyuwei}}
