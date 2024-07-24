# Image 图片
图片组件，对原生`image`组件进行了扩展。

{{compatibility}}

### 代码演示


#### 基础用法
- 通过`src`属性设置图片地址
- 通过`width`属性设置图片宽度
- 通过`height`属性设置图片高度
- 通过`mode`属性设置图片的裁剪和拉伸

```html
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" />
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" mode="aspectFit"/>
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" mode="aspectFill"/>
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" mode="widthFix"/>
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" height="200" mode="heightFix"/>
```

#### 圆角
- 通过`radius`属性设置图片圆角属性

```html
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" radius="50%" width="200" height="200" />
```

#### 加载效果
- 通过`hiddenLoading`关闭图片加载中占位标识

```html
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const errorUrl = ref<string>()

onMounted(() => {
  setTimeout(() => {
    imgUrl.value = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
  }, 1500);
});
</script>
<template>
	<view>
		<view class="image-box">
			<ste-image :src="imgUrl" width="200" height="200" />
			<view class="msg">加载中提示</view>
		</view>
		<view class="image-box">
			<ste-image :src="imgUrl" hiddenLoading width="200" height="200" />
			<view class="msg">隐藏加载中提示</view>
		</view>
	</view>
</template>
```
#### 加载失败
- 通过`hiddenError`隐藏图片加载失败提示

```html
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const errorUrl = ref<string>()

onMounted(() => {
  setTimeout(() => {
    errorUrl.value = 'https://image.whzb.com/chain/StellarUI/none.png';
  }, 1500);
});
</script>
<template>
	<view>
		<view class="image-box">
			<ste-image :src="errorUrl" width="200" height="200" />
			<view class="msg">加载失败提示</view>
		</view>
		<view class="image-box">
			<ste-image :src="errorUrl" hiddenError width="200" height="200" />
			<view class="msg">关闭加载失败提示</view>
		</view>
	</view>
</template>
```
#### 具名插槽
- 通过`loading`具名插槽可以自定义加载中内容
- 通过`error`具名插槽可以自定义加载失败内容
```html
<ste-image :src="errorUrl" width="200" height="200">
	<template v-slot:loading>Loading...</template>
	<template v-slot:error>Error</template>
</ste-image>
```


### API
#### Props
|属性名									|说明																																																								| 类型							| 默认值						| 可选值								|支持版本						|
| ---										|---																																																								|---							|---							|---									|---								|
| `src`									| 图片源，同原生																																																			| `String`				| -								| -										|-									|
| `mode`								| 图片裁剪、缩放的模式																																																| `String`				| `"scaleToFill"`	| 见下面`Mode`表格			|-									|
| `width`								| 宽度：`Number`单位`rpx`，`String`同原生																																						| `Number/String`	| `"100%"`				| -										|-									|
| `height`							| 高度：`Number`单位`rpx`，`String`同原生																																						| `Number/String`	| `"100%"`				| -										|-									|
| `radius`							| 圆角：`Number`单位`rpx`，`String`同原生																																						| `Number/String`	| `0`							| -										|-									|
| `hiddenLoading`				| 是否隐藏图片未加载的占位内容																																												| `Boolean`				| `false`					| -										|-									|
| `hiddenError`					| 是否隐藏图片加载失败的占位内容																																																	| `Boolean`				| `false`					| -										|-									|
| `showMenuByLongpress`	| 长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单	| `Boolean`				| `false`					| -										|微信小程序`2.13.0`	|
| `lazyLoad`						| 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载																																| `Boolean`				| `false`					| -										|-									|
| `display`							| 盒子模型																																																						| `String`				| `inline-flex`		|	可选属性同css同名属性值	|-									|

##### Mode
|合法值					|说明																																																													|
| ---						|---																																																													|
| `scaleToFill`	| 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素																														|
| `aspectFit`		| 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来																			|
| `aspectFill`	| 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取	|
| `widthFix`		| 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变																																						|
| `heightFix`		| 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变																																						|


#### Events
- 您可以通过监听`load`事件，监听图片是否加载完成
- 您可以通过监听`error`事件，监听图片是否加载失败

|事件名		|说明				|事件参数	|支持版本	|
|---		|---				|---		|---		|
| `click`	| 图片点击触发		|`event`	| -			|
| `load`	| 图片加载成功触发	|`event`	| -			|
| `error`	| 图片加载失败触发	|`event`	| -			|


#### Slots
|插槽名		| 说明				| 插槽参数	| 支持版本	|
| ---		| ---				| ---		| ---		|
| `loading`	| 加载中内容插槽		|-			| -			|
| `error`	| 加载失败内容插槽	|-			| -			|


{{xuyajun}}


