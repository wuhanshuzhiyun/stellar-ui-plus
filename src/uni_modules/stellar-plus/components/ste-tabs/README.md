# Tabs 标签页
标签页组件，集成了常见标签页所需功能。

{{compatibility}}

### 代码演示
**JavaScript**后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
export default {
	data() {
		return {
			list1: [
				{
					title: '标签1',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
				},
				{
					title: '标签2',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
				},
				{
					title: '标签3标签3标签3标签3',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
				},
				{
					title: '标签4',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
				},
			],
		};
	},
	computed: {
		list2() {
			return [].concat(this.list1, [
				{
					title: '标签5',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
				},
				{
					title: '标签6',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img6.jfif',
				},
				{
					title: '标签7',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img7.jfif',
				},
				{
					title: '标签8',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/img8.jfif',
				},
			]);
		},
	},
};
```
#### 基础用法
- 外层使用`ste-tabs`父标签包裹
	- `divideNum`表示自动一屏均分标签最大数量，默认值为`4`，当子标签数量大于该值时，则根据实际宽度自动排列
	- `active`表示当前激活的选项，默认值`0`，支持`v-model:active`双向绑定；当类型为`Number`时绑定子元素的`index`属性，当类型为`String`时，绑定子元素的`name`属性
	- `ste-tabs`标签设置`tabWidth`属性可设置每一项标签的宽度
	- `ellipsis`属性开启时可当文本长度大于标签宽度时会显示省略号
- 内层使用`ste-tab`子标签描述每一个标签页
	- `title`属性设置标签主标题
	- `index`或`name`设置标签唯一值，与父元素的`active`绑定


```html
<!-- 标签数量小于或等于divideNum时，标签宽度均分 -->
<ste-tabs>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 子元素数量大于divideNum时，自动排列 -->
<ste-tabs>
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 统一标签宽度 -->
<ste-tabs tabWidth="180">
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 超出显示省略号 -->
<ste-tabs tabWidth="180" ellipsis>
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```

#### 吸顶
- `ste-tabs`标签设置`sticky`属性可让标签自动吸顶
```html
<ste-tabs showSubtitle sticky>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```
#### 图片和子标题
- `ste-tabs`标签
	- 设置`showSubtitle`属性可以开启子标题显示，开启子标题显示时，下划线会自动隐藏
	- 设置`showImage`属性可以开启图片显示
	- `imageBorderWidth`属性可以设置激活选项图片的边框宽度，设置为`0`时不展示
- `ste-tab`标签
	- `subTitle`属性设置每一项的子标题内容，长度不得大于`6`，大于`6`时会被强制截断
	- `image`属性设置每一项的图片链接，同原生`image`的`src`属性
	- `imageWidth`和`imageHeight`属性可以自定义图片大小，`imageRadius`属性可以自定义标签圆角弧度
```html
<!-- 当显示子标题时，下划线会自动隐藏 -->
<ste-tabs showSubtitle>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 展示图片主标题和子标题 -->
<ste-tabs showSubtitle showImage>
	<ste-tab
		v-for="(item, index) in list1"
		:key="index"
		:image="item.image"
		:title="item.title"
		subTitle="子标题"
		:index="index"
	>
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 隐藏主标题，展示图片主标题和子标题，图片边框隐藏 -->
<ste-tabs showSubtitle showImage :showTitle="false" imageBorderWidth="0">
	<ste-tab v-for="(item, index) in list1" :key="index" :image="item.image" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 图片大小和圆角 -->
<ste-tabs showSubtitle showImage :showTitle="false" imageWidth="200" imageHeight="90" imageRadius="18">
	<ste-tab v-for="(item, index) in list2" :key="index" :image="item.image" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```
#### 下拉选项
- 开启下拉选项，当标签数量小于`divideNum`时不生效
- `ste-tabs`标签
	- `pullDown`属性可以开启下拉选项卡
	- `maskLeft`、`maskRight`、`maskBottom`、`maskTop`属性可以设置开启下拉选项时，背景蒙层的位置
```html
<ste-tabs pullDown :showTitle="false" showImage showSubtitle tabWidth="180" tabPadding="12">
	<ste-tab v-for="(item, index) in list2" :key="index" :image="item.image" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!--  -->
<ste-tabs
	pullDown
	:showTitle="false"
	showImage
	showSubtitle
	tabWidth="180"
	tabPadding="12"
	maskLeft="30"
	maskRight="30"
	maskBottom="120"
	maskTop="180"
