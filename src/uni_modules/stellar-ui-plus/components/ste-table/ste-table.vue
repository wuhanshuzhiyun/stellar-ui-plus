<script lang="ts" setup>
import { computed, watch, ref, type CSSProperties, toRaw, nextTick } from 'vue';
import propsData, { TABLE_KEY, tableEmits, CHECK_ICON_SIZE, SELECTION_COLOR_CONFIG, type TableProps } from './props';
import utils from '../../utils/utils';
import { useProvide } from '../../utils/mixin';
import useData from './useData';
import type { TableColumnProps } from '../ste-table-column/props';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();

const componentName = `ste-table`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const emits = defineEmits(tableEmits);

const props = defineProps(propsData);
const {
    tableData,
    columns,
    sumData,
    canCheckStates,
    checkAllState,
    calcSum,
    loadSelectType,
    loadCanCheckArr,
    getHeaderRowClass,
    getHeaderRowStyle,
    getHeaderCellClass,
    getHeaderCellStyle,
    getRowClass,
    getRowStyle,
    headerClick,
    changeCheckAll,
    handleScrollToLower,
    initSelection,
    rowClick,
    checkStates,
    handleCheck,
    cellClick,
    clearSelection,
    toggleAllSelection,
    toggleRowSelection,
    getSelection,
} = useData(props, emits);

const { internalChildren } = useProvide(
    TABLE_KEY,
    'ste-table-column'
)({
    props,
    checkStates,
    handleCheck,
    cellClick,
});

const refChilds = ref(internalChildren);

const cmpRootStyle = computed(() => {
    let style: CSSProperties = {
        '--offset-top': props.offsetTop,
        '--table-height': utils.addUnit(props.height as string),
        '--table-max-height': utils.addUnit(props.maxHeight as string),
        '--ste-theme-color': utils.Color.hex2rgba(getColor().steThemeColor),
        '--ste-table-popover-line': props.popoverLine,
    };
    return style;
});

const cmpRootClass = computed(() => {
    let classArr = [];
    if (props.fixed) {
        classArr.push('fixed');
    }
    if (props.border) {
        classArr.push('border');
    }
    if (props.stripe) {
        classArr.push('stripe');
    }
    if (props.height || Number(props.height) > 0) {
        classArr.push('scroll-table');
    }
    return classArr.join(' ');
});

const cmpShowFixedPlaceholder = computed(() => {
    return props.fixed || props.height || Number(props.height) > 0 || props.maxHeight || Number(props.maxHeight) > 0;
});

const dataChangeFun = (fullLength: number = 0, val: any) => {
    // 由于没有数据时会导致插槽无法渲染，然后表头无法显示，所以在无数据时先给默认值，让表头能渲染，再加延时，恢复成原来的数据
    if (val.length === 0) {
        tableData.value = [{}];
    } else {
        if (fullLength > 0) {
            tableData.value = ensureArrayLength(10, val) as Obj[];
        } else {
            tableData.value = val as Obj[];
        }
    }
    initRowData();
    calcSum();
    initSelection();
};

watch(
    () => props.data,
    val => {
        dataChangeFun(0, val);
    },
    { immediate: true, deep: true }
);

let lastChildrenCount = 0;
let lastChangeTime = 0;
let processTimer: any = null;
watch(
    () => internalChildren,
    val => {
        const currentTime = Date.now();
        const currentCount = val.length;

        // 最后一次子元素变动时再执行初始化
        if (processTimer) clearTimeout(processTimer);

        // 如果内容没有变化，并且距离上次变化已经超过300ms
        if (currentCount === lastChildrenCount && currentTime - lastChangeTime > 300 && currentCount > 0) {
            initColumns();
            initRowData();
        } else {
            // 更新最后一次变化的记录
            lastChildrenCount = currentCount;
            lastChangeTime = currentTime;

            // 设置一个较短的延迟检查
            processTimer = setTimeout(() => {
                // 触发延迟检查
                if (val.length === lastChildrenCount) {
                    initColumns();
                    initRowData();
                }
            }, 50);
        }
    },
    { immediate: true, deep: true }
);

/**
 * 获取列信息的公共函数
 * 返回：唯一的列子组件数组、列索引映射
 */
function getColumnInfo() {
    if (!refChilds.value || refChilds.value.length <= 0) {
        return { uniqueColumns: [], columnKeyMap: new Map<string, number>() };
    }

    // 计算预期的列数（用于优化性能）
    const expectedColCount = Math.ceil(refChilds.value.length / tableData.value.length);

    // 提取唯一的列（提前退出优化）
    const uniqueColumns: any[] = [];
    const columnKeyMap = new Map<string, number>();

    for (let i = 0; i < refChilds.value.length && uniqueColumns.length < expectedColCount; i++) {
        const child = refChilds.value[i];
        const key = `${child.props.label}-${child.props.prop}`;

        // 如果是新列，记录列索引并添加到结果
        if (!columnKeyMap.has(key)) {
            columnKeyMap.set(key, uniqueColumns.length);
            uniqueColumns.push(child);
        }
    }

    return { uniqueColumns, columnKeyMap };
}

