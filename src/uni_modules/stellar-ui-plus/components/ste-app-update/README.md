# AppUpdate App更新

此组件用于APP更新功能

---$

## 基础用法

- 属性:
    - `clientId`用于设置APP的应用编码
    - `clientSecret`用于设置APP的应用密钥
- 函数:

    - `start`用于开始检查更新
    - `getSkippedVersions`获取跳过版本列表
    - `clearSkipped`清除跳过版本列表

- 事件：
    - `cancel`取消更新
    - `complete`取消，成功更新都会执行

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
    // 获取跳过版本列表
    const getSkippedList = () => {
        return appUpdate.value?.getSkippedVersions();
    };

    // 清空跳过记录
    const clearSkipped = () => {
        appUpdate.value?.clearSkippedVersions();
    };
</script>
<template>
    <ste-app-update ref="appUpdate" clientId="workbench_android" clientSecret="gkS6lEEncqAocYK2qsrvPQZykm3ISeMx"></ste-app-update>
    <ste-button @click="checkForUpdates">检查更新</ste-button>
    <ste-button @click="getSkippedList">获取跳过版本列表</ste-button>
    <ste-button @click="clearSkipped">清空跳过记录</ste-button>
</template>
```

---$

<!-- props -->

---$
{{xuyajun}}