>
	<ste-tab v-for="(item, index) in list2" :key="index" :image="item.image" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```
#### 颜色
- 除背景外的其他颜色只支持`16进制`、`rgb`或者`rgba`格式
- `ste-tabs`标签
	- `color`属性可以修改主题颜色，包括(滑块颜色，边框颜色，选中图片边框颜色，选中的背景色，激活下拉列表中选项颜色)，默认值#0090FF
	- `background`属性可以设置标签栏背景，支持图片和颜色
	- `titleColor`设置主标题默认字体颜色
	- `activeTitleColor`设置主标题激活状态下的字体颜色
	- `subColor`设置子标题默认颜色
	- `activeSubColor`设置子标题激活状态下的字体颜色
```html
<!-- 主题和背景 -->
<ste-tabs pullDown showImage showSubtitle tabWidth="180" tabPadding="12" color="#f00" background="#ffa">
	<ste-tab
		v-for="(item, index) in list2"
		:key="index"
		:title="item.title"
		:image="item.image"
		subTitle="子标题"
		:index="index"
	>
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 主标题字体颜色 -->
<ste-tabs pullDown titleColor="#f90" activeTitleColor="#09f">
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 子标题字体颜色 -->
<ste-tabs pullDown showSubtitle subColor="#09f" activeSubColor="#f90" tabWidth="180" tabPadding="12">
	<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```
#### 手势切换
- `ste-tabs`标签设置`swipeable`属性可开启手势切换
```html
<ste-tabs showSubtitle swipeable>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```
#### 卡片模式
- `ste-tabs`标签
	- `type`等于`card`时开启卡片模式
	- 设置`border`属性可以为卡片加边框（只在卡片模式下生效）
```html
<!-- 开启卡片模式 -->
<ste-tabs swipeable type="card">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 带边框 -->
<ste-tabs swipeable type="card" border>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```
#### 间距
- `ste-tabs`标签的`tabSpace`可以修改标签间距，默认为`0`
```html
<ste-tabs swipeable type="card" tabSpace="12">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```

#### 分割线
- `ste-tabs`标签设置`showGapLine`时在子项之间展示分割线
```html
<!-- 线性模式下展示分割线 -->
<ste-tabs swipeable showGapLine>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 显示子标题样式 -->
<ste-tabs swipeable showGapLine showSubtitle>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 卡片模式下展示分割线 -->
<ste-tabs type="card" swipeable showGapLine tabSpace="14">
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```


#### 锁定和禁用
- `ste-tabs`标签
	- `lock`可以锁定标签栏不让操作，样式不变
	- `disabled`可以禁用全部标签栏不让操作，标签栏变成灰色
- `ste-tab`标签
	- `disabled`可以禁用当前标签页不让操作，当前标签变成灰色
```html
<!-- 锁定 -->
<ste-tabs swipeable showGapLine showSubtitle lock>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 全局禁用 -->
<ste-tabs swipeable showGapLine showSubtitle disabled>
	<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" subTitle="子标题" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
<!-- 单项禁用 -->
<ste-tabs swipeable showGapLine showSubtitle>
	<ste-tab
		v-for="(item, index) in list1"
		:key="index"
		:title="item.title"
		subTitle="子标题"
		:index="index"
		:disabled="index === 1"
	>
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```
#### 徽标
- `ste-tab`标签
	- `showDot`右上角是否展示小红点
	- `badge`右上角徽标的内容
	- `showZeroBadge`当 badge 为数字 0 时，是否展示徽标
```html
<ste-tabs swipeable showGapLine showSubtitle>
	<ste-tab
		v-for="(item, index) in list1"
		:key="index"
		:title="item.title"
		:badge="index"
		subTitle="子标题"
		:index="index"
	>
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```

#### 异形
- `ste-tabs`标签
	- `showSubtitle`显示子标题
	- `showTitle` = `false`隐藏主标题
	- `background`调整标签栏背景
	- `subColor`调整子标题颜色
	- `activeSubColor`调整选中子标题颜色
	- `color`调整主题色（子标签背景色）
	- `tabPadding`调整标签内边距
	- `subTitleHeight`调整子标题高度
	- `showLine` = `false`隐藏下划线
	- `radius`调整标签栏圆角
	- `subTitleRadius`调整子标题圆角
```html
<ste-tabs
	showSubtitle
	:showTitle="false"
	background="#0090ff"
	subColor="#fff"
	activeSubColor="#0090ff"
	color="#fff"
	tabPadding="6"
	subTitleHeight="66"
	:showLine="false"
	radius="45"
	subTitleRadius="33"
>
	<ste-tab v-for="(item, index) in list1" :key="index" :subTitle="item.title" :index="index">
		<view>{{ item.title }}内容</view>
		<image style="width: 100%; height: 300px" :src="item.content" />
	</ste-tab>
</ste-tabs>
```

### API

<!-- props -->

#### Tabs Slot
|插槽名			|说明													|插槽参数	|支持版本	|
| ---				| ---													| ---			| ---			|
| `default`	| 默认插槽，请传入`ste-tab`标签列表	| -				| -				|

#### Tab Props
| 属性名					| 说明																																| 类型								| 默认值		| 可选值	|支持版本	|
| -----						| -----																															| -----							| -----		| -----	| -----		|
| `title`					| 标题																																| `String`					| -				| -			| -				|
| `subTitle`			| 子标题																															| `String`					| -				| -			| -				|
| `image`					| 图片（同image的src属性）																						| `String`					| -				| -			| -				|
| `name`					| 标签唯一标识（当tabs的active值类型为string时，作为匹配激活的标识符）	| `String`					| -				| -			| -				|
| `index`					| 标签下标（当tabs的active值类型为number时，作为匹配激活的标识符）			| `Number`					| -				| -			| -				|
| `disabled`			| 禁用当前标签																												| `Boolean`					| `false`	| -			| -				|
| `showDot`				| 是否在主标题右上角显示小红点（隐藏主标题时无法显示）									| `Boolean`					| `false`	| -			| -				|
| `badge`					| 右上角徽标的内容																										| `String`/`Number`	| `0`			| -			| -				|
| `showZeroBadge`	| 当 badge 为数字 0 时，是否展示徽标																	| `Boolean`					| `false`	| -			| -				|

#### Tab Slot
|插槽名			|说明																				|插槽参数	|支持版本	|
| ---				| ---																				| ---			| ---			|
| `default`	| 默认插槽，在插槽中的内容会展示在标签内容区域	| -				| -				|


{{xuyajun}}