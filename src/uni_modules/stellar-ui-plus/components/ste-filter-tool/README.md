# FilterTool 筛选选项

可配置多选选项组件

---$

### `data` 属性详解

`data` 属性是组件的核心，它是一个数组，数组中的每个对象代表一个筛选分组。下面是每个筛选分组对象的详细配置项：

| 属性          | 说明                                                    | 类型                  | 默认值     |
| ------------- | ------------------------------------------------------- | --------------------- | ---------- |
| `title`       | 分组的标题                                              | `string`              | -          |
| `key`         | 分组的唯一标识，用于在 `value` 和事件回调中识别         | `string`              | -          |
| `children`    | 当前分组下的筛选项数组，每个选项包含 `title` 和 `value` | `BaseFilterItem[]`    | `[]`       |
| `multiple`    | 是否支持多选                                            | `boolean`             | `false`    |
| `rowCount`    | 每行显示的筛选项数量                                    | `number`              | `3`        |
| `expandCount` | 折叠时显示的行数，`0` 或不设置为不折叠                  | `number`              | `0`        |
| `type`        | 分组的类型，可以是按钮或输入框                          | `'button' \| 'input'` | `'button'` |
| `config`      | 当 `type` 为 `input` 时的详细配置                       | `object`              | `{}`       |
| `random`      | 是否启用无规则布局（使用flex-wrap）                     | `boolean`             | `false`    |

**`config` 对象属性 (当 `type: 'input'` 时):**

| 属性          | 说明             | 类型      | 默认值         |
| ------------- | ---------------- | --------- | -------------- |
| `value`       | 输入框的默认值   | `string`  | -              |
| `placeholder` | 输入框的提示文字 | `string`  | `'请输入内容'` |
| `maxLength`   | 最大输入长度     | `number`  | `100`          |
| `clearable`   | 是否显示清除按钮 | `boolean` | `false`        |

### 基础用法

- 筛选数据需按照下方`script`中的格式传入

    - 分类需要传入`key`用于数据定位
    - `children`为可选项
        - 选项需传入`title`和`value`
    - `expandCount`为折叠展示的行数，默认为0，不折叠
    - `rowCount` 配置每行显示的选项数量，默认为3
    - `multiple`配置当前分类项是否可以多选

```html
<script lang="ts" setup>
    import { reactive } from 'vue';
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
</script>
<template>
    <view style="width: 100%">
        <ste-filter-tool :data="subFilters" @item-click="handleFilterClick" value="all">
            <view style="font-size: 24rpx">
                <text>基础筛选</text>
                <ste-icon code="&#xe6c7;" color="#000" size="24" />
            </view>
        </ste-filter-tool>
    </view>
</template>
```

#### 勾选项模式

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

---$

### API

<!-- props -->

---$
{{fuyuwei}}
