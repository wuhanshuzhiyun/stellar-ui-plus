# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容

---$

### 使用方法

#### 组合函数使用方法

ps：注意 目前 useMessageBox 只能在 setup 作用域下使用  
父组件引入组件 组合函数调用showMsgBox方法，打开轻提示

```html
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-plus/composables';
    const msg = useMessageBox();
    function click() {
        msg.showMsgBox({ title: '提示' });
    }
</script>
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="click" :width="400">提示</ste-button>
</template>
```

#### Ref用法

父组件引入组件 绑定ref 通过ref调用showMsgBox方法，打开轻提示

```html
<script setup lang="ts">
    import { ref } from 'vue';
    let steMessageBox = ref();

    function click() {
        steMessageBox.value.showMsgBox({
            title: '提示内容',
        });
    }
</script>
<template>
    <ste-message-box ref="steMessageBox"></ste-message-box>
    <ste-button @click="click" :width="400">提示</ste-button>
</template>
```

#### 全局引入

配合 [https://github.com/smartXJ/vue3-inset-loader](https://github.com/smartXJ/vue3-inset-loader) 插件， 将 ste-message-box 节点置于每个页面中，可以更进一步简化使用

```json
insetLoader: {
        config: {
            messageBox: "<ste-message-box ref='messageBox'></ste-message-box>",
        },
        // 全局配置
        label: ['messageBox'],
        rootEle: '.*',
}
```

### 代码演示

#### 基础使用

可在标题(`title`)和内容(`content`)中使用`\n`来实现换行

```html
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="click" :width="400">提示</ste-button>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-plus/composables';
    const msg = useMessageBox();
    function click() {
        msg.showMsgBox({
            title: '确认删除订单吗？',
        });
    }
</script>
```

#### 带图标

- 内置三种图标类型：`info`、`success`、`error`
- 当显示图标时，内容(`content`)会失效，只显示标题(`title`)

```html
<template>
    <ste-message-box></ste-message-box>
    <view>
        <ste-button @click="msgBoxIcon1">图标1</ste-button>
    </view>
    <view>
        <ste-button @click="msgBoxIcon2">图标2</ste-button>
    </view>
    <view>
        <ste-button @click="msgBoxIcon3">图标3</ste-button>
    </view>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-plus/composables';
    const msg = useMessageBox();
    function msgBoxIcon1() {
        msg.showMsgBox({ title: '提示', icon: 'info' });
    }
    function msgBoxIcon2() {
        msg.showMsgBox({ title: '提示', icon: 'success' });
    }
    function msgBoxIcon3() {
        msg.showMsgBox({
            title: '提示',
            icon: 'error',
        });
    }
</script>
```

#### 自定义按钮

```html
<template>
    <ste-message-box></ste-message-box>
    <view>
        <ste-button @click="msgBoxBtn1">按钮文字</ste-button>
    </view>
    <view>
        <ste-button @click="msgBoxBtn2">按钮颜色</ste-button>
    </view>
    <view>
        <ste-button @click="msgBoxBtn3">无取消按钮</ste-button>
    </view>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-plus/composables';
    const msg = useMessageBox();
    function msgBoxBtn1() {
        msg.showMsgBox({
            title: '提示',
            content: '确认删除订单吗？',
            cancelText: '算了',
            confirmText: '删吧',
        });
    }
    function msgBoxBtn2() {
        msg.showMsgBox({
            title: '提示',
            content: '确认删除订单吗？',
            cancelColor: '#e1e',
            confirmColor: '#a8ae1e',
        });
    }
    function msgBoxBtn3() {
        msg.showMsgBox({
            title: '提示',
            content: '确认删除订单吗？',
            showCancel: false,
        });
    }
</script>
```

#### 显示输入框

当显示输入框时，内容(`content`)将不显示

```html
<template>
    <ste-message-box></ste-message-box>
    <view>
        <ste-button @click="msgBoxInput">输入框</ste-button>
    </view>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-plus/composables';
    const msg = useMessageBox();
    function msgBoxInput() {
        msg.showMsgBox({
            title: '提示',
            content: '确认删除订单吗？',
            editable: true,
            placeholderText: '请输入',
        });
    }
</script>
```

#### 插槽

如果提供的弹框内容不满足需求，可以使用插槽自定义弹框内容。
可以通过指定唯一标识`selector`的方式，在一个页面中使用多个`ste-message-box`，`useSteMsgBox(selector)`会返回一个指定了selector的组件实例。

```html
<template>
    <ste-button @click="customClick">插槽</ste-button>
    <ste-message-box selector="myMsgBox">
        <view style="display: flex; justify-content: center; padding-bottom: 20rpx;width: 504rpx">
            <ste-rate v-model="rate"></ste-rate>
        </view>
    </ste-message-box>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import useSteMsgBox from '@/node_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
    const msgBox = useSteMsgBox('myMsgBox');

    const rage = ref(0);
    function customClick() {
        msgBox.showMsgBox({
            title: '评分',
        });
    }
</script>
```

#### 回调事件

```html
<template>
    <ste-message-box></ste-message-box>
    <view>
        <ste-button @click="msgBoxCallback1">取消</ste-button>
    </view>
    <view>
        <ste-button @click="msgBoxCallback2">确认</ste-button>
    </view>
    <view>
        <ste-button @click="msgBoxCallback3">完成</ste-button>
    </view>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-plus/composables';
    const msg = useMessageBox();
    function msgBoxCallback1() {
        msg.showMsgBox({
            title: '提示',
            cancel: () => {
                console.log('点击了取消');
            },
        });
    }
    function msgBoxCallback2() {
        msg.showMsgBox({
            title: '提示',
            confirm: () => {
                console.log('点击了确认');
            },
        });
    }
    function msgBoxCallback3() {
        msg.showMsgBox({
            title: '提示',
            complete: () => {
                console.log('弹框完成');
            },
        });
    }
</script>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
