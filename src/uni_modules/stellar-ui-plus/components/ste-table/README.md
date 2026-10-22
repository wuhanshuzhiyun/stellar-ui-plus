# Table 表格

表格组件一般用于展示大量结构化数据的场景

---$

## 代码演示

## 基础使用

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
</script>
<template>
    <ste-table :data="rows">
        <template v-slot="{ row }">
            <ste-table-column label="姓名" prop="name"></ste-table-column>
            <ste-table-column label="生日" prop="birth"></ste-table-column>
            <ste-table-column label="性别" prop="sex"></ste-table-column>
        </template>
    </ste-table>
</template>
```

## 带边框

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
</script>
<template>
    <ste-table :data="rows" border>
        <template v-slot="{ row }">
            <ste-table-column label="姓名" prop="name"></ste-table-column>
            <ste-table-column label="生日" prop="birth"></ste-table-column>
            <ste-table-column label="性别" prop="sex"></ste-table-column>
        </template>
    </ste-table>
</template>
```

## 空数据显示

- 通过`table`中的`emptyText`属性来指定单元格中数据为空时显示的值，否则显示`-`
- 也可以通过插槽来自定义空数据时显示

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '', birth: '', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '' },
    ]);
</script>
<template>
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
</template>
```

## 列类型

通过指定某列上的`type`属性

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const rows = ref([
        { name: '张三', birth: '2023.12.31', sex: '男' },
        { name: '李四', birth: '2024.01.01', sex: '女' },
        { name: '王五', birth: '2024.11.01', sex: '女' },
        { name: '赵六', birth: '2024.11.01', sex: '女' },
        { name: '王七', birth: '2024.01.01', sex: '男' },
    ]);
</script>
<template>
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
</template>
```

## 禁用或只读选择项

传入一个自定义方法来指定某行是否能选择，方法会传入当前行数据(`row`)和下标(`index`)
只读同理

```html
<script lang="ts" setup>
    import { ref } from 'vue';
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

## 显示合计

- 通过`showSummary`控制是否显示合计，`sumText`控制合计行第一列的文本
- `summaryMethod`来指定合计的方法，需要返回一个数组来确定每一列合计显示的内容

```html
<script lang="ts" setup>
    import { ref } from 'vue';
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

## 对齐方式

- 通过`align`指定某列的单元格的对齐方式
- `headerAlign`指定表头的单元格对齐方式， 没设置时跟随`align`值

```html
<template>
    <ste-table :data="rows">
        <template v-slot="{ row }">
            <ste-table-column label="姓名" prop="name" align="right"></ste-table-column>
            <ste-table-column label="生日" prop="birth" headerAlign="center"></ste-table-column>
            <ste-table-column label="性别" prop="sex"></ste-table-column>
        </template>
    </ste-table>
</template>
```

## 表格方法

```html
<script lang="ts" setup>
    import type { RefTable } from 'stellar-ui-plus/types/refComponents';
    import { ref } from 'vue';
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
</script>
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

## 表格滚动

此时需要给表格设置高度`height`，并保证表体高度是大于此高度，此时表格可以滚动，且滚动到底部时触发`scrollToLower`事件

```html
<script lang="ts" setup>
    import { ref } from 'vue';
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

## 自定义列

当需要格式化某列时，可以不设置列的`prop`，但需要设置`customKey`值，然后给表格传入一个`formatter`方法，
方法中第一个参数是每一行的数据，第二个参数是列的`customKey`，示例如下

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

## 动态设置表头

