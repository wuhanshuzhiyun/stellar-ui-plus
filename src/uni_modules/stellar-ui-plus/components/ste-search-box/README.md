# SearchBox 搜索组件

集成多个功能的搜索组件

---$

### 基础用法

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const value = ref('');
</script>
<template>
    <ste-search-box type="date" v-model:value="value">
        <template #right>
            <view style="padding: 0 16rpx"><ste-icon code="&#xe69a;" color="#0275FF" size="36"></ste-icon></view>
        </template>
    </ste-search-box>
</template>
```

#### 日期选择时间段

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const value = ref('');
</script>
<template>
    <ste-search-box type="dateRange" v-model:value="value">
        <template #right>
            <view style="padding: 0 16rpx"><ste-icon code="&#xe69a;" color="#0275FF" size="36"></ste-icon></view>
        </template>
    </ste-search-box>
</template>
```

#### 输入框字体

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const value = ref('');
</script>
<template>
    <ste-search-box type="date" v-model:value="value" textColor="#FF0000" placeholder="请输入搜索内容" placeholderColor="#FF0000">
        <template #right>
            <view style="padding: 0 16rpx"><ste-icon code="&#xe69a;" color="#0275FF" size="36"></ste-icon></view>
        </template>
    </ste-search-box>
</template>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
