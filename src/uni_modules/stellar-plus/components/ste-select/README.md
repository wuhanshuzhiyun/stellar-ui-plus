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
<script>
    export default {
        data() {
            return {
                value: null,
                list: [
                    { label: '选项2011', value: 2011 },
                    { label: '选项2012', value: 2012 },
                    { label: '选项2013', value: 2013 },
                    { label: '选项2014', value: 2014 },
                    { label: '选项2015', value: 2015 },
                    { label: '选项2016', value: 2016 },
                    { label: '选项2017', value: 2017 },
                    { label: '选项2018', value: 2018 },
                    { label: '选项2019', value: 2019 },
                ],
            };
        },
        methods: {
            onChange(v) {
                console.log(v);
            },
        },
    };
</script>
```

### 多选

-   属性`multiple`设置为`true`时，可进行多选
-   属性`value`接收一个数组，数组中的每一项表示一个选中的节点值

```html
<template>
    <ste-select :list="list" v-model="value" multiple></ste-select>
</template>
<script>
    export default {
        data() {
            return {
                value: [],
                list: [
                    { label: '选项2011', value: 2011 },
                    { label: '选项2012', value: 2012 },
                    { label: '选项2013', value: 2013 },
                    { label: '选项2014', value: 2014 },
                    { label: '选项2015', value: 2015 },
                    { label: '选项2016', value: 2016 },
                    { label: '选项2017', value: 2017 },
                    { label: '选项2018', value: 2018 },
                    { label: '选项2019', value: 2019 },
                ],
            };
        },
    };
</script>
```

### 多列选择

-   属性`list`可接收一个二维数组，数组中的每一项为一个对象，对象结构同上
-   属性`value`接收一个数组，数组中的每一项表示一个选中的节点值

```html
<template>
    <ste-select :list="list" v-model="value"></ste-select>
</template>
<script>
    export default {
        data() {
            return {
                value: [],
                list: [
                    [
                        { label: '选项1-1', value: 11 },
                        { label: '选项1-2', value: 22 },
                    ],
                    [
                        { label: '选项2-1', value: 21 },
                        { label: '选项2-2', value: 22 },
                    ],
                ],
            };
        },
    };
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
<script>
    export default {
        data() {
            return {
                value: [],
                list: [
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
                ],
            };
        },
    };
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
<script>
    export default {
        data() {
            return {
                list: [
                    { label: '选项2011', value: 2011 },
                    { label: '选项2012', value: 2012 },
                    { label: '选项2013', value: 2013 },
                    { label: '选项2014', value: 2014 },
                    { label: '选项2015', value: 2015 },
                    { label: '选项2016', value: 2016 },
                    { label: '选项2017', value: 2017 },
                    { label: '选项2018', value: 2018 },
                    { label: '选项2019', value: 2019 },
                ],
            };
        },
    };
</script>
```

### 创建条目

-   属性`allowCreate`设置为`true`时，可进行创建条目（仅在`mode`属性为`filterable`时并且`list`为一维数组时生效）

```html
<template>
    <ste-select mode="filterable" allowCreate :list="list"></ste-select>
</template>
<script>
    export default {
        data() {
            return {
                list: [
                    { label: '选项2011', value: 2011 },
                    { label: '选项2012', value: 2012 },
                    { label: '选项2013', value: 2013 },
                    { label: '选项2014', value: 2014 },
                    { label: '选项2015', value: 2015 },
                    { label: '选项2016', value: 2016 },
                    { label: '选项2017', value: 2017 },
                    { label: '选项2018', value: 2018 },
                    { label: '选项2019', value: 2019 },
                ],
            };
        },
    };
