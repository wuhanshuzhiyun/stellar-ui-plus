# CodeInput 验证码输入

用于验证码输入或短密码输入

{{compatibility}}

### 代码演示

#### 基础使用

```html
<ste-code-input :maxlength="4"></ste-code-input>
<ste-code-input :maxlength="4" borderColor="rgba(0, 0, 0,0)"></ste-code-input>
```

#### 横线模式

```html
<ste-code-input mode="line" :maxlength="4"></ste-code-input>
```

#### 设置长度

```html
<ste-code-input :maxlength="5"></ste-code-input>
```

#### 设置间距

```html
<ste-code-input :space="0" :maxlength="4"></ste-code-input>
```

#### 调整颜色

```html
<ste-code-input  :maxlength="4" fontColor="#f56c6c"borderColor="#f56c6c"></ste-code-input>

<ste-code-input mode="line" :maxlength="4fontColor="#0090FF" borderColor="#0090FF"></ste-code-input>
```

#### 自定义显示

```html
<ste-code-input formatter="·" fontSize="100" :maxlength="4" value="1"></ste-code-input>
<ste-code-input mode="line" formatter="*" :space="0" :maxlength="4" value="12"></ste-code-input>
```

### API

#### Props

| 参数          | 说明                   | 类型            | 默认值    | 可选值                                   | 支持版本   |
| ------------- | ---------------------- | --------------- | --------- | ---------------------------------------- | ---------- |
| `value`       | 初始内容，支持双向绑定 | `Number/String` | -         | -                                        | -          |
| `mode`        | 输入框类型             | `String`        | `box`     | `box`：盒子模式<br/>`line`：底部横线模式 | -          |
| `maxlength`   | 最大长度               | `Number`        | `6`       | -                                        | -          |
| `space`       | 字符间的距离           | `Number/String` | `16`      | -                                        | -          |
| `fontColor`   | 字体颜色               | `String`        | `#000000` | -                                        | -          |
| `borderColor` | 边框和线条颜色         | `String`        | `#DDDDDD` | -                                        | -          |
| `fontSize`    | 字体大小               | `Number/String` | `28`      | -                                        | -          |
| `size`        | 输入框的大小，宽等于高 | `Number/String` | `64`      | -                                        | -          |
| `formatter`   | 替换输入值             | `String`        | -         | -                                        | -          |
| `focus`       | 是否自动获取焦点       | `Boolean`       | `false`   | -                                        | -          |
| `disabledDot` | 是否禁止输入"."符号    | `Boolean`       | `true`    | -                                        | -          |
| `readOnly`    | 是否只读               | `Boolean`       | `false`   | -                                        | `v1.14.12` |

#### Events

| 事件名   | 说明                              | 事件参数              | 支持版本 |
| -------- | --------------------------------- | --------------------- | -------- |
| `change` | `输入内容发生改变时触发`          | `value`：当前输入的值 | -        |
| `finish` | `输入字符个数达maxlength值时触发` | `value`：当前输入的值 | -        |

{{fuyuwei}}
