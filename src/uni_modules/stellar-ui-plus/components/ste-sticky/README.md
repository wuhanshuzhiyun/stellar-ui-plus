# Signature 签名

签名组件用于在页面上显示签名。

---$

### 代码演示

#### 基础用法

- 事件`fixed`监听组件进入粘性布局时触发
- 事件`unfixed`监听组件取消粘性布局时触发

```html
<template>
    <ste-sticky @fixed="onFixed" @unfixed="onUnfixed">
        <view style="width: 100%; height: 44px; line-height: 44px; text-align: center">这是一个吸顶的标题栏目</view>
    </ste-sticky>
    <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner1.png" height="360" />
    <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="360" />
    <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner1.png" height="360" />
    <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="360" />
    <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner1.png" height="360" />
    <ste-image src="https://image.whzb.com/chain/StellarUI/image/banner2.png" height="360" />
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const imgUrl = ref<string>();

    const errorUrl = ref<string>();

    onMounted(() => {
        setTimeout(() => {
            imgUrl.value = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
            errorUrl.value = 'https://image.whzb.com/chain/StellarUI/none.png';
        }, 1500);
    });

    const onFixed = () => {
        console.log('fixed');
    };

    const onUnfixed = () => {
        console.log('unfixed');
    };
</script>
```

---$

### API

<!-- props -->

---$
{{xuyajun}}
