# Navbar 导航栏

提供导航功能，常用于页面顶部。

---$

## 代码演示

### 基本使用

通过 `title`设置导航栏标题，插槽`default`设置导航栏内容

```html
<template>
    <ste-navbar title="标题">插槽</ste-navbar>
</template>
```

### 返回按钮配置

- 通过 `autoBack` 属性来设置是否显示返回按钮，默认`true`
- 通过 `backColor` 属性来设置返回按钮颜色，默认`#000`
- 通过 `backCode` 属性来设置返回按钮icon的code，默认`&#xe673;`
- 通过 `backBackgroundColor` 属性来设置返回按钮的背景颜色，默认`transparent`
- 通过 `backBorderColor` 属性来设置返回返回按钮的边框颜色，默认`transparent`
- 通过 `backOpacity` 属性来设置返回按钮透明度，默认`1`

```html
<template>
    <ste-navbar title="隐藏返回按钮" :autoBack="false"></ste-navbar>
    <ste-navbar title="返回按钮各配置" backColor="red" backCode="&#xe68d;" backBackgroundColor="green" backBorderColor="blue" :backOpacity="0.4"></ste-navbar>
</template>
```

### 标题配置

- 通过 `title` 属性来设置标题文本，默认`''`
- 通过 `titleColor` 属性来设置标题颜色，默认`#181818`
- 通过 `titleAlignment` 属性来设置标题对齐方式，`1` ：居左，`2`：居中，默认`1`

```html
<template>
    <ste-navbar title="标题各配置" titleColor="red" :titleAlignment="2" :zIndex="100"></ste-navbar>
</template>
```

### 导航栏配置

- 通过 `fixed` 属性来设置是否固定到顶部，默认`false`
- 通过 `safeAreaInsetTop` 属性来设置是否开启顶部安全区适配，默认`true`
- 通过 `zIndex` 属性来设置导航栏 z-index，默认`10`
- 通过 `backgroundColor` 属性来设置导航栏背景色，默认`transparent`
- 通过 `colorType` 属性来设置支付宝小程序专属属性，导航栏背景色，`1` ：黑色，`2`：白色，默认`1`

```html
<template>
    <ste-navbar title="导航栏配置" backgroundColor="red"></ste-navbar>
</template>
```

### 回调事件

通过 `backClick` 获取返回按钮点击事件

```html
<template>
    <ste-navbar title="事件" @backClick="backClick"></ste-navbar>
</template>

<script lang="ts" setup>
    import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
    const toast = useToast();

    function backClick() {
        toast.showToast({
            icon: 'none',
            title: '返回按钮点击事件',
        });
    }
</script>
```

---$

### API

<!-- props -->

#### Slots

| 插槽名    | 说明       | 插槽参数 | 支持版本 |
| --------- | ---------- | -------- | -------- |
| `default` | 导航栏内容 | -        | -        |

---$
{{qinpengfei}}
