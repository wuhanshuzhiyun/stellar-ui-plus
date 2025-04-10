# Calendar 日历

此组件用于单个选择日期，范围选择日期等

---$

### 基础用法

- 属性`height`用于设置日历的高度，单位为`rpx`，默认`100%`
- 属性`showTitle`用于设置是否显示日历的标题，默认`true`
- 属性`title`用户设置日历的标题，默认`日期选择`
- 事件`confirm`用于监听用户点击确定按钮事件，参数为选中的日期数组

```html
<script setup lang="ts">
    import { ref } from 'vue';
    import type { RefCalendar } from '@/uni_modules/stellar-ui-plus/types/refComponents';
    const show1 = ref(false);
    const show2 = ref(false);
    const show3 = ref(false);
    const show4 = ref(false);
    const show5 = ref(false);
    const show6 = ref(false);
    const show7 = ref(false);
    const show8 = ref(false);
    const show9 = ref(false);
    const show10 = ref(false);
    const show11 = ref(false);
    const show12 = ref(false);
    const show13 = ref(false);

    const handleConfirm = (v: (string | number)[]) => {
        toast.showToast({
            title: '确定选择：' + v.join(' '),
            icon: 'none',
            duration: 1500,
        });
    };

    const defaultMonth = ref<RefCalendar>();

    const setViewMonth = () => {
        defaultMonth.value?.showMonth('2024-07');
    };
</script>
<template>
    <ste-calendar height="720" :showTitle="false" @confirm="handleConfirm" />
</template>
```

### 结合弹窗使用

#### 基础使用

```html
<ste-button @click="show1 = true">默认(单个日期)</ste-button>
<ste-popup v-model:show="show1" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 多个日期

- 属性`mode`用于设置日历的模式，可选值`single`、`multiple`、`range`，默认`single`
    - 设置为`multiple`可以选择多个日期

```html
<ste-button @click="show2 = true">多个日期</ste-button>
<ste-popup v-model:show="show2" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar mode="multiple" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 日期范围

- 属性`mode`用于设置日历的模式，可选值`single`、`multiple`、`range`，默认`single`
    - 设置为`single`可以选择日期范围

```html
<ste-button @click="show3 = true">日期范围</ste-button>
<ste-popup v-model:show="show3" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar mode="range" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 自定义主题色

- 属性`color`可以设置日历的主题色，包括周末日期颜色、日期选中颜色、日期范围选中颜色、确定按钮颜色

```html
<ste-button @click="show4 = true">自定义主题色</ste-button>
<ste-popup v-model:show="show4" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar color="#3478f6" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 自定义文案

- 属性`title`可以设置标题文案
- 属性`startText`可以设置开始日期的文案，`mode`值为`range`时生效
- 属性`endText`可以设置结束日期的文案，`mode`值为`range`时生效

```html
<ste-button @click="show5 = true">自定义文案</ste-button>
<ste-popup v-model:show="show5" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar mode="range" title="酒店预约" startText="住店" endText="离店" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 日期最大范围

- 属性`minDate`可以设置日期的最小可选范围
- 属性`maxDate`可以设置日期的最大可选范围

```html
<ste-button @click="show6 = true">日期最大范围</ste-button>
<ste-popup v-model:show="show6" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar mode="range" minDate="2024-05-10" maxDate="2024-05-20" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 多选数量限制

- 属性`maxCount`用于设置多选模式下最多可选的日期数量

```html
<ste-button @click="show7 = true">多选数量限制</ste-button>
<ste-popup v-model:show="show7" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar mode="multiple" :maxCount="5" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 多选数量限制

- 属性`maxRange`用于设置范围模式下最多可选的日期数量
- 属性`showRangePrompt`用于设置范围模式下是否显示超出数量时的提示文案
- 属性`rangePrompt`用于设置范围模式下超出数量时的提示文案

```html
<ste-button @click="show8 = true">范围数量限制</ste-button>
<ste-popup v-model:show="show8" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar mode="range" :maxRange="5" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 默认选择日期

