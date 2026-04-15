# Drag Sort 拖拽排序

用于列表、宫格等场景的拖拽排序组件。

---$

### 代码演示

#### 基础用法

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const basicList = ref([
        { text: '商品 A' },
        { text: '商品 B' },
        { text: '商品 C' },
    ]);
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
        border-radius: 16rpx;
        background: #f5f7fa;
        margin-bottom: 16rpx;
    }
</style>
```

#### 网格排序

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const gridList = ref([
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '6' },
    ]);
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
        height: 120rpx;
        margin: 12rpx;
        border-radius: 16rpx;
        background: #eef3ff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
```

#### 禁用单项拖拽

列表项数据中可直接写 `disabled: true`，该项会保留展示，但不能被拖拽。

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const disabledList = ref([
        { text: '固定在这里', disabled: true },
        { text: '可拖拽 1' },
        { text: '可拖拽 2' },
    ]);
</script>

<template>
    <ste-drag-sort v-model="disabledList">
        <template #item="{ item }">
            <view class="demo-card-item" :style="{ opacity: item.disabled ? 0.5 : 1 }">
                {{ item.text }}
            </view>
        </template>
    </ste-drag-sort>
</template>
```

---$

### API

<!-- props -->

#### Slots

| 插槽名 | 说明       | 插槽参数                                                          | 支持版本 |
| ------ | ---------- | ----------------------------------------------------------------- | -------- |
| `item` | 单个项内容 | `{ item, index, dragging, dragIndex, insertIndex }` | -        |

#### 事件说明

- `start`：开始拖拽时触发，返回当前拖拽项索引
- `change`：排序结果变化时触发，返回最新列表
- `end`：拖拽结束时触发，返回最终落点索引

#### 使用建议

- 列表项高度尽量保持一致，否则排序位移动画会出现偏差。
- `columns > 1` 时建议每个子项都设置稳定的视觉尺寸，避免网格测量不准。
- H5 桌面端如果不需要长按再拖拽，建议显式设置 `:longPress="false"`。

---$
{{fuyuwei}}
