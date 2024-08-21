# ScrollTo 滚动锚点

滚动锚点，可以滚动到指定锚点。

{{compatibility}}

#### 基础用法

```html
<ste-tabs :active.sync="active" sticky>
    <ste-tab v-for="(m, i) in imgs" :key="i" :title="`标签${i + 1}`" />
</ste-tabs>
<ste-scroll-to ref="scrollTo" height="1200" :active.sync="active">
    <ste-scroll-to-item v-for="(m, i) in imgs" :key="i">
        <view>内容{{ i + 1 }}</view>
        <image :src="m" mode="widthFix"></image>
    </ste-scroll-to-item>
</ste-scroll-to>
<script>
    export default {
        data() {
            return {
                active: 0,
                imgs: [
                    'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
                    'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
                    'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
                    'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
                    'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
                    'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
                    'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
                    'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
                ],
            };
        },
        mounted() {
            setTimeout(() => {
                this.$refs.scrollTo.init();
            }, 500);
        },
    };
</script>
```

### API

<!-- props -->

#### ScrollTo Method

| 方法名 | 说明                               | 支持版本 |
| ------ | ---------------------------------- | -------- |
| `init` | 初始化元素信息，请在渲染完成后调用 | -        |

{{xuyajun}}
