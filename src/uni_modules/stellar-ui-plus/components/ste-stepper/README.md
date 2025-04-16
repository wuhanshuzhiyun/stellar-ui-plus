# Stepper 步进器

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字

---$

### 代码演示

#### 基础用法

通过`value`属性，双向绑定，设置输入值

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(10);
</script>
<template>
    <ste-stepper v-model="value"></ste-stepper>
</template>
```

#### 限制输入范围

通过 `min` 和 `max` 属性限制输入值的范围，默认超出范围后会自动校正最大值(默认值：`Infinity`)或最小值(默认值：`0`)

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(7);
</script>
<template>
    <ste-stepper v-model="value" :min="5" :max="15"></ste-stepper>
</template>
```

#### 步长设置

通过 `step` 属性设置每次点击增加或减少按钮时变化的值，默认为 1。

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(2);
</script>
<template>
    <ste-stepper v-model="value" :step="2"></ste-stepper>
</template>
```

#### 数值精度

通过 `precision` 属性设置输入值的小数位，默认为 1。

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(5.8);
</script>
<template>
    <ste-stepper v-model="value" :precision="1"></ste-stepper>
</template>
```

#### 自定义大小

通过 `inputWidth` 属性设置输入框宽度，通过 `buttonSize` 属性设置按钮大小和输入框高度。

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(5);
</script>
<template>
    <ste-stepper v-model="value" inputWidth="100" btnSize="70"></ste-stepper>
</template>
```

#### 主色

通过 `mainColor` 属性设置步进器的主色，对`theme`为`line`时无效。

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(5);
</script>
<template>
    <ste-stepper v-model="value" inputWidth="100" btnSize="70"></ste-stepper>
</template>
```

#### 禁用

- 通过 `disabled` 属性设置禁用步进器，默认为 `false`。
- 通过 `disablePlus` 属性设置禁用增加按钮，默认为 `false`。
- 通过 `disableMinus` 属性设置禁用减少按钮，默认为 `false`。
- 通过 `disableInput` 属性设置禁用输入框，默认为 `false`。

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value1 = ref(7);
    const value2 = ref(8);
    const value3 = ref(9);
    const value4 = ref(10);
</script>
<template>
    <ste-stepper v-model="value1" disabled></ste-stepper>
    <ste-stepper v-model="value2" disablePlus></ste-stepper>
    <ste-stepper v-model="value3" disableInput></ste-stepper>
    <ste-stepper v-model="value4" disableMinus></ste-stepper>
</template>
```

#### 样式风格：线性风格

通过 `theme` 属性设置步进器的样式风格，设置为线性 `line`，默认为 `card`。

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const value1 = ref(11);
    const value2 = ref(12);
    const value3 = ref(13);
    const value4 = ref(14);
    const value5 = ref(15);
</script>
<template>
    <ste-stepper v-model="value1" theme="line"></ste-stepper>
    <ste-stepper v-model="value2" theme="line" disabled></ste-stepper>
    <ste-stepper v-model="value3" theme="line" disablePlus></ste-stepper>
    <ste-stepper v-model="value4" theme="line" disableInput></ste-stepper>
    <ste-stepper v-model="value5" theme="line" disableMinus></ste-stepper>
</template>
```

---$

### API

#### 组件属性(Props)

<!-- props -->

---$
{{qinpengfei}}
