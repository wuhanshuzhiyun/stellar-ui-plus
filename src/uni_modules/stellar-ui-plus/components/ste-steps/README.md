# Steps 步骤条

步骤条组件,拆分展示某项流程的步骤，引导用户按流程完成任务或向用户展示当前状态

---$

### 代码演示

后面的演示代码中涉及到的变量和方法都使用该代码

### 基础用法

`active` 为步骤进度，为 `Number` 类型，步骤的下标。

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const active = ref(0);

    function toToast(index: number) {
        uni.showToast({
            title: `进度：${index}`,
        });
    }
</script>
<template>
    <ste-steps :active="active" @clickStep="toToast">
        <ste-step></ste-step>
        <ste-step></ste-step>
        <ste-step></ste-step>
    </ste-steps>
</template>
```

### 设置标题和描述信息

可以通过 `title` 和 `description` 设置步骤的标题和描述信息。如果不设置标题，则会使用默认的文案。

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const active = ref(0);
</script>
<template>
    <ste-steps :active="active">
        <ste-step title="步骤1" description="注册1个账号"></ste-step>
        <ste-step title="步骤2" description="登录账号并绑定手机"></ste-step>
        <ste-step title="步骤3" description="完善个人信息"></ste-step>
    </ste-steps>
</template>
```

### 修改图标

- 可以通过 `icon` 属性设置步骤的图标，传入图标的名称，也可以通过 `icon` 的 slot 插槽自定义图标
- 优先级：插槽 > 点状 > icon属性 > 默认图标

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const active = ref(0);
</script>
<template>
    <ste-steps :active="active">
        <ste-step></ste-step>
        <ste-step icon="&#xe6a2;"></ste-step>
        <ste-step>
            <template v-slot:icon>
                <ste-icon class="ste-step-icon-inner" code="&#xe688;" :size="40" color="red"></ste-icon>
            </template>
        </ste-step>
    </ste-steps>
</template>
```

### 竖向步骤条

可以通过 `direction` 属性设置步骤条方向，`row`：横向，`column`：竖向，默认为`row`

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const active = ref(0);
</script>
<template>
    <view class="item-block" style="height: 600rpx; padding: 30rpx 60rpx">
        <ste-steps :active="active" direction="column">
            <ste-step description="注册1个账号"></ste-step>
            <ste-step description="登录账号并绑定手机"></ste-step>
            <ste-step description="完善个人信息"></ste-step>
        </ste-steps>
    </view>
</template>
```

### 点状步骤和垂直方向

可以通过 `dot` 属性设置点状步骤条

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const active = ref(0);
</script>
<template>
    <view class="item-block" style="height: 600rpx; padding: 30rpx 60rpx">
        <ste-steps :active="active" dot direction="column">
            <ste-step></ste-step>
            <ste-step></ste-step>
            <ste-step></ste-step>
        </ste-steps>
    </view>
</template>
```

### 修改状态

设置 `status`，支持 `finished`（完成）、`process`（进行中）、`error`（失败） 三种状态。

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const active = ref(0);
</script>
<template>
    <ste-steps :active="active">
        <ste-step title="绑定手机" status="error"></ste-step>
        <ste-step title="重新绑定手机"></ste-step>
        <ste-step title="步骤3"></ste-step>
    </ste-steps>
</template>
```

---$

### API

<!-- props -->

#### Step组件属性(Props)

| 参数          | 说明                                 | 类型     | 默认值 | 可选值 | 支持版本 |
| ------------- | ------------------------------------ | -------- | ------ | ------ | -------- |
| `title`       | 流程步骤的标题                       | `String` | -      | -      | -        |
| `description` | 流程步骤的描述性文字(支持 html 结构) | `String` | -      | -      | -        |
| `icon`        | 图标                                 | `String` | -      | -      | -        |
| `status`      | 步骤状态                             | `String` | -      | -      | -        |

#### Step Slots

| 插槽名    | 说明     | 插槽参数 | 支持版本 |
| --------- | -------- | -------- | -------- |
| `title`   | 步骤标题 | -        | -        |
| `content` | 步骤内容 | -        | -        |
| `icon`    | 步骤图标 | -        | -        |

---$
{{qinpengfei}}
