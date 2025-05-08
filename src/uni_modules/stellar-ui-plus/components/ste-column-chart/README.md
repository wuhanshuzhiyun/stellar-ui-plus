# ColumnChart 柱状图

柱状图（或称条形图）是一种通过柱形的长度来表现数据大小的一种常用图表类型
---$

### 代码演示

#### 默认配置

```html
<template>
    <ste-column-chart :series="series" :categories="categories"></ste-column-chart>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    let series: any = ref([]);
    let categories: any = ref([]);

    series1.value = [
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
    <ste-column-chart :series="series" :categories="categories" :dataLabel="false" :extra="{ column: { width: 20 } }" :legend="{ show: true }"></ste-column-chart>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    let series: any = ref([]);
    let categories: any = ref([]);

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

#### 堆叠

```html
<template>
    <view class="item-block">
        <ste-column-chart :series="series" :categories="categories" :dataLabel="false" :extra="{ column: { type: 'stack' } }"></ste-column-chart>
    </view>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    let series: any = ref([]);
    let categories: any = ref([]);

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
    <ste-column-chart
        :series="series1"
        :categories="categories"
        :dataLabel="false"
        :xAxis="{ disabled: true, disableGrid: true, axisLine: false }"
        :yAxis="{ disabled: true, disableGrid: true }"
        :extra="{ column: { width: 20 } }"
        width="500"
    ></ste-column-chart>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    let series: any = ref([]);
    let categories: any = ref([]);

    series1.value = [
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
