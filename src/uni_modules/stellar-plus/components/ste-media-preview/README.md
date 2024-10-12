# MediaPreview 媒体预览

用于页面上显示价格的组件

{{compatibility}}

### 代码演示

#### 基础用法

-   `show`属性控制是否展示预览弹窗，支持`sync`双向绑定
-   `urls`属性为要预览的媒体URL数组

```html
<template>
    <ste-button @click="show = true">基础预览</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show" />
    </view>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
</script>
```

#### 自动轮播

-   `autoplay`属性控制自动轮播间隔时间，单位为毫秒，为`0`时不轮播

```html
<template>
    <ste-button @click="show1 = true">自动轮播</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show1" :autoplay="3000" />
    </view>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show1 = ref(false);
</script>
```

#### 前后衔接循环播放

-   `loop`属性可开启前后衔接循环播放

```html
<template>
    <ste-button @click="show2 = true">前后衔接循环播放</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show2" loop />
    </view>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show2 = ref(false);
</script>
```

#### 默认展示下标为2的媒体资源

-   `index`属性可控制从第几页开始展示

```html
<template>
    <ste-button @click="show3 = true">默认展示下标为2的媒体资源</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show3" :index="2" />
    </view>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show3 = ref(false);
</script>
```

#### 隐藏左下角索引标签

-   `showIndex`属性可控制左下角页签显示

```html
<template>
    <ste-button @click="show4 = true">隐藏左下角索引标签</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show4" :showIndex="false" />
    </view>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show4 = ref(false);
</script>
```

#### 双指缩放

-   `scale`属性可开启双指缩放功能

```html
<template>
    <ste-button @click="show5 = true">双指缩放</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show5" scale />
    </view>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show5 = ref(false);
</script>
```

#### 长按触发事件

-   事件`longpress`在用户长按时触发

```html
<template>
    <ste-button @click="show6 = true">长按触发事件</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" :show.sync="show6" @longpress="onLongpress" />
    </view>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show6 = ref(false);

    function onLongpress(index) {
        this.showToast({
            title: `长按了第【${index + 1}】个媒体资源`,
            icon: 'none',
        });
    }
</script>
```

#### 关闭前/后事件

-   事件`beforeClose`在关闭前被触发
-   事件`close`在关闭后被触发

```html
<template>
    <ste-button @click="show7 = true">关闭前/后事件</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" :show.sync="show7" @beforeClose="onBeforeClose" @close="onClose" />
    </view>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const medias = ref([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show7 = ref(false);

    function onBeforeClose(stop, next, prevent) {
        stop();
        toast.showModal({
            title: '确定关闭弹窗吗？',
            success({ cancel, confirm }) {
                if (confirm) {
                    console.log('点了确定');
                    next();
                }
                if (cancel) {
                    console.log('点了取消');
                    prevent();
                }
            },
            fail() {
                prevent();
            },
        });
    }
    function onClose() {
        this.showToast({
            title: '弹窗关闭了',
            icon: 'none',
        });
    }
</script>
```

### API

<!-- props -->

{{xuyajun}}
