# LoginInfo 登录信息

---$

#### 完整展示

```html
<template>
    <view style="width: 100%">
        <ste-login-info nickname="小百食的名称" avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" :login-status="1" @avatar-click="handleAvatarClick" @user-click="handleUserClick">
            <template #desc>
                <view class="desc">
                    <ste-icon code="&#xe670;" color="#EC3E1A" size="26" margin-bottom="2"></ste-icon>
                    <view class="title">中百食堂</view>
                </view>
            </template>
        </ste-login-info>
    </view>
</template>
<script lang="ts" setup>
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
        <ste-login-info loginSrc="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png" loginTitle="欢迎来到中百食堂~" loginInfo="马上登录，在线即点" />
    </view>
</template>
```

#### 类型2

```html
<template>
    <view style="width: 100%">
        <ste-login-info loginSrc="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png" loginTitle="请登录" show-title-icon />
    </view>
</template>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
