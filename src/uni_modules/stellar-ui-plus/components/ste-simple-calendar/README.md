# SimpleCalendar 简单日历

轻量级日期展示组件，由日期、星期和年月三部分组成。点击组件后可弹出日历进行日期选择。

---$

### 代码演示

#### 基础使用

默认展示当前日期，点击组件后会弹出日历进行选择。

```html
<template>
    <ste-simple-calendar />
</template>
```

#### 指定日期

通过`date`属性设置展示日期，支持时间戳、日期字符串和`Date`对象。

```html
<template>
    <ste-simple-calendar date="2026-02-24" />
</template>
```

#### 禁用日历弹窗

- 通过`showCalendar`属性可以关闭内置日历弹窗
- 关闭后可结合`click`事件自行处理点击逻辑

```html
<script setup lang="ts">
    const handleClick = (dateInfo: any) => {
        console.log('点击日期:', dateInfo);
    };
</script>

<template>
    <ste-simple-calendar :showCalendar="false" @click="handleClick" />
</template>
```

#### 自定义年月格式

通过`formatter`属性设置年月展示格式，格式规则与`dayjs`一致。

```html
<template>
    <ste-simple-calendar formatter="YYYY/MM" />
</template>
```

#### 自定义星期文案

通过`weekTexts`属性设置星期显示内容。

```html
<template>
    <ste-simple-calendar :weekTexts="['日', '一', '二', '三', '四', '五', '六']" />
</template>
```

#### 自定义颜色

通过`color`属性统一设置日期、星期和年月文字颜色。

```html
<template>
    <ste-simple-calendar color="#0090FF" />
</template>
```

#### 调用实例方法

通过`ref`可以调用组件暴露的方法，例如重置为今天。

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const calendarRef = ref();

    const setToday = () => {
        calendarRef.value?.today();
    };
</script>

<template>
    <ste-button @click="setToday">回到今天</ste-button>
    <ste-simple-calendar ref="calendarRef" date="2026-02-24" />
</template>
```

---$

### API

<!-- props -->

#### Methods

| 方法名        | 说明             | 方法参数                   | 支持版本 |
| ------------- | ---------------- | -------------------------- | -------- |
| `setDate`     | 设置当前展示日期 | `string \| number \| Date` | -        |
| `getDateInfo` | 获取当前日期信息 | -                          | -        |
| `today`       | 重置为今天       | -                          | -        |

---$
{{fuyuwei}}
