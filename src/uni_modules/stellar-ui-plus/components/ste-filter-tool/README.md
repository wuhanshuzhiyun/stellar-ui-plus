# FilterTool 筛选选项

可配置多选选项组件

---$

### 基础用法

```html
<script lang="ts" setup>
    import { reactive } from 'vue';
    // 筛选选项
    const filterOptions = reactive([
        { title: '全部', value: 'all' },
        { title: '已打印', value: 'printed' },
        { title: '未打印', value: 'unprinted' },
        { title: '促销调价', value: 'promotion' },
        { title: '促销回调', value: 'callback' },
    ]);
    const subFilters = reactive([
        {
            title: '调价类型',
            children: [
                { title: '促销调价', value: 'promotion' },
                { title: '促销回调', value: 'callback' },
                { title: '促销回', value: 'callba' },
                { title: '促销回调3', value: 'callback3' },
            ],
        },
        {
            title: '打印状态',
            children: [
                { title: '已打印', value: 'printed' },
                { title: '未打印', value: 'unprinted' },
            ],
        },
    ]);
</script>
<template>
    <view style="width: 100%">
        <ste-filter-tool :filterData="filterOptions" :menu-data="subFilters" @item-click="handleFilterClick" value="all" />
    </view>
</template>
```

#### 多选

- 配置主筛选项使用`multiple` 属性
- 配置下拉筛选是否多选需要在对象中指定`multiple` 属性

```html
<script lang="ts" setup>
    import { reactive } from 'vue';
    // 筛选选项
    const filterOptions = reactive([
        { title: '全部', value: 'all' },
        { title: '已打印', value: 'printed' },
        { title: '未打印', value: 'unprinted' },
        { title: '促销调价', value: 'promotion' },
        { title: '促销回调', value: 'callback' },
    ]);
    const subFilters = reactive([
        {
            title: '调价类型',
            children: [
                { title: '促销调价', value: 'promotion' },
                { title: '促销回调', value: 'callback' },
                { title: '促销回', value: 'callba' },
                { title: '促销回调3', value: 'callback3' },
            ],
            multiple: true,
        },
        {
            title: '打印状态',
            children: [
                { title: '已打印', value: 'printed' },
                { title: '未打印', value: 'unprinted' },
            ],
            multiple: true,
        },
    ]);
</script>
<template>
    <view style="width: 100%">
        <ste-filter-tool :filterData="filterOptions2" :menu-data="subFilters2" @item-click="handleFilterClick" value="all" multiple />
    </view>
</template>
```

---$

### API

#### FilterItem

| 事件名     | 说明                                               | 是否必须 |
| ---------- | -------------------------------------------------- | -------- |
| `title`    | 选择项显示的文字                                   | 是       |
| `multiple` | 是否多选, 在更多筛选数据中需要用此字段标识是否多选 | -        |
| `children` | 更多筛选数据选项组数据, 若不是则不需要             | -        |

<!-- props -->

---$
{{fuyuwei}}
