# BarChart 条状图

一种通过不同长度的条形展示分类数据大小的统计图表，适用于直观比较各类别间的数值差异。

---$

### 代码演示

#### 基础用法

- 属性`series`: 接收图表数据
- 属性`categories`: 接收图表数据集
- 属性`width`：设置图表宽度
- 属性`height`：设置图表高度

```html
<template>
    <ste-bar-chart :series="series1" :categories="['2018', '2019', '2020']" width="660" height="400"></ste-bar-chart>
</template>
<script setup lang="ts">
    import type { ChartsSerie } from 'stellar-ui-plus/Charts/types';
    import { ref } from 'vue';
    let series1 = ref<ChartsSerie<'bar'>[]>([
        {
            name: '测试1',
            data: [35, 36, 31],
        },
        {
            name: '测试2',
            data: [20, 16, 31],
        },
    ]);
</script>
```

#### 堆叠图

- 可以通过属性`extra` 额外配置进行设置

```html
<template>
    <ste-bar-chart :series="series1" :categories="['2018', '2019', '2020']" width="660" height="400" :extra="extra"></ste-bar-chart>
</template>
<script setup lang="ts">
    import type { ChartsExtra } from 'stellar-ui-plus/Charts/extra';
    import type { ChartsSerie } from 'stellar-ui-plus/Charts/types';
    import { ref } from 'vue';
    let series1 = ref<ChartsSerie<'bar'>[]>([
        {
            name: '测试1',
            data: [35, 36, 31],
        },
        {
            name: '测试2',
            data: [20, 16, 31],
        },
    ]);
    const extra: ChartsExtra = {
        bar: {
            type: 'stack',
            width: 30,
            meterBorde: 1,
            meterFillColor: '#FFFFFF',
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
            categoryGap: 2,
        },
    };
</script>
```

---$

### API

<!-- props -->

---$
{{xuyajun}}
