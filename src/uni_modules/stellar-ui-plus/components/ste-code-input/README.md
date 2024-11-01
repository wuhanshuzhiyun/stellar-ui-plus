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
<ste-code-input  :maxlength="4" fontColor="#f56c6c" borderColor="#f56c6c"></ste-code-input>

<ste-code-input mode="line" :maxlength="4 fontColor="#0090FF" borderColor="#0090FF"></ste-code-input>
```

#### 自定义显示

```html
<ste-code-input formatter="·" :fontSize="100" :maxlength="4" value="1"></ste-code-input>
<ste-code-input mode="line" formatter="*" :space="0" :maxlength="4" value="12"></ste-code-input>
```

### API

<!-- props -->

{{fuyuwei}}
