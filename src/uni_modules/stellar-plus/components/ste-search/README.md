# Search 搜索
搜索组件，集成了常见搜索框所需功能。

{{compatibility}}

### 代码演示
**JavaScript**
```javascript
export default {
	data() {
		return {
			value: 'RTX4060Ti',
			hotWords: ['RTX4060', 'RTX4070', 'RTX4080', '小米电视', '华为手机'],
			focus: false,
		};
	},
	watch: {
		text(v) {
			console.log('watch', v);
		},
	},
	created() {},
	methods: {
		onInput(v) {
			console.log('input', v);
		},
		onSearch(v) {
			console.log('search', v);
			this.showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
		this.showToast({
			icon: 'none',
			title: `点击触发：${v}`,
		});
	},
};
```

#### 基础用法
- 通过`input`事件可以捕获用户输入行为，参数为输入的value内容
- 通过`search`事件可以捕获用户点击`搜索按钮`或`软键盘上的回车`行为，参数为输入的value内容
- 使用`v-model`属性进行输入框内容的双向绑定
- 使用`placeholder`属性设置输入框的占位符
- 使用`disabled`属性禁用组件，组件禁用后全部功能失效

```html
<ste-search @input="onInput" @search="onSearch" />
<ste-search v-model="value" @search="onSearch" />
<ste-search placeholder="搜索商品" @search="onSearch" />
<ste-search disabled />
```

#### 热词列表
- 可以通过`hotWords`属性传入热词列表
- 可以通过`interval`属性设置热词切换间隔，单位为毫秒

```html
<ste-search placeholder="搜索商品" @input="onInput" @search="onSearch" />
<ste-search :hotWords="hotWords" :interval="1000" @input="onInput" @search="onSearch" />
```
#### 自定义按钮文本内容
- 可以通过`btnText`属性自定义按钮文本内容

```html
<ste-search btnText="查询" @search="onSearch" />
```
#### 隐藏分割线以及按钮
- 可以通过`hiddenLine`属性隐藏分割线
- 可以通过`hiddenBtn`属性隐藏按钮，隐藏按钮时也会隐藏分割线

```html
<ste-search hiddenLine @search="onSearch" />
<ste-search hiddenBtn @search="onSearch" />
```


#### 隐藏输入框以及按钮
- 可以通过设置`hiddenInput`属性隐藏输入框 和 `hiddenBtn`属性隐藏按钮只保留放大镜的功能

```html
<view style="width: 60rpx">
	<ste-search hiddenInput hiddenBtn @click="onClick" />
</view>
```
#### 不显示清除图标
- 可以通过`clearable`属性来切换清除图标是否显示

```html
<ste-search :clearable="false" @search="onSearch" />
```
#### 颜色和背景
- 可以通过`borderColor`属性设置边框颜色
- 可以通过`background`属性设置背景颜色或者背景图片
- 可以通过`prefixIconColor`属性设置左侧图标颜色
- 可以通过`placeholderColor`属性设置占位符颜色
- 可以通过`inputTextColor`属性设置输入框文字颜色
- 可以通过`clearIconColor`属性设置清除按钮图标颜色
- 可以通过`btnBackground`属性设置搜索按钮背景颜色或者背景图片
- 可以通过`btnTextColor`属性设置搜索按钮文字颜色

```html
<ste-search
	placeholder="全部颜色"
	borderColor="#F00"
	background="#000"
	prefixIconColor="#a55"
	placeholderColor="#a55"
	inputTextColor="#fff"
	clearIconColor="#a55"
	btnBackground="#fff"
	btnTextColor="#000"
	@search="onSearch"
/>

<ste-search
	placeholder="背景渐变和按钮背景渐变"
	hiddenLine
	borderColor="#F00"
	background="linear-gradient(to right, #aaaaaa, #aaa000)"
	prefixIconColor="#fff"
	placeholderColor="#fff"
	inputTextColor="#fff"
	clearIconColor="#a55"
	btnBackground="linear-gradient(to right, #0AAAAA, #000FFF)"
	btnTextColor="#fff"
	@search="onSearch"
/>

<ste-search
	placeholder="背景图片和按钮背景图片"
	hiddenLine
	borderColor="#F00"
	background="https://image.whzb.com/chain/StellarUI/背景1.png"
	prefixIconColor="#fff"
	placeholderColor="#fff"
	inputTextColor="#fff"
	clearIconColor="#a55"
	btnBackground="https://image.whzb.com/chain/StellarUI/背景2.png"
	btnTextColor="#fff"
	@search="onSearch"
/>
```

