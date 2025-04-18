# Watermark 水印

基础水印组件

---$

### 代码演示

#### 基础用法

```html
<script setup lang="ts">
    import { reactive } from 'vue';

    const font = reactive({
        color: 'rgba(0, 0, 0, .15)',
    });
</script>

<template>
    <ste-watermark :font="font">
        <div style="height: 250px; width: 400px" />
    </ste-watermark>
</template>
```

#### 多行水印

使用 "content" 设置一个字符串数组来指定多行文本水印内容

```html
<template>
    <lt-watermark :font="font" :content="['watermark+', 'ste-watermark']">
        <div style="height: 250px; width: 400px" />
    </lt-watermark>
</template>
```

#### 图片水印

通过 'image' 指定图像地址。 为了确保图像清晰展示而不是被拉伸，请设置宽度和高度，建议使用至少两倍的宽度和高度的图片来保证显示效果。

```html
<template>
    <lt-watermark :width="130" :height="30" image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original">
        <div style="height: 500px" />
    </lt-watermark>
</template>
```

#### 自定义配置

配置自定义参数预览水印效果。

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const config = ref({
        content: 'ste-watermark',
        font: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.15)',
        },
        zIndex: -1,
        rotate: -22,
        gap: [100, 100] as [number, number],
        offset: [] as unknown as [number, number],
    });

    const handelChange = (key: any, val: any, i?: any) => {
        config.value = {
            ...config.value,
            [key]: val,
        };
    };
</script>

<template>
    <view class="demo-item">
        <view class="title">自定义配置</view>
        <view class="item-block">
            <ste-watermark class="watermark" :content="config.content" :font="config.font" :z-index="config.zIndex" :rotate="config.rotate" :gap="config.gap" :offset="config.offset">
                <div class="demo" style="height: 200px; width: 400px">
                    <img src="https://image.whzb.com/chain/StellarUI/组件图标/watermark.png" alt="示例图片" />
                </div>
            </ste-watermark>
            <view class="setting-items">
                <div class="label">内容：</div>
                <ste-input :value="config.content" border borderColor="#8f9ca2" @input="val => handelChange('content', val)" />
            </view>
            <view class="setting-items">
                <div class="label">颜色：</div>
                <ste-input
                    :value="config.font.color"
                    border
                    borderColor="#8f9ca2"
                    @input="
                            val => {
                                config = {
                                    ...config,
                                    font: {
                                        ...config.font,
                                        color: val,
                                    },
                                };
                            }
                        "
                />
            </view>
            <view class="setting-items">
                <div class="label">字体大小：</div>
                <ste-input
                    :value="config.font.fontSize"
                    border
                    borderColor="#8f9ca2"
                    type="number"
                    @input="
                            val => {
                                config = {
                                    ...config,
                                    font: {
                                        ...config.font,
                                        fontSize: val,
                                    },
                                };
                            }
                        "
                />
            </view>
            <view class="setting-items">
                <div class="label">水印层级：</div>
                <ste-input :value="config.zIndex" border borderColor="#8f9ca2" type="number" @input="val => handelChange('zIndex', val)" />
            </view>
            <view class="setting-items">
                <div class="label">旋转角度：</div>
                <ste-input :value="config.rotate" border borderColor="#8f9ca2" type="number" @input="val => handelChange('rotate', val)" />
            </view>
            <view class="setting-items">
                <div class="label">间隙：</div>
                <ste-input
                    :value="config.gap[0]"
                    border
                    borderColor="#8f9ca2"
                    rootClass="root-my-input"
                    type="number"
                    @input="
                            val => {
                                config = {
                                    ...config,
                                    gap: [val, config.gap[1]],
                                };
                            }
                        "
                />
                <ste-input
                    :value="config.gap[1]"
                    border
                    borderColor="#8f9ca2"
                    type="number"
                    @input="
                            val => {
                                config = {
                                    ...config,
                                    gap: [config.gap[0], val],
                                };
                            }
                        "
                />
            </view>
            <view class="setting-items">
                <div class="label">偏移：</div>
                <ste-input
                    :value="config.offset[0]"
                    border
                    borderColor="#8f9ca2"
                    rootClass="root-my-input"
                    type="number"
                    @input="
                            val => {
                                config = {
                                    ...config,
                                    offset: [val, config.offset[1]],
                                };
                            }
                        "
                />
                <ste-input
                    :value="config.offset[1]"
                    border
                    borderColor="#8f9ca2"
                    type="number"
                    @input="
                            val => {
                                config = {
                                    ...config,
                                    offset: [config.offset[0], val],
                                };
                            }
                        "
                />
            </view>
        </view>
    </view>
</template>
```

---$

### API

<!-- props -->

#### Font Props

| 属性名         | 说明     | 类型     | 默认值            | 可选值                                                  | 支持版本 |
| -------------- | -------- | -------- | ----------------- | ------------------------------------------------------- | -------- |
| `color`        | 字体颜色 | `String` | `rgba(0,0,0,.15)` | -                                                       | -        |
| `fontSize`     | 字体大小 | `number` | `16`              | -                                                       | -        |
| `fontWeight`   | 字重     | `enum`   | `normal`          | `normal、light、weight、number`                         | -        |
| `fontFamily`   | 字体     | `string` | `sans-serif`      | -                                                       | -        |
| `fontStyle`    | 字体样式 | `enum`   | `normal`          | `none、normal、italic、oblique`                         | -        |
| `textAlign`    | 文本对齐 | `enum`   | `center`          | `left、right、center、start、end`                       | -        |
| `textBaseline` | 文本基线 | `enum`   | `hanging`         | `top、hanging、middle、alphabetic、ideographic、bottom` | -        |

#### Slots

| 插槽名 | 说明           | 插槽参数 | 支持版本 |
| ------ | -------------- | -------- | -------- |
| `默认` | 添加水印的容器 | -        | -        |

---$
{{fuyuwei}}

{{qinpengfei}}
