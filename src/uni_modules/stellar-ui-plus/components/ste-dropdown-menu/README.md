# DropdownMenu 下拉菜单

该组件一般用于向下展开菜单，同时可切换多个选项卡的场景

---$

## 代码演示

## 基础使用

- 可以通过`v-model`绑定选中值

```html
<template>
    <view>
        <ste-dropdown-menu v-model="menu1">
            <ste-dropdown-menu-item value="1" title="全部商品" />
            <ste-dropdown-menu-item value="2" title="新款商品" />
            <ste-dropdown-menu-item value="3" title="活动商品" />
        </ste-dropdown-menu>
    </view>
    <view>
        <ste-dropdown-menu value="1">
            <ste-dropdown-menu-item value="1" title="默认排序" @click="itemClick" />
            <ste-dropdown-menu-item value="2" title="销量排序" />
            <ste-dropdown-menu-item value="3" title="价格排序" />
        </ste-dropdown-menu>
    </view>
</template>
```

## 按钮类型

- 默认是列表形式展示选项
- 当`type`值为`round`时选项为按钮形式
    > > > 推荐选项名称字数小于6个字时使用按钮类型，过长的字会导致截断

```html
<template>
    <view>
        <ste-dropdown-menu title="选择项1" type="round" value="2">
            <ste-dropdown-menu-item value="1" title="选项名称" />
            <ste-dropdown-menu-item value="2" title="选项名称" />
            <ste-dropdown-menu-item value="3" title="选项名称" />
            <ste-dropdown-menu-item value="4" title="选项名称" />
            <ste-dropdown-menu-item value="5" title="选项名称" />
            <ste-dropdown-menu-item value="6" title="选项名称" />
            <ste-dropdown-menu-item value="7" title="选项名称" />
        </ste-dropdown-menu>
    </view>
    <view>
        <ste-dropdown-menu title="选择项2" type="round" :max="2">
            <ste-dropdown-menu-item value="1" title="选项名称名称" />
            <ste-dropdown-menu-item value="2" title="选项名称" />
            <ste-dropdown-menu-item value="3" title="选项名称" />
            <ste-dropdown-menu-item value="4" title="选项名称名称名称" />
            <ste-dropdown-menu-item value="5" title="选项名称" />
            <ste-dropdown-menu-item value="6" title="选项名称" />
            <ste-dropdown-menu-item value="7" title="选项名称" />
        </ste-dropdown-menu>
    </view>
</template>
```

## 自定义下拉内容

如果不使用`ste-dropdown-menu-item`，可自定义插槽内容实现更多样式

