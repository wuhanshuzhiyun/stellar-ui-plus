<script lang="ts" setup>
import { computed, ref, watch, h, type CSSProperties, type Ref } from 'vue';
import type { Obj } from '../../types';
import propsData from './props';
import utils from '../../utils/utils';
import { getStyleOrClass } from '../ste-table/utils';
import { useInject } from '../../utils/mixin';
import { TABLE_KEY, SELECTION_COLOR_CONFIG, type TableProps } from '../ste-table/props';
import CheckBoxIcon from './checkbox-icon.vue';
import RadioIcon from './radio-icon.vue';
import TablePopover from './table-popover.vue';
import SubTable from './sub-table.vue';

const componentName = `ste-table-column`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);

const Parent = useInject<{ props: Required<TableProps>; checkStates: Ref<number[]>; handleCheck: (...args: any[]) => void; cellClick: (...args: any[]) => void }>(TABLE_KEY);
const parent = Parent.parent;
const parentProps = Parent.parent?.props as TableProps;

const row = ref<Obj>({});
const selectionIconColor = ref<typeof SELECTION_COLOR_CONFIG>(parentProps.selectionIconColor);
const rowSpan = ref(false);

defineExpose({ row });

// 监听 row 数据变化，判断是否需要合并单元格
watch(
    () => row.value[props.prop],
    val => {
        if (Array.isArray(val)) {
            rowSpan.value = true;
        }
    },
    { immediate: true }
);

const cmpRootStyle = computed(() => {
    let style: CSSProperties = {};
    if (props.width) {
        // style.width = utils.addUnit(props.width);
        // style.flexBasis = utils.addUnit(props.width);
        // style.flexGrow = 0;
        style.flex = `0 1 ${utils.addUnit(props.width)}`;
    }
    if (props.minWidth) {
        style.minWidth = utils.addUnit(props.minWidth);
    }
    return style;
});

const cmpCellStyle = computed(() => {
    const cellClassParam = {
        column: props,
        columnIndex: row.value.colIndex,
        row: row.value.row,
        rowIndex: row.value.rowIndex,
    };
    return getStyleOrClass<object>(parentProps.cellStyle, cellClassParam);
});

const cmpRootClass = computed(() => {
    let classArr = [];
    classArr.push(props.type);

    if (props.align && props.align !== 'left') {
        classArr.push('align-' + props.align);
    }

    if (parentProps.border) {
        classArr.push('border');
    }

    if (parentProps.isPopover) {
        classArr.push('popover');
    }

    if (rowSpan.value) {
        classArr.push('row-span');
    }

    const cellClassParam = {
        column: props,
        columnIndex: row.value.colIndex,
        row: row.value.row,
        rowIndex: row.value.rowIndex,
    };
    classArr.push(getStyleOrClass<string>(parentProps.cellClassName as any, cellClassParam));

    return classArr.join(' ');
});

const cmpShowCheck = computed(() => {
    if (!parent?.checkStates.value || parent.checkStates.value.length == 0) return false;
    let item = parent.checkStates.value.find((e: number) => e == row.value.rowIndex);
    if (item != undefined) {
        return true;
    }
    return false;
});

const cmpDisableCheck = computed(() => {
    if (parentProps.selectable && props.type) {
        return !parentProps.selectable(row.value, row.value.rowIndex);
    }
    return false;
});

const cmpReadonlyCheck = computed(() => {
    if (parentProps.readable && props.type) {
        return parentProps.readable(row.value, row.value.rowIndex);
    }
    return false;
});

const cmpBorder = computed(() => {
    return parentProps.border;
});

function changeCheck() {
    if (!cmpDisableCheck.value && !cmpReadonlyCheck.value) {
        parent?.handleCheck(row.value);
    }
}

function cellText() {
    if (parentProps.formatter) {
        let text = parentProps.formatter(row.value, props.customKey);
        if (!text) {
            text = row.value[props.prop];
        }
        return text;
    } else {
        if (row.value[props.prop]) {
            return row.value[props.prop];
        } else {
            return parentProps.emptyText || '-';
        }
    }
}

function cellClick(event: any) {
    parent?.cellClick(row.value, props, event);
    // 扩大选中热区
    if (props.type == 'checkbox' || props.type == 'radio') {
        changeCheck();
    }
}

// 计算最终是否使用 popover（列级别优先于表格级别）
const finalShowPopover = computed(() => {
    return props.showPopover !== undefined ? props.showPopover : parentProps.isPopover;
});

// 计算最终 popover 行数
const finalPopoverLine = computed(() => {
    return props.popoverLine !== undefined ? props.popoverLine : parentProps.popoverLine;
});
</script>

<template>
    <view class="ste-table-cell" :class="[cmpRootClass]" :style="[cmpRootStyle, cmpCellStyle as CSSProperties]" @click="cellClick">
        <template v-if="type">
            <view class="cell-box" v-if="type == 'checkbox'" @click.stop="changeCheck">
                <check-box-icon :disabled="cmpDisableCheck" :readonly="cmpReadonlyCheck" :checked="cmpShowCheck" :icon-color-config="selectionIconColor" />
            </view>
            <view class="cell-box" v-if="type == 'radio'" @click.stop="changeCheck">
                <radio-icon :disabled="cmpDisableCheck" :checked="cmpShowCheck" :readonly="cmpReadonlyCheck" :icon-color-config="selectionIconColor" />
            </view>
            <view class="cell-box" v-if="type == 'index'">
                {{ row.rowIndex + 1 }}
            </view>
        </template>
        <template v-else>
            <!-- 优先级1：content 插槽 - 纯文本内容，自动应用 popover -->
            <template v-if="$slots.content">
                <view class="cell-box">
                    <template v-if="!finalShowPopover">
                        <slot name="content" :row="row.row" :column="props"></slot>
                    </template>
                    <table-popover v-else :line="finalPopoverLine">
                        <slot name="content" :row="row.row" :column="props"></slot>
                    </table-popover>
                </view>
            </template>

            <!-- 优先级2：default 插槽 - 完全自定义，不应用 popover -->
            <slot v-else-if="row[prop] || !$slots.empty" :row="row.row" :column="props">
                <!-- 优先级3：默认渲染 -->
                <sub-table :rows="row[prop]" v-if="rowSpan" :border="cmpBorder" />
                <view class="cell-box" v-else>
                    <template v-if="!finalShowPopover">
                        {{ cellText() }}
                    </template>
                    <table-popover v-else :text="cellText()" :line="finalPopoverLine"></table-popover>
                </view>
            </slot>

            <!-- 空状态 -->
            <view class="cell-box" v-else>
                <slot name="empty"><text>暂无数据</text></slot>
            </view>
        </template>
    </view>
</template>

<style lang="scss" scoped>
.ste-table-cell {
    @import './var.scss';
    @import './common.scss';
    @include cell;

    &.row-span {
        padding-top: 0;
        padding-bottom: 0;
    }
}
</style>
