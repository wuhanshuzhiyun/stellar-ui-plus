# Stepper 步进器

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字

---$

### 代码演示

后面的演示代码中涉及到的变量和方法都使用该代码

```html
<script lang="ts" setup>
    import { ref } from 'vue';

    const val = ref({
        value1: 10,
        value2: 7,
        value3: 2,
        value4: 5.8,
        value5: 5,
        value6: 6,
        value7: 7,
        value8: 8,
        value9: 9,
        value10: 10,
        value11: 11,
        value12: 12,
        value13: 13,
        value14: 14,
        value15: 15,
        value16: 16,
        value17: 17,
        value18: 18,
        value19: 19,
    });

    function blur(_event: number) {
        toast.showToast({
            icon: 'none',
            title: `失焦事件`,
        });
    }
    function focus() {
        toast.showToast({
            icon: 'none',
            title: `聚焦事件`,
        });
    }
    function click1(value: number, suspend: () => void, next: () => void, _stop: () => void) {
        toast.showToast({
            icon: 'none',
            title: `点击按钮：${value} 输入值`,
        });
        suspend();
        setTimeout(() => {
            toast.showToast({
                icon: 'none',
                title: `执行成功`,
            });
            next();
        }, 1500);
    }
    function click2(value: number, suspend: () => void, _next: () => void, stop: () => void) {
        toast.showToast({
            icon: 'none',
            title: `点击按钮：${value} 输入值`,
        });
        // 阻止change事件
        suspend();
        setTimeout(() => {
            toast.showToast({
                icon: 'none',
                title: `执行成功`,
            });
            stop();
        }, 1500);
    }
    function change(value: number) {
        setTimeout(() => {
            toast.showToast({
                icon: 'none',
                title: `改变：${value} 输入值`,
            });
        }, 1000);
    }
</script>
```

#### 基础用法

通过`value`属性，双向绑定，设置输入值

```
<ste-stepper v-model="value1"></ste-stepper>
```

#### 限制输入范围

通过 `min` 和 `max` 属性限制输入值的范围，默认超出范围后会自动校正最大值(默认值：`Infinity`)或最小值(默认值：`0`)

```
<ste-stepper v-model="value2" :min="5" :max="15"></ste-stepper>
```

#### 步长设置

通过 `step` 属性设置每次点击增加或减少按钮时变化的值，默认为 1。

```
<ste-stepper v-model="value3" :step="2"></ste-stepper>
```

#### 数值精度

通过 `precision` 属性设置输入值的小数位，默认为 1。

```
<ste-stepper v-model="value4" :precision="1"></ste-stepper>
```

#### 自定义大小

通过 `inputWidth` 属性设置输入框宽度，通过 `buttonSize` 属性设置按钮大小和输入框高度。

```
<ste-stepper v-model="value5" inputWidth="100" btnSize="70"></ste-stepper>
```

#### 主色

通过 `mainColor` 属性设置步进器的主色，对`theme`为`line`时无效。

```
<ste-stepper v-model="value5" inputWidth="100" btnSize="70"></ste-stepper>
```

#### 禁用

- 通过 `disabled` 属性设置禁用步进器，默认为 `false`。
- 通过 `disablePlus` 属性设置禁用增加按钮，默认为 `false`。
- 通过 `disableMinus` 属性设置禁用减少按钮，默认为 `false`。
- 通过 `disableInput` 属性设置禁用输入框，默认为 `false`。

```
<ste-stepper v-model="value7" disabled></ste-stepper>
<ste-stepper v-model="value8" disablePlus></ste-stepper>
<ste-stepper v-model="value9" disableInput></ste-stepper>
<ste-stepper v-model="value10" disableMinus></ste-stepper>
```

#### 样式风格：线性风格

通过 `theme` 属性设置步进器的样式风格，设置为线性 `line`，默认为 `card`。

```
<ste-stepper v-model="value11" theme="line"></ste-stepper>
<ste-stepper v-model="value12" theme="line" disabled></ste-stepper>
<ste-stepper v-model="value13" theme="line" disablePlus></ste-stepper>
<ste-stepper v-model="value14" theme="line" disableInput></ste-stepper>
<ste-stepper v-model="value15" theme="line" disableMinus></ste-stepper>
```

---$

### API

#### 组件属性(Props)

<!-- props -->

---$
{{qinpengfei}}
