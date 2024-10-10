# Image 图片

图片组件，对原生`image`组件进行了扩展。

{{compatibility}}

### 代码演示

#### 基础用法

-   通过`src`属性设置图片地址
-   通过`width`属性设置图片宽度
-   通过`height`属性设置图片高度
-   通过`mode`属性设置图片的裁剪和拉伸

```html
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" />
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" mode="aspectFit" />
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" height="200" mode="aspectFill" />
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="200" mode="widthFix" />
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" height="200" mode="heightFix" />
```

#### 圆角

-   通过`radius`属性设置图片圆角属性

```html
<ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" radius="50%" width="200" height="200" />
```

#### 加载效果

-   通过`hiddenLoading`关闭图片加载中占位标识

```html
<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const errorUrl = ref<string>();

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

-   通过`hiddenError`隐藏图片加载失败提示

```html
<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const errorUrl = ref<string>();

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

-   通过`loading`具名插槽可以自定义加载中内容
-   通过`error`具名插槽可以自定义加载失败内容

```html
<ste-image :src="errorUrl" width="200" height="200">
    <template v-slot:loading>Loading...</template>
    <template v-slot:error>Error</template>
</ste-image>
```

### API

<!-- props -->

#### Slots

| 插槽名    | 说明             | 插槽参数 | 支持版本 |
| --------- | ---------------- | -------- | -------- |
| `loading` | 加载中内容插槽   | -        | -        |
| `error`   | 加载失败内容插槽 | -        | -        |

{{xuyajun}}
