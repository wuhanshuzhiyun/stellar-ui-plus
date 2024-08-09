# Upload 上传
支持图片上传、视频上传、其他文件上传（仅微信小程序和H5）。

{{compatibility}}


#### 基础用法
- `v-model`双向绑定接收一个对象数组，对象包含以下属性
	- `url`：文件路径（与path二选一必须）
	- `path`：本地文件路径（与url二选一必须）
	- `name`：文件名（可选）
	- `type`：文件类型；可选值为`video`、`image`、`file`（可选）
	- `size`：文件大小（可选）
	- `status`：文件上传状态；可选值为`uploading`、`error`、`success`（可选，默认为`success`）
	- `thumbPath`：视频首帧图片（类型为`video`时必需）
	- `width`：视频宽度（可选）
	- `height`：视频高度（可选）
	- `duration`：视频时长（可选）
- `@read`事件在文件读取完成后调用，回调参数为选取到的文件对象列表，对象包含以下属性
	- `path`：本地文件路径
	- `name`：文件名称（小程序都是`null`）
	- `type`：文件类型
	- `size`：文件大小
	- `thumbPath`：视频首帧图片（类型为`video`时提供）
	- `width`：视频宽度（类型为`video`时提供）
	- `height`：视频高度（类型为`video`时提供）
	- `duration`：视频时长（类型为`video`时提供）
	- `file`：当前文件对象（H5平台专属）


```html
<ste-upload v-model="fileList" @read="onRead" />

<script>
export default {
	data() {
		return {
			fileList: [],
		};
	},
	methods: {
		onRead(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					if (Math.random() > 0.5) {
						item.status = 'success';
					} else {
						item.status = 'error';
					}
				});
			}, 1000);
		},
	}
};
</script>
```


#### 文件类型，多选
- `accept`属性可以设置选择文件类型：可选值有
	- `image`：图片类型（默认）
	- `video`：视频类型
	- `media`：视频和图片类型（支付宝需手动切换）
	- `all`：所有类型（微信小程序和H5可用）
	- `file`：除了图片和视频之外的其他类型（仅微信小程序可用）


```html
<ste-upload v-model="fileList1" @read="onRead1" accept="media" multiple />

<script>
export default {
	data() {
		return {
			fileList1: [],
		};
	},
	methods: {
		onRead1(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
	}
};
</script>
```

#### 限制上传数量
- `maxCount`属性可以设置最大上传数量，超出数量后，无法继续选择文件
```html
<ste-upload v-model="fileList2" :maxCount="2" />

<script>
export default {
	data() {
		return {
			fileList2: [],
		};
	},
	watch: {
		fileList2(fileList) {
			setTimeout(() => {
				fileList.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
	}
};
</script>
```
#### 限制文件大小
- `maxSize`属性可以设置可上传文件的大小，超出大小无法选择
```html
<ste-upload v-model="fileList3" :maxSize="2048" />
```
#### 自定义上传样式
- 默认插槽可自定义上传按钮样式
```html
<ste-upload v-model="fileList4">
	<button type="primary" size="mini" style="padding: 0 10px">上传文件</button>
</ste-upload>
```
#### 自定义预览图层
- 具名插槽`preview-cover`可自定义每一份文件的预览图层样式
```html
<ste-upload v-model="fileList5">
	<template v-slot:preview-cover="{ item }">
		<view class="item-preview">size:{{ item.size }}b</view>
	</template>
</ste-upload>
<style>
.item-preview {
	position: absolute;
	z-index: 10;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
}
</style>
```

#### 读取文件前置处理
- 事件`beforeRead`在文件选择前触发，参数如下：
	- 第一个参数为正在读取的`fileList`
	- 第二个参数是回调函数`suspend`，调用暂停读取
	- 第三个参数是回调函数`next`，调用继续读取
	- 第四个参数是回调函数`stop`，调用阻止读取
	- 
```html
<ste-upload @beforeRead="beforeRead" @read="onSuccessRead"></ste-upload>

<script>
export default{
	methods:{
		beforeRead(fileList, suspend, next, stop) {
			suspend();
			this.showToast({ title: 'suspend-read', icon: 'none' });
			setTimeout(() => {
				next();
			}, 2000);
		},
		onSuccessRead(fileList) {
			this.showToast({ title: 'success-read', icon: 'none' });
		},
	}
}
</script>
```

#### 删除前置处理
- 事件`beforeDelete`在文件选择前触发，参数如下：
	- 第一个参数为正在删除的`index`
	- 第二个参数是回调函数`suspend`，调用暂停删除
	- 第三个参数是回调函数`next`，调用继续删除
	- 第四个参数是回调函数`stop`，调用阻止删除
