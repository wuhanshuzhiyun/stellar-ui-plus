# Select 下拉选

-   当选项过多时，使用下拉菜单展示并选择内容。

{{compatibility}}

## 使用示例

### 基础用法

-   属性`list`接收一个数组，数组中的每一项为一个对象，对象中包含`label`和`value`两个属性，分别表示节点的显示文本和节点的值
    -   若`lable`和`value`属性字段名不同，可通过`labelKey`和`valueKey`属性进行设置
-   属性`value`接收一个值，表示当前选中的节点值,支持v-model双向绑定
    -   除了单选之外的其他用法，`value`属性必须是一个数组，数组中的每一项表示一个选中的节点值
-   事件`change`在节点值改变时触发，返回当前选中的节点对象

```html
<template>
    <ste-select :list="list" v-model="value" @change="onChange"></ste-select>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref(null);
    const list = ref([
        { label: '选项2011', value: 2011 },
        { label: '选项2012', value: 2012 },
        { label: '选项2013', value: 2013 },
        { label: '选项2014', value: 2014 },
        { label: '选项2015', value: 2015 },
        { label: '选项2016', value: 2016 },
        { label: '选项2017', value: 2017 },
        { label: '选项2018', value: 2018 },
        { label: '选项2019', value: 2019 },
    ]);

    function onChange() {
        console.log(v);
    }
</script>
```

### 多选

-   属性`multiple`设置为`true`时，可进行多选
-   属性`value`接收一个数组，数组中的每一项表示一个选中的节点值

```html
<template>
    <ste-select :list="list" v-model="value" multiple></ste-select>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref([]);
    const list = ref([
        { label: '选项2011', value: 2011 },
        { label: '选项2012', value: 2012 },
        { label: '选项2013', value: 2013 },
        { label: '选项2014', value: 2014 },
        { label: '选项2015', value: 2015 },
        { label: '选项2016', value: 2016 },
        { label: '选项2017', value: 2017 },
        { label: '选项2018', value: 2018 },
        { label: '选项2019', value: 2019 },
    ]);
</script>
```

### 多列选择

-   属性`list`可接收一个二维数组，数组中的每一项为一个对象，对象结构同上
-   属性`value`接收一个数组，数组中的每一项表示一个选中的节点值

```html
<template>
    <ste-select :list="list" v-model="value"></ste-select>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref([]);
    const list = ref([
        [
            { label: '选项1-1', value: 11 },
            { label: '选项1-2', value: 22 },
        ],
        [
            { label: '选项2-1', value: 21 },
            { label: '选项2-2', value: 22 },
        ],
    ]);
</script>
```

### 树形选择

-   属性`list`可接收一个树形结构数组，数组中的每一项为一个对象，对象结构同上，`children`属性表示子节点
    -   若`children`属性字段名不同，可通过`childrenKey`属性进行设置
-   属性`mode`设置为`tree`时，可进行树形选择
-   属性`value`接收一个数组，数组中的每一项表示一个选中的节点值

```html
<template>
    <ste-select mode="tree" :list="list" v-model="value"></ste-select>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const value = ref([]);
    const list = ref([
        {
            label: '湖北',
            value: 1,
            children: [
                { label: '武汉', value: 11 },
                { label: '荆州', value: 12 },
            ],
        },
        {
            label: '湖南',
            value: 2,
            children: [
                { label: '长沙', value: 21 },
                { label: '株洲', value: 22 },
            ],
        },
    ]);
</script>
```

### 日期时间选择器

-   属性`mode`设置为`date`时，可进行日期选择
    -   设置为`time`时，可进行时间选择
    -   设置为`datetime`时，可进行日期和时间选择
    -   设置为`month`时，可进行月份选择
    -   设置为`minute`时，可进行年份选择
-   当`mode`设置为时间日期选择器时，属性`list`不生效
    -   若要设置默认值，属性`value`接收一个数组，分别对应当前选项的每一列
    -   例如
        -   `mode`为`date`时，`value`为`[2020, 1, 1]`时，表示当前选中的日期为2020年1月1日
        -   `mode`为`time`时，`value`为`[12, 0, 0]`时，表示当前选中的时间为12:00:00
        -   `mode`为`datetime`时，`value`为`[2020, 1, 1, 12, 0, 0]`时，表示当前选中的日期时间为2020年1月1日12:00:00
    -   也可以使用符合`dayjs`格式化的数据
    -   例如
        -   `mode`为`date`时，`value`为`'2020-01-01'`时，表示当前选中的日期为2011年1月1日

```html
<template>
    <ste-select mode="date"></ste-select>
</template>
```

### 搜索

-   属性`mode`设置为`filterable`时，可进行搜索（仅`list`为一维数组时有效）

