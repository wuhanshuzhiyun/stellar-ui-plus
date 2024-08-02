# DatePicker 时间选择器

年月日时分秒选择器

{{compatibility}}

### 代码演示

#### 基础使用

-   通过`value`属性可设置默认选中的时间(支持时间戳、字符串格式)
-   切换后的返回值为时间戳
-   没有值或值非法时显示当前时间

```
<ste-date-picker :value="datetime" ></ste-date-picker>
```

#### 不显示操作栏

```
<ste-date-picker :showToolbar="false" mode="date" ></ste-date-picker>
```

#### 时间类型

-   默认显示年、月、日、时、分、秒(`all`)
-   年月日时分(`datetime`)，年月日(`date`)，年月(`year-month`)，月日(`month-day`)，时分秒(`time`)，时分(`hour-minute`)，分秒(`minute-second`)

```
<ste-date-picker mode="datetime" ></ste-date-picker>
<ste-date-picker mode="date" ></ste-date-picker>
<ste-date-picker mode="year-month" ></ste-date-picker>
<ste-date-picker mode="month-day" ></ste-date-picker>
<ste-date-picker mode="time" ></ste-date-picker>
<ste-date-picker mode="hour-minute" ></ste-date-picker>
<ste-date-picker mode="minute-second" ></ste-date-picker>
```

#### 最大值 & 最小值

-   通过最大值最小值可设置选择的边界（支持时间戳、字符串格式）
-   可精确到秒

```
<ste-date-picker :minDate="new Date(2000, 11, 1, 1, 0, 30, 0).getTime()" :maxDate="new Date(2030, 11, 1, 1, 23, 59, 30).getTime()" ></ste-date-picker>
<ste-date-picker maxDate="2030-01-01 00:00:00" minDate="2022-01-01 00:00:00"></ste-date-picker>
```

#### 过滤

-   可通过`filter`属性传递一个函数来对数据进行过滤

```
<template>
	<ste-date-picker :filter="filter" mode="date" title="过滤" ></ste-date-picker>
</template>
<script>
export default {
	methods: {
		filter(mode, options) {
			if (mode === 'year') {
				return options.filter((option) => option % 5 === 0);
			}
			if (mode === 'month') {
				return options.filter((option) => option % 4 === 0);
			}
			if (mode === 'day') {
				return options.filter((option) => option % 2 === 0);
			}

			return options;
		},
	}
}
</script>
```

#### 格式化

```
<template>
	<ste-date-picker :formatter="formatter" mode="date" title="格式化"></ste-date-picker>
</template>
<script>
export default {
	methods: {
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			}
			if (type === 'month') {
				return `${value}月`;
			}
			if (type === 'day') {
				return `${value}日`;
			}
			return value;
		},
	}
}
</script>
```

#### 选项高度

```
<ste-date-picker mode="date" itemHeight="50" ></ste-date-picker>
```

#### 每列可见数量

```
<ste-date-picker mode="date" :visibleItemCount="10" ></ste-date-picker>
```

### API

#### Props

<!-- props -->

{{fuyuwei}}
