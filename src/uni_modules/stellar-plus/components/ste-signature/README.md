# Signature 签名

签名组件用于在页面上显示签名。

{{compatibility}}

### 代码演示
#### 基础使用
- `type` 签名保存图片类型，支持 `jpg` 和 `png`(默认) 两种格式。
	- 此处使用 `jpg` 格式。因为媒体预览背景是黑色，画笔颜色是黑色，`png`格式图片时预览看不见
```html
<template>
	<view class="signature-box">
		<ste-signature ref="signature" type="jpg" />
	</view>
	<ste-button @click="clear">清除</ste-button>
	<ste-button @click="upstep">上一步</ste-button>
	<ste-button @click="save">保存并预览</ste-button>
	<ste-media-preview :show.sync="show" :urls="urls"></ste-media-preview>
</template>
<script>
export default {
	data() {
		return {
			show: false,
			urls: [],
		};
	},
	methods: {
		clear() {
			this.$refs.signature.clear();
		},
		upstep() {
			this.$refs.signature.back();
		},
		save() {
			this.$refs.signature.save(
				(base64) => {
					this.urls = [base64];
					this.show = true;
				},
				(err) => {
					uni.showToast({
						title: err,
						icon: 'none',
					});
				}
			);
		},
	},
};
</script>
<style lang="scss" scoped>
.signature-box {
	width: 100%;
	height: 300rpx;
	background-color: #f5f5f5;
	margin-bottom: 30rpx;
}
</style>
```

#### 画笔颜色和线宽
- 属性`strokeColor`可以自定义画笔颜色，默认`#000000`(黑色)
- 属性`lineWidth`可以自定义画笔线宽，默认`3`
```html
<ste-signature strokeColor="#f0f" lineWidth="1" />
```


### API
#### 组件属性(Props)

| 属性名				| 说明					| 类型								| 默认值			| 可选值	| 支持版本	|
| ---						| ---					| ---								| ---				| ---		| ---			|
| `customClass`	| 自定义 class	| `String`					| -					| -			| -				|
| `lineWidth`		| 线条的宽度		| `Number`					| `3`				| -			| -				|
| `strokeColor`	| 线条的颜色		| `Number`					| `#000000`	| -			| -				|
| `type`				| 保存图片类型	| `String`					| `png`			| `jpg`	| -				|
| `width`				| 宽度,单位rpx	| `String`,`Number`	| `100%`		| -			| -				|
| `height`			| 高度,单位rpx	| `String`,`Number`	| `100%`		| -			| -				|


#### 组件事件(Events)

|事件名		|说明					|事件参数	|支持版本	|
|---			|---					|---			|---			|
|`start`	| 笔画开始			| -				|-				|
|`signing`| 正在书写中		| -				|-				|
|`end`		| 笔画结束			|-				|-				|

#### 组件方法(Method)

|方法名	| 说明				|方法参数										|支持版本	|
|---		|---				|---												|---			|
|`clear`| 清空画布		|-													|-				|
|`back`	| 回退				|-													|-				|
|`save`	| 保存为图片	|(base64)=>void,(err)=>void	|-				|


{{xuyajun}}