```html
<template>
    <ste-select mode="filterable" :list="list"></ste-select>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const list = ref([
        { label: '选项2011', value: 2011 },
        { label: '选项2012', value: 2012 },
        { label: '选项2013', value: 2013 },
        { label: '选项2014', value: 2014 },
        { label: '选项2015', value: 2015 },
        { label: '选项2016', value: 2016 },
        { label: '选项2017', value: 2017 },
        { label: '选项2018', value: 2018 },
    ]);
</script>
```

### 创建条目

-   属性`allowCreate`设置为`true`时，可进行创建条目（仅在`mode`属性为`filterable`时并且`list`为一维数组时生效）

```html
<template>
    <ste-select mode="filterable" allowCreate :list="list"></ste-select>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const list = ref(
        { label: '选项2011', value: 2011 },
        { label: '选项2012', value: 2012 },
        { label: '选项2013', value: 2013 },
        { label: '选项2014', value: 2014 },
        { label: '选项2015', value: 2015 },
        { label: '选项2016', value: 2016 },
        { label: '选项2017', value: 2017 },
        { label: '选项2018', value: 2018 },
        { label: '选项2019', value: 2019 }
    );
</script>
```

### 远程搜索
- 当在`mode`属性为`filterable`时，属性`autoFilterable`设置为`false`时，则不会执行自动筛选，可通过`inputFilterable`监听输入执行远程搜索

```html
<template>
<ste-select
	:list="list"
	mode="filterable"
	:autoFilterable="false"
	:loading="loading"
	@inputFilterable="onInputFilterable"
></ste-select>
</template>
<script setup>
const listAll = [
	{ label: '选项211', value: 211 },
	{ label: '选项212', value: 212 },
	{ label: '选项213', value: 213 },
	{ label: '选项214', value: 214 },
	{ label: '选项215', value: 215 },
	{ label: '选项216', value: 216 },
	{ label: '选项217', value: 217 },
	{ label: '选项218', value: 218 },
	{ label: '选项219', value: 219 },
	{ label: '选项220', value: 220 },
	{ label: '选项221', value: 221 },
	{ label: '选项222', value: 222 },
	{ label: '选项223', value: 223 },
	{ label: '选项224', value: 224 },
	{ label: '选项225', value: 225 },
	{ label: '选项226', value: 226 },
	{ label: '选项227', value: 227 },
	{ label: '选项228', value: 228 },
	{ label: '选项229', value: 229 },
	{ label: '选项230', value: 230 },
	{ label: '选项231', value: 231 },
	{ label: '选项232', value: 232 },
	{ label: '选项233', value: 233 },
	{ label: '选项234', value: 234 },
	{ label: '选项235', value: 235 },
	{ label: '选项236', value: 236 },
	{ label: '选项237', value: 237 },
	{ label: '选项238', value: 238 },
	{ label: '选项239', value: 239 },
	{ label: '选项240', value: 240 },
	{ label: '选项241', value: 241 },
	{ label: '选项242', value: 242 },
	{ label: '选项243', value: 243 },
	{ label: '选项244', value: 244 },
	{ label: '选项245', value: 245 },
	{ label: '选项246', value: 246 },
	{ label: '选项247', value: 247 },
	{ label: '选项248', value: 248 },
	{ label: '选项249', value: 249 },
	{ label: '选项250', value: 250 },
	{ label: '选项251', value: 251 },
];

const list = ref([])
const loading = ref(false)
let time = null
const onInputFilterable = (v) => {
    // 防抖
    clearTimeout(time);
    time = setTimeout(() => {
        if (loading.value) return;
        loading.value = true;
        // 模拟远程搜索
        setTimeout(() => {
            loading.value = false;
            console.log(v);
            if (v) {
                list.value = listAll.filter((item) => item.label.indexOf(v) !== -1);
            } else {
                list.value = listAll.map((item) => item);
            }
            console.log(list.value);
        }, 1000);
    }, 500);
}
</script>
```
### 分页
- 事件`loadMore`可监听上拉触底（多列渲染无效）
- 属性`total`控制每页显示条数
	- `list`选项数量大于或等于`total`值时不触发上拉触底事件

```html
<template>
	<ste-select :list="list" :loading="loading" :total="total" @loadMore="loadMore"></ste-select>
</template>
<script setup>
const pageSize = ref(10);
const list = ref([]);
const total = ref(0)
const loading = ref(false);

const getList = () => {
    if (loading.value) return;
    loading.value = true;
    // 模拟远程请求
    setTimeout(() => {
        loading.value = false;
        const newData = Array.from({ length: pageSize.value }).map((_, i) => {
            const value = list7.value.length + i + 1;
            return { label: `选项${value}`, value };
        });
        list7.value.push(...newData);
        total.value = 40
    }, 1000);
}

onMonted(getList)

const loadMore = ()=>getList()

</script>
```



### API

#### Props

背景之外的颜色属性只支持`16进制`、`RGB`、`RGBA`格式

<!-- props -->

{{xuyajun}}
