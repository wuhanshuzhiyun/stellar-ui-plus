# FilterTool 筛选选项

可配置多选选项组件

---$

## 筛选模式

| `filterType` | 说明 |
| --- | --- |
| `button` | 默认模式。支持分组单选、多选、折叠、每行数量和输入框类型。 |
| `checkbox` | 左侧分类对应右侧单选列表，每个分组仅能选择一个选项。 |
| `calendar` | 仅展示内置日历；当前日历选中值不会同步到 `v-model:value` 或 `confirm` 回调。 |

## 自定义菜单内容

通过 `content` 插槽可替换 `custom-menu-box` 内的全部默认内容，包括筛选区域、重置按钮和确认按钮。传入该插槽后，`data`、`filterType`、`showCategory` 与 `confirmDisabled` 不再控制插槽内的渲染和交互；组件也不会触发默认的 `confirm`、`reset` 逻辑。该插槽当前不提供插槽参数，交互与状态由使用者自行管理。

```html
<template>
    <ste-filter-tool>
        <view style="font-size: 24rpx">
            <text>自定义菜单</text>
            <ste-icon code="&#xe6c7;" color="#000" size="24" />
        </view>
        <template #content>
            <view class="custom-menu-content">
                <view class="custom-menu-options">
                    <view class="custom-menu-option active">推荐</view>
                    <view class="custom-menu-option">最新</view>
                    <view class="custom-menu-option">价格优先</view>
                </view>
            </view>
        </template>
    </ste-filter-tool>
</template>

<style lang="scss" scoped>
.custom-menu-content {
    padding: 24rpx;

    .custom-menu-title {
        color: #1d2129;
        font-size: 28rpx;
        font-weight: 500;
    }

    .custom-menu-options {
        display: flex;
        gap: 16rpx;
        margin-top: 24rpx;
    }

    .custom-menu-option {
        padding: 12rpx 20rpx;
        color: #555a61;
        font-size: 24rpx;
        background: #f4f5f6;
        border-radius: 8rpx;

        &.active {
            color: #0275ff;
            background: #e6f2ff;
        }
    }
}
</style>
```

## `data` 属性详解

`data` 属性是组件的核心，它是一个数组，数组中的每个对象代表一个筛选分组。下面是每个筛选分组对象的详细配置项：

| 属性          | 说明                                                    | 类型                  | 默认值     |
| ------------- | ------------------------------------------------------- | --------------------- | ---------- |
| `title`       | 分组的标题                                              | `string`              | -          |
| `key`         | 分组标识，用于 `value` 和事件回调；未传时使用分组 `value` | `string`            | -          |
| `value`       | 未传 `key` 时作为分组标识                              | `string \| number`   | -          |
| `children`    | 当前分组下的筛选项数组，每项需包含 `title` 和 `value`  | `BaseFilterItem[]`    | `[]`       |
| `multiple`    | 是否支持多选，仅 `button` 模式生效                     | `boolean`             | `false`    |
| `rowCount`    | 每行显示的筛选项数量，支持 `2`、`3`、`4`               | `number`              | `3`        |
| `expandCount` | 折叠时显示的行数，`0` 或不设置为不折叠，仅 `button` 模式生效 | `number`          | `0`        |
| `type`        | 分组的类型，可以是按钮或输入框                          | `'button' \| 'input'` | `'button'` |
| `config`      | 当 `type` 为 `input` 时的详细配置                       | `object`              | `{}`       |
| `random`      | 是否启用自动换行布局（使用 `flex-wrap`）               | `boolean`             | `false`    |

**`config` 对象属性 (当 `type: 'input'` 时):**

| 属性          | 说明             | 类型      | 默认值         |
| ------------- | ---------------- | --------- | -------------- |
| `value`       | 输入框的默认值   | `string`  | -              |
| `placeholder` | 输入框的提示文字 | `string`  | `'请输入内容'` |
| `maxLength`   | 最大输入长度     | `number`  | `100`          |
| `clearable`   | 是否显示清除按钮 | `boolean` | `false`        |
| `width`       | 输入框宽度       | `string \| number` | `'100%'` |

## 基础用法

常规 `button` 模式下，`data` 采用“筛选分组 → 筛选项”的两层结构：

