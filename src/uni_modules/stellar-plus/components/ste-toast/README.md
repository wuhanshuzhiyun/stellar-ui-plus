# Toast 轻提示

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

{{compatibility}}

### 使用方法

#### 组合函数使用方法

ps：注意 目前 useToast 只能在 setup 作用域下使用  
父组件引入组件 组合函数调用showToast方法，打开轻提示

```html
<script setup lang="ts">
    import { useToast } from 'stellar-plus/composables";
    const toast = useToast();
    function click1() { toast.showToast({ title: '提示内容', }); }
</script>
```

```html
<template>
    <ste-toast></ste-toast>
    <ste-button @click="click1" :width="400">提示内容</ste-button>
</template>
```

#### Ref用法

父组件引入组件 绑定ref 通过ref调用showToast方法，打开轻提示

```html
<template>
    <ste-toast ref="toast"></ste-toast>
</template>
```

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let toast = ref();
    toast.value.showToast({
        title: '提示内容',
    });
</script>
```

#### 全局引入

配合 [https://github.com/smartXJ/vue3-inset-loader](https://github.com/smartXJ/vue3-inset-loader) 插件， 将 ste-toast 节点置于每个页面中，可以更进一步简化使用

```json
insetLoader: {
        config: {
            toast: "<ste-toast ref='toast'></ste-toast>",
        },
        // 全局配置
        label: ['toast'],
        rootEle: '.*',
}
```

#### 文字提示

`title`为提示内容，提示弹窗根据内容自动撑开，最大宽度为260px，超过自动换行，也可手动插入换行符`\n`

```javascript
click1() {
	this.showToast({
		title: '提示内容',
	});
},
click2() {
	this.showToast({
		title: '多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，',
	});
},
click3() {
	this.showToast({
		title: '换行\n内容',
	});
},
```

### 提示类型

`icon`为固定的图标类型，默认为`success`，为`loading`时，弹窗不会自动关闭，需手动关闭弹窗，使用`hideToast`方法

-   `success`：显示成功图标
-   `error`：显示失败图标
-   `loading`：显示加载图标
-   `none`：无图标

```javascript
click4() {
	this.showToast({
		title: '提示内容',
	});
},
click5() {
	this.showToast({
		title: '提示内容',
		icon: 'error',
	});
},
click6() {
	this.showToast({
		title: '提示内容',
		icon: 'loading',
	});
},
click7() {
	this.showToast({
		title: '提示内容',
		icon: 'none',
	});
},
```

`image`为自定义图标的路径，image 的优先级高于 icon

```javascript
click8() {
	this.showToast({
		title: '提示内容',
		image: 'https://image.whzb.com/chain/StellarUI/组件图标/loading.png',
	});
},
```

### 遮罩层

`mask`为是否显示透明蒙层，防止触摸穿透，默认为`false`

```javascript
click9() {
	this.showToast({
		title: '提示内容',
		mask: true,
		duration: 5000,
	});
},
```

### 延迟时间

`duration`为提示的延迟时间，单位ms 值为 0 时，toast 不会自动消失（loading 类型默认为 0）

```javascript
click10() {
	this.showToast({
		title: '提示内容',
		duration: 5000,
	});
},
```

### 回调事件

-   `success`：提示打开成功的回调函数
-   `fail`：提示打开失败的回调函数
-   `complete`：提示结束的回调函数（提示打开、失败都会执行）
-   `close`：提示关闭的的回调函数

```javascript
click11() {
	this.showToast({
		title: '提示内容',
		success() {
			setTimeout(() => {
				this.showToast({
					title: '成功',
					icon: 'none',
				});
			}, 2000);
		},
	});
},
click12() {
	this.showToast({
		title: '提示内容',
		complete() {
			setTimeout(() => {
				this.showToast({
					title: '结束',
					icon: 'none',
				});
			}, 2000);
		},
	});
},
click13() {
	this.showToast({
		title: '提示内容',
		close() {
			this.showToast({
				title: '关闭',
				icon: 'none',
			});
		},
	});
},
```

### API

<!-- props -->

#### Methods

| 方法名      | 说明         | 方法参数    | 支持版本 |
| ----------- | ------------ | ----------- | -------- |
| `showToast` | 提示打开函数 | `props`属性 | -        |
| `hideToast` | 关闭提示函数 | -           | -        |

{{qinpengfei}}
