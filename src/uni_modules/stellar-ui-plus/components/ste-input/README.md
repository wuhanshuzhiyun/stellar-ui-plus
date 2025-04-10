# Input 输入框

用于承载用户信息录入的文本框，常用于表单、对话框等场景，对不同内容的信息录入，可拓展形成多种信息录入形式
---$

### 代码演示

#### 文本输入框

- 通过`value`给输入框初始值
- 支持通过`v-model`双向绑定

```html
<ste-input value="输入" />
```

#### 密码输入框

```html
<ste-input type="password" />
```

#### 数字输入框

```html
<ste-input type="number" />
```

#### 占位符

- 支持`placeholderStyle`给占位符指定样式
- 支持`placeholderClass`给占位符指定类名
    > 非H5平台上需要在类名前添加`/deep/`才生效

```html
<ste-input placeholder="请输入" />
<ste-input placeholder="请输入" placeholderStyle="color: #f00" />
<ste-input placeholder="请输入" placeholderClass="my-input-holder" />
```

#### 禁用&只读

```html
<ste-input disabled value="禁用" />
<ste-input readonly value="只读" />
<ste-input disabled shape="line" value="禁用" />
<ste-input shape="line" readonly value="只读" />
```

#### 字数统计

- `showWordLimit`值为`true`时在右下角显示字数统计
- 当`type`值为`textarea`并且`maxlength`大于0时才会显示

```html
<ste-input type="textarea" :maxlength="140" showWordLimit />
<ste-input shape="line" type="textarea" :maxlength="140" showWordLimit />
```

#### 焦点

通过 `focus`值来控制输入框的焦点，支持双向绑定

```html
<ste-input :focus="focus" />
```

#### 文本对齐方式

```html
<ste-input placeholder="请输入" inputAlign="center" />
<ste-input placeholder="请输入" inputAlign="right" />
```

#### 输入框字体

```html
<ste-input value="字体大小" fontSize="36" />
<ste-input value="字体颜色" fontColor="#f00" />
```

#### 输入框形状

```html
<ste-input shape="circle" />
<ste-input shape="line" />
```

#### 输入框边框

```html
<ste-input border />
<ste-input border borderColor="#f00" />
```

#### 背景色

```html
<ste-input background="linear-gradient(to right, #aaaaaa, #aaa000)" />
<ste-input background="url(https://image.whzb.com/chain/StellarUI/背景1.png)" />
```

#### 前后插槽

```html
<ste-input placeholder="请输入内容" confirmType="next" rootClass="root-my-input" shape="line">
    <view slot="prefix" style="margin-right: 28rpx">
        <ste-icon code="&#xe68c;" size="28" />
        <text>文本</text>
    </view>
    <view slot="suffix">
        <ste-icon code="&#xe672;" size="28" />
    </view>
</ste-input>
```

#### 前置过滤

```html
<script lang="ts" setup>
    const onlyPositiveDecimal = (value: any) => {
        // 1. 移除所有负号
        // 2. 保留数字和最多一个小数点
        let result = value.replace(/-/g, '');

        // 检查是否已有小数点
        const dotIndex = result.indexOf('.');
        if (dotIndex !== -1) {
            // 如果有小数点，保留第一个小数点，删除后面的所有小数点
            const beforeDot = result.substring(0, dotIndex + 1);
            const afterDot = result.substring(dotIndex + 1).replace(/\./g, '');
            result = beforeDot + afterDot;
        }

        // 移除所有非数字和小数点的字符
        return result.replace(/[^\d.]/g, '');
    };
</script>
<ste-input :filter="onlyPositiveDecimal" />
```

---$

### API

<!-- props -->

#### 组件插槽(Slots)

| 插槽名   | 说明           | 插槽参数 | 支持版本 |
| -------- | -------------- | -------- | -------- |
| `prefix` | 输入框前置内容 | -        | -        |
| `suffix` | 输入框后置内容 | -        | -        |

---$
{{fuyuwei}}
