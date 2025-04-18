# Text 文本

文本组件

---$

### 代码演示

#### 可选

- 当`selectable`为`true`时，可长按选中文字

```html
<template>
    <ste-text selectable>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水</ste-text>
</template>
```

#### 解码

- `&nbsp;` 解码为一个不间断空格 (Non-Breaking Space)
- `&lt;` 解码为小于号 <
- `&gt;` 解码为大于号 >
- `&amp;` 解码为和号 &
- `&apos;` 解码为单引号 '
- `&ensp;` 解码为一个半角空格 ( )
- `&emsp;` 解码为一个全角空格 (　)

```html
<template>
    <ste-text decode>Stellar&nbsp;UI</ste-text>
    <ste-text decode>Stellar&lt;UI</ste-text>
    <ste-text decode>Stellar&gt;UI</ste-text>
    <ste-text decode>Stellar&amp;UI</ste-text>
    <ste-text decode>Stellar&apos;UI</ste-text>
    <ste-text decode>Stellar&ensp;UI</ste-text>
    <ste-text decode>Stellar&emsp;UI</ste-text>
</template>
```

#### 换行省略

```html
<template>
    <ste-text>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</ste-text>
    <ste-text :lines="2">Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</ste-text>
    <ste-text :lines="3">Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</ste-text>
</template>
```

---$

### API

<!-- props -->

#### 组件插槽(Slots)

| 插槽名  | 说明 | 插槽参数 | 支持版本 |
| ------- | ---- | -------- | -------- |
| default | 内容 | -        | -        |

---$
{{fuyuwei}}
