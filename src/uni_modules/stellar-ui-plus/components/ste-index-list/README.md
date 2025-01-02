# IndexList 索引列表

通过折叠面板收纳内容区域。

---$

### Javascript 示例数据

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const data = ref([
        {
            title: 'A',
            list: ['列表A1', '列表A2', '列表A3', '列表A4', '列表A5', '列表A6', '列表A7', '列表A8'],
        },
        {
            title: 'B',
            list: ['列表B1', '列表B2', '列表B3', '列表B4', '列表B5', '列表B6', '列表B7', '列表B8'],
        },
        {
            title: 'C',
            list: ['列表C1', '列表C2', '列表C3', '列表C4', '列表C5', '列表C6', '列表C7', '列表C8'],
        },
        {
            title: 'D',
            list: ['列表D1', '列表D2', '列表D3', '列表D4', '列表D5', '列表D6', '列表D7', '列表D8'],
        },
        {
            title: 'E',
            list: ['列表E1', '列表E2', '列表E3', '列表E4', '列表E5', '列表E6', '列表E7', '列表E8'],
        },
        {
            title: 'F',
            list: ['列表F1', '列表F2', '列表F3', '列表F4', '列表F5', '列表F6', '列表F7', '列表F8'],
        },
        {
            title: 'G',
            list: ['列表G1', '列表G2', '列表G3', '列表G4', '列表G5', '列表G6', '列表G7', '列表G8'],
        },
    ]);
</script>
```

#### 基础用法

-   标签`ste-index-list`为外层盒子
    -   事件`clickItem`监听点击索引分组事件
-   标签`ste-index-item`为索引分组
    -   属性`title`为当前索引分组标题
    -   属性`list`为当前索引分组内容列表

```html
<ste-index-list @clickItem="onClickItem">
    <ste-index-item v-for="(item, index) in data" :key="index" :title="item.title" :list="item.list" />
</ste-index-list>
<script lang="ts" setup>
    function onClickItem(title, text) {
        this.showToast({ title: `【${title}】-【${text}】`, icon: 'none' });
    }
</script>
```

#### 自定义颜色/标题/内容

-   标签`ste-index-list`为外层盒子
    -   属性`inactiveColor`为索引分组标题未选中颜色
    -   属性`activeColor`为索引分组标题选中颜色
-   标签`ste-index-item`为索引分组
    -   插槽`title`为当前索引分组标题
    -   插槽`default`为当前索引分组内容列表

```html
<ste-index-list inactiveColor="#0f0" activeColor="#f0f">
    <ste-index-item v-for="item in data" :key="item.title" :title="item.title">
        <template v-slot:title>
            <view class="custom-title" v-show="item.title">{{ item.title }}</view>
        </template>
        <view class="row-item" v-for="(m, i) in item.list" :key="i">
            <ste-icon code="&#xe677;" />
            {{ m }}
        </view>
    </ste-index-item>
</ste-index-list>
<style lang="scss" scoped>
    .custom-title {
        height: 60rpx;
        line-height: 60rpx;
        padding: 0 32rpx;
        background-color: #f00;
        color: #fff;
    }
    .row-item {
        height: 92rpx;
        line-height: 92rpx;
        padding: 0 32rpx;

        & + .row-item {
            border-top: 1px solid #ddd;
        }
    }
</style>
```

---$

### API

<!-- props -->

#### IndexList Method

| 方法名 | 说明                             | 支持版本 |
| ------ | -------------------------------- | -------- |
| `init` | 初始化锚点信息，在渲染完成后调用 | -        |

#### IndexList Slots

| 方法名    | 说明           | 支持版本 |
| --------- | -------------- | -------- |
| `default` | 自定义列表内容 | -        |

#### IndexItem Props

| 属性名  | 说明                 | 类型            | 默认值 | 可选值 | 支持版本 |
| ------- | -------------------- | --------------- | ------ | ------ | -------- |
| `title` | 分组标题，这是必需的 | `String`        | `""`   | -      | -        |
| `list`  | 分组字符串列表       | `Array<String>` | `""`   | -      | -        |

#### IndexItem Slots

| 方法名    | 说明           | 支持版本 |
| --------- | -------------- | -------- |
| `default` | 自定义列表内容 | -        |
| `title`   | 自定义标题内容 | -        |

---$
{{xuyajun}}
