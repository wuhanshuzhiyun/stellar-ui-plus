# Table 表格

{{compatibility}}

### 代码演示

#### 基础使用

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
</script>
<ste-table :data="rows">
    <template v-slot="{ row }">
        <ste-table-column label="姓名" prop="name"></ste-table-column>
        <ste-table-column label="生日" prop="birth"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
```

#### 带边框

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
</script>
<ste-table :data="rows" border>
    <template v-slot="{ row }">
        <ste-table-column label="姓名" prop="name"></ste-table-column>
        <ste-table-column label="生日" prop="birth"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
```

#### 空数据显示

-   通过`table`中的`emptyText`属性来指定单元格中数据为空时显示的值，否则显示`-`
-   也可以通过插槽来自定义空数据时显示

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '', birth: '', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '' },
    ]);
</script>
<ste-table :data="rows2" :stripe="false" emptyText="--">
    <template v-slot="{ row }">
        <ste-table-column label="姓名" prop="name">
            <template #empty>
                <span>***</span>
            </template>
        </ste-table-column>
        <ste-table-column label="生日" prop="birth"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
```

#### 列类型

通过指定某列上的`type`属性

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
</script>
<ste-table :data="rows">
    <template v-slot="{ row }">
        <ste-table-column label="序号" type="index" align="center" customKey="index"></ste-table-column>
        <ste-table-column label="姓名" prop="name"></ste-table-column>
        <ste-table-column label="生日" prop="birth"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
<ste-table :data="rows">
    <template v-slot="{ row }">
        <ste-table-column label="选择" type="checkbox" align="center" customKey="checkbox"></ste-table-column>
        <ste-table-column label="姓名" prop="name"></ste-table-column>
        <ste-table-column label="生日" prop="birth"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
<ste-table :data="rows">
    <template v-slot="{ row }">
        <ste-table-column label="选择" type="radio" align="center" customKey="checkbox"></ste-table-column>
        <ste-table-column label="姓名" prop="name"></ste-table-column>
        <ste-table-column label="生日" prop="birth"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
```

#### 禁用或只读选择项

传入一个自定义方法来指定某行是否能选择，方法会传入当前行数据(`row`)和下标(`index`)
只读同理

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
    function selectableFun(row: Obj, index: number) {
        return row.name !== '张三';
    }
    function readonlyFun(row: Obj, index: number) {
        return row.name === '李四';
    }
</script>
<template>
    <ste-table :data="rows" :selectable="selectableFun" :readable="readonlyFun">
        <template v-slot="{ row }">
            <ste-table-column label="选择" type="checkbox"></ste-table-column>
            <ste-table-column label="姓名" prop="name"></ste-table-column>
            <ste-table-column label="生日" prop="birth"></ste-table-column>
            <ste-table-column label="性别" prop="sex"></ste-table-column>
        </template>
    </ste-table>
</template>
```

#### 显示合计

-   通过`showSummary`控制是否显示合计，`sumText`控制合计行第一列的文本
-   `summaryMethod`来指定合计的方法，需要返回一个数组来确定每一列合计显示的内容

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
    function summaryMethod(data: { columns: Obj[]; data: Obj[] }) {
        let res = data.columns.map(() => '');
        data.columns.forEach((col, index) => {
            if (col.prop === 'name' || col.prop === 'name') {
                res[index] = data.data.length + '人';
            }
        });
        return res;
    }
</script>
<template>
    <ste-table :data="rows" showSummary :summaryMethod="summaryMethod">
        <template v-slot="{ row }">
            <ste-table-column label="序号" type="index" align="center" customKey="index"></ste-table-column>
            <ste-table-column label="姓名" prop="name"></ste-table-column>
            <ste-table-column label="生日" prop="birth"></ste-table-column>
            <ste-table-column label="性别" prop="sex"></ste-table-column>
        </template>
    </ste-table>
</template>
```

#### 对齐方式

-   通过`align`指定某列的单元格的对齐方式
-   `headerAlign`指定表头的单元格对齐方式， 没设置时跟随`align`值

