<script lang="ts" setup>
import { computed, watch, ref, defineOptions, type CSSProperties } from 'vue';
import propsData, { TABLE_KEY, tableEmits, CHECK_ICON_SIZE, SELECTION_COLOR_CONFIG, type TableProps } from './props';
import utils from '../../utils/utils';
import { useProvide } from '../../utils/mixin';
import useData from './useData';
import type { TableColumnProps } from '../ste-table-column/props';

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
        '--ste-theme-color': utils.Color.hex2rgba(getColor().steThemeColor, 0.05),
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

watch(
    () => props.data,
    val => {
        // 由于没有数据时会导致插槽无法渲染，然后表头无法显示，所以在无数据时先给默认值，让表头能渲染，再加延时，恢复成原来的数据
        if (val.length === 0) {
            tableData.value = [{}];
        } else {
            tableData.value = val as Obj[];
        }
        initRowData();
        calcSum();
        initSelection();
        setTimeout(() => {
            tableData.value = val as Obj[];
        });
    },
    { immediate: true, deep: true }
);

watch(
    () => internalChildren,
    () => {
        initColumns();
        initRowData();
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

    columns.value = result.map(e => {
        if (!e.props.label && props.header && typeof props.header === 'function') {
            e.props.label = props.header(e.props, tableData.value);
        }
        return e.props;
    }) as TableColumnProps[];
    calcSum();
    loadSelectType();
    loadCanCheckArr();
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
                            :key="rowIndex"
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
