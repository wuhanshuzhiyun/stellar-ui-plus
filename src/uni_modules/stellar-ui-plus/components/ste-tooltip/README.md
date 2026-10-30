# Tooltip 文字提示

用于在目标元素旁弹出气泡文字提示，常用于长文本展开说明、帮助提示或图标释义等交互场景。

## 核心设计与说明

`ste-tooltip` 采用全局事件总线与动态定位机制设计：
1. **全局/局部挂载**：只需在页面模板中放置一个 `<ste-tooltip />` 挂载节点；
2. **组合式函数驱动**：通过 `useTooltip()` 导出的 `showTooltip` 与 `hideTooltip` 便捷调用，无需深度嵌套 DOM；
3. **Ref 实例驱动**：亦可通过为 `<ste-tooltip ref="tooltipRef" />` 绑定组件实例直接调用；
4. **智能边界吸附**：自动计算触发元素中心点及屏幕左右边距（预留 10px 防溢出边距），自适应调整气泡与小三角指示箭头的位置。

---$

## 代码演示

### 基础用法
```html
<template>
    <view class="demo-container">
        <ste-tooltip></ste-tooltip>
        <ste-button class="target-btn" @click="handleShowTooltip">
            点击弹出文字提示
        </ste-button>
    </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, type ComponentPublicInstance } from 'vue';
import { useTooltip } from 'stellar-ui-plus/composables';

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const { showTooltip } = useTooltip();

function handleShowTooltip() {
    showTooltip({
        text: '这是一条气泡提示文字，用于详细补充说明内容。',
        selector: '.target-btn',
        instance: instance,
        placement: 'top',
        maxWidth: '60vw',
    });
}
</script>
```

---$

<!-- props -->

---$

{{author}}
