# TouchSwipe 手势切屏
手势切屏组件，支持水平手势切换和垂直手势切换。

{{compatibility}}


### JavaScript
```html
<script setup lang="ts">
import { ref } from "vue"

const hIndex = ref(0)
const vIndex = ref(0)
const imgs = [
    'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
    'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
    'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
    'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
]

function hUp() {
    if (hIndex.value === 0) return;
    hIndex.value -= 1;
}
function hNext() {
    if (hIndex.value === imgs.length - 1) return;
    hIndex.value += 1;
}
function vUp() {
    if (vIndex.value === 0) return;
    vIndex.value -= 1;
}
function vNext() {
    if (vIndex.value === imgs.length - 1) return;
    vIndex.value += 1;
}
</script>
```

#### 水平切换，固定宽度
- 外层使用`ste-touch-swipe`父标签包裹
	- `index`属性设置当前激活区域，支持`v-model`双向绑定
	- `width`属性设置区域宽度，默认`100%`
- 内层使用`ste-touch-swipe-item`子标签包裹每一块区域的内容


```html
<ste-touch-swipe width="690" v-model:index="hIndex">
	<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
		<image :src="img" mode="widthFix" style="width: 100%" />
	</ste-touch-swipe-item>
</ste-touch-swipe>
```
#### 垂直切换，固定高度
- 外层使用`ste-touch-swipe`父标签包裹
	- `height`属性设置区域高度，默认`100%`
- 内层使用`ste-touch-swipe-item`子标签包裹每一块区域的内容


```html
<ste-touch-swipe height="600" direction="vertical" v-model:index="vIndex">
	<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
		<image :src="img" mode="heightFix" style="height: 100%" />
	</ste-touch-swipe-item>
</ste-touch-swipe>
```


### API
<!-- props -->

### touch-swipe-item Props

| 参数       | 说明                                             | 类型      | 默认值  | 可选值 |
| ---------- | ------------------------------------------------ | --------- | ------- | ------ |
| `disabled` | 是否禁用当前子元素（禁用后无法滑动到当前子元素） | `Boolean` | `false` | ---    |


{{xuyajun}}