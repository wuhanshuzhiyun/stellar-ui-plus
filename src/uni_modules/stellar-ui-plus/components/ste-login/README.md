# Login 登录

登录

---$

#### 简单登录

- 此组件数组类型的数据都需要传入`key`字段，用于在事件监听中判断

- `primaryBtnData`为主按钮数据，默认样式为实心底，可通过`style`字段修改，
- `secondaryBtnData`为次要按钮数据，默认样式为白底，可通过`style`字段修改
- 其他配置项可在`API`中查看

```html
<template>
    <view style="width: 100vw; height: 100vh;padding-top: 186rpx">
        <ste-login
            :baseProtocol="base"
            :protocolData="protocolData"
            :primaryBtn="primaryBtnData"
            :secondaryBtn="secondaryBtnData"
            :bottomTip="baseTip"
            @primaryBtnClick="handleClick"
            @secondary-btn-click="handleClick"
            @protocol-click="protocolClick"
        />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const baseTip = '版本信息 V1.0.0';
    const base = '我已认真阅读、理解并同意';
    const protocolData = reactive([
        { title: '中心仓储用户注册协议', key: 'p1' },
        { title: '数智云隐私政策', key: 'p2' },
    ]);

    const primaryBtnData = reactive([
        {
            title: '微信一键登录',
            key: 'wx',
        },
    ]);

    const secondaryBtnData = reactive([
        {
            title: '其他号码登录/注册',
            key: 'other',
        },
        {
            title: '暂不登录',
            key: 'no',
        },
    ]);

    const handleClick = (item: any) => {
        console.log(item);
    };

    const protocolClick = (item: any) => {
        console.log(item);
    };
</script>
```

#### 复杂登录 - 示例1

- `mode`值为`mode1`时为复杂登录
- 此时`primaryBtnData`样式不变，`secondaryBtnData`为文字按钮
- 若需要拿到表单数据
    - `@form-data-change`事件监听，事件参数为表单数据
    - 通过ref方式获取`formData`属性
- 根据`loginGroup`属性动态生成tab栏和表单
- 其中`items`属性配置具体输入，其中`type` 支持`number`/`password`/`select`/`txt`/`validate`（数字、密码、下拉框、文本提示、验证码）

```html
<template>
    <view style="width: 100vw; height: 100vh;padding-top: 186rpx">
        <ste-login
            ref="myLogin"
            mode="mode1"
            :baseProtocol="base"
            :protocolData="protocolData"
            :primaryBtn="primaryBtnData"
            :secondaryBtn="secondaryBtnData"
            :bottomTip="baseTip"
            :loginGroup="loginGroup"
            loginImgUrl="https://image.whzb.com/chain/inte-cloud-tour-uniapp/00-普通图片/00-开发版//login/bg2.png?202408121"
            loginBoxBackground="https://image.whzb.com/chain/inte-cloud-tour-uniapp/00-普通图片/00-开发版//login/bg1.png?202408121"
            @tabChange="tabChange"
            @primaryBtnClick="handleClick"
            @secondary-btn-click="handleClick"
            @protocol-click="protocolClick"
            @form-data-change="formDataChange"
        />
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import type { RefLogin } from 'stellar-ui-plus/types/refComponents';
    const baseTip = '版本信息 V1.0.0';
    const myLogin = ref<RefLogin>();

    const base = '我已认真阅读、理解并同意';
    const protocolData = reactive([
        { title: '中心仓储用户注册协议', key: 'p1' },
        { title: '数智云隐私政策', key: 'p2' },
    ]);

    const loginGroup = reactive([
        {
            title: '登录账号',
            key: 'account',
            items: [
                {
                    title: '选择账号',
                    key: 'account',
                    type: 'select' as const,
                    selectData: [
                        { title: '账号1', key: '1' },
                        { title: '账号2', key: '2' },
                    ],
                },
                {
                    title: '提示',
                    key: 'tip',
                    type: 'txt' as const,
                    value: '若账号列表为空或要登录的门店不在列表中，请先绑定账号。',
                },
            ],
        },
        {
            title: '账号绑定',
            key: 'bind',
            items: [
                {
                    title: '账号',
                    key: 'username',
                    type: 'number' as const,
                },
                {
                    title: '密码',
                    key: 'password',
                    type: 'password' as const,
                },
            ],
        },
    ]);

    const primaryBtnData = reactive([
        {
            title: '登录',
            key: 'wx',
        },
    ]);

    const secondaryBtnData = reactive([
        {
            title: '用户注册',
            key: 'other',
        },
        {
            title: '短信验证',
            key: 'no',
        },
        {
            title: '忘记密码',
            key: 'forget',
        },
    ]);

    const tabChange = (item: any) => {
        console.log(item);
        if (item.key === 'account') {
            primaryBtnData[0].title = '去登录';
        }
        if (item.key === 'bind') {
            primaryBtnData[0].title = '去绑定';
        }
    };

    const handleClick = (item: any) => {
        console.log(item);
        if (item.key === 'wx') {
            console.log('点击了微信登录');
            console.log(myLogin.value?.formData);
        }
    };

    const formDataChange = (data: any) => {
        console.log(data);
    };

    const protocolClick = (item: any) => {
        console.log(item);
    };
</script>
```

