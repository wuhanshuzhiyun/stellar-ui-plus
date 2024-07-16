# Badge 徽标

在右上角展示徽标数字或小红点。

{{compatibility}}

### 代码演示

#### 徽标内容

通过`content`属性，设置子元素的右上角的徽标

```html
<ste-badge content="1">
  <view class="child"></view>
</ste-badge>
<ste-badge content="99+">
  <view class="child"></view>
</ste-badge>
<ste-badge content="hot">
  <view class="child"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

#### 背景

通过`background`属性，设置徽标内容的背景

- 支持纯色、渐变色、背景图

```html
<ste-badge content="1" background="rgb(25, 137, 250)">
  <view class="avator"></view>
</ste-badge>
<ste-badge content="99+" background="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
  <view class="avator"></view>
</ste-badge>
<ste-badge
  background="https://img95.699pic.com/xsj/0a/5y/dc.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast"
>
  <view class="avator"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

#### 小红点

通过`showDot`属性，设置是否显示小红点

```html
<ste-badge showDot>
  <view class="avator"></view>
</ste-badge>
<ste-badge showDot background="rgb(25, 137, 250)">
  <view class="avator"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

#### 徽标位置

通过`position`属性，设置徽标的位置

```html
<ste-badge content="1">
  <view class="avator"></view>
</ste-badge>
<ste-badge content="1" position="topLeft">
  <view class="avator"></view>
</ste-badge>
<ste-badge content="1" position="bottomLeft">
  <view class="avator"></view>
</ste-badge>
<ste-badge content="1" position="bottomRight">
  <view class="avator"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

#### 偏移

当设置了`offsetX`或`offsetY`值时，徽标会基于当前设置徽标位置(`position`)往中心点进行偏移

```html
<ste-badge content="1" :offsetX="5" :offsetY="5">
  <view class="avator"></view>
</ste-badge>
<ste-badge content="1" position="topLeft" :offsetX="5" :offsetY="5">
  <view class="avator"></view>
</ste-badge>
<ste-badge content="1" position="bottomLeft" :offsetX="5" :offsetY="5">
  <view class="avator"></view>
</ste-badge>
<ste-badge content="1" position="bottomRight" :offsetX="5" :offsetY="5">
  <view class="avator"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

#### 为0时是否显示徽标

当`content`为`Number`类型时并且值等于`0`时，默认不会显示，如果`showZero`为`true`，则会显示

```html
<ste-badge :content="0" showZero>
  <view class="avator"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

#### 最大值

当`content`为`Number`类型时并且值大于`max`时，会显示`{{max}}+`，`max`默认值为`99`

```html
<ste-badge :content="100">
  <view class="avator"></view>
</ste-badge>
<ste-badge :content="99">
  <view class="avator"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

#### 自定义内容

通过`content`插槽，自定义徽标的内容

```html
<ste-badge>
  <template slot="content">
    <ste-icon code="&#xe676;" size="18"></ste-icon>
  </template>
  <view class="avator"></view>
</ste-badge>
<ste-badge>
  <template slot="content">
    <ste-icon code="&#xe67b;" size="12"></ste-icon>
  </template>
  <view class="avator"></view>
</ste-badge>

<style>
  .child {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
  }
</style>
```

### API

#### 组件属性(Props)

| 参数          | 说明                                                                                     | 类型            | 默认值     | 可选值                                                                      | 支持版本  |
| ------------- | ---------------------------------------------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------- | --------- |
| `content`     | 徽标内容                                                                                 | `Number/String` | -          | -                                                                           | -         |
| `background`  | 背景                                                                                     | `String`        | `#ee0a24`  | -                                                                           | -         |
| `showDot`     | 是否展示为小红点                                                                         | `Boolean`       | `true`     | -                                                                           | -         |
| `position`    | 徽标位置                                                                                 | `String`        | `topRight` | topRight：上右<br/>topLeft：上左<br/>bottomLeft：下左<br/>bottomRight：下右 | -         |
| `offsetX`     | x轴偏移量                                                                                | `Number/String` | `auto`     | -                                                                           | -         |
| `offsetY`     | y轴偏移量                                                                                | `Number/String` | `auto`     | -                                                                           | -         |
| `showZero`    | 当 content 为数字 0 或字符串 '0' 时，是否展示徽标                                        | `Boolean`       | `true`     | -                                                                           | -         |
| `max`         | 最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效，当 content 为数字 0 时不处理 | `Number`        | `99`       | 0：当 content 为数字 0 时不处理<br/>{{Number}}：超过最大值会显示 {max}+     | `v1.1.5`  |
| `showBorder`  | 是否显示边框                                                                             | `Boolean`       | `false`    | -                                                                           | `v1.9.0`  |
| `borderColor` | 边框颜色                                                                                 | `String`        | `#fff`     | -                                                                           | `v1.9.0`  |
| `zIndex`      | 层级                                                                                     | `Number`        | `2`        | -                                                                           | `v1.9.0`  |
| `isInline`    | display属性是否为inline-block                                                            | `Boolean`       | `false`    | -                                                                           | `v1.10.0` |
| `rootStyle`   | 组件root节点内联样式                                                                     | `Object`        | `{}`       | -                                                                           | `v1.13.0` |

#### 组件插槽(Slots)

| 名称    | 说明           | 支持版本 |
| ------- | -------------- | -------- |
| default | 默认插槽       | -        |
| content | 自定义徽标内容 | -        |

{{fuyuwei}}
