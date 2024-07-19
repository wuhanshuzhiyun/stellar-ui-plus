# Button 按钮

基础按钮组件

{{compatibility}}

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
<ste-button color="#000000">文本颜色按钮</ste-button>
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

- 设置值为`100%`，填满父容器
- 设置具体值时，按具体数值的宽度，单位是rpx

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

- `loading`值是`true`时不允许点击，且按钮内容会变成`加载中......`

```html
<ste-button loading>按钮</ste-button>
```

#### 插槽

```html
<ste-button>
  <text style="display: inline-block">
    <ste-icon code="&#xe68f;" :size="32" color="#ffffff" :marginRight="8"></ste-icon>
  </text>
  <text>购卡</text>
</ste-button>
<ste-button>提交订单</ste-button>
```

#### 超长文字

```html
<ste-button width="100%">提交-按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮</ste-button>
```

### API

#### Props

| 参数              | 说明                                                                                                                                                                                                                                           | 类型            | 默认值      | 可选值                                                                        | 支持版本 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------- | ----------------------------------------------------------------------------- | -------- |
| `mode`            | 尺寸                                                                                                                                                                                                                                           | `Number`        | `200`       | `100`：小<br/>`200`：中<br/>`300`：大<br/>`400`：超大                         | -        |
| `color`           | 文本颜色                                                                                                                                                                                                                                       | `String`        | `"#ffffff"` | -                                                                             | -        |
| `background`      | 背景                                                                                                                                                                                                                                           | `String`        | `"#0091ff"` | -                                                                             | -        |
| `borderColor`     | 边框颜色                                                                                                                                                                                                                                       | `String`        | -           | -                                                                             | -        |
| `width`           | 宽度                                                                                                                                                                                                                                           | `Number/String` | `"auto"`    | `"auto"`： 自适应宽度<br/>`"100%"`：填满<br/>`{{Number}}`：自定义宽度 单位rpx | -        |
| `round`           | 是否圆角按钮，圆角度数(48)                                                                                                                                                                                                                     | `Boolean`       | `true`      | -                                                                             | -        |
| `disabled`        | 是否禁用状态                                                                                                                                                                                                                                   | `Boolean`       | `false`     | -                                                                             | -        |
| `loading`         | 是否加载中状态                                                                                                                                                                                                                                 | `Boolean`       | `false`     | -                                                                             | -        |
| `openType`        | 微信开放能力，具体支持可参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) <br/> 支付宝开放能力，具体支持可参考 [支付宝官方文档](https://opendocs.alipay.com/mini/component/button?pathHash=e0342ed0) | `String`        | -           | -                                                                             | `1.1.4`  |
| `scope`           | 支付宝开放能力，当 openType 为 getAuthorize 时有效，具体支持可参考 [支付宝官方文档](https://opendocs.alipay.com/mini/component/button?pathHash=e0342ed0)                                                                                       | `String`        | -           | -                                                                             | `1.1.4`  |
| `rootStyle`       | 按钮样式                                                                                                                                                                                                                                       | `Object`        | -           | -                                                                             | `1.1.4`  |
| `stopPropagation` | 是否阻止冒泡行为                                                                                                                                                                                                                               | `Boolean`       | `true`      | -                                                                             | `1.1.8`  |

#### Events

| 事件名                     | 说明                                                                                                                                                                                                                                                                                         | 事件参数 | 支持版本 |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| `click`                    | 点击                                                                                                                                                                                                                                                                                         | -        | -        |
| `getuserinfo`              | 微信小程序：用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 wx.getUserInfo。<br/>支付宝小程序：当 open-type 为 getAuthorize 且 scope 为 userInfo 时有效。当授权成功时触发。                                                                                     | `event`  | `1.1.4`  |
| `contact`                  | 微信小程序：客服消息回调，open-type="contact"时有效。                                                                                                                                                                                                                                        | `event`  | `1.1.4`  |
| `getphonenumber`           | 微信小程序：手机号快速验证回调，open-type=getPhoneNumber时有效。Tips：在触发 bindgetphonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。<br/>支付宝小程序：当 open-type 为 getAuthorize 且 scope 为 phoneNumber 时有效。当授权成功时触发。 | `event`  | `1.1.4`  |
| `getrealtimephonenumber`   | 微信小程序：手机号实时验证回调，open-type=getRealtimePhoneNumber 时有效。Tips：在触发 bindgetrealtimephonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。                                                                                  | `event`  | `1.1.4`  |
| `greeprivacyauthorization` | 微信小程序：用户同意隐私协议事件回调，open-type=agreePrivacyAuthorization时有效 （Tips: 如果使用 onNeedPrivacyAuthorization 接口，需要在 bindagreeprivacyauthorization 触发后再调用 resolve({ event: "agree", buttonId })）                                                                  | `event`  | `1.1.4`  |
| `error`                    | 微信小程序：当使用开放能力时，发生错误的回调，open-type=launchApp时有效。 <br/>支付宝小程序：当 open-type 为 getAuthorize 时有效。当授权失败时触发。event.detail = {type, errorMessage}，此时 type 的值为 getAuthorize。                                                                     | `event`  | `1.1.4`  |
| `launchapp`                | 微信小程序：打开 APP 成功的回调，open-type=launchApp时有效                                                                                                                                                                                                                                   | `event`  | `1.1.4`  |
| `opensetting`              | 微信小程序：在打开授权设置页后回调，open-type=openSetting时有效                                                                                                                                                                                                                              | `event`  | `1.1.4`  |
| `chooseavatar`             | 微信小程序：获取用户头像回调，open-type=chooseAvatar时有效。返回 e.detail.avatarUrl 为头像临时文件链接。                                                                                                                                                                                     | `event`  | `1.1.4`  |
| `getAuthorize`             | 支付宝小程序：当 open-type 为 getAuthorize 时有效。当授权成功时触发。                                                                                                                                                                                                                        | `event`  | `1.1.4`  |
| `followLifestyle`          | 支付宝小程序：当 open-type 为 lifestyle 时有效。当点击按钮时触发。event.detail = { followStatus }，folllowStatus 合法值有 1、2、3，其中 1 表示已关注。2 表示用户不允许关注。3 表示发生未知错误；。                                                                                           | `event`  | `1.1.4`  |

#### Slots

| 插槽名    | 说明     | 插槽参数 | 支持版本 |
| --------- | -------- | -------- | -------- |
| `default` | 按钮内容 | -        | -        |

{{fuyuwei}}

{{qinpengfei}}