```html
<script lang="ts" setup>
    import type { RefDropdownMenu } from 'stellar-ui-plus/types/refComponents';
    import { ref } from 'vue';
    const m1 = ref(0);
    const m2 = ref(0);
    const customMenuData = ref([
        { name: '服务台业务', child: ['雨伞租借', '礼品包装', '电费代收', '便民药箱', '赠品发放'] },
        { name: '客户心声', child: ['雨伞租借2', '礼品包装2', '电费代收2', '便民药箱2', '赠品发放3'] },
        { name: '招商服务', child: ['雨伞租借3', '礼品包装3', '电费代收3', '便民药箱3', '赠品发放3'] },
    ]);

    function choose(type: string, v: number) {
        if (type == '1') {
            m1.value = v;
            m2.value = 0;
        } else {
            m2.value = v;
        }
    }

    const steDropMenu = ref<RefDropdownMenu>();
    function confirm() {
        steDropMenu.value?.close();
    }
</script>
<template>
    <view class="menu-item">
        <view>
            <ste-dropdown-menu value="2" title="服务" ref="steDropMenu">
                <view class="custom-menu-box">
                    <view class="menu-box">
                        <view class="left">
                            <view v-for="(m, i) in customMenuData" :class="i == m1 ? 'active' : ''" @click="choose('1', i)">{{ m.name }}</view>
                        </view>
                        <view class="right">
                            <view v-for="(m, i) in customMenuData[m1].child" :class="i == m2 ? 'active' : ''" @click="choose('2', i)">{{ m }}</view>
                        </view>
                    </view>
                    <view class="action-box">
                        <ste-button width="320" background="rgba(0,0,0,0)" borderColor="#0090FF" color="#0090FF" @click="confirm">重置</ste-button>
                        <ste-button width="320" @click="confirm">确认</ste-button>
                    </view>
                </view>
            </ste-dropdown-menu>
        </view>
    </view>
</template>
<style lang="scss">
    .menu-item {
        display: flex;
        padding: 0 20rpx;
        width: 100%;
        box-shadow: 0 0 10px #ddd;
        > view {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .custom-menu-box {
            background-color: #fff;
            padding-top: 24rpx;
            border-top: solid 4rpx #f5f5f5;

            .menu-box {
                width: 100%;
                display: flex;
                margin-bottom: 56rpx;
                font-size: 28rpx;
                .left {
                    width: 236rpx;
                    background-color: #f9f9f9;

                    > view {
                        height: 90rpx;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &.active {
                            background-color: #fff;
                            color: #0090ff;
                        }
                    }
                }

                .right {
                    flex: 1;
                    margin-left: 26rpx;
                    margin-right: 18rpx;
                    background-color: #fff;
                    > view {
                        height: 90rpx;
                        display: flex;
                        align-items: center;

                        &:not(:last-child) {
                            border-bottom: 2rpx solid #f9f9f9;
                        }

                        &.active {
                            color: #0090ff;
                            font-weight: bold;
                        }
                    }
                }
            }

            .action-box {
                padding: 0 40rpx 20rpx 40rpx;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
```

## 单据类型筛选

此示例展示了如何实现一个单据类型筛选菜单，包含左侧分类选择、右侧输入框和子选项选择。

