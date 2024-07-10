# Price 价格

用于页面上显示价格的组件

{{compatibility}}

### 代码演示
#### 金额单位
- 默认金额单位为分，会将`value`值除以`100`
- 金额单位为元时，`valueUnit`赋值`yuan`，此时将只显示元的部分
```html
<ste-price value="9527" />
<ste-price value="9527" valueUnit="yuan"/>
```

#### 隐藏金额符号
- 使用`showUnit`可以控制金额符号是否显示
```html
<ste-price value="9527" :showUnit="false" />
```
#### 自定义金额符号
- 使用`unitSymbol`可以自定义金额符号
```html
<ste-price value="9527" unitSymbol="$" />
```
#### 自定义精度
- 使用`digits`可以自定义精度
```html
<ste-price value="9520" :digits="1" />
```

#### 金额文字尺寸
金额文字尺寸单位为`rpx`
```html
<ste-price value="9527" fontSize="50" />
```

#### 金额文字颜色
```html
<ste-price value="9527" color="green" />
```

#### 划线价 & 划线价颜色
- 划线价颜色属性只在开启了划线价模式时才生效
```html
<ste-price value="9527" isSuggestPrice />
<ste-price value="9527" isSuggestPrice linePriceColor="#666666" />
```

#### 金额样式
- 当`styleType`值为`1`时，数字字号统一，
	- 当数字字号<=`40rpx`，则价格符号字号为`20rpx`
	- 当数字字号＞`40rpx`,则价格符号字号为数字字号减`20rpx`

- 当`styleType`值为`2`时
	- 当小数点前数字字号≤`28rpx` 所有部分展示字号统一
	- 当`28rpx`＜小数点前数字字号≤`40rpx`则其余部分字号为`20rpx`
	- 当小数点前数字字号＞`40rpx`则其余部分字号为小数点前数字字号减`20rpx`
- 当`styleType`值为`3`时，全部字号统一


```html
<ste-price value="9527" :styleType="1" fontSize="20" />
<ste-price value="9527" :styleType="1" fontSize="40" />
<ste-price value="9527" :styleType="1" fontSize="60" />

<ste-price value="9527" :styleType="2" fontSize="28" />
<ste-price value="9527" :styleType="2" fontSize="40" />
<ste-price value="9527" :styleType="2" fontSize="60" />

<ste-price value="9527" :styleType="3" />
```

#### 金额字重
- 当`bold`为`true`时，金额文本为粗体字
```html
<ste-price value="9527" bold fontSize="50" />
```

#### 格式化内容
```html
<template>
	<ste-price value="9527" :formatter="formatter" />
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		formatter(price) {
			// 入参是传入的value值
			return (price / 100).toFixed(3);
		},
	},
};
</script>
```

### API
#### 组件属性(Props)

| 属性名			| 说明											| 类型				| 默认值			| 可选值																| 支持版本	|
| ---				| ---											| ---				| ---			| ---																| ---		|
| `value`			| 金额											| `Number/String`	| `0`			| -																	| -			|
| `valueUnit`		| 金额单位 用于判断传入的`value`值是`fen`还是`yuan`	| `String`			| `"fen"`		| -																	| -			|
| `digits`			| 金额精度										| `Number`			| `-1`			| `-1`不处理（默认值）<br/>`0`取整<br/>`1`保留1位小数<br/>`2`保留2位小数	| `1.1.3`	|
| `showUnit`		| 是否显示单位符号								| `Boolean`			| `true`		| -																	| `1.1.3`	|
| `unitSymbol`		| 单位符号										| `String`			| `"¥"`			| -																	| `1.1.3`	|
| `fontSize`		| 金额文字尺寸									| `Number/String`	| `30`			| -																	| -			|
| `color`			| 金额文字颜色									| `String`			| `"#ff1e19"`	| -																	| -			|
| `linePriceColor`	| 划线价颜色										| `String`			| `"#999999"`	| -																	| -			|
| `lineHeight`		| 行高	：`Number`，单位rpx，`String`，同原生		| `Number/String`	| `"1"`			| -																	| -			|
| `isSuggestPrice`	| 是否划线价										| `Boolean`			| `false`		| -																	| -			|
| `marginLeft`		| 左边距											| `Number/String`	| `0`			| -																	| -			|
| `marginRight`		| 右边距											| `Number/String`	| `0`			| -																	| -			|
| `marginTop`		| 上边距											| `Number/String`	| `0`			| -																	| -			|
| `marginBottom`	| 下边距											| `Number/String`	| `0`			| -																	| -			|
| `styleType`		| 金额样式										| `Number`			| `2`			| `1`元和角分大小相等<br/>`2`角分小于元<br/>`3`价格符号和角，分相等		| -			|
| `bold`			| 金额是否加粗									| `Boolean`			| `false`		| -																	| `1.1.3`	|
| `formatter`		| 用来格式化内容									| `Function(value)`	| -				| -																	| -			|

{{fuyuwei}}

{{xuyajun}}

{{qinpengfei}}