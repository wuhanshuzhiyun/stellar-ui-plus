# ScrollTo 滚动锚点

滚动锚点，可以滚动到指定锚点。

---$

#### 基础用法

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const active = ref(0);
    const contents = [
        'https://image.whzb.com/chain/StellarUI/image/banner1.png',
        'https://image.whzb.com/chain/StellarUI/image/banner2.png',
        'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
        'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
        'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
        'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
    ];
</script>
<ste-tabs :active.sync="active" sticky>
    <ste-tab v-for="(m, i) in imgs" :key="i" :title="`标签${i + 1}`" />
</ste-tabs>
<ste-scroll-to v-model:active="active" height="1200">
    <ste-scroll-to-item v-for="(m, i) in contents" :key="i">
        <view>内容{{ i + 1 }}</view>
        <image :src="m" mode="widthFix" style="width:100%"></image>
    </ste-scroll-to-item>
</ste-scroll-to>
```

---$

### API

<!-- props -->

#### ScrollTo Method

| 方法名 | 说明                               | 支持版本 |
| ------ | ---------------------------------- | -------- |
| `init` | 初始化元素信息，请在渲染完成后调用 | -        |

---$
{{xuyajun}}
