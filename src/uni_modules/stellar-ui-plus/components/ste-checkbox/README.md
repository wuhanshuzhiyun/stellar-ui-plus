# Checkbox 复选框

在一组备选项中进行多选

---$

### 代码演示

后面的演示代码中涉及到的变量和方法都使用该代码

```html
<script lang="ts" setup>
    import { reactive } from 'vue';
    const val = reactive({
        value1: false,
        value2: true,
        value3: false,
        value4: true,
        value5: false,
        value6: true,
        value7: true,
        value8: false,
        value9: false,
        value10: false,
        value11: true,
        value12: true,
        value13: ['a'],
        value14: false,
        value15: false,
        value16: false,
        value17: false,
        value18: [],
        value19: [],
        value20: [],
        value21: [],
        value22: [],
    });
    function click1(value: any, suspend: () => {}, next: () => {}) {
        toast.showToast({
            icon: 'none',
            title: `点击：${value} 复选框的值`,
        });
        suspend(); // 阻止操作

        setTimeout(() => {
            next(); // 异步操作后，执行操作
        }, 1500);
    }
    function click2(value: any, suspend: () => {}, _next: any, stop: () => {}) {
        toast.showToast({
            icon: 'none',
            title: `点击：${value} 复选框的值`,
        });
        suspend(); // 阻止操作
        setTimeout(() => {
            // 异步操作后，停止操作
            stop();
        }, 200);
    }

    function change(value: any) {
        setTimeout(() => {
            toast.showToast({
                icon: 'none',
                title: `改变：${value} 复选框的值`,
            });
        }, 1000);
    }
</script>
```

#### 基础用法

单一的checkbox中，默认绑定变量的值会是Boolean，选中为true

```
<ste-checkbox v-model="val.value">复选框</ste-checkbox>
```

#### 禁用

通过设置 `disabled` 属性可以禁用复选框， 默认`false`。

```
<ste-checkbox v-model="val.value2" disabled>复选框1</ste-checkbox>
<ste-checkbox v-model="val.value3" disabled>复选框2</ste-checkbox>
```

#### 只读

通过设置 `readonly` 属性可以禁用复选框，样式不置灰， 默认`false`。

```
<ste-checkbox v-model="val.value4" readonly>复选框1</ste-checkbox>
<ste-checkbox v-model="val.value5" readonly>复选框2</ste-checkbox>
```

#### 自定义形状

通过设置`shape`为`square`或者`circle`，将复选框设置为方形或者圆形，默认`circle`。

```
<ste-checkbox v-model="val.value6">圆形</ste-checkbox>
<ste-checkbox v-model="val.value7" shape="square">方形</ste-checkbox>
```

#### 自定义图标大小

通过设置 `iconSize` 属性可以自定义图标的大小，单位`rpx`，默认`36`。

```
<ste-checkbox v-model="val.value11" iconSize="60">60rpx</ste-checkbox>
```

#### 自定义图标颜色

通过设置 `checkedColor` 属性可以自定义图标的颜色（填充色和边框色），默认`#0090FF`。

```
<ste-checkbox v-model="val.value12" checkedColor="#ee0a24">红色</ste-checkbox>
```

#### 自定义图标

通过 `icon` 插槽自定义图标，可以通过 `slotProps`下`checked`判断是否为选中状态，`disabled`判断是否为禁止状态，`readonly`判断是否为只读状态。

```
<ste-checkbox-group v-model="val.value13">
	<ste-checkbox name="a">
		<template #icon="{ slotProps }">
			<ste-icon
				code="&#xe677;"
				size="50"
				:color="slotProps.checked ? '#ee0a24' : '#000000'"
			></ste-icon>
		</template>
		<template #default="{ slotProps }">
			{{ slotProps.checked ? '已选中' : '未选中' }}
		</template>
	</ste-checkbox>
	<ste-checkbox name="b">
		<template #icon="{ slotProps }">
			<ste-icon
				code="&#xe677;"
				size="50"
				:color="slotProps.checked ? '#ee0a24' : '#000000'"
			></ste-icon>
		</template>
		<template #default="{ slotProps }">
			{{ slotProps.checked ? '已选中' : '未选中' }}
		</template>
	</ste-checkbox>
	<ste-checkbox name="c" disabled>
		<template #icon="{ slotProps }">
			<ste-icon
				code="&#xe677;"
				size="50"
				:color="slotProps.disabled ? '#eeeeee' : '#000000'"
			></ste-icon>
		</template>
		<template #default="{ slotProps }">
			{{ slotProps.disabled ? '禁止' : '未禁止' }}
		</template>
	</ste-checkbox>
	<ste-checkbox name="d" readonly>
		<template #icon="{ slotProps }">
			<ste-icon
				code="&#xe677;"
				size="50"
				:color="slotProps.readonly ? 'green' : '#000000'"
			></ste-icon>
		</template>
		<template #default="{ slotProps }">
			{{ slotProps.readonly ? '只读' : '未只读' }}
		</template>
	</ste-checkbox>
```

#### 左侧文本

将 `textPosition` 属性设置为 `left`，可以将文本位置调整到复选框左侧。

```
<ste-checkbox v-model="val.value6">右边</ste-checkbox>
<ste-checkbox v-model="val.value7" textPosition="left">左边</ste-checkbox>
```

#### 自定义文本

- 通过设置 `textSize` 属性可以自定义文本的大小，单位`rpx`，默认`28`。
- 通过设置 `textInactiveColor` 属性可以自定义文本未选中颜色，默认`#000000`。
- 通过设置 `textActiveColor` 属性可以自定义文本选中颜色，默认`#000000`。

