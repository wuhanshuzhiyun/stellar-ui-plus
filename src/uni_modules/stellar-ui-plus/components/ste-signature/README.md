# Signature 签名

签名组件用于在页面上显示签名。

---$

### 代码演示

#### 基础使用

-   `type` 签名保存图片类型，支持 `jpg` 和 `png`(默认) 两种格式。
    -   此处使用 `jpg` 格式。因为媒体预览背景是黑色，画笔颜色是黑色，`png`格式图片时预览看不见

```html
<script setup lang="ts">
    import type { RefSignature } from '@/uni_modules/stellar-ui-plus/types/refComponents';
    import { ref } from 'vue';
    const signature = ref<RefSignature>();
    const save = () => {
        signature.value?.save(res => {
            uni.previewImage({
                urls: [res],
            });
        });
    };

    const back = () => {
        signature.value?.back();
    };

    const clear = () => {
        signature.value?.clear();
    };
</script>

<template>
    <view class="signature-demo">
        <ste-signature ref="signature" type="jpg" />
    </view>
    <view class="button" @click="back">回退</view>
    <view class="button" @click="clear">清除</view>
    <view class="button" @click="save">保存并预览</view>
</template>

<style scoped lang="scss">
    .signature-demo {
        width: 100%;
        height: 300rpx;
        background-color: #f5f5f5;
    }

    .button {
        display: inline-block;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 30rpx;
        border-radius: 32rpx;
        background-color: red;
        color: #fff;
        padding: 0 20px;
        margin-top: 10px;
        &:active {
            background-color: #f55;
        }

        & + .button {
            margin-left: 8px;
        }
    }
</style>
```

#### 画笔颜色和线宽

-   属性`strokeColor`可以自定义画笔颜色，默认`#000000`(黑色)
-   属性`lineWidth`可以自定义画笔线宽，默认`3`

```html
<ste-signature strokeColor="#f0f" lineWidth="1" />
```

---$

### API

<!-- props -->

#### 组件方法(Method)

| 方法名  | 说明       | 方法参数                   | 支持版本 |
| ------- | ---------- | -------------------------- | -------- |
| `clear` | 清空画布   | -                          | -        |
| `back`  | 回退       | -                          | -        |
| `save`  | 保存为图片 | (base64)=>void,(err)=>void | -        |

---$
{{xuyajun}}
