# PieChart 条状图

主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例。

---$

### 代码演示

#### 基础用法

- 属性`series`: 接收图表数据
- 属性`width`：设置图表宽度
- 属性`height`：设置图表高度

```html
<template>
    <ste-pie-chart :series="series1" width="420" height="420" :enableScroll="false"></ste-pie-chart>
</template>
<script setup lang="ts">
    import type { ChartsSerie } from '@/uni_modules/stellar-ui-plus/Charts/types';
    import { ref, onMounted } from 'vue';
    let series1 = ref<ChartsSerie<'pie'>[]>([
        {
            name: '测试1',
            data: [
                { name: '一班', value: 50 },
                { name: '二班', value: 30 },
                { name: '三班', value: 20 },
            ],
        },
    ]);
</script>
```

#### 带分割线+渐变色

- 可以通过属性`extra` 额外配置进行设置

```html
<template>
    <ste-pie-chart :series="series2" width="420" height="420" :extra="extra"></ste-pie-chart>
</template>
<script setup lang="ts">
    import type { ChartsExtra } from '@/uni_modules/stellar-ui-plus/Charts/extra';
    import type { ChartsSerie } from '@/uni_modules/stellar-ui-plus/Charts/types';
    import { ref, onMounted } from 'vue';
    let series1 = ref<ChartsSerie<'pie'>[]>([
        {
            name: '测试1',
            data: [
                { name: '一班', value: 50 },
                { name: '二班', value: 30 },
                { name: '三班', value: 20 },
            ],
        },
    ]);
</script>
```

#### 显示Label

- 属性`dataLabel`：是否显示Label

```html
<template>
    <ste-pie-chart :series="series1" width="420" height="420" dataLabel></ste-pie-chart>
</template>
<script setup lang="ts">
    import type { ChartsSerie } from '@/uni_modules/stellar-ui-plus/Charts/types';
    import { ref, onMounted } from 'vue';
    let series1 = ref<ChartsSerie<'pie'>[]>([
        {
            name: '测试1',
            data: [
                { name: '一班', value: 50 },
                { name: '二班', value: 30 },
                { name: '三班', value: 20 },
            ],
        },
    ]);
</script>
```

---$

### API

<!-- props -->

#### 组件插槽(Slot)

| 插槽名  | 说明         | 插槽参数 | 支持版本 |
| ------- | ------------ | -------- | -------- |
| default | 弹窗标题插槽 | -        | -        |

---$
{{xuyajun}}
