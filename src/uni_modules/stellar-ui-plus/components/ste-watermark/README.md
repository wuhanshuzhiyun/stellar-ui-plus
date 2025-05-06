# Watermark 水印

基础水印组件

---$

### 代码演示

#### 基础用法

默认水印会覆盖整个页面，若想局部使用可配置`fullPage`属性

```html
<template>
    <ste-watermark></ste-watermark>
</template>
```

#### 多行水印

使用 "content" 设置一个字符串数组来指定多行文本水印内容

```html
<template>
    <view class="item-block" style="height: 150px; width: 400px">
        <ste-watermark :content="['watermark+', 'ste-watermark']" :fullPage="false"></ste-watermark>
    </view>
</template>
```

#### 图片水印

通过 'image' 指定图像地址。 为了确保图像清晰展示而不是被拉伸，请设置宽度和高度，建议使用至少两倍的宽度和高度的图片来保证显示效果。

```html
<template>
    <view class="item-block" style="height: 150px; width: 400px">
        <ste-watermark image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original" :full-page="false"></ste-watermark>
    </view>
</template>
```

---$

### API

<!-- props -->

#### Font Props

| 属性名       | 说明     | 类型     | 默认值            | 可选值                            | 支持版本  |
| ------------ | -------- | -------- | ----------------- | --------------------------------- | --------- |
| `color`      | 字体颜色 | `String` | `rgba(0,0,0,.15)` | -                                 | `v1.18.3` |
| `fontSize`   | 字体大小 | `number` | `16`              | -                                 | `v1.18.3` |
| `fontWeight` | 字重     | `enum`   | `normal`          | `normal、light、weight、number`   | `v1.18.3` |
| `fontFamily` | 字体     | `string` | `sans-serif`      | -                                 | `v1.18.3` |
| `fontStyle`  | 字体样式 | `enum`   | `normal`          | `none、normal、italic、oblique`   | `v1.18.3` |
| `textAlign`  | 文本对齐 | `enum`   | `center`          | `left、right、center、start、end` | `v1.18.3` |

---$
{{fuyuwei}}

{{xiongjinyan}}
