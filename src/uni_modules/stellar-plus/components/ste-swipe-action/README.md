# SwipeAction 滑动单元格

-   该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。
-   如果把该组件通过v-for用于左滑删除的列表，请保证循环的:key是一个唯一值，可以用数据的id或者title替代。 不能是数组循环的index，否则删除的时候，可能会出现数据错乱

{{compatibility}}

### 代码演示

-   演示代码中公用css样式

```css
.content-view {
    height: 90rpx;
    border-bottom: 1px solid #fff;
    background-color: #f5f5f5;
}
.test-btn {
    background-color: #dd524d;
    color: #fff;
    line-height: 90rpx;
    text-align: center;
    width: 100rpx;
    height: 100%;
}
```

#### 基础用法

-   插槽`default`为单元格内容区域
-   插槽`right`为单元格右侧内容区域

```html
<ste-swipe-action>
    <view class="content-view">内容区域</view>
    <template v-slot:right>
        <div class="test-btn">删除</div>
    </template>
</ste-swipe-action>
```

#### 调用方法打开或关闭

-   方法`open`可打开单元格
    -   参数为需要打开的方向（默认同mode）
-   方法`close`可关闭单元格

```html
<ste-swipe-action ref="swipe">
    <view class="content-view">内容区域</view>
    <template v-slot:right>
        <div class="test-btn">删除</div>
    </template>
</ste-swipe-action>
<ste-button mode="200" @click="openSwipe">打开</ste-button>
<ste-button mode="200" @click="closeSwipe">关闭</ste-button>
<script lang="ts" setup>
    import type { RefSwipeAction } from '../../../../uni_modules/stellar-plus/types/refComponents';
    const swipe = ref<RefSwipeAction>();
    const openSwipe = () => {
        swipe.value?.open();
    };
    const closeSwipe = () => {
        swipe.value?.close();
    };
</script>
```

#### 滑动方向、开关按钮

-   属性`mode`可以设置滑动方向，默认为`right`，可选值为`left`、`all`
-   属性`leftIcon`和`rightIcon`可以设置是否显示开关按钮
-   事件`open`可以监听单元格的打开
    -   参数为打开的方向
-   事件`close`可以监听单元格的关闭

```html
<ste-swipe-action mode="all" @open="onOpen" @close="onClose" leftIcon rightIcon>
    <template v-slot:left>
        <div class="test-btn">收藏</div>
    </template>
    <view class="content-view">内容区域</view>
    <template v-slot:right>
        <div class="test-btn">删除</div>
    </template>
</ste-swipe-action>
<script lang="ts" setup>
    import { useToast } from '@/uni_modules/stellar-plus/composables';
    let toast = useToast();
    const onOpen = (direction: 'left' | 'right', index?: number) => {
        toast.showToast({
            title: index || index === 0 ? `第${index + 1}条的打开方向:${direction}` : `打开方向：${direction}`,
            icon: 'none',
        });
    };
    const onClose = (index?: number) => {
        toast.showToast({
            title: index || index === 0 ? `关闭第${index + 1}条` : '关闭',
            icon: 'none',
        });
    };
</script>
```

#### 单元格组

-   标签`ste-swipe-action-group`用于包裹多个单元格
-   事件`open`监听组内单元格的开启
    -   第一个参数为打开的方向
    -   第二个参数为打开的单元格索引
-   事件`close`监听组内单元格的关闭
    -   参数为关闭的单元格索引
-   方法`open`可以用于打开指定单元格
    -   参数1为需要打开的方向（默认同mode）
    -   参数2为需要打开的单元格索引
-   方法`close`可以用于关闭指定单元格
    -   参数为需要关闭的单元格索引

```html
<ste-swipe-action-group @open="onOpen" @close="onClose" ref="swipeGroup">
    <ste-swipe-action>
        <view class="content-view">11111</view>
        <template v-slot:right>
            <div class="test-btn">删除</div>
        </template>
    </ste-swipe-action>
    <ste-swipe-action>
        <view class="content-view">22222</view>
        <template v-slot:right>
            <div class="test-btn">删除</div>
        </template>
    </ste-swipe-action>
</ste-swipe-action-group>
<view style="margin-top: 12rpx">
    <ste-button mode="200" @click="openSwipeGroup(0)">打开第1行</ste-button>
    <ste-button mode="200" @click="closeSwipeGroup(0)">关闭第1行</ste-button>
    <ste-button mode="200" @click="openSwipeGroup(1)">打开第2行</ste-button>
    <ste-button mode="200" @click="closeSwipeGroup(1)">关闭第2行</ste-button>
</view>
<script lang="ts" setup>
    import { ref } from 'vue';
    import type { RefSwipeAction, RefSwipeActionGroup } from '../../../../uni_modules/stellar-plus/types/refComponents';
    const swipeGroup = ref<RefSwipeActionGroup>();
    const openSwipeGroup = (index: number) => {
        swipeGroup.value?.open('right', index);
    };
    const closeSwipeGroup = (index: number) => {
        swipeGroup.value?.close(index);
    };
</script>
```

### SwipeAction API

<!-- props -->

#### Method

| 方法名  | 说明                 | 方法参数                                     | 支持版本 |
| ------- | -------------------- | -------------------------------------------- | -------- |
| `open`  | 打开滑块，参数为方向 | `left`/`right`：需要打开的方向，默认同`mode` | -        |
| `close` | 关闭滑块             | -                                            | -        |

### SwipeActionGroup API

#### Props

| 属性名           | 说明                                        | 类型              | 默认值  | 可选值                                                     | 支持版本 |
| ---------------- | ------------------------------------------- | ----------------- | ------- | ---------------------------------------------------------- | -------- |
| `mode`           | 模式                                        | `String`          | `right` | `right`：右侧滑动<br/>`left`：左侧滑动<br/>`all`：左右滑动 | -        |
| `autoClose`      | 是否自动关闭其他swipe                       | `Boolean`         | `true`  | -                                                          | -        |
| `disabled`       | 禁用                                        | `Boolean`         | `false` | -                                                          | -        |
| `swipeThreshold` | 灵敏度（0-1之间的小数，数值越小灵敏度越高） | `Number`          | `0.35`  | -                                                          | -        |
| `duration`       | 动画时长，单位ms                            | `Number`,`String` | `300`   | -                                                          | -        |
| `leftIcon`       | 是否显示左侧图标                            | `Boolean`         | `false` | -                                                          | -        |
| `rightIcon`      | 是否显示右侧图标                            | `Boolean`         | `false` | -                                                          | -        |

#### Events

| 事件名  | 说明           | 事件参数                                       | 支持版本 |
| ------- | -------------- | ---------------------------------------------- | -------- |
| `open`  | 打开滑块时触发 | `left`/`right`：打开的方向,`index`：打开的下标 | -        |
| `close` | 关闭滑块时触发 | -                                              | -        |

#### Method

| 方法名  | 说明     | 方法参数                                                                | 支持版本 |
| ------- | -------- | ----------------------------------------------------------------------- | -------- |
| `open`  | 打开滑块 | `left`/`right`:需要打开的方向，默认同`mode`,<br/>`index`:需要打开的下标 | -        |
| `close` | 关闭滑块 | `index`                                                                 | -        |

{{xuyajun}}
