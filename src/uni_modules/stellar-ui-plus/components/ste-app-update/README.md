# AppUpdate App更新

此组件用于APP更新功能

---$

### 基础用法

- 属性`clientId`用于设置APP的应用编码
- 属性`clientSecret`用于设置APP的应用密钥
- 函数`start`用于开始检查更新
- 回调事`cancel`取消更新
- 回调事`complete`取消，成功更新都会执行

```html
<script setup lang="ts">
    import type { RefAppUpdate } from '@/uni_modules/stellar-ui-plus/types/refComponents';
    import { onHide } from '@dcloudio/uni-app';
    import { ref } from 'vue';

    const appUpdate = ref<RefAppUpdate>();
    // 监听检查更新结果
    const checkForUpdates = () => {
        appUpdate.value?.start(({ code, name }, version) => {
            console.log(`当前版本号：${version}`);
            console.log(`服务器版本号：${code}；服务器版本名称${name}`);
        });
    };
</script>
<template>
    <ste-app-update ref="appUpdate" clientId="workbench_android" clientSecret="gkS6lEEncqAocYK2qsrvPQZykm3ISeMx"></ste-app-update>
    <button @click="checkForUpdates">检查更新</button>
</template>
```

---$

### API

<!-- props -->

---$
{{xuyajun}}
