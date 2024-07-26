# Icon 图标

基于字体的图标集，包含了大多数常见场景的图标

{{compatibility}}

## 代码演示

### 基础用法

通过 `code` 属性来指定需要使用的图标，Stellar 组件使用[iconfont 做图标库](https://at.alicdn.com/t/c/font_4041637_pivqtx3f1mq.json?spm=a313x.manage_type_myprojects.i1.49.f7ba3a81fFvJ6W&file=font_4041637_pivqtx3f1mq.json)，
可以直接传入对应的编码来使用

```html
<ste-icon code="&#xe653;"></ste-icon>
```

### 图标颜色

通过 `color` 属性来设置图标的颜色

```html
<ste-icon code="&#xe684;" color="#1989fa" size="60" marginRight="30"></ste-icon>
<ste-icon code="&#xe684;" color="#ee0a24" size="60"></ste-icon>
```

### 图标大小

通过 `size` 属性来设置图标的尺寸大小，单位为 rpx，默认`28`

```html
<ste-icon code="&#xe671;" marginRight="30"></ste-icon>
<ste-icon code="&#xe671;" marginRight="30" size="50"></ste-icon>
<ste-icon code="&#xe671;" marginRight="30" size="70"></ste-icon>
```

### 图标是否粗体

通过 `bold` 属性来设置图标是否粗体，默认`false`

```html
<ste-icon code="&#xe673;" marginRight="30"></ste-icon>
<ste-icon code="&#xe673;" bold></ste-icon>
```

### 自定义图标

如果需要在现有 `Icon` 的基础上使用更多图标，可以引入第三方 `iconfont` 对应的字体文件和 `CSS` 文件，之后就可以在 `Icon` 组件中直接使用。

```css
/* 引入第三方或自定义的字体图标样式 */
@font-face {
    font-family: 'iconfont'; /* Project id 2344394 */
    src: url('//at.alicdn.com/t/c/font_2344394_nltp3ggc4q.woff2?t=1709779088427') format('woff2');
}
```

```html
<!-- 通过 class-prefix 指定类名为 font-family属性的值：如iconfont -->
<ste-icon fontFamily="iconfont" code="&#xe6cc;" />
```

### API

#### Props

| 属性名         | 说明                 | 类型            | 默认值  | 可选值                                            | 支持版本 |
| -------------- | -------------------- | --------------- | ------- | ------------------------------------------------- | -------- |
| `code`         | 图标编码             | `String`        | 必填    | -                                                 | -        |
| `color`        | 图标颜色             | `String`        | -       | -                                                 | -        |
| `size`         | 图标大小（单位 rpx） | `Number/String` | `28`    | -                                                 | -        |
| `bold`         | 图标是否粗体         | `Boolean`       | `false` | -                                                 | -        |
| `marginLeft`   | 左外边距（单位 rpx） | `Number/String` | `0`     | -                                                 | -        |
| `marginRight`  | 右外边距（单位 rpx） | `Number/String` | `0`     | -                                                 | -        |
| `marginTop`    | 上外边距（单位 rpx） | `Number/String` | `0`     | -                                                 | -        |
| `marginBottom` | 下外边距（单位 rpx） | `Number/String` | `0`     | -                                                 | -        |
| `fontFamily`   | 字体名               | `String`        | -       | -                                                 | -        |
| `inlineBlock`  | 容器对齐方式         | `Boolean`       | `true`  | `true`：`inline-block` <br>`false`：`inline-flex` | `1.1.6`  |

#### Events

| 事件名  | 说明             | 事件参数 | 支持版本 |
| ------- | ---------------- | -------- | -------- |
| `click` | 图标点击回调事件 | -        | -        |

{{zyy}}

{{qinpengfei}}
