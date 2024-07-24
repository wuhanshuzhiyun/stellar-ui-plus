# Text 文本

文本组件

{{compatibility}}

### 代码演示

#### 可选

-   当`selectable`为`true`时，可长按选中文字

```html
<ste-text selectable>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水</ste-text>
```

#### 解码

-   `&nbsp;` 解码为一个不间断空格 (Non-Breaking Space)
-   `&lt;` 解码为小于号 <
-   `&gt;` 解码为大于号 >
-   `&amp;` 解码为和号 &
-   `&apos;` 解码为单引号 '
-   `&ensp;` 解码为一个半角空格 ( )
-   `&emsp;` 解码为一个全角空格 (　)

```html
<ste-text decode>Stellar&nbsp;UI</ste-text>
<ste-text decode>Stellar&lt;UI</ste-text>
<ste-text decode>Stellar&gt;UI</ste-text>
<ste-text decode>Stellar&amp;UI</ste-text>
<ste-text decode>Stellar&apos;UI</ste-text>
<ste-text decode>Stellar&ensp;UI</ste-text>
<ste-text decode>Stellar&emsp;UI</ste-text>
```

#### 换行省略

```html
<ste-text>
    Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar
    UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
</ste-text>
<ste-text :lines="2">
    Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar
    UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
</ste-text>
<ste-text :lines="3">
    Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar
    UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
</ste-text>
```

### API

#### 组件属性(Props)

| 参数         | 说明                                                                        | 类型      | 默认值  | 可选值                                                                                    | 支持版本 |
| ------------ | --------------------------------------------------------------------------- | --------- | ------- | ----------------------------------------------------------------------------------------- | -------- |
| `selectable` | 文本是否可选                                                                | `Boolean` | `false` | -                                                                                         | -        |
| `space`      | 以何种方式显示连续空格                                                      | `String`  | -       | `ensp` 中文字符空格一半大小<br/>`emsp` 中文字符空格大小<br/>`nbsp` 根据字体设置的空格大小 | -        |
| `decode`     | 是否解码，可解析的 HTML 实体字符有：`&nbsp;&lt;&gt;&amp;&apos;&ensp;&emsp;` | `Boolean` | `false` | -                                                                                         | -        |
| `lines`      | 文本显示的行数，如果设置，超出此行数，将会显示省略号                        | `Number`  | -       | -                                                                                         | -        |

#### 组件插槽(Slots)

| 插槽名  | 说明 | 插槽参数 | 支持版本 |
| ------- | ---- | -------- | -------- |
| default | 内容 | -        | -        |

{{fuyuwei}}