```
<ste-checkbox v-model="val.value14" textSize="50" textInactiveColor="green" textActiveColor="#d276a3">
	复选框
</ste-checkbox>
```

#### 回调事件

- `click` 点击复选框时触发的事件（可拦截change事件），`value`：改变后的分值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行。
- `change` 当绑定值变化时触发的事件，`value`:改变后的分值。

```
<ste-checkbox v-model="val.value16" @click="click1" @change="change">复选框</ste-checkbox>
<text>在click事件后，执行change事件</text>
<ste-checkbox v-model="val.value17" @click="click2" @change="change">复选框</ste-checkbox>
<text>在click事件后，阻止change事件</text>
```

### 复选框组

需要与`ste-checkbox-group`一起使用，选中值是一个数组，通过`value`绑定在`ste-checkbox-group`上，数组中的项即为选中的`ste-checkbox`的`name`属性设置的值。

```
<ste-checkbox-group v-model="val.value18">
	<ste-checkbox name="a">复选框a</ste-checkbox>
	<ste-checkbox name="b">复选框b</ste-checkbox>
	<ste-checkbox name="c">复选框c</ste-checkbox>
</ste-checkbox-group>
```

### 复选框组属性和复选框属性

属性优先级：`ste-checkbox`组件上配置的属性 > `ste-checkbox-group`组件上配置的属性 > `ste-checkbox`组件默认属性

```
<ste-checkbox-group v-model="val.value19" shape="square" textPosition="left">
	<ste-checkbox name="a">复选框a</ste-checkbox>
	<ste-checkbox name="b" disabled>复选框b</ste-checkbox>
	<ste-checkbox name="c" shape="circle">复选框c</ste-checkbox>
</ste-checkbox-group>
```

### 水平排列

将 `direction` 属性设置为 `row` 后，复选框组会变成水平排列。

```
<ste-checkbox-group v-model="val.value20" direction="row">
	<ste-checkbox name="a">复选框a</ste-checkbox>
	<ste-checkbox name="b">复选框b</ste-checkbox>
	<ste-checkbox name="c">复选框c</ste-checkbox>
</ste-checkbox-group>
```

### 限制最大可选数

通过 `max` 属性可以限制复选框组的最大可选数,为`0`则不限制,默认0。

```
<ste-checkbox-group v-model="val.value21" :max="2">
	<ste-checkbox name="a">复选框a</ste-checkbox>
	<ste-checkbox name="b">复选框b</ste-checkbox>
	<ste-checkbox name="c">复选框c</ste-checkbox>
</ste-checkbox-group>
```

---$

### API

<!-- props -->

#### CheckboxGroup 组件属性(Props)

| 参数                | 说明                              | 类型            | 默认值    | 可选值                            | 支持版本  |
| ------------------- | --------------------------------- | --------------- | --------- | --------------------------------- | --------- |
| `value`             | 当前选中值（支持v-model双向绑定） | `Array`         | -         | -                                 | -         |
| `direction`         | 排列方式                          | `String`        | `row`     | `column`：横向 <br/>`row`：纵向   | -         |
| `disabled`          | 是否禁用                          | `Boolean`       | `false`   | -                                 | -         |
| `readonly`          | 只读 (不置灰)                     | `Boolean`       | `false`   | -                                 | -         |
| `shape`             | 形状                              | `String`        | `circle`  | `circle`：圆形 <br/>`squar`：方形 | -         |
| `iconSize`          | 图标大小，单位rpx                 | `Number/String` | `36`      | -                                 | -         |
| `checkedColor`      | 选中状态的图标颜色                | `String`        | `#0090FF` | -                                 | -         |
| `textPosition`      | 文本的位置                        | `String`        | `right`   | `right`：右 <br/>`left`：左       | -         |
| `textSize`          | 文本字体大小，单位rpx             | `Number/String` | `25`      | -                                 | -         |
| `textlnactiveColor` | 未选中文本颜色                    | `String`        | `#000000` | -                                 | -         |
| `textActiveColor`   | 选中文本颜色                      | `String`        | `#000000` | -                                 | -         |
| `textDisabled`      | 禁用文本点击                      | `Boolean`       | `false`   | -                                 | -         |
| `max`               | 最大可选数，0 为无限制            | `Number`        | `0`       | -                                 | -         |
| `marginLeft`        | 左边距,单位rpx                    | `Number/String` | `0`       | -                                 | `v1.10.0` |
| `marginRight`       | 右边距,单位rpx                    | `Number/String` | `0`       | -                                 | `v1.10.0` |
| `columnGap`         | 复选框和文本间距，单位rpx         | `Number/String` | `16`      | -                                 | `v1.10.0` |

#### CheckboxGroup Events

| 事件名   | 说明                     | 事件参数                | 支持版本 |
| -------- | ------------------------ | ----------------------- | -------- |
| `change` | 当绑定值变化时触发的事件 | `value`：改变后的绑定值 | -        |

#### Checkbox Slots

| 插槽名    | 说明           | 插槽参数                                                     | 支持版本 |
| --------- | -------------- | ------------------------------------------------------------ | -------- |
| `default` | 复选框文本内容 | `{ checked: boolean, disabled: boolean, readonly: boolean }` | -        |
| `icon`    | 复选框图标     | `{ checked: boolean, disabled: boolean, readonly: boolean }` | -        |

---$

{{qinpengfei}}
