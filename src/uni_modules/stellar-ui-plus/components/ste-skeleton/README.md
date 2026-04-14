# Skeleton 骨架图

骨架图组件用于在数据加载过程中显示页面的基本结构，避免页面的突然变化，为用户提供更好的视觉体验。组件支持多种预设类型，也可以通过组合使用来构建复杂的骨架结构。

---$

## 代码演示

JavaScript后面的演示代码中涉及到的变量和方法都使用本`javascript`代码

```javascript
import { ref, onMounted } from 'vue';
const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 3000);
});
```

## 骨架类型

通过`type`属性，设置骨架图类型

###### 基础文本骨架

最简单的文本内容骨架图用法

```html
<template>
    <!-- 显示骨架图 -->
    <ste-skeleton :loading="loading">
        <ste-text>床前明月光，疑是地上霜。</ste-text>
    </ste-skeleton>

    <!-- 隐藏骨架图，显示真实内容 -->
    <ste-skeleton :loading="false">
        <ste-text>床前明月光，疑是地上霜。</ste-text>
    </ste-skeleton>
</template>
```

###### 图片骨架

适用于矩形图片的骨架展示：

```html
<template>
    <ste-skeleton :loading="loading" type="image">
        <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="120" height="120" />
    </ste-skeleton>
</template>
```

###### 圆形头像骨架

适用于圆形头像或图标的骨架展示：

```html
<template>
    <ste-skeleton :loading="loading" type="circle">
        <ste-image src="https://image.whzb.com/chain/StellarUI/图片.jpg" width="120" height="120" radius="50" />
    </ste-skeleton>
</template>
```

---$

<!-- props -->

---$

{{qinpengfei}}
