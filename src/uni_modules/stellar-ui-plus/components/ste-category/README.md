# FilterTool 筛选选项

可配置多选选项组件

---$

### 基础用法

- 分类数据需按照下方`script`中的格式传入
    - 分类需要传入`title`和`value`

```html
<script lang="ts" setup>
    import { reactive } from 'vue';
    const data1 = reactive([
        { title: '全部商品', value: 'all' },
        { title: '零食', value: 'linghsi' },
        { title: '清洁用品', value: 'qingjie' },
        { title: '粮油', value: 'liangyou' },
        { title: '肉类', value: 'roulei' },
        { title: '水果', value: 'shuiguo' },
    ]);
</script>
<template>
    <view style="height: 500rpx">
        <ste-category :data="data1"></ste-category>
    </view>
</template>
```

#### 插槽模式

```html
<script lang="ts" setup>
    import { reactive } from 'vue';
    const data1 = reactive([
        { title: '全部商品', value: 'all', count: 11 },
        { title: '零食', value: 'linghsi', count: 3 },
        { title: '清洁用品', value: 'qingjie', count: 4 },
        { title: '粮油', value: 'liangyou', count: 10 },
        { title: '肉类', value: 'roulei', count: 12 },
        { title: '水果', value: 'shuiguo', count: 13 },
    ]);
</script>
<template>
    <view style="height: 500rpx">
        <ste-category :data="data1">
            <template v-slot="{ item }">
                <view>
                    <text>({{ item.count }}/100)</text>
                    <ste-icon code="&#xe6c7;" color="#000" size="24" />
                </view>
            </template>
        </ste-category>
    </view>
</template>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