function initRowData() {
    // 获取列信息（复用公共函数）
    const { columnKeyMap } = getColumnInfo();

    // 为每列的子组件计数，用于确定行索引
    const columnCounters = new Map<string, number>();

    // 遍历所有子组件，计算正确的行列索引
    refChilds.value.forEach(child => {
        const key = `${child.props.label}-${child.props.prop}`;
        const colIndex = columnKeyMap.get(key) ?? 0;

        // 获取当前列已处理的行数，即为当前元素的行索引
        const rowIndex = columnCounters.get(key) ?? 0;
        columnCounters.set(key, rowIndex + 1);

        const row = tableData.value[rowIndex];
        (child.exposed as any).row.value = { ...row, rowIndex, colIndex };
    });
}

function initColumns() {
    // 获取列信息（复用公共函数）
    const { uniqueColumns } = getColumnInfo();
    if (uniqueColumns.length === 0) return;

    // 创建一个全新的数组，包含全新的普通对象
    const finalColumns = [];

    for (let i = 0; i < uniqueColumns.length; i++) {
        const e = uniqueColumns[i];
        const propsData = toRaw(e.props);

        // 创建一个全新的对象
        const newColumn: TableColumnProps = {} as TableColumnProps;

        // 复制所有属性
        for (const key in propsData) {
            (newColumn as any)[key] = propsData[key];
        }

        // 特别处理 label
        if (!newColumn.label && props.header && typeof props.header === 'function') {
            const labelValue = props.header(newColumn, tableData.value);
            // 强制设置 label，确保不会丢失
            newColumn.label = labelValue;
        }

        finalColumns.push(newColumn);
    }

    // 直接赋值
    columns.value = finalColumns;

    calcSum();
    loadSelectType();
    loadCanCheckArr();
}

/**
 * 确保数组达到指定数量，不足则补充空对象
 * @param targetCount 目标数量
 * @param array 需要处理的数组
 * @returns 处理后的数组
 */
function ensureArrayLength<T>(targetCount: number, array: T[]): T[] {
    // 创建数组副本，避免修改原数组
    const result = [...array];

    // 计算需要补充的元素数量
    const shortfall = targetCount - result.length;

    // 如果数组长度已经够了或超出，直接返回原数组
    if (shortfall <= 0) {
        return result;
    }

    // 补充空对象到数组
    for (let i = 0; i < shortfall; i++) {
        result.push({} as T);
    }

    return result;
}

defineExpose({ clearSelection, toggleAllSelection, toggleRowSelection, getSelection });
</script>

<template>
    <view class="ste-table-root" :class="[cmpRootClass]" :style="[cmpRootStyle]">
        <view class="ste-table-content">
            <view class="fixed-placeholder" v-if="cmpShowFixedPlaceholder" />
            <view class="ste-table-header" :class="[getHeaderRowClass()]" :style="[getHeaderRowStyle() as CSSProperties]" v-if="showHeader">
                <view
                    class="ste-table-cell"
                    :class="[getHeaderCellClass(column, columnIndex)]"
                    :style="[getHeaderCellStyle(column, columnIndex) as CSSProperties, getHeaderCellStyle(column, columnIndex, true) as CSSProperties]"
                    v-for="(column, columnIndex) in columns"
                    :key="column.prop as string"
                    @click="headerClick(column, $event)"
                >
                    <view class="cell-box" v-if="column.type == 'checkbox'">
                        <ste-icon code="&#xe6ae;" :color="selectionIconColor.disabled || SELECTION_COLOR_CONFIG.disabled" size="32" v-if="canCheckStates.length === 0" />
                        <template v-else>
                            <ste-icon code="&#xe6ac;" :color="selectionIconColor.main || SELECTION_COLOR_CONFIG.main" :size="CHECK_ICON_SIZE" v-if="checkAllState == 'all'" @click="changeCheckAll" />
                            <ste-icon
                                code="&#xe6ad;"
                                :color="selectionIconColor.main || SELECTION_COLOR_CONFIG.main"
                                :size="CHECK_ICON_SIZE"
                                v-else-if="checkAllState == 'indeterminate'"
                                @click="changeCheckAll"
                            />
                            <ste-icon code="&#xe6af;" :color="selectionIconColor.unSelected || SELECTION_COLOR_CONFIG.unSelected" :size="CHECK_ICON_SIZE" v-else @click="changeCheckAll" />
                        </template>
                    </view>
                    <view class="cell-box" :class="column.label ? '' : 'no-value'" v-else>
                        {{ column.label || '-' }}
                    </view>
                </view>
            </view>
            <template v-if="height || Number(height) > 0">
                <scroll-view scroll-y class="ste-table-scroll" @scrolltolower="handleScrollToLower">
                    <view class="ste-table-body" :class="!tableData.length ? 'no-data' : ''">
                        <template v-if="tableData.length">
                            <view
                                class="ste-table-row"
                                :class="[getRowClass(row, rowIndex)]"
                                :style="[getRowStyle(row, rowIndex) as CSSProperties]"
                                v-for="(row, rowIndex) in tableData"
                                :key="rowIndex"
                                @click="rowClick(row, $event)"
                            >
                                <slot :row="row" name="default"></slot>
                            </view>
                            <view class="ste-table-row sum" v-if="showSummary">
                                <view class="ste-table-cell" v-for="(column, index) in columns" :key="index" :class="[getHeaderCellClass(column, 0)]">
                                    <view class="cell-box">
                                        <view v-if="index === 0" class="sum-header">{{ sumText }}</view>
                                        <view v-else>
                                            {{ sumData[index] || '-' }}
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </template>
                        <template v-else>
                            <text class="no-data-text">- 暂无数据 -</text>
                        </template>
                    </view>
                </scroll-view>
            </template>
            <template v-else>
                <view class="ste-table-body" :class="!tableData.length ? 'no-data' : ''">
                    <template v-if="tableData.length">
                        <view
                            class="ste-table-row"
                            :class="[getRowClass(row, rowIndex)]"
                            :style="[getRowStyle(row, rowIndex) as CSSProperties]"
                            v-for="(row, rowIndex) in tableData"
                            @click="rowClick(row, $event)"
                        >
                            <slot :row="row"></slot>
                        </view>
                        <view class="ste-table-row sum" v-if="showSummary">
                            <view class="ste-table-cell" v-for="(column, index) in columns" :key="index" :class="[getHeaderCellClass(column, 0)]">
                                <view class="cell-box">
                                    <view v-if="index === 0" class="sum-header">{{ sumText }}</view>
                                    <view v-else>
                                        {{ sumData[index] || '-' }}
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                    <template v-else>
                        <text class="no-data-text">- 暂无数据 -</text>
                    </template>
                </view>
            </template>
        </view>
    </view>
