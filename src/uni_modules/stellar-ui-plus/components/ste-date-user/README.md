# DateUser 人员信息以及日期

提供日期和用户信息展示。

---$

## 代码演示

### 日期类型

- 通过 `type`设置组件类型，默认为`date`
- 通过 `date`设置日期时间，默认为`当天`

```html
<template>
    <ste-date-user date="2025-10-01"></ste-date-user>
</template>
```

### 返回按钮配置

- 通过 `type`设置组件类型，值为`user`
- 通过 `avatar` 属性来设置头像，默认``
- 通过 `desc` 插槽来设置用户描述，默认``

```html
<template>
    <ste-date-user type="user" avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三">
        <template v-slot:desc>
            <view class="desc">
                <view class="title">店长</view>
                <ste-icon code="&#xe6c7;" color="#0275FF" size="15"></ste-icon>
            </view>
        </template>
    </ste-date-user>
</template>

<style>
    .desc {
        display: flex;
        align-items: center;
        .title {
            font-size: 24rpx;
            color: #0275ff;
            margin: 4rpx;
            margin-right: 14rpx;
        }
    }
</style>
```

---$

### API

<!-- props -->

#### Slots

| 插槽名 | 说明     | 插槽参数 | 支持版本 |
| ------ | -------- | -------- | -------- |
| `desc` | 用户描述 | -        | -        |

---$
{{qinpengfei}}
