# SelectOrder 订单选择

- 用于选择订单的下拉选择组件

---$

## 使用示例

## 基础用法

- 属性`list`接收一个数组，数组中的每一项为一个对象，对象中包含`label`和`value`两个属性，分别表示节点的显示文本和节点的值
    - 若`label`和`value`属性字段名不同，可通过`labelKey`和`valueKey`属性进行设置
- 属性`modelValue`接收一个值，表示当前选中的节点值，支持v-model双向绑定
- 事件`change`在节点值改变时触发，返回当前选中的值和选项对象

```html
<template>
    <ste-select-order :list="list" v-model="value" @change="onChange"></ste-select-order>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(null);
    const list = ref([
        { label: '全部订单', value: 'all' },
        { label: '待付款', value: 'pending' },
        { label: '待发货', value: 'unshipped' },
        { label: '待收货', value: 'unreceived' },
        { label: '已完成', value: 'completed' },
    ]);

    function onChange(val, option) {
        console.log(val, option);
    }
</script>
```

## 禁用状态

- 属性`disabled`设置为`true`时，组件将被禁用

```html
<template>
    <ste-select-order :list="list" v-model="value" disabled></ste-select-order>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(null);
    const list = ref([
        { label: '全部订单', value: 'all' },
        { label: '待付款', value: 'pending' },
        { label: '待发货', value: 'unshipped' },
    ]);
</script>
```

---$

<!-- props -->

---$
{{xuyajun}}