- 分组使用 `title` 作为展示标题，优先使用 `key` 作为数据标识；未传 `key` 时使用分组 `value`。
- `children` 是当前分组下的选项，每项需提供 `title` 与 `value`。
- 分组设置 `multiple: true` 后可多选；未设置时同一分组单选。
- 使用 `v-model:value` 接收选中结果。每个已选分组对应一项，`checkbox` 模式每组最多一个值，`input` 类型在点击确认时返回输入值。
- 通过给组件添加 `ref`，可以调用 `closeMenu` 方法手动收起筛选弹窗。

```ts
const selectedValues = ref([
    {
        title: '商品分类',
        key: 'category',
        values: ['beauty'],
    },
]);
```

```html
<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    
    const filterToolRef = ref(null);
    
    // 手动收起筛选弹窗
    const closeFilter = () => {
        if (filterToolRef.value) {
            filterToolRef.value.closeMenu();
        }
    };
    
    // 筛选选项
    const subFilters = reactive([
        {
            title: '商品分类',
            key: 'category',
            children: [
                { title: '电子产品', value: 'electronics' },
                { title: '服装鞋', value: 'clothing' },
                { title: '家居用', value: 'home' },
                { title: '运动户', value: 'sports' },
                { title: '美妆护肤', value: 'beauty' },
                { title: '食品饮料', value: 'food' },
                { title: '母婴用品', value: 'baby' },
                { title: '图书音像', value: 'books' },
            ],
            // rowCount: 4,
        },
        {
            title: '商品状态',
            key: 'status',
            children: [
                { title: '正常销售', value: 'active' },
                { title: '暂时下架', value: 'inactive' },
                { title: '库存不足', value: 'low_stock' },
                { title: '预售中', value: 'presale' },
                { title: '已售罄', value: 'sold_out' },
                { title: '待审核', value: 'pending' },
            ],
            expandCount: 1,
        },
        {
            title: '价格调整类型',
            key: 'price_type',
            children: [
                { title: '促销调价', value: 'promotion' },
                { title: '成本调价', value: 'cost_adjustment' },
                { title: '市场调价', value: 'market_adjustment' },
                { title: '季节调价', value: 'seasonal' },
                { title: '清仓调价', value: 'clearance' },
                { title: '促销回调', value: 'promotion_rollback' },
                { title: '批量调价', value: 'batch_adjustment' },
            ],
        },
        {
            title: '供应商区域',
            key: 'supplier_region',
            children: [
                { title: '华东地区', value: 'east_china' },
                { title: '华北地区', value: 'north_china' },
                { title: '华南地区', value: 'south_china' },
                { title: '西南地区', value: 'southwest_china' },
                { title: '华中地区', value: 'central_china' },
                { title: '西北地区', value: 'northwest_china' },
                { title: '东北地区', value: 'northeast_china' },
                { title: '港澳台', value: 'hk_mo_tw' },
                { title: '海外供应商', value: 'overseas' },
            ],
        },
        {
            title: '订单处理状态',
            key: 'order_status',
            children: [
                { title: '待确认', value: 'pending_confirm' },
                { title: '待发货', value: 'pending_shipment' },
                { title: '已发货', value: 'shipped' },
                { title: '已完成', value: 'completed' },
                { title: '已取消', value: 'cancelled' },
                { title: '退货处理中', value: 'returning' },
                { title: '已退货', value: 'returned' },
                { title: '异常订单', value: 'exception' },
                { title: '部分发货', value: 'partial_shipped' },
            ],
        },
        {
            title: '物流方式',
            key: 'shipping_method',
            children: [
                { title: '顺丰速运', value: 'sf_express' },
                { title: '申通快递', value: 'sto_express' },
                { title: '圆通速递', value: 'yt_express' },
                { title: '中通快递', value: 'zto_express' },
                { title: '韵达速递', value: 'yunda_express' },
                { title: '京东物流', value: 'jd_logistics' },
                { title: '德邦快递', value: 'deppon' },
                { title: '邮政EMS', value: 'ems' },
                { title: '天天快递', value: 'tiantian' },
            ],
        },
        {
            title: '支付方式',
            key: 'payment_method',
            children: [
                { title: '微信支付', value: 'wechat_pay' },
                { title: '支付宝', value: 'alipay' },
                { title: '银行卡支付', value: 'bank_card' },
                { title: '货到付款', value: 'cod' },
                { title: '余额支付', value: 'balance' },
                { title: '花呗分期', value: 'huabei' },
                { title: '信用卡分期', value: 'credit_card' },
                { title: '企业转账', value: 'enterprise' },
            ],
        },
    ]);

    const selectedValues = ref([
        {
            key: 'category',
            values: ['beauty'],
        },
    ]);
</script>
<template>
    <view style="width: 100%">
        <ste-filter-tool ref="filterToolRef" v-model:value="selectedValues" :data="subFilters">
            <view style="font-size: 24rpx">
                <text>基础筛选</text>
                <ste-icon code="&#xe6c7;" color="#000" size="24" />
            </view>
        </ste-filter-tool>
        <button @click="closeFilter">手动收起筛选</button>
    </view>
</template>
```