#### 复杂登录 - 示例2

- 当`loginGroup`配置为一个数据时，顶部tab栏会隐藏显示
- 可在单个表单中配置`iconColor`改变图标颜色

```html
<template>
    <view style="width: 100vw; height: 100vh;padding-top: 186rpx">
        <ste-login
            ref="myLogin"
            mode="mode1"
            color="#EC3E1A"
            :baseProtocol="base"
            :protocolData="protocolData"
            :primaryBtn="primaryBtnData"
            :secondaryBtn="secondaryBtnData"
            :bottomTip="baseTip"
            :loginGroup="loginGroup"
            loginImgUrl="https://image.whzb.com/chain/StellarUI/image/食堂登录.png"
            loginBoxBackground="rgba(255, 255, 255, .75)"
            @primaryBtnClick="handleClick"
            @secondary-btn-click="handleClick"
            @protocol-click="protocolClick"
            @form-data-change="formDataChange"
        />
    </view>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import type { RefLogin } from '@/uni_modules/stellar-ui-plus/types/refComponents';
    const baseTip = '版本信息 V1.0.0';

    const myLogin = ref<RefLogin>();

    const base = '登录即同意';
    const protocolData = reactive([{ title: '中百食堂隐私郑策', key: 'p1' }]);

    const loginGroup = reactive([
        {
            title: '登陆',
            key: 'bind',
            items: [
                {
                    title: '手机号',
                    key: 'username',
                    type: 'number' as const,
                    style: {
                        iconColor: '#FFAFA4',
                    },
                },
                {
                    title: '验证码',
                    key: 'validate',
                    type: 'validate' as const,
                    style: {
                        iconColor: '#FFAFA4',
                    },
                },
            ],
        },
    ]);

    const primaryBtnData = reactive([
        {
            title: '登录',
            key: 'wx',
        },
    ]);

    const secondaryBtnData = reactive([
        {
            title: '微信一键登录',
            key: 'wxOneKey',
        },
    ]);

    const handleClick = (item: any) => {
        console.log(item);
        if (item.key === 'wx') {
            console.log('点击了微信登录');
            console.log(myLogin.value?.formData);
        }
    };

    const formDataChange = (data: any) => {
        console.log(data);
    };

    const protocolClick = (item: any) => {
        console.log(item);
    };
</script>
```

---$

### API

#### BaseConfigItem & ProtocolItem & BtnItem

| 属性名  | 说明                           | 是否必填 | 类型     |
| ------- | ------------------------------ | -------- | -------- |
| `title` | 显示的内容                     | 是       | `string` |
| `key`   | 标识符                         | 是       | `string` |
| `style` | 对应配置的样式(暂时只支持部分) | 否       | `object` |

#### LoginGroupItem

| 属性名  | 说明         | 是否必填 | 类型          |
| ------- | ------------ | -------- | ------------- |
| `title` | 显示的内容   | 是       | `string`      |
| `key`   | 标识符       | 是       | `string`      |
| `items` | 输入表单配置 | 是       | `LoginItem[]` |

#### LoginItem

| 属性名        | 说明                                                          | 是否必填 | 类型               |
| ------------- | ------------------------------------------------------------- | -------- | ------------------ |
| `title`       | 显示的内容                                                    | 是       | `string`           |
| `key`         | 标识符                                                        | 是       | `string`           |
| `type`        | 输入类型，暂支持`number`/`password`/`select`/`txt`/`validate` | 否       | `string`           |
| `value`       | 默认值                                                        | 否       | `string`           |
| `selectData`  | 选项数据，仅当`type`为`select`时生效                          | 否       | `BaseConfigItem[]` |
| `maxLength`   | 最大长度                                                      | 否       | `number`           |
| `disabled`    | 禁用                                                          | 否       | `boolean`          |
| `icon`        | 输入框模式下对应的前缀图标code                                | 否       | `string`           |
| `placeholder` | 输入框模式下对应的placeholder                                 | 否       | `string`           |

<!-- props -->

---$
{{fuyuwei}}
