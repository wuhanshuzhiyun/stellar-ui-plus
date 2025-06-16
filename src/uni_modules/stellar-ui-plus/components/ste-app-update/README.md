# AppUpdate App更新

此组件用于APP更新功能

---$

### 基础用法

- 属性`clientId`用于设置APP的应用编码
- 属性`clientSecret`用于设置APP的应用密钥

```html
<script setup lang="ts">
    import type { RefAppUpdate } from '@/uni_modules/stellar-ui-plus/types/refComponents';
    import { onMounted, ref } from 'vue';

    const appUpdate = ref<RefAppUpdate>();
    onMounted(() => {
        appUpdate.value?.start(({ code, name }, version) => {
            console.log(`当前版本号：${version}`);
            console.log(`服务器版本号：${code}；服务器版本名称${name}`);
        });
    });
</script>
<template>
    <ste-app-update ref="appUpdate" clientId="workbench_android" clientSecret="gkS6lEEncqAocYK2qsrvPQZykm3ISeMx"></ste-app-update>
</template>
```

---$

### API

<!-- props -->

---$
{{xuyajun}}
