# LoginInfo 登录信息

---$

#### 完整展示

```html
<template>
    <view style="width: 100%">
        <ste-login-info
            :title="data1.title"
            :subTitle="data1.subTitle"
            :avatarUrl="data1.avatarUrl"
            :subTitleIcon="data1.subTitleIcon"
            mainColor="#EC3E1A"
            @data-click="handleDataClick"
            @avatar-click="handleAvatarClick"
            @user-click="handleUserClick"
        />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data1 = reactive({
        avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
        title: '小百食的名称',
        subTitle: '武汉数智云科技有限公司',
        subTitleIcon: '&#xe677;',
    });

    const handleDataClick = (item: any) => {
        console.log('item is 1', item);
    };

    const handleAvatarClick = () => {
        console.log('avatar click');
    };

    const handleUserClick = () => {
        console.log('user click');
    };
</script>
```

#### 类型1

```html
<template>
    <view style="width: 100%">
        <ste-login-info :title="data1.title" :avatarUrl="data1.avatarUrl" />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data1 = reactive({
        avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
        title: '小百食的名称',
        subTitle: '武汉数智云科技有限公司',
    });
</script>
```

#### 类型2

```html
<template>
    <view style="width: 100%">
        <ste-login-info mainColor="#757575" :title="data1.title" :subTitle="data1.subTitle" :avatarUrl="data1.avatarUrl" />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const data1 = reactive({
        avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
        title: '小百食的名称',
        subTitle: '武汉数智云科技有限公司',
    });
</script>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
