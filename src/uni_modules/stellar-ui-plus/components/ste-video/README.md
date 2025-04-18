# Video 视频

基于uni-app的视频组件二次开发，新增清晰度、倍速选择功能

---$

### 代码演示

#### 基础使用

默认视频宽度会根据父容器的宽度撑满

```html
<template>
    <ste-video title="视频标题视频标题" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"></ste-video>
</template>
```

#### 可选择清晰度

配置`resolution`后会在全屏时显示清晰度选择选项，数据结构如下

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const resolutionConfigArr = ref([
        { text: '流畅', url: 'https://image.whzb.com/chain/StellarUI/video/demo1.mp4' },
        { text: '高清', url: 'https://image.whzb.com/chain/StellarUI/video/demo2.mp4' },
    ]);
</script>
<template>
    <ste-video title="视频标题视频标题" :resolution="resolutionConfigArr"></ste-video>
</template>
```

---$

### API

#### 组件属性(Props)

<!-- props -->

其他属性可参考原生[video](https://zh.uniapp.dcloud.io/component/video.html)

#### 组件事件(Events)

事件可参考原生[video](https://zh.uniapp.dcloud.io/component/video.html)

---$

{{fuyuwei}}
