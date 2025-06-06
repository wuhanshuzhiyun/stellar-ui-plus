# OrderCard 订单卡片

此组件用于展示订单卡片

---$

### 基础用法

- 属性`title`用于设置组件标题
- 属性`subhead`用于设置组件副标题
- 属性`data`用于设置组件数据
- 属性`buttonText`用于设置数据项按钮文字缺省值
- 属性`buttonIcon`用于设置数据项按钮图标缺省值

```html
<script setup lang="ts">
    import type { FunctionListItem } from 'stellar-ui-plus/components/ste-function-list/props';
    import { ref } from 'vue';

    const data = ref<FunctionListItem[]>([
        { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
    ]);
</script>
<template>
    <ste-function-list title="今日餐食" subhead="食刻准备 到点开吃" :data="data" buttonText="核销" buttonIcon="&#xe693;" />
</template>
```

---$

### API

<!-- props -->

---$
{{xuyajun}}
