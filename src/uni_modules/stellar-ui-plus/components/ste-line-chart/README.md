# LineChart 折线图

折线图主要用来展示数据项随着时间推移的趋势或变化
---$

### 代码演示

#### 默认配置

```html
<template>
    <ste-line-chart :series="series" :categories="categories"></ste-line-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const series: any = ref([]);
    const categories: any = ref([]);

    series.value = [
        {
            name: '目标值',
            data: [35, 36, 31, 33, 13, 34],
        },
    ];
    categories.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
</script>
```

#### 多图例

```html
<template>
    <ste-line-chart :series="series" :categories="categories" :dataLabel="true" :legend="{ show: true }"></ste-line-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const series: any = ref([]);
    const categories: any = ref([]);

    series.value = [
        {
            name: '目标值',
            data: [35, 36, 31, 33, 13, 34],
        },
        {
            name: '完成量',
            data: [18, 27, 21, 24, 6, 28],
        },
    ];
    categories.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
</script>
```

#### 曲线

```html
<template>
    <ste-line-chart :series="series" :categories="categories" :dataLabel="false" :extra="{ line: { type: 'curve' } }"></ste-line-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const series: any = ref([]);
    const categories: any = ref([]);

    series.value = [
        {
            name: '目标值',
            data: [35, 36, 31, 33, 13, 34],
        },
        {
            name: '完成量',
            data: [18, 27, 21, 24, 6, 28],
        },
    ];
    categories.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
</script>
```

#### 迷你图表

```html
<template>
    <ste-line-chart
        :series="series"
        :categories="categories"
        :dataLabel="false"
        :xAxis="{ disabled: true, disableGrid: true, axisLine: false }"
        :yAxis="{ disabled: true, disableGrid: true }"
        width="300"
    ></ste-line-chart>
    <ste-line-chart
        :series="series"
        :categories="categories"
        :dataLabel="false"
        :xAxis="{ disabled: true, disableGrid: true, axisLine: false }"
        :yAxis="{ disabled: true, disableGrid: true }"
        :extra="{ line: { type: 'curve' } }"
        width="300"
    ></ste-line-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const series: any = ref([]);
    const categories: any = ref([]);

    series.value = [
        {
            name: '目标值',
            data: [35, 36, 31, 33, 13, 34],
        },
    ];
    categories.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
</script>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
