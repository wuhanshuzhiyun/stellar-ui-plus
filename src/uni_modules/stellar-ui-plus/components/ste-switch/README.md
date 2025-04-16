# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」

---$

### 代码演示

#### 基础用法

通过`value`属性，双向绑定，绑定开关的选中状态，`true` 表示开，`false` 表示关。

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let value = ref(false);
</script>
<template>
    <ste-switch v-model="value"></ste-switch>
</template>
```

#### 只读

通过`readonly `属性，设置只读，不可切换，样式不置灰 默认`false`。

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let value = ref(false);
</script>
<template>
    <ste-switch v-model="value" readonly></ste-switch>
</template>
```

#### 禁用

通过`disabled`属性，设置禁用，不可切换，样式置灰，默认`false`。

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let value = ref(false);
</script>
<template>
    <ste-switch v-model="value" disabled></ste-switch>
</template>
```

#### 自定义大小

通过 `size` 属性自定义开关的大小，默认`52`。

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let value = ref(false);
</script>
<template>
    <ste-switch v-model="value" size="100"></ste-switch>
</template>
```

#### 自定义颜色

通过 `activeColor` 属性自定义开关的激活颜色，默认`#0090FF`。
通过 `inactiveColor` 属性自定义开关的激活颜色，默认`#bbbbbb`。

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let value = ref(false);
</script>
<template>
    <ste-switch v-model="value" activeColor="#13CE66" inactiveColor="#FF4949"></ste-switch>
</template>
```

#### 加载状态

通过 `loading` 属性设置开关为加载状态，加载状态下开关不可点击，默认`false`。

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let value1 = ref(false);
    let value2 = ref(true);
</script>
<template>
    <ste-switch v-model="value1" loading></ste-switch>
    <ste-switch v-model="value2" loading></ste-switch>
</template>
```

---$

### API

<!-- props -->

---$
{{qinpengfei}}
