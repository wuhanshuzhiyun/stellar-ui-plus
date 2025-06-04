# Calendar 日历

此组件用于单个选择日期，范围选择日期等

---$

### 基础用法

- 属性`height`用于设置日历的高度，单位为`rpx`，默认`100%`
- 属性`showTitle`用于设置是否显示日历的标题，默认`true`
- 属性`title`用户设置日历的标题，默认`日期选择`
- 事件`confirm`用于监听用户点击确定按钮事件，参数为选中的日期数组

```html
<script setup lang="ts">
    const handleConfirm = (v: (string | number)[]) => {
        toast.showToast({
            title: '确定选择：' + v.join(' '),
            icon: 'none',
            duration: 1500,
        });
    };
</script>
<template>
    <ste-calendar height="720" :showTitle="false" @confirm="handleConfirm" />
</template>
```

---$

### API

<!-- props -->

---$
{{xuyajun}}
