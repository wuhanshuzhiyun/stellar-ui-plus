<script lang="ts" setup>
import { computed, watch, ref, type CSSProperties, toRaw, nextTick } from 'vue';
import propsData, { TABLE_KEY, tableEmits, CHECK_ICON_SIZE, SELECTION_COLOR_CONFIG, type TableProps } from './props';
import utils from '../../utils/utils';
import { useProvide } from '../../utils/mixin';
import useData from './useData';
import type { TableColumnProps } from '../ste-table-column/props';
import { groupByKeys } from './utils';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();

let tableLength = 0;
let uuid = utils.guid();

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
    tableLength = val.length;
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
            console.log('内容已稳定，执行初始化');

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

                    // #ifdef MP-WEIXIN
                    const group = groupByKeys(val.map(e => e.props) as any);
                    if (group[0].length > tableData.value.length) {
                        // 由于uni-app 编译到微信小程序时，如果使用循环插槽导致插槽节点不会消失，所以使用折中办法，强行补全数据再还原
                        dataChangeFun(group[0].length, tableData.value);
                        nextTick(() => {
                            tableData.value = props.data as any;
                        });
                    }
                    // #endif
                }
            }, 50); // 从1000ms减少到400ms
        }
    },
    { immediate: true, deep: true }
);

function initRowData() {
    const rowNums = tableData.value.length; // 有多少行
    const colNums = refChilds.value.length / rowNums; // 有多少列

    refChilds.value.forEach((child, index) => {
        const rowIndex = Math.floor(index / colNums); // 计算出当前元素属于哪一行
        const colIndex = index % colNums; // 计算出当前元素属于哪一列
        const row = tableData.value[rowIndex];
        (child.exposed as any).row.value = { ...row, rowIndex, colIndex };
    });
}

function initColumns() {
    if (!refChilds.value || refChilds.value.length <= 0) return;
    const result = [];
    const partSize = Math.ceil(refChilds.value.length / tableData.value.length);
    for (let i = 0; i < partSize; i++) {
        result.push(refChilds.value[i]);
    }

    // 解决某些情况下列重复
    const tempResult: any[] = [];
    result.forEach(e => {
        if (
            !tempResult.find(r => {
                return r.props.label === e.props.label && r.props.prop === e.props.prop;
            })
        ) {
            tempResult.push(e);
        }
    });

    // 创建一个全新的数组，包含全新的普通对象
    const finalColumns = [];

    for (let i = 0; i < tempResult.length; i++) {
        const e = tempResult[i];
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
    <view class="ste-table-root" :class="[cmpRootClass]" :style="[cmpRootStyle]" v-if="tableData.length > 0" :id="'ste-table-' + uuid">
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
        width: 100%;
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
            justify-content: space-between;
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
                justify-content: space-between;

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
