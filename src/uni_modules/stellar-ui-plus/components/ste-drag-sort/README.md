# Drag Sort 拖拽排序

用于列表、宫格等场景的拖拽排序组件。

---$

## 代码演示

## 基础用法

- 通过 `v-model` 传入待排序列表
- 通过具名插槽 `item` 自定义每一项的展示内容

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const basicList = ref([{ text: '商品 A' }, { text: '商品 B' }, { text: '商品 C' }]);
</script>

<template>
    <ste-drag-sort v-model="basicList">
        <template #item="{ item, index }">
            <view class="demo-card-item">{{ index + 1 }}. {{ item.text }}</view>
        </template>
    </ste-drag-sort>
</template>

<style scoped>
    .demo-card-item {
        padding: 24rpx;
        margin-bottom: 16rpx;
        border-radius: 16rpx;
        background: #f5f7fa;
    }
</style>
```

## 网格排序

- `columns` 大于 `1` 时会按网格布局排序
- 网格类纯拖拽场景可按需要设置 `:longPress="false"`

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const gridList = ref([{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }, { text: '6' }]);
</script>

<template>
    <ste-drag-sort v-model="gridList" :columns="3" :longPress="false">
        <template #item="{ item }">
            <view class="grid-item">{{ item.text }}</view>
        </template>
    </ste-drag-sort>
</template>

<style scoped>
    .grid-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120rpx;
        margin: 12rpx;
        border-radius: 16rpx;
        background: #eef3ff;
    }
</style>
```

## 禁用单项拖拽

- 列表项数据中可直接写 `disabled: true`
- 被禁用项会保留展示，但不能被拖拽

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const disabledList = ref([{ text: '固定在这里', disabled: true }, { text: '可拖拽 1' }, { text: '可拖拽 2' }]);
</script>

<template>
    <ste-drag-sort v-model="disabledList">
        <template #item="{ item }">
            <view class="demo-card-item" :style="{ opacity: item.disabled ? 0.5 : 1 }">{{ item.text }}</view>
        </template>
    </ste-drag-sort>
</template>
```

## longPress 说明

- `longPress=true`：长按后再开始拖拽，适合纵向列表、可滚动页面、移动端场景，可减少误触和页面滚动冲突
- `longPress=false`：按下后立即开始拖拽，适合网格、纯排序面板、桌面端操作更直接的场景
- 默认值为 `true`，因为列表排序通常更需要兼顾滚动和点击体验

```html
<ste-drag-sort v-model="list" :longPress="true" />
<ste-drag-sort v-model="list" :longPress="false" />
```

---$

<!-- props -->

## 使用建议

- 列表项高度尽量保持一致，否则排序位移动画可能出现偏差
- `columns > 1` 时建议每个子项都设置稳定的视觉尺寸，避免网格测量不准
- 列表排序、可滚动页面、移动端场景优先使用 `longPress`
- 网格纯拖拽、桌面端快速操作场景可显式设置 `:longPress="false"`

---$
{{fuyuwei}}
