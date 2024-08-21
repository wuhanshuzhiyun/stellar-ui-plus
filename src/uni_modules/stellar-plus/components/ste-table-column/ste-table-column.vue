<script lang="ts" setup>
import { computed, ref, type CSSProperties, defineOptions } from 'vue';
import type { Obj } from '../../types';
import propsData from './props';
import utils from '../../utils/utils';
import { getStyleOrClass } from '../ste-table/utils';
import { useInject } from '../../utils/mixin';
import { TABLE_KEY, SELECTION_COLOR_CONFIG } from '../ste-table/props';
import CheckBoxIcon from './checkbox-icon.vue';
import RadioIcon from './radio-icon.vue';

const componentName = `ste-table-column`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);

type ParentType = ReturnType<typeof useInject>[keyof ReturnType<typeof useInject>];
// 将 ParentType 中的属性变为可选的
const parent = useInject(TABLE_KEY).parent as Partial<ParentType> & Record<string, any>;

const row = ref<Obj>({});
const selectionIconColor = ref<typeof SELECTION_COLOR_CONFIG>(parent.selectionIconColor);

defineExpose({ row });

const cmpRootStyle = computed(() => {
    let style: CSSProperties = {};
    if (props.width) {
        style.width = utils.addUnit(props.width);
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
    return getStyleOrClass<object>(parent.cellStyle, cellClassParam);
});

const cmpRootClass = computed(() => {
    let classArr = [];
    classArr.push(props.type);

    if (props.align && props.align !== 'left') {
        classArr.push('align-' + props.align);
    }

    if (parent.border) {
        classArr.push('border');
    }

    const cellClassParam = {
        column: props,
        columnIndex: row.value.colIndex,
        row: row.value.row,
        rowIndex: row.value.rowIndex,
    };
    classArr.push(getStyleOrClass<string>(parent.cellClassName, cellClassParam));

    return classArr.join(' ');
});

const cmpShowCheck = computed(() => {
    if (!parent.checkStates.value || parent.checkStates.value.length == 0) return false;
    let item = parent.checkStates.value.find((e: number) => e == row.value.rowIndex);
    if (item != undefined) {
        return true;
    }
    return false;
});

const cmpDisableCheck = computed(() => {
    if (parent.selectable && props.type) {
        return !parent.selectable(row.value, row.value.rowIndex);
    }
    return false;
});

const cmpReadonlyCheck = computed(() => {
    if (parent.readable && props.type) {
        return parent.readable(row.value, row.value.rowIndex);
    }
    return false;
});

function changeCheck(this: any) {
    if (!cmpDisableCheck.value && !cmpReadonlyCheck.value) {
        parent.handleCheck(row.value);
    }
}

function cellText(this: any) {
    if (parent.formatter) {
        let text = parent.formatter(row.value, props.customKey);
        if (!text) {
            text = row.value[props.prop];
        }
        return text;
    } else {
        if (row.value[props.prop]) {
            return row.value[props.prop];
        } else {
            return parent.emptyText || '-';
        }
    }
}

function cellClick(this: any, event: Event) {
    parent.cellClick(row.value, props, event);
    // 扩大选中热区
    if (props.type == 'checkbox' || props.type == 'radio') {
        changeCheck();
    }
}
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
            <slot v-if="row[prop] || !$slots.empty">
                <view class="cell-box">
                    {{ cellText() }}
                </view>
            </slot>
            <view class="cell-box" v-else>
                <slot name="empty"><text>暂无数据</text></slot>
            </view>
        </template>
    </view>
</template>

<style lang="scss" scoped>
$default-border: 2rpx solid #ebebeb;

.ste-table-cell {
    display: table-cell;
    padding: 24rpx 32rpx;
    border-bottom: $default-border;
    text-align: left;
    min-height: 80rpx;
    font-size: 24rpx;
    vertical-align: middle;

    .cell-box {
        display: flex;
        align-items: center;
    }

    &.border {
        border-right: $default-border;
    }

    &.selection {
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
</style>
