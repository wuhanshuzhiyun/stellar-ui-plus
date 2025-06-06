# UserInfo 用户信息

提供用户信息展示。

---$

## 代码演示

### 基本使用

- 通过 `avatar`设置头像，默认为``
- 通过 `nickname`设置昵称，默认为``
- 通过 `desc`插槽设置用户描述，默认为``
- 通过 `list`设置数据列表（最多三个），默认为`[]`
- 通过 `codeSrc`设置功能码图片，默认为``
- 通过 `codeTitle`设置功能码标题，默认为``
- 通过 `codeTitleColor`设置功能码标题颜色，默认为`主题色`

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    let list1 = ref([
        { title: '余额', value: '100' },
        { title: '订餐数', value: '8' },
    ]);

    let list2 = ref([
        { title: '数据1', value: '100' },
        { title: '数据2', value: '8' },
        { title: '数据3', value: '8' },
    ]);
    let list3 = ref([{ title: '数据1', value: '100' }]);
</script>
<template>
    <view class="item-block">
        <view>
            <ste-user-info
                avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                nickname="张三"
                :list="list1"
                codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                codeTitle="核销码"
                codeTitleColor="#EC3E1A"
            >
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info
                avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                nickname="张三"
                :list="[]"
                codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                codeTitle="核销码"
                codeTitleColor="#EC3E1A"
            >
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info
                avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                nickname="张三"
                :list="list3"
                codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                codeTitle="核销码"
                codeTitleColor="#EC3E1A"
            >
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info
                avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                nickname="张三"
                :list="list2"
                codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                codeTitle="核销码"
                codeTitleColor="#EC3E1A"
            >
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
</template>
<style>
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;
        }
    }
    .desc {
        display: flex;
        align-items: center;
        .title {
            font-size: 24rpx;
            color: #ec3e1a;
            margin: 4rpx;
            margin-right: 14rpx;
        }
    }
</style>
```

### 用户信息隐藏

- 通过 `showUserInfo`设置是否展示用户相关，默认为`true`

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    let list1 = ref([
        { title: '余额', value: '100' },
        { title: '订餐数', value: '8' },
    ]);

    let list2 = ref([
        { title: '数据1', value: '100' },
        { title: '数据2', value: '8' },
        { title: '数据3', value: '8' },
    ]);
    let list3 = ref([{ title: '数据1', value: '100' }]);
</script>
<template>
    <view class="item-block">
        <view>
            <ste-user-info :showUserInfo="false" :list="list1" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info :showUserInfo="false" :list="[]" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info :showUserInfo="false" :list="list3" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info :showUserInfo="false" :list="list2" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
        </view>
    </view>
</template>
<style>
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;
        }
    }
    .desc {
        display: flex;
        align-items: center;
        .title {
            font-size: 24rpx;
            color: #ec3e1a;
            margin: 4rpx;
            margin-right: 14rpx;
        }
    }
</style>
```

### 核销码隐藏

- 通过 `showCode`设置核销码隐藏，默认为`true`

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    let list1 = ref([
        { title: '余额', value: '100' },
        { title: '订餐数', value: '8' },
    ]);

    let list2 = ref([
        { title: '数据1', value: '100' },
        { title: '数据2', value: '8' },
        { title: '数据3', value: '8' },
    ]);
    let list3 = ref([{ title: '数据1', value: '100' }]);
</script>
<template>
    <view class="item-block">
        <view>
            <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="list1" :showCode="false">
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="[]" :showCode="false">
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="list3" :showCode="false">
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="list2" :showCode="false">
                <template v-slot:desc>
                    <view class="desc">
                        <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                        <view class="title">中百食堂</view>
                    </view>
                </template>
            </ste-user-info>
        </view>
    </view>
</template>
<style>
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;
        }
    }
    .desc {
        display: flex;
        align-items: center;
        .title {
            font-size: 24rpx;
            color: #ec3e1a;
            margin: 4rpx;
            margin-right: 14rpx;
        }
    }
</style>
```

### 用户信息和核销码隐藏

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    let list1 = ref([
        { title: '余额', value: '100' },
        { title: '订餐数', value: '8' },
    ]);

    let list2 = ref([
        { title: '数据1', value: '100' },
        { title: '数据2', value: '8' },
        { title: '数据3', value: '8' },
    ]);
    let list3 = ref([{ title: '数据1', value: '100' }]);
</script>
<template>
    <view class="item-block">
        <view>
            <ste-user-info :showCode="false" :showUserInfo="false" :list="list1"></ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info :showCode="false" :showUserInfo="false" :list="[]"></ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info :showCode="false" :showUserInfo="false" :list="list3"></ste-user-info>
        </view>
    </view>
    <view class="item-block">
        <view>
            <ste-user-info :showCode="false" :showUserInfo="false" :list="list2"></ste-user-info>
        </view>
    </view>
</template>
<style>
    .item-block {
        > view {
            margin: 0 36rpx 36rpx 0;
        }
    }
    .desc {
        display: flex;
        align-items: center;
        .title {
            font-size: 24rpx;
            color: #ec3e1a;
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