```html
<script lang="ts" setup>
    import type { RefDropdownMenu } from 'stellar-ui-plus/types/refComponents';
    import { computed, reactive, ref } from 'vue';

    const orderMenus = [
        {
            label: '单据类型1',
            value: '1',
            children: [
                { label: '类型1A', value: '1-1' },
                { label: '类型1B', value: '1-2' },
                { label: '类型1C', value: '1-3' },
                { label: '类型1D', value: '1-4' },
            ],
        },
        {
            label: '单据类型2',
            value: '2',
            children: [
                { label: '类型2A', value: '2-1' },
                { label: '类型2B', value: '2-2' },
                { label: '类型2C', value: '2-3' },
                { label: '类型2D', value: '2-4' },
            ],
        },
    ];

    const orderData = reactive({
        parent: '1',
        type: '1-1',
        code: '',
    });

    const orderChildren = computed(() => orderMenus.find(item => item.value == orderData.parent)?.children || []);

    const setOrder = (key: keyof typeof orderData, v: string) => {
        orderData[key] = v;
        if (key == 'parent') {
            const children = orderMenus.find(item => item.value == v)?.children || [];
            orderData.type = children[0]?.value || '';
        }
    };

    const orderMenuRef = ref<RefDropdownMenu>();
    function confirmOrderMenu() {
        uni.showToast({
            title: `确认订单 parent:${orderData.parent}, type:${orderData.type}, code:${orderData.code}`,
            icon: 'none',
        });
        orderMenuRef.value?.close();
    }
</script>
<template>
    <view class="menu-item">
        <view>
            <ste-dropdown-menu value="2" title="单据类型" ref="orderMenuRef">
                <view class="order-menu-box">
                    <view class="content-box">
                        <view class="content-left">
                            <view v-for="(m, i) in orderMenus" :key="i" class="left-menu-item" :class="orderData.parent == m.value ? 'active' : ''" @click="setOrder('parent', m.value)">
                                {{ m.label }}
                            </view>
                        </view>
                        <view class="content-right">
                            <view class="right-codes">
                                <view class="content-title">订单尾号</view>
                                <ste-input style="width: 356rpx" placeholder="请输入订单最后5位" v-model="orderData.code" background="#f5f5f5"></ste-input>
                            </view>
                            <view class="right-types">
                                <view class="content-title">单据类型</view>
                                <view class="right-menus">
                                    <view v-for="(m, i) in orderChildren" :key="i" class="right-menu-item" :class="orderData.type == m.value ? 'active' : ''" @click="setOrder('type', m.value)">
                                        {{ m.label }}
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="action-box">
                        <ste-button width="320" background="rgba(0,0,0,0)" borderColor="#0090FF" color="#0090FF" @click="confirmOrderMenu">重置</ste-button>
                        <ste-button width="320" @click="confirmOrderMenu">确认</ste-button>
                    </view>
                </view>
            </ste-dropdown-menu>
        </view>
    </view>
</template>
<style lang="scss">
    .menu-item {
        display: flex;
        padding: 0 20rpx;
        width: 100%;
        box-shadow: 0 0 10px #ddd;
        > view {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .order-menu-box {
            background-color: #fff;
            padding-top: 24rpx;
            border-top: solid 4rpx #f5f5f5;

            .content-box {
                width: 100%;
                display: flex;
                margin-bottom: 56rpx;
                font-size: 28rpx;

                .content-left {
                    width: 150rpx;
                    background-color: #f9f9f9;

                    .left-menu-item {
                        height: 90rpx;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24rpx;
                        color: #a4a4a4;

                        &.active {
                            background-color: #fff;
                            color: #0090ff;
                        }
                    }
                }

                .content-right {
                    flex: 1;
                    margin-left: 26rpx;
                    margin-right: 18rpx;
                    background-color: #fff;

                    .content-title {
                        height: 90rpx;
                        display: flex;
                        align-items: center;
                        font-size: 24rpx;
                        color: #1c1f23;
                    }

                    .right-types {
                        .right-menus {
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            gap: 20rpx;

                            .right-menu-item {
                                width: 162rpx;
                                height: 64rpx;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: #f9f9f9;
                                border-radius: 8rpx;

                                &.active {
                                    background-color: #0090ff;
                                    font-weight: bold;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .action-box {
                padding: 0 40rpx;
                display: flex;
                justify-content: space-between;
                padding-bottom: 20rpx;
            }
        }
    }
</style>
```

## 选中颜色 & 未选中颜色用

```html
<template>
    <view>
        <ste-dropdown-menu value="1" activeColor="#e9e">
            <ste-dropdown-menu-item value="1" title="全部商品" />
            <ste-dropdown-menu-item value="2" title="新款商品" />
            <ste-dropdown-menu-item value="3" title="活动商品" />
        </ste-dropdown-menu>
    </view>
    <view>
        <ste-dropdown-menu value="2" inactiveColor="#53e">
            <ste-dropdown-menu-item value="1" title="默认排序" />
            <ste-dropdown-menu-item value="2" title="销量排序" />
            <ste-dropdown-menu-item value="3" title="价格排序" />
        </ste-dropdown-menu>
    </view>
</template>
```

## 展开方向

```html
<template>
    <view>
        <ste-dropdown-menu title="手机" direction="down">
            <ste-dropdown-menu-item value="1" title="选项1" />
            <ste-dropdown-menu-item value="2" title="选项2" />
        </ste-dropdown-menu>
    </view>
    <view>
        <ste-dropdown-menu title="手机" direction="up">
            <ste-dropdown-menu-item value="1" title="选项1" />
            <ste-dropdown-menu-item value="2" title="选项2" />
        </ste-dropdown-menu>
    </view>
</template>
```

## 展开动画时间

