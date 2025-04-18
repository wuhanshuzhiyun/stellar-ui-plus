# Popup 弹出层

弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义

---$

### 代码演示

#### 基础使用

通过属性`show`来控制弹出层的显隐，使用`v-model`修饰符来双向绑定

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const show = ref(false);
</script>
<template>
    <ste-button @click="show = true">显示</ste-button>
    <ste-popup v-model:show="show" width="300" height="300">
        <view class="popup-content">正文</view>
    </ste-popup>
</template>
```

#### 背景色

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const bgShow = ref(false);
</script>
<template>
    <ste-button @click="bgShow = true">显示</ste-button>
    <ste-popup v-model:show="bgShow" width="300" height="300" backgroundColor="#eff3dd">
        <view class="popup-content">背景色</view>
    </ste-popup>
</template>
```

#### 是否遮罩关闭

默认可点击遮罩关闭弹窗

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const maskShow1 = ref(false);
    const maskShow2 = ref(false);
</script>
<template>
    <view>
        <ste-button @click="maskShow1 = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">遮罩可关闭</ste-button>
    </view>
    <view>
        <ste-button @click="maskShow2 = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">遮罩不可关闭</ste-button>
    </view>
    <ste-popup v-model:show="maskShow1" width="300" height="300">
        <view class="popup-content">遮罩可关闭</view>
    </ste-popup>
    <ste-popup v-model:show="maskShow2" width="300" height="300" :isMaskClick="false">
        <view class="popup-content">遮罩不可关闭</view>
    </ste-popup>
</template>
```

#### 大小

- 默认弹出层的内容区域是没有高度的，如果不设置宽高则会由内容撑开
- 支持具体数值(单位为rpx)、百分比

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const sizeShow1 = ref(false);
    const sizeShow2 = ref(false);
</script>
<template>
    <view>
        <ste-button @click="sizeShow1 = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">宽: 300 高：500</ste-button>
    </view>
    <view>
        <ste-button @click="sizeShow2 = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">宽: '100vw' 高：300</ste-button>
    </view>
    <ste-popup v-model:show="sizeShow1" width="300" height="500">
        <view class="popup-content">300*500</view>
    </ste-popup>
    <ste-popup v-model:show="sizeShow2" width="100vw" height="300">
        <view class="popup-content">100vw*300</view>
    </ste-popup>
</template>
```

#### 位置

弹出位置支持上(`top`)、下(`bottom`)、左(`left`)、右(`right`)、中(`center`)，默认弹出位置为中(`center`)

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const showTop = ref(false);
    const showBottom = ref(false);
    const show = ref(false);
    const showLeft = ref(false);
    const showRight = ref(false);
</script>
<template>
    <view>
        <ste-button @click="showTop = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">顶部弹出</ste-button>
    </view>
    <view>
        <ste-button @click="showBottom = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">底部弹出</ste-button>
    </view>
    <view>
        <ste-button @click="show = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">中间弹出</ste-button>
    </view>
    <view>
        <ste-button @click="showLeft = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">左侧弹出</ste-button>
    </view>
    <view>
        <ste-button @click="showRight = true" :mode="200" width="100%" :round="false" background="#ffffff" border-color="#0090FF" color="#0090FF">右侧弹出</ste-button>
    </view>
    <ste-popup v-model:show="showTop" height="300" width="100vw" position="top">
        <view class="popup-content">上</view>
    </ste-popup>
    <ste-popup v-model:show="showBottom" height="300" width="100vw" position="bottom">
        <view class="popup-content">下</view>
    </ste-popup>
    <ste-popup v-model:show="showLeft" width="300" height="100vh" position="left">
        <view class="popup-content">左</view>
    </ste-popup>
    <ste-popup v-model:show="showRight" width="300" height="100vh" position="right">
        <view class="popup-content">右</view>
    </ste-popup>
</template>
```

#### 圆角

- 若组件圆角不满足需求，可以不设置圆角，在插槽内容中自己设置圆角

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const roundShow = ref(false);
</script>
<template>
    <ste-button @click="roundShow = true">显示</ste-button>
    <ste-popup v-model:show="roundShow" width="300" height="300" round>
        <view class="popup-content">圆角</view>
    </ste-popup>
</template>
```

#### 偏移

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const offsetShow = ref(false);
</script>
<template>
    <ste-button @click="offsetShow = true">显示</ste-button>
    <ste-popup v-model:show="offsetShow" width="300" height="300" offsetX="50" offsetY="-50">
        <view class="popup-content">偏移</view>
    </ste-popup>
</template>
```

#### 动画执行时间

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const durationShow = ref(false);
</script>
<template>
    <ste-button @click="durationShow = true">显示</ste-button>
    <ste-popup v-model:show="durationShow" width="300" height="300" :duration="800">
        <view class="popup-content">动画执行时间</view>
    </ste-popup>
</template>
```

#### 异步关闭

监听关闭事件，通过执行事件抛出的`allowStop`方法阻止关闭，等待异步操作完成后，当可关闭时再执行`resolve`方法

```html
<template>
    <ste-popup v-model:show="syncShow" width="100vw" height="300" @close="syncClose" position="bottom">
        <view class="popup-content">异步关闭</view>
    </ste-popup>
</template>
<script setup lang="ts">
    function syncClose(suspend: () => void, next: () => void, stop: () => void) {
        suspend();
        uni.showToast({
            title: '加载中...',
            icon: 'loading',
        });
        setTimeout(() => {
            uni.hideToast();
            next();
        }, 2000);
    }
</script>
```

---$

### API

<!-- props -->

#### 组件插槽(Slots)

| 插槽名  | 说明         | 插槽参数 | 支持版本 |
| ------- | ------------ | -------- | -------- |
| default | 内容部分插槽 | -        | -        |

---$
{{fuyuwei}}
