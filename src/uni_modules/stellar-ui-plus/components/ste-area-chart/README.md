# AreaChart 面积图

面积图积图将折线到坐标轴的空间设置背景色，用区域面积表达数据。相比普通的折线图，面积图的视觉效果更加饱满丰富，在系列不多的场景下尤其适用。

---$

### 代码演示

#### 默认配置

```html
<template>
    <ste-ring-chart :series="series1" :color="['#165DFF', '#DDDDDD']"></ste-ring-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series1: any = ref([]);
    let categories1: any = ref([]);
    series1.value = [
        {
            name: '成交量A',
            data: [35, 8, 25, 37, 4, 20],
        },
        {
            name: '成交量B',
            data: [70, 40, 65, 100, 44, 68],
        },
    ];
    categories1.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
</script>
```

#### 默认颜色

- 属性`color`: `['#165DFF', '#14C9C9', '#F7BA1E', '#3491FA', '#F53F3F']`

```html
<template>
    <ste-area-chart :series="series2" :categories1="categories1"></ste-area-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series2: any = ref([]);
    let categories1: any = ref([]);
    series2.value = [
        {
            name: '成交量A',
            data: [35, 8, 25, 37, 4, 20],
        },
        {
            name: '成交量B',
            data: [40, 35, 12, 44, 89, 14],
        },
        {
            name: '成交量C',
            data: [45, 27, 32, 100, 65, 20],
        },
        {
            name: '成交量D',
            data: [50, 25, 65, 100, 44, 68],
        },
        {
            name: '成交量B',
            data: [70, 35, 45, 89, 26, 54],
        },
    ];
    categories1.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
</script>
```

#### 区域图类型

- 属性`type`: 区域图类型
    - `straight`: 尖角折线模式(默认)
    - `curve` : 曲线圆滑模式
    - `step` : 时序图模式

```html
<template>
    <ste-area-chart :series="series1" :categories1="categories1"></ste-area-chart>
    <ste-area-chart :series="series1" :categories1="categories1" :extra="{ area: { type: 'curve' } }"></ste-area-chart>
    <ste-area-chart :series="series1" :categories1="categories1" :extra="{ area: { type: 'step' } }"></ste-area-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series1: any = ref([]);
    let categories1: any = ref([]);
    series1.value = [
        {
            name: '成交量A',
            data: [35, 8, 25, 37, 4, 20],
        },
        {
            name: '成交量B',
            data: [70, 40, 65, 100, 44, 68],
        },
    ];
    categories1.value = ['2018', '2019', '2020', '2021', '2022', '2023'];
</script>
```

---$

<!-- props -->

---$
{{qinpengfei}}
