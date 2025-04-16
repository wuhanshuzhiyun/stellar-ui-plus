# Swiper 轮播组件

- 轮播组件，脱离了原生轮播组件的限制
    - 去掉了一些非必要的功能
    - 扩展了一些原生组件没有的功能
        - 横向滑动时高度根据内容区域自适应
        - 纵向滑动时宽度根据内容区域自适应
        - 禁用等原生组件没有的功能
- 性能比较原生轮播组件略有不足，<span style="color:red">当原生组件能满足业务需求时不推荐使用此组件</span>

---$

### 代码演示

#### 基础用法

- 外层使用`ste-swiper`父标签包裹
    - 默认是水平滚动，宽度必须固定，可以通过`width`属性设置（默认为`100%`，也可以设置父标签宽度）
    - 高度根据内容自适应
- 内层使用`ste-swiper-item`子标签描述每一项

```html
<script setup lang="ts">
    const list1 = ['https://image.whzb.com/chain/StellarUI/image/banner1.png', 'https://image.whzb.com/chain/StellarUI/image/banner2.png'];
    const list2 = [
        'https://image.whzb.com/chain/StellarUI/image/banner1.png',
        'https://image.whzb.com/chain/StellarUI/image/banner2.png',
        'https://image.whzb.com/chain/StellarUI/image/banner1.png',
        'https://image.whzb.com/chain/StellarUI/image/banner2.png',
    ];

    const onChange = (index: number, source: 'touch' | 'autoplay') => {
        console.log(index, source);
    };
</script>
<template>
    <view class="swiper-box">
        <ste-swiper>
            <ste-swiper-item v-for="(m, index) in list1" :key="index">
                <view class="item">{{ m }}</view>
            </ste-swiper-item>
        </ste-swiper>
    </view>
</template>
```

#### 纵向轮播

- `ste-swiper`父标签
    - `direction` 属性是设置滚动方向，默认是水平滚动，可选值`horizontal`、`vertical`
    - 纵向滑动时，`height` 属性是设置轮播的高度（默认是`100%`，也可以设置父标签高度）

```html
<template>
    <ste-swiper direction="vertical" height="300rpx">
        <ste-swiper-item v-for="(m, index) in list1" :key="index">
            <view class="item">{{ m }}</view>
        </ste-swiper-item>
    </ste-swiper>
</template>
```

#### 首尾衔接轮播

- `ste-swiper`父标签
    - `circular` 属性是设置是否首尾相接，默认是`false`，可选值`true`

```html
<template>
    <ste-swiper circular>
        <ste-swiper-item v-for="(m, index) in list1" :key="index">
            <view class="item">{{ m }}</view>
        </ste-swiper-item>
    </ste-swiper>
</template>
```

#### 自动轮播

- `ste-swiper`父标签
    - `autoplay` 属性是设置是否自动轮播，默认是`false`，可选值`true`
    - `interval` 属性是设置自动轮播的时间间隔，默认是`3000`，单位是`ms`

```html
<template>
    <ste-swiper circular :interval="2000" autoplay>
        <ste-swiper-item v-for="(m, index) in list1" :key="index">
            <view class="item">{{ m }}</view>
        </ste-swiper-item>
    </ste-swiper>
</template>
```

#### 显示指示器

- `ste-swiper`父标签
    - `indicatorDots` 属性是设置是否显示指示器，默认是`false`，可选值`true`

```html
<template>
    <ste-swiper circular autoplay indicatorDots>
        <ste-swiper-item v-for="(m, index) in list2" :key="index">
            <view class="item">{{ m }}</view>
        </ste-swiper-item>
    </ste-swiper>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const list2 = ref(['1111', '2222', '3333', '4444']);
</script>
```

#### 指示器颜色

- `ste-swiper`父标签
    - `indicatorColor` 属性是设置指示器的颜色，默认是`#00000`
    - `indicatorActiveColor` 属性是设置当前选中的指示器的颜色，默认是`rgba(0,0,0,0.3)`

```html
<template>
    <ste-swiper circular autoplay indicatorDots indicatorColor="#0f0" indicatorActiveColor="#f00">
        <ste-swiper-item v-for="(m, index) in list2" :key="index">
            <view class="item">{{ m }}</view>
        </ste-swiper-item>
    </ste-swiper>
</template>
```

#### 显示前后页部分

- `ste-swiper`父标签
    - `previousMargin` 属性是设置前边距，默认是`0`，单位是`rpx`
    - `nextMargin` 属性是设置后边距，默认是`0`，单位是`rpx`

```html
<template>
    <ste-swiper circular autoplay previousMargin="60" nextMargin="60">
        <ste-swiper-item v-for="(m, index) in list2" :key="index">
            <view class="item">{{ m }}</view>
        </ste-swiper-item>
    </ste-swiper>
</template>
```

---$

### API

<!-- props -->

#### Swiper Slot

| 插槽名    | 说明                                      | 插槽参数 | 支持版本 |
| --------- | ----------------------------------------- | -------- | -------- |
| `default` | 默认插槽，请传入`ste-swiper-item`标签列表 | -        | -        |

#### Swiper Method

| 方法名 | 说明                             | 支持版本 |
| ------ | -------------------------------- | -------- |
| `init` | 初始化轮播信息，在渲染完成后调用 | -        |

#### SwiperItem Slot

| 插槽名    | 说明                                         | 插槽参数 | 支持版本 |
| --------- | -------------------------------------------- | -------- | -------- |
| `default` | 默认插槽，在插槽中的内容会展示在标签内容区域 | -        | -        |

---$
{{xuyajun}}
