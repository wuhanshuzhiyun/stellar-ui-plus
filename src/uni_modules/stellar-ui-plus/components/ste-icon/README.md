# Icon 图标

基于字体的图标集，包含了大多数常见场景的图标

---$

## 代码演示

### 基础用法

通过 `code` 属性来指定需要使用的图标，Stellar 组件使用[iconfont 做图标库](https://at.alicdn.com/t/c/font_4041637_pivqtx3f1mq.json?spm=a313x.manage_type_myprojects.i1.49.f7ba3a81fFvJ6W&file=font_4041637_pivqtx3f1mq.json)，
可以直接传入对应的编码来使用

```html
<template>
    <ste-icon code="&#xe684;"></ste-icon>
</template>
```

### 图标颜色

通过 `color` 属性来设置图标的颜色

```html
<template>
    <ste-icon code="&#xe684;" color="#1989fa" :size="60" marginRight="30"></ste-icon>
    <ste-icon code="&#xe684;" color="#ee0a24" :size="60"></ste-icon>
</template>
```

### 图标大小

通过 `size` 属性来设置图标的尺寸大小，单位为 rpx，默认`28`

```html
<template>
    <ste-icon code="&#xe684;" marginRight="30"></ste-icon>
    <ste-icon code="&#xe684;" marginRight="30" :size="50"></ste-icon>
    <ste-icon code="&#xe684;" marginRight="30" :size="70"></ste-icon>
</template>
```

### 图标是否粗体

通过 `bold` 属性来设置图标是否粗体，默认`false`

```html
<template>
    <ste-icon code="&#xe684;" marginRight="30"></ste-icon>
    <ste-icon code="&#xe684;" bold></ste-icon>
</template>
```

### 自定义图标

如果需要在现有 `Icon` 的基础上使用更多图标，可以引入第三方 `iconfont` 对应的字体文件和 `CSS` 文件，之后就可以在 `Icon` 组件中直接使用，默认为`ste-iconfont-1709689042473`。

```html
<template>
    <!-- 通过 class-prefix 指定类名为 font-family属性的值：如iconfont -->
    <ste-icon fontFamily="iconfont" code="&#xe6cc;" />
</template>
<style>
    /* 引入第三方或自定义的字体图标样式 */
    @font-face {
        font-family: 'iconfont'; /* Project id 2344394 */
        src: url('//at.alicdn.com/t/c/font_2344394_nltp3ggc4q.woff2?t=1709779088427') format('woff2');
    }
</style>
```

---$

### API

<!-- props -->

---$
{{zyy}}

{{qinpengfei}}
