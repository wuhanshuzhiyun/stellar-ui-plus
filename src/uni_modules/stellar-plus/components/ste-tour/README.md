# Tour 指引

> 用于创建一个带有步骤的指引

{{compatibility}}

## 使用示例

-   示例代码中用到的公共CSS样式

```css
.button-box {
    display: inline-block;
    padding: 20rpx;
}
```

### 基础用法

-   属性`show`用于控制显示隐藏
-   属性`steps`用于设置步骤内容，数组形式，数组中每个元素是一个对象，对象包含以下属性
    -   对象属性`message`：步骤内容，**必须**
    -   对象属性`target`：步骤内容对应的元素ID，**必须**
    -   对象属性`title`：步骤标题
    -   对象属性`position`：步骤位置
        -   若`position`属性不设置，则自动计算合适的位置
        -   可选值`top`、`bottom`、`top-start`、`top-center`、`top-end`、`bottom-start`、`bottom-center`、`bottom-end`

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const show = ref(false);
    const steps = ref([{ message: '点这里', target: 'button' }]);
</script>
<template>
    <view class="title">基础用法</view>
    <view id="button" class="button-box">
        <ste-button @click="show = true">基础提示</ste-button>
    </view>
    <ste-tour v-model:show="show" :steps="steps"></ste-tour>
</template>
```

### 位置偏移量

-   属性`offset`用于设置位置偏移量，数组形式，数组中两个元素分别表示横纵方向上的偏移量

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const show2 = ref(false);
    const steps2 = ref([{ message: '点这里', target: 'button-2' }]);
</script>
<template>
    <view id="button-2" class="button-box">
        <ste-button @click="show2 = true">描述位置偏移</ste-button>
    </view>
    <ste-tour v-model:show="show2" :steps="steps2" :offset="[20, 10]"></ste-tour>
</template>
```

### 插槽

-   默认插槽可以自定义描述内容，插槽参数`item`为当前步骤信息
-   属性`messageBg`可以将默认背景改为透明，然后通过插槽自定义背景样式，实现自定义描述内容。
-   如果需要内容区域点击不关闭提示，可使用`@click.stop`阻止内容区域点击冒泡

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const show5 = ref(false);
    const steps5 = ref([{ message: '点这里', target: 'button-5' }]);
</script>
<template>
    <view id="button-5" style="border: 1px solid #ddd; width: 120rpx; height: 120rpx; line-height: 120rpx; border-radius: 60rpx; text-align: center; margin-left: 60rpx" @click="show5 = true">
        插槽
    </view>
    <ste-tour v-model:show="show5" :steps="steps5" :offset="[-20, -30]" messageBg="transparent" radius="60">
        <image src="https://image.whzb.com/chain/StellarUI/component-icons/tour.png" mode="widthFix" style="width: 630rpx"></image>
    </ste-tour>
</template>
```

### 多步骤，显示标题栏

-   属性`offset`用于设置位置偏移量，数组形式，数组中两个元素分别表示横纵方向上的偏移量

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const show3 = ref(false);
    const steps3 = ref([
        { title: '步骤1', message: '先点这里', target: 'step-1' },
        { title: '步骤2', message: '再点这里', target: 'step-2' },
        { title: '步骤3', message: '然后点这里', target: 'step-3' },
    ]);
</script>
<template>
    <ste-button @click="show3 = true">多步骤带标题</ste-button>
    <view style="display: inline-block; padding: 6rpx 20rpx">
        <view id="step-1" class="button-box">步骤1</view>
        <view id="step-2" class="button-box">步骤2</view>
        <view id="step-3" class="button-box">步骤3</view>
    </view>
    <ste-tour showTitleBar v-model:show="show3" :steps="steps3"></ste-tour>
</template>
```

### 不显示背景蒙层

-   属性`mask`用于设置是否显示背景蒙层，默认显示

```html
<script setup lang="ts">
    import { ref } from 'vue';
    const show4 = ref(false);
    const steps4 = ref([{ message: '点这里', target: 'button-4' }]);
</script>
<template>
    <view id="button-4" class="button-box">
        <ste-button @click="show4 = true">不显示背景蒙层</ste-button>
    </view>
    <ste-tour v-model:show="show4" :steps="steps4" :mask="false"></ste-tour>
</template>
```

### API

<!-- props -->

{{xuyajun}}
