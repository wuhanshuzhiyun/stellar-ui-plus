# FunctionList 功能列表

此组件用于展示功能功能列表

---$

### 基础用法(一条数据)

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

### 基础用法(空数据)

- 属性`empty-button-text`用于设置空数据按钮的文字
- 属性`empty-image`用于设置空数据展示图片
- 属性`empty-text`用于设置空数据展示文字

```html
<template>
    <ste-function-list title="今日餐食" subhead="食刻准备 到点开吃" empty-button-text="去订餐" empty-image="https://image.whzb.com/chain/StellarUI/bg1.jpg" empty-text="暂未订餐，先去看看吧~" />
</template>
```

### 数据按钮自定义

- 属性`empty-button-text`用于设置空数据按钮的文字
- 属性`empty-image`用于设置空数据展示图片
- 属性`empty-text`用于设置空数据展示文字

```html
<script setup lang="ts">
    import type { FunctionListItem } from 'stellar-ui-plus/components/ste-function-list/props';
    import { ref } from 'vue';

    const data = ref<FunctionListItem[]>([
        {
            title: '早餐   梅姨家常菜',
            subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋',
            statusText: '当前不可取消',
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            buttonText: '自定义',
        },
        { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
        { title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' },
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

#### 组件插槽(Slots)

| 名称         | 说明                                                    | 支持版本 |
| ------------ | ------------------------------------------------------- | -------- |
| subhead      | 组件头部副标题插槽（若副标题有表情/图片等，请使用插槽） | -        |
| header-right | 组件头部右侧插槽（替换右侧`更多`）                      | -        |

---$
{{xuyajun}}