</script>
```

### API

#### Props

背景之外的颜色属性只支持`16进制`、`RGB`、`RGBA`格式
| 属性名 | 说明 | 类型 | 默认值 | 可选值 | 支持版本 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| `value` | 绑定的值，支持v-model双向绑定 | `Number`,`String`,`Array` | - | - | - |
| `list` | 选项数据 | `Object[]`,`Object[][]`,`Tree`| `[]` | - | - |
| `mode` | 选择模式 | `String` | `default` | 见下方详细说明 | - |
| `minDate` | 最小日期,`mode`为日期时间选择器时生效 | `String` | - | - | - |
| `maxDate` | 最大日期,`mode`为日期时间选择器时生效 | `String` | - | - | - |
| `dateUnit` | 选项是否显示时间单位,`mode`为日期时间选择器时生效 | `Boolean` | `true` | - | - |
| `width` | 宽度，单位rpx | `String`,`Number` | `100%` | - | - |
| `height` | 高度，单位rpx | `String`,`Number` | `64` | - | - |
| `fontSize` | 字体大小，单位rpx | `String`,`Number` | `28` | - | - |
| `background` | 背景 | `String` | `#fff` | - | - |
| `maskClose` | 点击遮罩层是否关闭 | `Boolean` | `true` | - | - |
| `optionsWidth` | 选项框宽度，默认跟随`width` | `String`,`Number` | `auto` | - | - |
| `placeholder` | 占位符 | `String` | `请选择` | - | - |
| `labelKey` | 选项的标签 | `String` | `label` | - | - |
| `valueKey` | 选项的值 | `String` | `value` | - | - |
| `childrenKey` | 数据列表中显示的键名（`mode`为`tree`时生效） | `String` | `children` | - | - |
| `multiple` | 是否多选（`list`为一维数组时生效） | `Boolean` | `false` | - | - |
| `allowCreate` | 是否允许创建（`mode`为`filterable`时生效） | `Boolean` | `false` | - | - |
| `borderColor` | 边框颜色，若不要边框可设置为透明色 | `String` | `#ebebeb` | - | - |
| `borderRadius` | 圆角大小，单位RPX | `Number`,`String` | `8` | - | - |
| `optionsPosition` | 选项框位置 | `String` | `auto` | 见下方详细说明 | - |
| `disabled` | 禁用（所有功能失效） | `Boolean` | `false` | - | - |

##### Mode可选值

| 值           | 说明                                                         | 支持版本 |
| ------------ | ------------------------------------------------------------ | -------- |
| `default`    | 默认选择器                                                   | -        |
| `filterable` | 可搜索选择器                                                 | -        |
| `tree`       | 树形选择器                                                   | -        |
| `date`       | 日期时间选择器模式：日期选择器（该模式下`list`属性无效）     | -        |
| `datetime`   | 日期时间选择器模式：日期时间选择器（该模式下`list`属性无效） | -        |
| `time`       | 日期时间选择器模式：时间选择器（该模式下`list`属性无效）     | -        |
| `month`      | 日期时间选择器模式：年月选择器（该模式下`list`属性无效）     | -        |
| `minute`     | 日期时间选择器模式：时分选择器（该模式下`list`属性无效）     | -        |

##### OptionsPosition可选值

| 值             | 说明                   | 支持版本 |
| -------------- | ---------------------- | -------- |
| `auto`         | 自动展示位置，默认     | -        |
| `auto-start`   | 上下自适应，左侧对其   | -        |
| `auto-end`     | 上下自适应，右侧对其   | -        |
| `bottom`       | 在下方展示，左右自适应 | -        |
| `bottom-auto`  | 同`bottom`             | -        |
| `bottom-start` | 下方展示，左侧对其     | -        |
| `bottom-end`   | 下方展示，右侧对其     | -        |
| `top`          | 在上方展示，左右自适应 | -        |
| `top-auto`     | 同`top`                | -        |
| `top-start`    | 上方展示，左侧对其     | -        |
| `top-end`      | 上方展示，右侧对其     | -        |

#### Events

| 事件名    | 说明           | 事件参数                                        | 支持版本 |
| --------- | -------------- | ----------------------------------------------- | -------- |
| `change`  | 选择时触发     | 参数1：`value`/`value[]`,参数2：`item`/`item[]` | -        |
| `cancel`  | 取消选择时触发 | -                                               | -        |
| `confirm` | 确定选择时触发 | `value`/`value[]`                               | -        |

{{xuyajun}}