## 输入框类型

将分组的 `type` 设为 `input`，可在筛选菜单中渲染输入框。输入值会在点击默认确认按钮时随 `confirm` 事件返回。

```html
<script lang="ts" setup>
    import { reactive } from 'vue';

    const filters = reactive([
        {
            title: '商品名称',
            key: 'keyword',
            type: 'input',
            config: {
                placeholder: '请输入商品名称',
                clearable: true,
            },
        },
    ]);
</script>

<template>
    <ste-filter-tool :data="filters" @confirm="values => console.log(values)">
        <view>按名称筛选</view>
    </ste-filter-tool>
</template>
```

## 勾选项模式

- `filterType`为`checkbox`
- 此模式下只支持单选

```html
<script lang="ts" setup>
    import { reactive } from 'vue';
    // 筛选选项
    const checkboxFilters = reactive([
        {
            title: '默认排序',
            key: 'category',
            children: [
                { title: '电子产品', value: 'electronics' },
                { title: '服装鞋帽', value: 'clothing' },
                { title: '家居用品', value: 'home' },
                { title: '运动户外', value: 'sports' },
                { title: '美妆护肤', value: 'beauty' },
                { title: '余额支付', value: 'balance' },
                { title: '花呗分期', value: 'huabei' },
                { title: '信用卡分期', value: 'credit_card' },
                { title: '企业转账', value: 'enterprise' },
            ],
        },
        {
            title: '建议量',
            key: 'status',
            children: [
                { title: '正常销售', value: 'active' },
                { title: '暂时下架', value: 'inactive' },
                { title: '库存不足', value: 'low_stock' },
                { title: '预售中', value: 'presale' },
            ],
        },
        {
            title: '门店库存',
            key: 'price_type',
            children: [
                { title: '促销调价', value: 'promotion' },
                { title: '成本调价', value: 'cost_adjustment' },
                { title: '市场调价', value: 'market_adjustment' },
                { title: '季节调价', value: 'seasonal' },
            ],
        },
        {
            title: '日均销量',
            key: 'supplier_region',
            children: [
                { title: '华东地区', value: 'east_china' },
                { title: '华北地区', value: 'north_china' },
                { title: '华南地区', value: 'south_china' },
                { title: '西南地区', value: 'southwest_china' },
                { title: '华中地区', value: 'central_china' },
                { title: '西北地区', value: 'northwest_china' },
            ],
        },
    ]);
</script>
<template>
    <view style="width: 100%">
        <ste-filter-tool :data="checkboxFilters" filter-type="checkbox">
            <view style="font-size: 24rpx">
                <text>点击筛选</text>
                <ste-icon code="&#xe6c7;" color="#000" size="24" />
            </view>
        </ste-filter-tool>
    </view>
</template>
```

## 禁用确认按钮

- 通过 `confirmDisabled` 控制确认按钮的禁用状态
- 适用于需要用户完成某些操作后才允许确认的场景

```html
<script lang="ts" setup>
    import { ref, reactive } from 'vue';

    const confirmDisabled = ref(true);
    const filters = reactive([
        {
            title: '默认排序',
            key: 'category',
            children: [
                { title: '电子产品', value: 'electronics' },
                { title: '服装鞋帽', value: 'clothing' },
                { title: '家居用品', value: 'home' },
            ],
        },
    ]);

    const handleItemClick = () => {
        // 有选择后解除禁用
        confirmDisabled.value = false;
    };
</script>
<template>
    <view style="width: 100%">
        <ste-filter-tool :data="filters" :confirmDisabled="confirmDisabled" filter-type="checkbox" @item-click="handleItemClick">
            <view style="font-size: 24rpx">
                <text>禁用确认按钮</text>
                <ste-icon code="&#xe6c7;" color="#000" size="24" />
            </view>
        </ste-filter-tool>
    </view>
</template>
```

---$

| type | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| closeMenu | `() => void` | - | - | 收起弹框 |

<!-- methods -->

---$
{{fuyuwei}}