```html
<ste-table :data="rows">
    <template v-slot="{ row }">
        <ste-table-column label="姓名" prop="name" align="right"></ste-table-column>
        <ste-table-column label="生日" prop="birth" headerAlign="center"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
```

#### 表格方法

```html
<script lang="ts" setup>
        import type { RefTable } from '@/uni_modules/stellar-ui-plus/types/refComponents';

        const methodTable = ref<RefTable>();
        const rows = ref([
            { name: '张三', birth: '2023.12.31', sex: '男' },
            { name: '李四', birth: '2024.01.01', sex: '女' },
            { name: '王五', birth: '2024.11.01', sex: '女' },
            { name: '赵六', birth: '2024.11.01', sex: '女' },
            { name: '王七', birth: '2024.01.01', sex: '男' },
        ]);

        function clearSelect() {
            methodTable.value?.clearSelection();
        }
        function toggleAllSelection() {
            methodTable.value?.toggleAllSelection();
        }
        function toggleRowSelection(i: number) {
            methodTable.value?.toggleRowSelection(rows.value[i]);
        }
    </>
    <template>
        <view style="width: 100%">
            <ste-table :data="rows" ref="methodTable" @select="select" @selectAll="selectAll" @cellClick="cellClick" @rowClick="rowClick" @headerClick="headerClick">
                <template v-slot="{ row }">
                    <ste-table-column label="选择" type="checkbox" align="center" customKey="checkbox"></ste-table-column>
                    <ste-table-column label="姓名" prop="name" align="right"></ste-table-column>
                    <ste-table-column label="生日" prop="birth" headerAlign="center"></ste-table-column>
                    <ste-table-column label="性别" prop="sex"></ste-table-column>
                </template>
            </ste-table>
        </view>
        <ste-button :mode="100" @click="toggleAllSelection">切换全选</ste-button>
        <ste-button :mode="100" @click="clearSelect">取消所有选择</ste-button>
        <ste-button :mode="100" @click="toggleRowSelection(1)">选中第二行</ste-button>
        <ste-button :mode="100" @click="toggleRowSelection(0)">选中第一行</ste-button>
    </template>

```

#### 表格滚动

此时需要给表格设置高度`height`，并保证表体高度是大于此高度，此时表格可以滚动，且滚动到底部时触发`scrollToLower`事件

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
    function scrollToLower() {
        toast.showToast({
            title: '到底了',
        });
    }
</>
<template>
    <ste-table :data="rows3" height="500" @scrollToLower="scrollToLower">
        <template v-slot="{ row }">
            <ste-table-column label="姓名" prop="name" width="200"></ste-table-column>
            <ste-table-column label="生日" prop="birth" width="200"></ste-table-column>
            <ste-table-column label="性别" prop="sex" width="300"></ste-table-column>
        </template>
    </ste-table>
</template>
```

#### 自定义列

当需要格式化某列时，可以不设置列的`prop`，但需要设置`customKey`值，然后给表格传入一个`formatter`方法，
方法中第一个参数是每一行的数据，第二个参数是列的`customKey`，示例如下

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
        { name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
        { name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
        { name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
        { name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
    ]);
    function formatterFun(row: Obj, key: string) {
        if (key === 'state') {
            if (row.state === 1) {
                return '进行中';
            } else if (row.state === 2) {
                return '已完成';
            } else {
                return '无状态';
            }
        }
    }
</script>
<template>
    <ste-table :data="rows" :formatter="formatterFun">
        <template v-slot="{ row }">
            <ste-table-column label="姓名" prop="name"></ste-table-column>
            <ste-table-column label="状态" customKey="state"></ste-table-column>
            <ste-table-column label="操作1" align="center">
                <view style="display: flex; justify-content: center">
                    <ste-icon code="&#xe6b0;" color="red" size="32" v-if="row.name === '张三'"></ste-icon>
                    <ste-icon code="&#xe6b0;" size="32" v-else></ste-icon>
                </view>
            </ste-table-column>
            <ste-table-column label="操作2">
                <ste-button :mode="100" @click="handleEdit">编辑</ste-button>
            </ste-table-column>
        </template>
    </ste-table>
</template>
```

#### 动态设置表头

