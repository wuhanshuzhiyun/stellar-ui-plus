<script lang="ts" setup>
import { computed, ref, type CSSProperties, type Ref, onMounted } from 'vue';
import type { Obj } from '../../types';
import propsData from './props';
import utils from '../../utils/utils';
import { getStyleOrClass } from '../ste-table/utils';
import { useInject, createOptions } from '../../utils/mixin';
import { TABLE_KEY, SELECTION_COLOR_CONFIG, type TableProps } from '../ste-table/props';
import CheckBoxIcon from './checkbox-icon.vue';
import RadioIcon from './radio-icon.vue';
import TablePopover from './table-popover.vue';

defineOptions(createOptions('ste-table-column`', { virtualHost: true }));

const props = defineProps(propsData);

const Parent = ref(useInject<{ props: Required<TableProps>; checkStates: Ref<number[]>; handleCheck: (...args: any[]) => void; cellClick: (...args: any[]) => void }>(TABLE_KEY));
let parent = computed(() => Parent.value.parent);
let parentProps = computed(() => Parent.value.parent?.props as TableProps);

// #ifdef MP-TOUTIAO
onMounted(() => {
    Parent.value = useInject<{ props: Required<TableProps>; checkStates: Ref<number[]>; handleCheck: (...args: any[]) => void; cellClick: (...args: any[]) => void }>(TABLE_KEY);
});
// #endif

const row = ref<Obj>({});
const selectionIconColor = ref<typeof SELECTION_COLOR_CONFIG>(parentProps.value?.selectionIconColor);

defineExpose({ row });

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
    return getStyleOrClass<object>(parentProps.value?.cellStyle, cellClassParam);
});

const cmpRootClass = computed(() => {
    let classArr = [];
    classArr.push(props.type);

    if (props.align && props.align !== 'left') {
        classArr.push('align-' + props.align);
    }

    if (parentProps.value?.border) {
        classArr.push('border');
    }

    if (parentProps.value?.isPopover) {
        classArr.push('popover');
    }

    const cellClassParam = {
        column: props,
        columnIndex: row.value.colIndex,
        row: row.value.row,
        rowIndex: row.value.rowIndex,
    };
    classArr.push(getStyleOrClass<string>(parentProps.value?.cellClassName as any, cellClassParam));

    return classArr.join(' ');
});

const cmpShowCheck = computed(() => {
    if (!parent?.value?.checkStates || parent.value?.checkStates.length == 0) return false;
    let item = parent.value?.checkStates.find((e: number) => e == row.value.rowIndex);
    if (item != undefined) {
        return true;
    }
    return false;
});

const cmpDisableCheck = computed(() => {
    if (parentProps.value?.selectable && props.type) {
        return !parentProps.value?.selectable(row.value, row.value.rowIndex);
    }
    return false;
});

const cmpReadonlyCheck = computed(() => {
    if (parentProps.value?.readable && props.type) {
        return parentProps.value?.readable(row.value, row.value.rowIndex);
    }
    return false;
});

function changeCheck() {
    if (!cmpDisableCheck.value && !cmpReadonlyCheck.value) {
        parent?.value?.handleCheck(row.value);
    }
}

function cellText() {
    if (parentProps.value?.formatter) {
        let text = parentProps.value?.formatter(row.value, props.customKey);
        if (!text) {
            text = row.value[props.prop];
        }
        return text;
    } else {
        if (row.value[props.prop]) {
            return row.value[props.prop];
        } else {
            return parentProps.value?.emptyText || '-';
        }
    }
}

function cellClick(event: any) {
    parent?.value?.cellClick(row.value, props, event);
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
                    <template v-if="!parentProps?.isPopover">
                        {{ cellText() }}
                    </template>
                    <table-popover v-else :text="cellText()" :line="parentProps?.popoverLine"></table-popover>
                </view>
            </slot>
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
