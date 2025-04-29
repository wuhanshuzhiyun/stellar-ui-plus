# RingChart 环形图

可以用来表示数据占总体的比例，相比于饼图，它中间空余的部分可以用来显示一些额外的文字等信息，因而也是一种常用的图表类型。

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
    series1.value = [
        {
            data: [
                { name: '成功率', value: 50 },
                { name: '失败率', value: 50 },
            ],
        },
    ];
</script>
```

#### 默认颜色

- 属性`color`: `['#165DFF', '#14C9C9', '#F7BA1E', '#3491FA', '#722ED1', '#9FDB1D']`

```html
<template>
    <ste-ring-chart :series="series2"></ste-ring-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series1: any = ref([]);
    series2.value = [
        {
            data: [
                { name: '一班', value: 50 },
                { name: '二班', value: 30 },
                { name: '三班', value: 20 },
                { name: '四班', value: 18 },
                { name: '五班', value: 8 },
                { name: '六班', value: 5 },
            ],
        },
    ];
</script>
```

#### 副标题，标题+副标题

- 属性`subtitle`: 副标题对象
- 属性`title`: 标题对象

```html
<template>
    <ste-ring-chart :series="series1" :subtitle="{name: '50%'}"></ste-ring-chart>
    <ste-ring-chart :series="series1" :title="{name: '指标名'}" :subtitle="{name: '50%'}"></ste-ring-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series1: any = ref([]);
    series1.value = [
        {
            data: [
                { name: '成功率', value: 50 },
                { name: '失败率', value: 50 },
            ],
        },
    ];
</script>
```

#### 图例

- 属性`legend`: 图例对象

```html
<template>
    <ste-ring-chart
        :series="series1"
        :title="{name: '指标名'}"
        :subtitle="{name: '50%'}"
        :legend="{show: true,position: 'bottom'}"
        :extra="{ ring: { ringWidth: 10.5, customRadius: 64, offsetAngle: -90, linearType: 'none' } }"
    ></ste-ring-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series1: any = ref([]);
    series1.value = [
        {
            data: [
                { name: '成功率', value: 50 },
                { name: '失败率', value: 50 },
            ],
        },
    ];
</script>
```

---$

<!-- props -->

---$
{{xuyajun}}