当需要动态设置表头，可以不设置列的`label`，但需要设置`customKey`值，然后给表格传入一个`header`方法，
方法中第一个参数是列的数据，第二个参数是表格的数据`data`，示例如下

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
</template>
```

## 自定义边框样式

表格边框样式不满足时，可通过css更改样式

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

## 自定义行或单元格样式

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

## 高亮行

`highlight-current-row`为`true`点击某一行时会高亮显示
`hightlight-selection-row`为`true`时，列类型为`checkbox`时，勾选后会高亮

```html
<template>
    <ste-table :data="rows" highlight-current-row highlight-selection-row>
        <template v-slot="{ row }">
            <ste-table-column label="选择" type="checkbox" align="center" customKey="checkbox"></ste-table-column>
            <ste-table-column label="姓名" prop="name"></ste-table-column>
            <ste-table-column label="生日" prop="birth"></ste-table-column>
            <ste-table-column label="性别" prop="sex"></ste-table-column>
        </template>
    </ste-table>
</template>
```

## 配置选择项图标色

需要指定属性`selectionIconColor`，数据结构如下

```ts
{
	main: '#3491FA', // 主色，选中时的颜色
	unSelected: '#BBBBBB', // 未选中的线框颜色
	disabled: '#E6E6E6', // 禁用时背景色
	readonly: 'rgba(52, 145, 250, 0.4)' // 只读时背景色
}
```

## 单元格超出长按显示气泡

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const rows5 = ref([
        { t1: '张三', t2: '我是张三我是张三我是张三我是张三', t3: '男男男男男男男男男' },
        { t1: '李四', t2: '你是李四你是李四你是李四你是李四你是李四', t3: '女' },
        { t1: '王五王五王五', t2: '王五描述', t3: '女' },
        { t1: '赵六赵六赵六赵六', t2: '赵六', t3: '女' },
        { t1: '王七', t2: '他是王七他是王七他是王七他是王七他是王七', t3: '女女女女女女女' },
    ]);
</script>
<template>
    <view class="title">单元格文字超出时气泡显示内容</view>
    <view class="item-block">
        <view style="width: 100%">
            <ste-table :data="rows5" isPopover>
                <template v-slot="{ row }">
                    <ste-table-column label="文字1" prop="t1"></ste-table-column>
                    <ste-table-column label="文字2" prop="t2"></ste-table-column>
                    <ste-table-column label="文字3" prop="t3"></ste-table-column>
                </template>
            </ste-table>
        </view>
    </view>
</template>
```

## 合并单元格

当某列的数据为数组类型时，该列会自动触发合并单元格模式，将数组中的每个元素作为一行展示。这在需要展示一对多关系的数据时非常有用。

**功能特点：**
- 自动检测数组类型数据
- 自动合并显示为多行
- 支持边框样式
- 自动统一行高，保持视觉一致

```html
<script lang="ts" setup>
    import { ref } from 'vue';
    const rows = ref([
        {
            project: '入店时的寒暄语',
            desc: [
                '打招呼的声音很小，听不到，没有看着顾客一方等。',
                '店员看着顾客一方，可以听到响亮且有朝气的问候声。',
                '「感觉普通」店员看着顾客一方有问候，但是声音不响亮无朝气。',
            ],
            score: [5, 11, 1],
            sum: 0,
        },
        {
            project: '收银机前的引导',
            desc: [
                '・POS收银机前排队等待的顾客≦3人(不含正在结账的顾客)。',
                '其他店员没有注意到有3位以上的顾客在排队，或收银的店员不向其他收银台引导。'
            ],
            score: [5, 1],
            sum: 0,
        },
    ]);
</script>
<template>
    <ste-table :data="rows" border>
        <template v-slot="{ row }">
            <ste-table-column label="评价项目" prop="project"></ste-table-column>
            <ste-table-column label="评价标准" prop="desc"></ste-table-column>
            <ste-table-column label="分值" prop="score" width="150"></ste-table-column>
            <ste-table-column label="得分" prop="sum" width="150"></ste-table-column>
        </template>
    </ste-table>
</template>
```

在上面的示例中：
- `desc` 和 `score` 列的值是数组，会自动合并显示为多行
- `project` 和 `sum` 列的值是普通类型，会正常显示单行
- 建议配合 `border` 属性使用，可以更清晰地展示单元格边界

---$

<!-- props -->

<!-- ste-table-column/props -->

---$
{{fuyuwei}}