</template>

<style lang="scss" scoped>
$default-border: 2rpx solid #ebebeb;

.ste-table-root {
    width: 100%;

    &.scroll-table {
        position: relative;

        .ste-table-content {
            .ste-table-header {
                position: absolute;
                top: 0;
            }
            .ste-table-scroll {
                height: calc(var(--table-height) - 80rpx);
                max-height: calc(var(--table-max-height) - 80rpx);
            }
        }
    }

    &.fixed {
        .ste-table-content {
            .ste-table-header {
                position: fixed;
                top: var(--offset-top);
                z-index: 101;
            }
        }
    }
    &.border {
        .ste-table-cell {
            border-right: $default-border;
        }

        .ste-table-content {
            border-left: $default-border;
        }

        &.no-data {
            border-bottom: $default-border;
            border-right: $default-border;
        }
    }

    &.stripe {
        .ste-table-body {
            .ste-table-row:nth-child(even) {
                background-color: #f8f8f8; /* 偶数行背景颜色 */
            }
        }
    }

    .ste-table-content {
        width: fit-content; /* 让表格内容宽度自适应，使斑马条纹能延伸到所有列 */
        min-width: 100%; /* 至少占满容器宽度 */
        // display: table;
        // border-collapse: collapse;
        // table-layout: fixed;
        .fixed-placeholder {
            width: 100%;
            height: 80rpx;
        }
        .ste-table-header {
            width: 100%;
            // display: table-row;
            display: flex;
            background-color: var(--ste-theme-color);

            .ste-table-cell {
                background-color: var(--ste-theme-color);
                font-weight: bold;
                font-size: var(--font-size-28, 28rpx);
                border-top: $default-border;
                // flex: 1;
                // box-sizing: border-box;

                .cell-box.no-value {
                    color: transparent;
                }
            }
        }

        .ste-table-cell {
            // display: table-cell;
            flex: 1;
            // box-sizing: border-box;
            border-bottom: $default-border;

            padding: 0 32rpx;
            height: 80rpx;
            font-size: var(--font-size-24, 24rpx);
            overflow-x: hidden;
            .cell-box {
                height: 100%;
                display: flex;
                align-items: center;
                width: 100%;
            }

            &.align-center {
                .cell-box {
                    justify-content: center;
                }
            }

            &.align-right {
                .cell-box {
                    justify-content: flex-end;
                }
            }
        }

        .ste-table-body {
            // display: table-row-group;
            &.no-data {
                padding: 32rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: $default-border;
                border-right: $default-border;

                .no-data-text {
                    font-size: var(--font-size-28, 28rpx);
                }
            }
            width: 100%;
            .ste-table-row {
                // display: table-row;
                display: flex;

                /* #ifdef MP-WEIXIN */
                > :deep(view:not(.ste-table-cell)) {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                /* #endif */

                .a-view {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                > view {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                /* #ifdef MP-ALIPAY */
                > * {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                /* #endif */

                &.current-row {
                    background-color: #ecf5ff;
                }
                &.selection-row {
                    background-color: #ecf5ff;
                }
            }
        }
    }

    scoped-slots-default {
        display: contents;
    }
}
</style>
