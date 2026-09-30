# ArcbarChart 圆弧进度图

用圆弧长度表示进度，支持半圆弧、整圆及多条圆弧同心嵌套，点击可识别命中的圆弧并高亮。

---$

## 代码演示

## 默认配置

- `series` 中 `data` 取值 `0~1`，多条数据时由外向内同心排列

```html
<template>
    <ste-arcbar-chart :series="series1" :subtitle="{ name: '80%' }"></ste-arcbar-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series1: any = ref([]);
    series1.value = [{ name: '完成率', color: '#165DFF', data: 0.8 }];
</script>
```

## 半圆弧

- 属性`extra.arcbar.type`: `default` 半圆弧模式，`circle` 整圆模式
- 属性`extra.arcbar.startAngle` / `extra.arcbar.endAngle`: 起止角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟

```html
<template>
    <ste-arcbar-chart
        :series="series1"
        :title="{ name: '完成率' }"
        :subtitle="{ name: '80%' }"
        :extra="{ arcbar: { type: 'default', width: 12, startAngle: 0.75, endAngle: 0.25 } }"
    ></ste-arcbar-chart>
</template>
```

## 多环嵌套

- 属性`extra.arcbar.width`: 圆弧宽度，单位px
- 属性`extra.arcbar.gap`: 圆弧间距，单位px

```html
<template>
    <ste-arcbar-chart :series="series2" :extra="{ arcbar: { width: 10, gap: 6, lineCap: 'butt', backgroundColor: '#E8F1FD' } }"></ste-arcbar-chart>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series2: any = ref([]);
    series2.value = [
        { name: '完成率', color: '#3CC08E', data: 0.72 },
        { name: '覆盖率', color: '#2D7DF6', data: 0.56 },
    ];
</script>
```

## 点击高亮

- 属性`activeIndex`: 高亮的圆弧下标，`-1` 不高亮
- 属性`inactiveOpacity`: 非激活圆弧透明度
- 事件`ring-tap`: 点击图表触发，参数为命中圆弧的 `series` 下标，未命中为 `-1`

```html
<template>
    <ste-arcbar-chart :series="series2" :activeIndex="activeIndex" @ring-tap="onRingTap"></ste-arcbar-chart>
    <view>当前高亮：{{ activeIndex === -1 ? '无' : series2[activeIndex].name }}</view>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    let series2: any = ref([
        { name: '完成率', color: '#3CC08E', data: 0.72 },
        { name: '覆盖率', color: '#2D7DF6', data: 0.56 },
    ]);
    const activeIndex = ref(-1);
    // 再次点击同一圆弧或点击空白处取消高亮
    const onRingTap = (index: number) => {
        activeIndex.value = index === activeIndex.value ? -1 : index;
    };
</script>
```

## 事件

- 属性`getImage`: 通过ref来获取实例的base64格式的图片地址，异步方法,需在实例生成后调用。

```html
<template>
    <ste-arcbar-chart :series="series1" ref="arcbarChart"></ste-arcbar-chart>
</template>
<script setup lang="ts">
    import { ref,onMounted } from 'vue';
    let arcbarChart: any = ref(null);
    onMounted(async () => {
        const base64 = await arcbarChart.value.getImage()
    }),
</script>
```

---$

<!-- props -->

---$
{{fuyuwei}}
