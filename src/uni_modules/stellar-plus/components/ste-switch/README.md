# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

{{compatibility}}

### 代码演示

JavaScript后面的演示代码中涉及到的变量和方法都使用本`javascript`代码

```javascript
<script setup lang="ts">
import { ref } from 'vue';
let value1 = ref(false);
let value2 = ref(true);
let value3 = ref(false);
let value4 = ref(false);
let value5 = ref(false);
let value6 = ref(false);
let value7 = ref(false);

function click1(value: any) {
    toast.showToast({
        icon: 'none',
        title: `点击：${value} 开关的值`,
    });
}

function click2(value: any, allowStop: any, resolve: any) {
    toast.showToast({
        icon: 'none',
        title: `点击：${value} 开关的值`,
    });
    // 阻止change事件
    allowStop();
}
function change(value: any) {
    setTimeout(() => {
        toast.showToast({
            icon: 'none',
            title: `改变：${value} 开关的值`,
        });
    }, 1000);
}
</script>
```

#### 基础用法

通过`value`属性，双向绑定，绑定开关的选中状态，`true` 表示开，`false` 表示关。

```
<ste-switch v-model="value1"></ste-switch>
```

#### 只读

通过`readonly `属性，设置只读，不可切换，样式不置灰 默认`false`。

```
<ste-switch v-model="value2" readonly></ste-switch>
```

#### 禁用

通过`disabled`属性，设置禁用，不可切换，样式置灰，默认`false`。

```
<ste-switch v-model="value2" disabled></ste-switch>
```

#### 自定义大小

通过 `size` 属性自定义开关的大小，默认`52`。

```
<ste-switch v-model="value3" size="100"></ste-switch>
```

#### 自定义颜色

通过 `activeColor` 属性自定义开关的激活颜色，默认`#0090FF`。
通过 `inactiveColor` 属性自定义开关的激活颜色，默认`#bbbbbb`。

```
<ste-switch v-model="value4" activeColor="#13CE66" inactiveColor="#FF4949"></ste-switch>
```

#### 加载状态

通过 `loading` 属性设置开关为加载状态，加载状态下开关不可点击，默认`false`。

```
<ste-switch v-model="value2" loading></ste-switch>
<ste-switch v-model="value5" loading></ste-switch>
```

### API

<!-- props -->

{{qinpengfei}}
