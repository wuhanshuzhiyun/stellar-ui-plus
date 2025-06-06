# MainInfo 主数据展示

用于展示一些主要信息

---$

#### 基础用法

```html
<template>
    <view style="width: 100%">
        <ste-main-info
            @data-click="handleDataClick"
            @avatar-click="handleAvatarClick"
            @user-click="handleUserClick"
            mainColor="#EC3E1A"
            :infoData="data1.infoData"
            :infoUser="data1.infoUser"
            :infoCode="data1.infoCode"
            :avatarUrl="data1.avatarUrl"
        />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data1 = reactive({
        avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
        infoUser: {
            title: '嗨，小百百百',
            subTitle: '中百食堂',
            subTitleIcon: '&#xe677;',
        },
        infoData: [
            { name: '数据1', value: '100', key: '1' },
            { name: '数据2', value: '8', key: '2' },
            { name: '数据3', value: '10', key: '3' },
        ],
        infoCode: {
            name: '核销码',
            img: 'https://image.whzb.com/chain/StellarUI/image/code1.png',
        },
    });
</script>
```

#### 2数据&有核销码

```html
<template>
    <view style="width: 100%">
        <ste-main-info mainColor="#EC3E1A" :infoData="data2.infoData" :infoUser="data2.infoUser" :infoCode="data2.infoCode" :avatarUrl="data2.avatarUrl" />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data2 = reactive({
        avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
        infoUser: {
            title: '嗨，小百百百',
            subTitle: '中百食堂',
            subTitleIcon: '&#xe677;',
        },
        infoData: [
            { name: '数据1', value: '100', key: 1 },
            { name: '数据2', value: '8', key: 2 },
        ],
        infoCode: {
            name: '核销码',
            img: 'https://image.whzb.com/chain/StellarUI/image/code1.png',
        },
    });
</script>
```

#### 3数据&无核销码

```html
<template>
    <view style="width: 100%">
        <ste-main-info mainColor="#EC3E1A" :infoData="data3.infoData" :infoUser="data3.infoUser" :avatarUrl="data2.avatarUrl" />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data3 = reactive({
        avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
        infoUser: {
            title: '嗨，小百百百',
            subTitle: '中百食堂',
            subTitleIcon: '&#xe677;',
        },
        infoData: [
            { name: '数据1', value: '100', key: 1 },
            { name: '数据2', value: '8', key: 2 },
            { name: '数据3', value: '10', key: 3 },
        ],
    });
</script>
```

#### 无头像名称&有3个数据&有核销码

```html
<template>
    <view style="width: 100%">
        <ste-main-info mainColor="#EC3E1A" :infoData="data4.infoData" :infoCode="data4.infoCode" />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data4 = reactive({
        infoData: [
            { name: '数据1', value: '100', key: 1 },
            { name: '数据2', value: '8', key: 2 },
            { name: '数据3', value: '10', key: 3 },
        ],
        infoCode: {
            name: '核销码',
            img: 'https://image.whzb.com/chain/StellarUI/image/code1.png',
        },
    });
</script>
```

#### 无头像名称&有3个数据&无核销码

```html
<template>
    <view style="width: 100%">
        <ste-main-info mainColor="#EC3E1A" :infoData="data5.infoData" />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data5 = reactive({
        infoData: [
            { name: '数据1', value: '100', key: 1 },
            { name: '数据2', value: '8', key: 2 },
            { name: '数据3', value: '10', key: 3 },
        ],
    });
</script>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
