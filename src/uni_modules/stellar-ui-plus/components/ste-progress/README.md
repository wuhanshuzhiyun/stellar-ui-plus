# Progress 进度条

用于展示操作进度，告知用户当前状态和预期

---$

### 代码演示

#### 背景色

- 背景色支持纯色、渐变色、图片
- 支持设置激活部分的背景(`activeBg`)和未激活部分(`inactiveBg`)的背景

```html
<template>
    <ste-progress :percentage="40"></ste-progress>
    <ste-progress :percentage="45" activeBg="https://image.whzb.com/chain/StellarUI/image/p-red.png" inactiveBg="#CCCCCC"></ste-progress>
    <ste-progress :percentage="50" activeBg="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></ste-progress>
</template>
```

#### 线条粗细

- 通过`strokeWidth`设置线条的粗细

```html
<template>
    <ste-progress :percentage="40" strokeWidth="20"></ste-progress>
    <ste-progress :percentage="45" strokeWidth="36"></ste-progress>
</template>
```

#### 禁用

```html
<template>
    <ste-progress :percentage="40" disabled></ste-progress>
</template>
```

#### 长度

- 通过`width`设置进度条长度
- 默认是`100%`，跟随父容器的宽度

```html
<template>
    <ste-progress :percentage="40" width="80%"></ste-progress>
    <ste-progress :percentage="45" width="200"></ste-progress>
</template>
```

#### 动画时间

```html
<template>
    <ste-progress :percentage="p" duration="0.5"></ste-progress>
</template>
```

#### 自定义文字内容

- 通过`pivotText`属性来自定义进度条内文字显示的内容
- 通过`textColor`属性来自定义进度条内文字的颜色
- 通过`textAlign`属性来自定义进度条内文字的对齐方式
- 通过`textSize`属性来自定义进度条内文字的大小

```html
<template>
    <ste-progress :percentage="30" pivotText="已抢30%"></ste-progress>
    <ste-progress :percentage="40" pivotText="已抢40%" textColor="#FF1E19"></ste-progress>
    <ste-progress :percentage="45" pivotText="已抢45%" textAlign="left"></ste-progress>
    <ste-progress :percentage="50" pivotText="已抢50%" textSize="20"></ste-progress>
</template>
```

#### 文本显示阈值

- 当进度条百分比(`percentage`)小于阈值时(`displayTextThreshold`)，进度条的内容将不会显示
- 默认阈值是`0`，此时内容将始终显示

```html
<template>
    <ste-progress :percentage="14" :displayTextThreshold="15"></ste-progress>
    <ste-progress :percentage="35" :displayTextThreshold="15"></ste-progress>
</template>
```

#### 阶段配置

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const stageData = ref({
        20: { label: '完成进度20%', style: { background: '#F53F3F' } },
        50: { label: '完成进度50%', style: { background: '#FFC53D' } },
        100: { label: '当月销售计划20,80万', style: { background: '#077EDB', textAlign: 'right' } },
    });
</script>
<template>
    <ste-progress :percentage="10" strokeWidth="36" :stageData="stageData"></ste-progress>
</template>
```

---$

### API

<!-- props -->

#### Slots

| 插槽名    | 说明       | 插槽参数 | 支持版本 |
| --------- | ---------- | -------- | -------- |
| `default` | 进度条内容 | -        | -        |

---$
{{fuyuwei}}
