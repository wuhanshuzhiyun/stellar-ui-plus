# ste-marquee 走马灯

用于展示滚动公告、中奖名单等水平滚动信息。

## 使用场景

- 抽奖活动中奖名单滚动展示
- 系统公告、通知滚动
- 实时交易动态
- 新闻头条滚动

## 基础用法

```vue
<template>
    <ste-marquee :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref([
    { id: 1, text: '恭喜用户138****1234获得一等奖' },
    { id: 2, text: '恭喜用户139****5678获得二等奖' },
    { id: 3, text: '恭喜用户137****9012获得三等奖' },
]);
</script>
```

## 自定义样式

```vue
<ste-marquee 
    :list="list"
    containerBg="#f5f5f5"
    containerPadding="20rpx"
    containerRadius="16rpx"
    itemBg="#ffffff"
    itemPadding="16rpx 24rpx"
    itemRadius="8rpx"
/>
```

## 填满屏幕

当数据较少时，使用 `fillScreen` 自动复制数据填满屏幕，实现流畅滚动：

```vue
<ste-marquee :list="shortList" :fillScreen="true" />
```

## 调整滚动速度

```vue
<ste-marquee :list="list" :speed="100" />
```

## 使用插槽自定义内容

```vue
<ste-marquee :list="list">
    <template #item="{ item, index }">
        <view class="custom-item">
            <image :src="item.avatar" class="avatar" />
            <text>{{ item.text }}</text>
        </view>
    </template>
</ste-marquee>
```

## 播放控制

通过 ref 可以控制走马灯的播放、暂停和停止：

```vue
<template>
    <ste-marquee ref="marqueeRef" :list="list" />
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="stop">停止</button>
</template>

<script setup>
import { ref } from 'vue';

const marqueeRef = ref();

const play = () => marqueeRef.value?.play();
const pause = () => marqueeRef.value?.pause();
const stop = () => marqueeRef.value?.stop();
</script>
```

## 点击事件

```vue
<ste-marquee :list="list" @click="onClick" />

<script setup>
const onClick = (item, index) => {
    console.log('点击了:', item.text);
};
</script>
```

## 数据类型

```typescript
interface MarqueeItem {
    /** 唯一标识 */
    id: string | number;
    /** 显示文本 */
    text: string;
    /** 图标URL（可选） */
    icon?: string;
    /** 文本颜色（可选） */
    color?: string;
    /** 背景色（可选） */
    background?: string;
}
```

<!-- props -->
