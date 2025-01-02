# Button 按钮

基础按钮组件

---$

### 代码演示

#### 按钮大小

通过`mode`设置按钮的大小，默认值是`200`

```html
<ste-button :mode="400">超大按钮</ste-button>
<ste-button :mode="300">大按钮</ste-button>
<ste-button>中按钮</ste-button>
<ste-button :mode="100">小按钮</ste-button>
```

#### 文本颜色

通过`color`设置字体颜色

```html
<ste-button :color="'#000000'">文本颜色按钮</ste-button>
```

#### 背景

通过`background`设置背景，支持纯颜色、背景图、渐变色

```html
<ste-button background="#ff1e19">按钮</ste-button>
<ste-button background="https://image.whzb.com/chain/StellarUI/image/精选会员瓷片.png">背景图</ste-button>
<ste-button background="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">渐变色</ste-button>
```

#### 边框颜色

通过`borderColor`设置边框颜色，默认值是`#ffffff`

```html
<ste-button borderColor="#ff1e19">文本颜色按钮</ste-button>
```

#### 宽度

通过`width`设置宽度，默认值是`auto`

-   设置值为`100%`，填满父容器
-   设置具体值时，按具体数值的宽度，单位是rpx

```html
<ste-button width="100%">宽度填满</ste-button>
<ste-button width="500">自定义宽度-500rpx</ste-button>
<ste-button>自适应宽度</ste-button>
```

#### 圆角按钮

通过`round`设置按钮是否为圆角，默认值是`true`

```html
<ste-button>圆角按钮</ste-button>
<ste-button :round="false">非圆角按钮</ste-button>
```

#### 禁止按钮

通过`disabled`设置按钮是否禁止，默认值是`false`

```html
<ste-button disabled>禁止按钮</ste-button>
```

#### 加载中

通过`loading`设置是否加载中，默认值是`false`

-   `loading`值是`true`时不允许点击，且按钮内容会变成`加载中......`

```html
<ste-button loading>按钮</ste-button>
```

#### 插槽

```html
<ste-button>
    <text style="display: inline-block">
        <ste-icon code="&#xe68f;" :size="32" :color="'#ffffff'" :marginRight="8"></ste-icon>
    </text>
    <text>购卡</text>
</ste-button>
<ste-button>提交订单</ste-button>
```

#### 超长文字

```html
<ste-button width="100%">提交-按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮</ste-button>
```

---$

### API

<!-- props -->

#### Slots

| 插槽名    | 说明     | 插槽参数 | 支持版本 |
| --------- | -------- | -------- | -------- |
| `default` | 按钮内容 | -        | -        |

---$
{{fuyuwei}}

{{qinpengfei}}
