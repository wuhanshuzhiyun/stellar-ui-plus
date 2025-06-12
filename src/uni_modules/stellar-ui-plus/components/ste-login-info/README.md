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

#### 未登录

- 通过 `loginStatus`设置登录状态，`0`：未登录，`1`：登录，默认为`1`
- 通过 `loginSrc`设置未登录头像，默认为``
- 通过 `loginTitle`设置未登录标题，默认为``

```html
<template>
    <view style="width: 100%">
        <ste-login-info mainColor="#757575" :loginStatus="0" loginSrc="https://image.whzb.com/chain/StellarUI/%E5%9B%BE%E7%89%87.jpg" loginTitle="请登录" />
    </view>
</template>
```

---$

### API

<!-- props -->

---$
{{fuyuwei}}