当需要动态设置表头，可以不设置列的`label`，但需要设置`customKey`值，然后给表格传入一个`header`方法，
方法中第一个参数是列的数据，第二个参数是表格的数据`data`，示例如下

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
        { name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
        { name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
        { name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
        { name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
    ]);

    function headerFun(e1: Obj, tableData: Obj[]) {
        if (e1.customKey == 'name') {
            return tableData[0].name;
        }
    }
</script>
<template>
<ste-table :data="rows" :header="headerFun">
    <template v-slot="{ row }">
        <ste-table-column prop="name" customKey="name" width="200"></ste-table-column>
        <ste-table-column label="生日" prop="birth" width="200"></ste-table-column>
        <ste-table-column label="性别" prop="sex" width="300"></ste-table-column>
    </template>
</ste-table>
</templata>
```

#### 自定义边框样式

表格边框样式不满足时，可通过css更改样式

```html
<script lang="ts" setup>
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
        { name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
        { name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
        { name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
        { name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
    ]);
</script>
<template>
    <view class="my-table">
        <ste-table :data="rows" class="my-table-1" border>
            <template v-slot="{ row }">
                <ste-table-column label="姓名" prop="name"></ste-table-column>
                <ste-table-column label="生日" prop="birth"></ste-table-column>
                <ste-table-column label="性别" prop="sex"></ste-table-column>
            </template>
        </ste-table>

        <ste-table :data="rows" class="my-table-2">
            <template v-slot="{ row }">
                <ste-table-column label="姓名" prop="name"></ste-table-column>
                <ste-table-column label="生日" prop="birth"></ste-table-column>
                <ste-table-column label="性别" prop="sex"></ste-table-column>
            </template>
        </ste-table>

        <ste-table :data="rows" class="my-table-3">
            <template v-slot="{ row }">
                <ste-table-column label="姓名" prop="name"></ste-table-column>
                <ste-table-column label="生日" prop="birth"></ste-table-column>
                <ste-table-column label="性别" prop="sex"></ste-table-column>
            </template>
        </ste-table>

        <ste-table :data="rows" class="my-table-4">
            <template v-slot="{ row }">
                <ste-table-column label="姓名" prop="name"></ste-table-column>
                <ste-table-column label="生日" prop="birth"></ste-table-column>
                <ste-table-column label="性别" prop="sex"></ste-table-column>
            </template>
        </ste-table>
    </view>
</template>
<style lang="scss">
    .my-table {
        /deep/ .my-table-1 {
            .ste-table-content {
                border-left: none;

                .ste-table-header,
                .ste-table-body .ste-table-row {
                    .ste-table-cell:nth-last-child(1) {
                        border-right: none;
                    }
                }
            }
        }

        /deep/ .my-table-2 {
            .ste-table-content {
                border: 2rpx solid #ebebeb;
            }
            .ste-table-header,
            .ste-table-body .ste-table-row {
                .ste-table-cell {
                    border: none;
                }
            }
        }

        /deep/ .my-table-3 {
            .ste-table-header {
                .ste-table-cell {
                    border: none;
                }
            }
            .ste-table-body .ste-table-row {
                .ste-table-cell {
                    border-top: 2rpx solid #ebebeb;
                    border-bottom: none;
                }
            }
        }

        /deep/ .my-table-4 {
            .ste-table-header {
                .ste-table-cell {
                    border: none;
                    border-right: 2rpx solid #ebebeb;
                }
            }
            .ste-table-body .ste-table-row {
                .ste-table-cell {
                    border: none;
                    border-right: 2rpx solid #ebebeb;

                    &:nth-last-child(1) {
                        border-right: none;
                    }
                }
            }
        }
    }
</style>
```

#### 自定义行或单元格样式

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
        { name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
        { name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
        { name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
        { name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
    ]);

    function headerRowClassName() {
        return 'header-row';
    }
    function headerRowStyle() {
        return { fontSize: '36rpx' };
    }
    function headerCellClassName(data: { column: any; columnIndex: number }) {
        return 'header-row-cell';
    }
    function headerCellStyle() {
        return { color: 'pink' };
    }
    function rowClassName(data: { row: any; rowIndex: number }) {
        if (data.rowIndex % 2 == 0) {
            return 'nice-row';
        } else {
            return 'bad-row';
        }
    }
    function rowStyle(data: { row: any; rowIndex: number }) {
        if (data.rowIndex % 2 == 0) {
            return { color: 'green' };
        } else {
            return { color: 'red' };
        }
    }

    function cellClassName(data: { column: any; columnIndex: number; row: any; rowIndex: number }) {
        if (columnIndex === 1 && rowIndex % 2 == 0) {
            return 'custom-cell';
        }
    }

    function cellStyle(data: { column: any; columnIndex: number; row: any; rowIndex: number }) {
        if (columnIndex === 1) {
            return { color: 'blue' };
        }
    }
</script>
<template>
    <ste-table
        :data="rows"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
    >
        <template v-slot="{ row }">
            <ste-table-column label="姓名" prop="name"></ste-table-column>
            <ste-table-column label="生日" prop="birth"></ste-table-column>
            <ste-table-column label="性别" prop="sex"></ste-table-column>
        </template>
    </ste-table>
</template>
```

#### 高亮行

`highlight-current-row`为`true`点击某一行时会高亮显示
`hightlight-selection-row`为`true`时，列类型为`checkbox`时，勾选后会高亮

```html
<ste-table :data="rows" highlight-current-row highlight-selection-row>
    <template v-slot="{ row }">
        <ste-table-column label="选择" type="checkbox" align="center" customKey="checkbox"></ste-table-column>
        <ste-table-column label="姓名" prop="name"></ste-table-column>
        <ste-table-column label="生日" prop="birth"></ste-table-column>
        <ste-table-column label="性别" prop="sex"></ste-table-column>
    </template>
</ste-table>
```

#### 配置选择项图标色

需要指定属性`selectionIconColor`，数据结构如下

```ts
{
	main: '#3491FA', // 主色，选中时的颜色
	unSelected: '#BBBBBB', // 未选中的线框颜色
	disabled: '#E6E6E6', // 禁用时背景色
	readonly: 'rgba(52, 145, 250, 0.4)' // 只读时背景色
}
```

### API

<!-- #### Table Props

| 属性名                  | 说明                                                                                                  | 类型                                       | 默认值     | 可选值 | 支持版本 |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- | ------ | -------- |
| `data`                  | 表格数据                                                                                              | `Array`                                    | -          | -      | -        |
| `fixed`                 | 表头是否定位为fixed                                                                                   | `Boolean`                                  | `false`    | -      | -        |
| `offsetTop`             | 定位fixed时top的距离                                                                                  | `Number/String`                            | -          | -      | -        |
| `border`                | 是否带有纵向边框                                                                                      | `Boolean`                                  | `false`    | -      | -        |
| `stripe`                | 是否斑马纹                                                                                            | `Boolean`                                  | `true`     | -      | -        |
| `emptyText`             | 空数据时显示的文本内容，也可以通过 slot="empty" 设置                                                  | `String`                                   | `暂无数据` | -      | -        |
| `showSummary`           | 是否在表尾显示合计行                                                                                  | `Boolean`                                  | `false`    | -      | -        |
| `sumText`               | 合计行第一列的文本                                                                                    | `String`                                   | `合计`     | -      |
| `summaryMethod`         | 自定义的合计计算方法                                                                                  | `Function({ columns, data })`              | `null`     | -      | -        |
| `selectable`            | 仅对 type=checkbox 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | `Function(row, index)`                     | `null`     | -      | -        |
| `readable`              | 仅对 type=checkbox 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否只读     | `Function(row, index)`                     | `null`     | -      | -        |
| `formatter`             | 格式化方法，需要配合`TableColumn`中的`customKey`属性                                                  | `Function(row, key)`                       | `null`     | -      | -        |
| `height`                | 表格高度，设置该值可以让表格体开启滚动                                                                | `Number/String`                            | -          | -      | -        |
| `header`                | 格式化表头内容的方法，同formatter属性，需要定义customKey属性                                          | `Function(column, tableData)`              | -          | -      | -        |
| `headerRowClassName`    | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className                   | `Function()/String`                        | -          | -      | -        |
| `headerRowStyle`        | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style                   | `Function()/Object`                        | -          | -      | -        |
| `headerCellClassName`   | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className           | `Function({ column, columnIndex })/String` | -          | -      | -        |
| `headerCellStyle`       | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style           | `Function({ column, columnIndex })/Object` | -          | -      | -        |
| `rowClassName`          | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className                           | `Function({ row, rowIndex })/String`       | -          | -      | -        |
| `rowStyle`              | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style                           | `Function({ row, rowIndex })/Object`       | -          | -      | -        |
| `highlightCurrentRow`   | 是否要高亮当前行                                                                                      | `Boolean`                                  | `false`    | -      | -        |
| `highlightSelectionRow` | 是否要高亮复选框选中行（仅针对开启 checkbox 有效）                                                    | `Boolean`                                  | `false`    | -      | -        |
| `showHeader`            | 是否显示表头                                                                                          | `Boolean`                                  | `true`     | -      | -        |
| `maxHeight`             | 表格最大高度                                                                                          | `Number/String`                            | -          | -      | -        |

#### Table Events

| 事件名          | 说明                                         | 事件参数                                                              | 支持版本 |
| --------------- | -------------------------------------------- | --------------------------------------------------------------------- | -------- |
| `select`        | 当用户手动勾选数据行的 Checkbox 时触发的事件 | `selection`：当前已选中的数据<br/>`row`：当前行的数据                 | -        |
| `selectAll`     | 当用户手动勾选全选 Checkbox 时触发的事件     | `selection`：当前已选中的数据                                         | -        |
| `cellClick`     | 当某个单元格被点击时会触发该事件             | `row`：当前行的数据<br/>`column`：当前列的数据<br/>`event`：Event对象 | -        |
| `rowClick`      | 当某一行被点击时会触发该事件                 | `row`：当前行的数据<br/>`event`：Event对象                            | -        |
| `headerClick`   | 当某一列的表头被点击时会触发该事件           | `column`：当前列的数据<br/>`event`：Event对象                         | -        |
| `scrollToLower` | 表格体滚动到底事件                           | -                                                                     | -        | -->
<!-- props -->

#### Table Method

| 方法名               | 说明                               | 方法参数                                                                         | 支持版本 |
| -------------------- | ---------------------------------- | -------------------------------------------------------------------------------- | -------- |
| `clearSelection`     | 用于多选表格，清空用户的选择       | -                                                                                | -        |
| `toggleRowSelection` | 用于多选表格，切换某一行的选中状态 | `row`：需要选中行的数据<br/>`isTriggerSelectEvent`: 是否会触发表格的`select`事件 | -        |
| `toggleAllSelection` | 用于多选表格，切换所有行的选中状态 | -                                                                                | -        |
| `getSelection`       | 获取当前表格的选中状态的数据       | -                                                                                | -        |

#### TableColumn Props

| 属性名        | 说明                                             | 类型     | 默认值 | 可选值                                                                                    | 支持版本 |
| ------------- | ------------------------------------------------ | -------- | ------ | ----------------------------------------------------------------------------------------- | -------- |
| `type`        | 对应列的类型                                     | `String` | -      | `checkbox`：显示多选框<br/>`radio`：显示单选框<br/>`index`：显示该行的索引（从 1 开始计算 | -        |
| `label`       | 显示的标题                                       | `String` | -      | -                                                                                         | -        |
| `prop`        | 对应列内容的字段名                               | `String` | -      | -                                                                                         | -        |
| `width`       | 对应列的宽度                                     | `String` | -      | -                                                                                         | -        |
| `minWidth`    | 对应列的最小宽度                                 | `String` | -      | -                                                                                         | -        |
| `align`       | 对齐方式                                         | `String` | `left` | -                                                                                         | -        |
| `headerAlign` | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | `String` | `left` | `left`：左对齐<br/>`center`：居中对齐<br/>`right`：右对齐                                 | -        |
| `customKey`   | 自定义唯一key值                                  | `String` | -      | -                                                                                         | -        |

{{fuyuwei}}
