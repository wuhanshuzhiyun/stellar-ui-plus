# Badge 徽标

在右上角展示徽标数字或小红点。

---$

### 代码演示

-   以下代码公共样式

```css
.avator {
    height: 80rpx;
    width: 80rpx;
    border-radius: 8rpx;
    background-color: #f2f3f5;
}
```

#### 徽标内容

通过`content`属性，设置子元素的右上角的徽标

```html
<ste-badge content="1">
    <view class="avator"></view>
</ste-badge>
<ste-badge content="99+">
    <view class="avator"></view>
</ste-badge>
<ste-badge content="hot">
    <view class="avator"></view>
</ste-badge>
```

#### 背景

通过`background`属性，设置徽标内容的背景

-   支持纯色、渐变色、背景图

```html
<ste-badge content="1" background="rgb(19, 183, 22)">
    <view class="avator"></view>
</ste-badge>
<ste-badge content="99+" background="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
    <view class="avator"></view>
</ste-badge>
<ste-badge content="" showZero background="https://image.whzb.com/chain/StellarUI/image/fire.png">
    <view class="avator"></view>
</ste-badge>
```

#### 小红点

通过`showDot`属性，设置是否显示小红点

```html
<ste-badge showDot>
    <view class="avator"></view>
</ste-badge>
<ste-badge showDot background="rgb(19, 183, 22)">
    <view class="avator"></view>
</ste-badge>
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
```

#### 为0时是否显示徽标

当`content`为`Number`类型时并且值等于`0`时，默认不会显示，如果`showZero`为`true`，则会显示

```html
<ste-badge :content="0" showZero>
    <view class="avator"></view>
</ste-badge>
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
```

#### 自定义内容

通过`content`插槽，自定义徽标的内容

```html
<ste-badge>
    <template #content>
        <ste-icon code="&#xe676;" size="18"></ste-icon>
    </template>
    <view class="avator"></view>
</ste-badge>
<ste-badge>
    <template #content>
        <ste-icon code="&#xe67b;" size="12"></ste-icon>
    </template>
    <view class="avator"></view>
</ste-badge>
```

---$

### API

<!-- props -->

#### 组件插槽(Slots)

| 名称    | 说明           | 支持版本 |
| ------- | -------------- | -------- |
| default | 默认插槽       | -        |
| content | 自定义徽标内容 | -        |

---$

{{fuyuwei}}