```html
<template>
    <view>
        <ste-dropdown-menu value="1" :duration="0.8">
            <ste-dropdown-menu-item value="1" title="全部商品" />
            <ste-dropdown-menu-item value="2" title="新款商品" />
            <ste-dropdown-menu-item value="3" title="活动商品" />
        </ste-dropdown-menu>
    </view>
    <view>
        <ste-dropdown-menu value="2" :duration="0">
            <ste-dropdown-menu-item value="1" title="默认排序" />
            <ste-dropdown-menu-item value="2" title="销量排序" />
            <ste-dropdown-menu-item value="3" title="价格排序" />
        </ste-dropdown-menu>
    </view>
</template>
```

## 遮罩

```html
<template>
    <view>
        <ste-dropdown-menu value="1" :showMask="false" title="不显示遮罩">
            <ste-dropdown-menu-item value="1" title="全部商品" />
            <ste-dropdown-menu-item value="2" title="新款商品" />
            <ste-dropdown-menu-item value="3" title="活动商品" />
        </ste-dropdown-menu>
    </view>
    <view>
        <ste-dropdown-menu value="2" title="遮罩不关闭" :isMaskClick="false">
            <ste-dropdown-menu-item value="1" title="默认排序" />
            <ste-dropdown-menu-item value="2" title="销量排序" />
            <ste-dropdown-menu-item value="3" title="价格排序" />
        </ste-dropdown-menu>
    </view>
</template>
```

## 多选

```html
<template>
    <view>
        <ste-dropdown-menu title="可选两项" :max="2">
            <ste-dropdown-menu-item value="1" title="选项1" />
            <ste-dropdown-menu-item value="2" title="选项2" />
            <ste-dropdown-menu-item value="3" title="选项3" />
        </ste-dropdown-menu>
    </view>
    <view>
        <ste-dropdown-menu title="可选三项" :max="3">
            <ste-dropdown-menu-item value="1" title="选项1" />
            <ste-dropdown-menu-item value="2" title="选项2" />
            <ste-dropdown-menu-item value="3" title="选项3" />
        </ste-dropdown-menu>
    </view>
</template>
```

## 禁用某项

```html
<template>
    <view>
        <ste-dropdown-menu title="选择项" direction="up">
            <ste-dropdown-menu-item value="1" title="选项1" />
            <ste-dropdown-menu-item value="2" title="选项2" disabled />
            <ste-dropdown-menu-item value="3" title="选项3" />
        </ste-dropdown-menu>
    </view>
</template>
```

---$

<!-- props -->

## Menu Slots

| 插槽名    | 说明                               | 插槽参数 | 支持版本 |
| --------- | ---------------------------------- | -------- | -------- |
| `default` | 内容插槽                           | -        | -        |
| `icon`    | 选中项对应的图标(type为block生效） | -        | -        |

## MenuItem Props

| 参数       | 说明             | 类型      | 默认值  | 可选值 | 支持版本 |
| ---------- | ---------------- | --------- | ------- | ------ | -------- |
| `value`    | 选中项对应的值   | `String`  | -       | -      | -        |
| `title`    | 选中项对应的标题 | `String`  | -       | -      | -        |
| `disabled` | 是否禁用         | `Boolean` | `false` | -      | -        |
| `readonly` | 只读（不置灰）   | `Boolean` | `false` | -      | -        |

## MenuItem Events

| 事件名  | 说明                   | 事件参数                                                               | 支持版本 |
| ------- | ---------------------- | ---------------------------------------------------------------------- | -------- |
| `click` | 选中时触发(可拦截选中) | `value`：当前的绑定值, `suspend`：调用暂停读取, `next`：后续的事件执行 | -        |

## MenuItem Slots

| 插槽名    | 说明     | 插槽参数 | 支持版本 |
| --------- | -------- | -------- | -------- |
| `default` | 内容插槽 | -        | -        |
| `title`   | 标题插槽 | -        | `1.21.0` |

---$
{{fuyuwei}}
