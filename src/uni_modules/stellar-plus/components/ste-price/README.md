# Price 价格

用于页面上显示价格的组件

{{compatibility}}

### 代码演示

#### 金额单位

-   默认金额单位为分，会将`value`值除以`100`
-   金额单位为元时，`valueUnit`赋值`yuan`，此时将只显示元的部分

```html
<ste-price value="9527" />
<ste-price value="9527" valueUnit="yuan" />
```

#### 隐藏金额符号

-   使用`showUnit`可以控制金额符号是否显示

```html
<ste-price value="9527" :showUnit="false" />
```

#### 自定义金额符号

-   使用`unitSymbol`可以自定义金额符号

```html
<ste-price value="9527" unitSymbol="$" />
```

#### 自定义精度

-   使用`digits`可以自定义精度

```html
<ste-price value="9520" :digits="1" />
```

#### 金额文字尺寸

金额文字尺寸单位为`rpx`

```html
<ste-price value="9527" fontSize="50" />
```

#### 金额文字颜色

```html
<ste-price value="9527" color="green" />
```

#### 划线价 & 划线价颜色

-   划线价颜色属性只在开启了划线价模式时才生效

```html
<ste-price value="9527" isSuggestPrice />
<ste-price value="9527" isSuggestPrice linePriceColor="#666666" />
```

#### 金额样式

-   当`styleType`值为`1`时，数字字号统一，

    -   当数字字号<=`40rpx`，则价格符号字号为`20rpx`
    -   当数字字号＞`40rpx`,则价格符号字号为数字字号减`20rpx`

-   当`styleType`值为`2`时
    -   当小数点前数字字号≤`28rpx` 所有部分展示字号统一
    -   当`28rpx`＜小数点前数字字号≤`40rpx`则其余部分字号为`20rpx`
    -   当小数点前数字字号＞`40rpx`则其余部分字号为小数点前数字字号减`20rpx`
-   当`styleType`值为`3`时，全部字号统一

```html
<ste-price value="9527" :styleType="1" fontSize="20" />
<ste-price value="9527" :styleType="1" fontSize="40" />
<ste-price value="9527" :styleType="1" fontSize="60" />

<ste-price value="9527" :styleType="2" fontSize="28" />
<ste-price value="9527" :styleType="2" fontSize="40" />
<ste-price value="9527" :styleType="2" fontSize="60" />

<ste-price value="9527" :styleType="3" />
```

#### 金额字重

-   当`bold`为`true`时，金额文本为粗体字

```html
<ste-price value="9527" bold fontSize="50" />
```

### API

<!-- props -->

{{fuyuwei}}

{{xuyajun}}

{{qinpengfei}}