#### 自定义高度以及圆角弧度
- 可以通过`height`属性设置搜索框高度，默认值`64`
- 可以通过`radius`属性设置圆角弧度，默认值`32`
```
<ste-search :height="120" :radius="60" @search="onSearch" />
```
#### 导航模式
- 可以通过`type`属性设置`nav`开启导航模式；开启后，点击搜索框任意区域都会触发`click`事件，其他功能失效。
```
<ste-search type="nav" @click="onClick" :hotWords="hotWords" />
```

#### 聚焦
- 可以通过`fous`属性控制搜索框聚焦，双向绑定	
```
<ste-search @click="onClick" :focus.sync="focus" />
<!--聚焦按钮-->
<view style="margin: 10px auto 0 auto">
	<ste-button @click="focus = true" width="100%">聚焦</ste-button>
</view>
```


### API
#### Props
| 属性名						| 说明																			| 类型				| 默认值					| 可选值																	|支持版本	|
| -----							|-----																		|-----			|-----					|-----																	|-----		|
| `type`						| 组件类型																	| `String`	| `"default"`		| `"default"`正常搜索<br/>`"nav"`导航栏	|-				|
| `value`						| 输入框默认值，支持`v-model`双向绑定				| `String`	| `""`					| -																			|-				|
| `placeholder`			| 占位提示符																| `String`	| `""`					| -																			|-				|
| `hotWords`				| 热词列表																	| `String[]`| `[]`					| -																			|-				|
| `interval`				| 热词列表自动切换时间间隔，单位`ms`				| `Number`	| `3000`				| -																			|-				|
| `disabled`				| 是否禁用状态															| `Boolean`	| `false`				| -																			|-				|
| `hiddenLine`			| 是否隐藏分割线														| `Boolean`	| `false`				| -																			|-				|
| `hiddenBtn`				| 是否隐藏按钮，同时也会隐藏分割线					| `Boolean`	| `false`				| -																			|-				|
| `btnText`					| 按钮文本内容															| `String`	| `"搜索"`				| -																			|-				|
| `hiddenInput`			| 是否隐藏输入框														| `Boolean`	| `false`				| -																			|-				|
| `clearable`				| 是否可清空内容														| `Boolean`	| `true`				| -																			|-				|
| `height`					| 搜索框高度，单位`rpx`										| `Number`	| `64`					| -																			|-				|
| `radius`					| 圆角弧度，单位`rpx`											| `Number`	| `32`					| -																			|-				|
| `borderColor`			| 边框颜色																	| `String`	| `"#EEEEEE66"`	| -																			|-				|
| `background`			| 背景，可直接传颜色值或者图片							| `String`	| `"#FFFFFF"`		| -																			|-				|
| `placeholderColor`| 占位符文本颜色														| `String`	| `"#BBBBBB"`		| -																			|-				|
| `prefixIconColor`	| 前缀图标颜色															| `String`	| `"#BBBBBB"`		| -																			|-				|
| `inputTextColor`	| 输入框文本颜色														| `String`	| `"#000000"`		| -																			|-				|
| `clearIconColor`	| 清除图标颜色															| `String`	| `"#BBBBBB"`		| -																			|-				|
| `btnTextColor`		| 搜索按钮文本颜色，分割线会跟随文本颜色变化	| `String`	| `"#0090FF"`		| -																			|-				|
| `btnBackground`		| 搜索按钮背景，可直接传颜色值或者图片			| `String`	| -							| -																			|-				|
| `focus`						| 是否聚焦(双向绑定)												| `Boolean`	| `false`				| -																			|`1.1.5`	|
| `autoplay`				| 热词列表自动切换													| `Boolean`	| `true`				| -																			|`1.11.1`	|


#### Events
您可以通过监听`input`事件，事件参数为用户输入的`value`值，您可以监听该事件获取用户输入的内容。<br/>
但如"基本使用"中的说明一样，您可以直接使用双向绑定，而无需再次监听`input`事件。
|事件名		|说明															|事件参数			|支持版本	|
|---		|---															|---				|---		|
| `input`	| 监听用户输入事件												| `value`: 输入框的值	| -			|
| `search`	| 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发	| `value`: 输入框的值	| -			|
| `focus`	| 输入框获取焦点时触发												| `value`: 输入框的值	| -			|
| `blur`	| 输入框失去焦点时触发												| `value`: 输入框的值	| -			|
| `clear`	| 配置了`clearabled`后，清空内容时会发出此事件						| -					| -			|
| `click`	| 点击任意区域触发												| `value`: 输入框的值	| -			|

{{xuyajun}}

{{qinpengfei}}