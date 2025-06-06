# Slider 滑块

该组件一般用于表单中，手动选择一个区间范围的场景

---$

### 代码演示

#### 基础使用

```html
<template>
    <ste-slider value="30"></ste-slider>
</template>
```

#### 滑块条高度 & 滑块大小

```html
<template>
    <ste-slider barHeight="26" value="30"></ste-slider>
    <ste-slider buttonSize="50" value="30"></ste-slider>
</template>
```

#### 进度条颜色

```html
<template>
    <ste-slider value="30" activeColor="#ff0000" inactiveColor="#a9ee13"></ste-slider>
</template>
```

#### 范围选择

```html
<template>
    <ste-slider :value="[10, 20]" range></ste-slider>
</template>
```

#### 竖向

```html
<template>
    <ste-slider vertical value="30"></ste-slider>
</template>
```

#### 禁用

```html
<template>
    <ste-slider disabled value="30"></ste-slider>
</template>
```

#### 只读

```html
<template>
    <ste-slider readonly value="30"></ste-slider>
</template>
```

#### 间断点

当`showStops`为`true`时，会根据最大值(`max`)、最小值(`min`)、步长(`step`)来显示间断点

```html
<template>
    <ste-slider showStops :step="10" value="30"></ste-slider>
</template>
```

#### 标记

当同时配置了`showStops`属性和`marks`属性时，会显示自定义节点

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const marks = ref({
        10: '0°C',
        20: '8°C',
        37: '37°C',
        80: {
            style: {
                color: '#1989FA',
            },
            label: '合格',
        },
    });
</script>
<template>
    <ste-slider showStops :marks="marks" value="30"></ste-slider>
</template>
```

#### 自定义滑块

```html
<template>
    <ste-slider :step="10" showStops value="30" activeColor="#ff0000">
        <view class="c-slider-1" slot="button">
            <view class="content">
                <text>滑块</text>
            </view>
        </view>
    </ste-slider>
    <ste-slider :step="10" showStops :value="[10, 40]" range>
        <view class="c-slider-2" slot="leftButton">
            <view class="content">
                <ste-icon code="&#xe673;" color="#fff"></ste-icon>
            </view>
        </view>
        <view class="c-slider-2" slot="rightButton">
            <view class="content">
                <ste-icon code="&#xe674;" color="#fff"></ste-icon>
            </view>
        </view>
    </ste-slider>
</template>
<style lang="scss">
    .c-slider-1 {
        .content {
            padding: 0 16rpx;
            background-color: #ff0000;
            border-radius: 20rpx;

            color: #ffffff;
            font-size: 24rpx;

            text {
                white-space: nowrap;
            }
        }
    }
    .c-slider-2 {
        .content {
            background-color: #0090ff;
            border-radius: 50%;
            height: 40rpx;
            width: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
```

---$

### API

<!-- props -->

#### 组件插槽(Slots)

| 插槽名   | 说明                             | 插槽参数 | 支持版本 |
| -------- | -------------------------------- | -------- | -------- |
| `button` | 自定义滑块按钮                   | -        | -        |
| `button` | 自定义左侧滑块按钮（范围选择下)  | -        | -        |
| `button` | 自定义右侧滑块按钮（范围选择下） | -        | -        |

---$
{{fuyuwei}}
