# NumberKeyboard 数字键盘

用于页面上显示价格的组件

{{compatibility}}

### 代码演示

-   以下是公用scss代码

```scss
.test-input {
    height: 66rpx;
    line-height: 66rpx;
    background-color: #f5f5f5;
    padding: 0 18rpx;
    font-size: 24rpx;
    .placeholder {
        color: #999;
    }
}
```

#### 基础用法

-   属性`value`: 输入的值，支持`v-model`双向绑定
-   属性`show`: 是否显示键盘，支持`sync`双向绑定

```html
<view class="test-input" @click="show1 = true">
    <text v-if="value1">{{ value1 }}</text>
    <text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard v-model="value1" v-model:show="show1" />
<script setup lang="ts">
    import { ref } from 'vue';
    const value1 = ref('');
    const show1 = ref(false);
</script>
```

#### 隐藏右侧功能键

-   属性`rightKeys`: 是否显示右侧功能键，默认显示

```html
<view class="test-input" @click="show2 = true">
    <text v-if="value2">{{ value2 }}</text>
    <text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :rightKeys="false" v-model="value2" v-model:show="show2" />
<script setup lang="ts">
    import { ref } from 'vue';
    const value2 = ref('');
    const show2 = ref(false);
</script>
```

#### 隐藏清除按钮,value最大长度

-   属性`showClear`: 是否显示清除按钮，默认显示
-   属性`maxlength`: 最大`value`长度，默认不限制

```html
<view class="test-input" @click="show3 = true">
    <text v-if="value3">{{ value3 }}</text>
    <text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :showClear="false" v-model="value3" v-model:show="show3" maxlength="6" />

<script setup lang="ts">
    import { ref } from 'vue';
    const value3 = ref('');
    const show3 = ref(false);
</script>
```

#### 自定义按键

-   属性`customKeys`: 自定义按键列表，建议不超过两个

```html
<view class="test-input" @click="show4 = true">
    <text v-if="value4">{{ value4 }}</text>
    <text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :customKeys="['00', '.']" v-model="value4" v-model:show="show4" />

<script setup lang="ts">
    import { ref } from 'vue';
    const value4 = ref('');
    const show4 = ref(false);
</script>
```

#### 自定义颜色/字体大小/确定文本

-   属性`textColor`: 按键文字颜色，默认#333333
-   属性`textSize`: 按键文字大小，默认48，单位rpx
-   属性`confirmBg`: 确定按钮背景颜色，默认#0090FF
-   属性`confirmColor`: 确定按钮文字颜色，默认#FFFFFF
-   属性`confirmText`: 确定按钮文字，默认"确定"

```html
<view class="test-input" @click="show5 = true">
    <text v-if="value5">{{ value5 }}</text>
    <text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard v-model="value5" v-model:show="show5" textColor="#f00" textSize="40" confirmBg="#f00" confirmColor="#0f0" confirmText="完成" />

<script setup lang="ts">
    import { ref } from 'vue';
    const value5 = ref('');
    const show5 = ref(false);
</script>
```

#### 输入前事件（自定义功能）

-   属性`customKeys`中自定义一些按钮，如"返回"
    -   需要自定义该按钮功能，可使用`beforeinput`阻止该按钮的默认功能
-   事件`beforeinput`: 输入前事件
    -   参数1：即将输入的按钮文本
    -   参数2：等待执行回调函数
    -   参数3：继续后续操作函数
    -   参数4：阻止后续操作函数

```html
<view class="test-input" @click="show6 = true">
    <text v-if="value6">{{ value6 }}</text>
    <text v-else class="placeholder">请输入</text>
</view>
<ste-number-keyboard :customKeys="['返回']" v-model="value6" v-model:show="show6" @beforeinput="beforeinput" />
<script setup lang="ts">
    import { ref } from 'vue';
    const value6 = ref('');
    const show6 = ref(false);

    function beforeinput(v, suspend, next, stop) {
        // 等待后续操作
        suspend();
        // 执行自定义操作
        if (v === '返回') {
            // 阻止默认后续操作
            stop();
            this.showToast({
                title: '点击了返回',
                icon: 'none',
            });
        } else {
            // 继续默认后续操作
            next();
        }
    }
</script>
```

#### 在文档流中展示

-   属性`mode`: 键盘模式，
    -   可选值:`popup`在弹窗中展示(默认)
    -   可选值:`page`在文档流中展示

```html
<view class="test-input">
    <text v-if="value7">{{ value7 }}</text>
    <text v-else class="placeholder">请输入</text>
</view>
<view style="padding: 30rpx; background-color: #f5f5f5; margin-top: 12rpx">
    <ste-number-keyboard mode="page" v-model="value7" />
</view>

<script setup lang="ts">
    import { ref } from 'vue';
    const value7 = ref('');
</script>
```

### API

<!-- props -->

#### 组件插槽(Slot)

| 插槽名  | 说明         | 插槽参数 | 支持版本 |
| ------- | ------------ | -------- | -------- |
| default | 弹窗标题插槽 | -        | -        |

{{xuyajun}}