```html
<ste-upload v-model="fileList6" @beforeDelete="beforeDelete" @delete="onSuccessDelete"></ste-upload>

<script>
export default{
	watch:{
		fileList6(v) {
			setTimeout(() => {
				v.forEach((item) => {
					item.status = 'success';
				});
			}, 1000);
		},
	},
	methods:{
		beforeDelete(index, suspend, next, stop) {
			suspend();
			this.showToast({ title: 'suspend-delete', icon: 'none' });
			setTimeout(() => {
				next();
			}, 2000);
		},
		onSuccessDelete(index, fileList) {
			this.showToast({ title: 'success-delete', icon: 'none' });
		},
	}
}
</script>

```


### API
### Props

| 参数							| 说明																																| 类型												| 默认值									| 可选值												|
| --								| --																																| --												| --										| --													|
| `v-model`					| 已经上传的文件列表，`File`类型见下方说明														| `Array<File>`							| `[]`									| -														|
| `accept`					| 文件类型																														| `String`									| `'image'`							| 见下方说明										|
| `capture`					| 图片或者视频选取模式,当`accept`为`image`/`video`/`media`类型时生效	| `Array<"album"/"camera">`	| `['album', 'camera']`	| -														|
| `camera`					| 相机类型 当 `accept` 为 `image` / `video` / `media` 时生效					| `String`									| `back`								| `back`:后置<br/>`front`:前置	|
| `compressed`			| 当 `accept` 为 `image` / `video` / `media` 时生效，是否压缩视频			| `String`									| `true`								| -														|
| `maxDuration`			| 当 `accept` 为 `video`/ `media` 时生效，拍摄视频最长拍摄时间，单位秒	| `Number`									| `60`									| -														|
| `previewWidth`		| 预览图和上传区域的宽度，单位为rpx																		| `String`/`Number`					| `200`									| -														|
| `previewHeight`		| 预览图和上传区域的高度，单位为rpx																		| `String`/`Number`					| `200`									| -														|
| `previewImage`		| 是否在选择完成后展示预览图																					| `Boolean`									| `true`								| -														|
| `previewFullImage`| 是否在点击预览图后展示全屏图片预览																	| `Boolean`									| `true`								| -														|
| `multiple`				| 是否支持多选文件，部分安卓机型不支持																| `Boolean`									| `false`								| -														|
| `disabled`				| 是否禁用																														| `Boolean`									| `false`								| -														|
| `showUpload`			| 是否展示文件上传按钮																								| `Boolean`									| `true`								| -														|
| `deletable`				| 是否展示删除文件按钮																								| `Boolean`									| `true`								| -														|
| `maxSize`					| 文件大小限制，单位为kb，0为不限制																		| `Number`									| `0`										| -														|
| `maxCount`				| 最大上传文件数量																										| `Number`									| `9`										| -														|
| `uploadIcon`			| 上传按钮图标,同`icon`组件`code`																		| `String`									| `'&#xe69b;'`					| -														|
| `uploadText`			| 上传按钮文字																												| `String`									| `'点击上传'`						| -														|
| `radius`					| 圆角弧度，单位为rpx																								| `String`/`Number`					| `9`										| -														|
| `flexWrap`				| 超出内容是否换行																										| `String`									| `wrap`								| 同css的`flex-wrap`							|

#### File对象
| Key					| 类型			| 说明																												| 可选值															|
| --					| --			| --																												| --																|
| `url`				|	`String`|	文件URL																										|-																	|
|	`type`			|	`String`|	文件类型																										|-																	|
|	`name`			|	`String`|	文件名称																										|-																	|
|	`status`		|	`String`|	文件状态																										|`'uploading'`/`'error'`/`'success'`|
|	`path`			|	`String`|	文件本地路径（小程序选择时的本地路径），在没有URL时展示此字段	|-																	|
|	`thumbPath`	|	`String`|	视频类型文件的首帧图片地址																	|-																	|

#### accept 可选可选值值
| 可选值		| 说明																												|
| --				| --																												|
| `'image'`	|	图片（默认）																								|
| `'video'`	|	视频类型																										|
| `'media'`	|	媒体类型（可选择图片和视频）																|
| `'file'`	|	从聊天记录中选取图片视频之外的文件类型（仅微信小程序生效）		|
| `'all'`		|	选取全部类型文件（微信小程序从聊天记录中选取，支付宝不生效）	|


### Event

| 事件名				| 说明									| 事件参数																							|
| --------			| ------------				| -------------																				|
| `beforeRead`	| 文件读取前触发				| 上方详细说明																					|
| `read`				| 文件读完成触发				| `fileList`:选择的文件列表														|
| `oversize`		| 文件大小超出限制触发	| `file`:超出限制的第一个文件,`fileList`:选择的文件列表	|
| `beforeDelete`| 文件删除前触发				| 上方详细说明																					|
| `delete`			| 文件删除后触发				| `index`:删除的文件下标,`fileList`:剩余文件列表				|


{{xuyajun}}