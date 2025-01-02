# Drag 拖拽

用于拖拽的容器

---$

### 代码演示

#### 基础使用

```html
<ste-drag>
    <ste-button>拖拽按钮</ste-button>
</ste-drag>
```

#### 固定方向

```html
<ste-drag direction="x">
    <ste-button>横向固定</ste-button>
</ste-drag>

<ste-drag direction="y">
    <ste-button>竖向固定</ste-button>
</ste-drag>
```

#### 贴边

会根据元素移动结束时到左右边界距离来进行贴边

```html
<ste-drag attract>
    <ste-button>贴边</ste-button>
</ste-drag>
```

#### 边界

-   数据结构是 `{top: 0, right: 0, bottom: 0, left: 0}`，分别代表距离屏幕上、右、下、左的距离(单位px)
-   可按照样例中的做法，根据屏幕大小动态边界值

```html
<template>
    <view style="width: 300px; height: 150px; border: solid 1px red" class="boundary-box">
        <ste-drag :boundary="boundary">
            <ste-button>边界</ste-button>
        </ste-drag>
    </view>
</template>
<script lang="ts" setup>
    import utils from '@/common/utils.js';
    import { ref, onMounted } from 'vue';
    const boundary = ref({ left: 22, bottom: 0, top: 354, right: 0 });
    onMounted(() => {
        const systemInfo = utils.getWindowInfo();
        boundary.value.right = systemInfo.windowWidth - 22 - 300;
        boundary.value.bottom = systemInfo.windowHeight - 354 - 150;
    });
</script>
<style>
    .boundary-box {
        width: 300px;
        height: 150px;
        border: solid 1px red;

        position: fixed;
        left: 22px;
        top: 354px;
    }
</style>
```

---$

### API

<!-- props -->

#### Slots

| 插槽名    | 说明     | 插槽参数 | 支持版本 |
| --------- | -------- | -------- | -------- |
| `default` | 拖拽内容 | -        | -        |

---$
{{fuyuwei}}