- 属性`list`用于设置默认选择的日期

```html
<ste-button @click="show9 = true">默认选择日期</ste-button>
<ste-popup v-model:show="show9" height="60vh" position="bottom">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar :list="[Date.now()]" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 默认展示月份

- 属性`defaultMonth`用于设置默认展示的月份，因为弹窗中的日历不在文档流，无法设置滚动距离，所以需要在弹窗动画结束之后手动设置默认展示的月份

```html
<ste-button @click="show10 = true">默认展示月份</ste-button>
<ste-popup v-model:show="show10" position="bottom" height="60vh" @open-after="setViewMonth">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar ref="defaultMonth" minDate="2024-05-20" maxDate="2024-08-01" @confirm="handleConfirm" />
    </div>
</ste-popup>
```

#### 隐藏确定按钮

- 属性`showConfirm`用于设置是否显示确定按钮
- 事件`select`用于监听选择日期的事件

```html
<ste-button @click="show11 = true">隐藏确定按钮</ste-button>
<ste-popup v-model:show="show11" position="bottom" height="60vh">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar minDate="2024-05-20" maxDate="2024-08-01" @select="handleConfirm" :showConfirm="false" />
    </div>
</ste-popup>
```

#### 只读

- 属性`readonly`用于设置是否只读

```html
<ste-button @click="show12 = true">只读</ste-button>
<ste-popup v-model:show="show12" position="bottom" height="60vh">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar minDate="2024-05-20" maxDate="2024-06-10" readonly :list="['2024-05-21']" />
    </div>
</ste-popup>
```

#### 隐藏背景月份

- 属性`showMark`用于设置是否显示背景月份

```html
<ste-button @click="show13 = true">隐藏背景月份</ste-button>
<ste-popup v-model:show="show13" position="bottom" height="60vh">
    <div style="padding-bottom: 20px; height: 100%">
        <ste-calendar :showMark="false" @select="handleConfirm" />
    </div>
</ste-popup>
```

#### 自定义组件

- 属性`weekendColor`用于设置周末日期颜色
- 属性`monthCount`用于设置渲染的月数
- 属性`signs`用于设置标记的日期

```html
<script setup>
    import { ref, reactive } from 'vue';
    import type { SignType } from '@/uni_modules/stellar-ui-plus/components/ste-calendar/date';
    import utils from '@/uni_modules/stellar-ui-plus/utils/utils';
    const defaultDate = ref(utils.dayjs().format('YYYY-MM'));
    const signs = reactive<{ [key: string]: SignType }>({
        // 标记今天
        [utils.dayjs().format('YYYY-MM-DD')]: [
            { content: 'XXXXX', className: 'test-signs' },
            { content: 'XXXXX', className: 'test-signs' },
            { content: 'XXXXX', className: 'test-signs' },
        ],
        // 标记明天
        [utils.dayjs(Date.now() + 1000 * 60 * 60 * 24).format('YYYY-MM-DD')]: [
            { content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
            { content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
        ],
    });
</script>
<template>
    <ste-select mode="month" v-model="defaultDate" width="200" options-width="420" border-color="transparency">
        <template v-slot:icon>
            <ste-icon code="&#xe699;"></ste-icon>
        </template>
    </ste-select>

    <ste-calendar @select="handleConfirm" weekendColor="#999" color="#09f" :signs="signs" :defaultDate="defaultDate" :monthCount="1" :showConfirm="false" :showTitle="false" />
</template>
```

---$

### API

<!-- props -->

#### Methods

| 方法名    | 说明               | 参数                        | 支持版本 |
| --------- | ------------------ | --------------------------- | -------- |
| showMonth | 设置默认展示的月份 | 要展示的年月（YYYY-MM格式） | -        |

---$
{{xuyajun}}
