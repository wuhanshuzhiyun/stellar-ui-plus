<template>
    <view class="ste-picker-root" :class="[rootClass]">
        <view class="ste-picker-toolbar" v-if="showToolbar">
            <text @click="cancel" class="cancel" :style="{ color: cancelColor }">{{ cancelText }}</text>
            <text class="title">{{ title }}</text>
            <text @click="confirm" class="confirm" :style="{ color: confirmColor }">{{ confirmText }}</text>
        </view>
        <picker-view @change="change" :indicatorStyle="cmpIndicatorStyle" class="ste-picker-view" :style="[cmpPickerViewStyle]" :value="innerIndex">
            <picker-view-column v-for="(col, key) in innerColumns" :key="key" class="ste-picker-column">
                <view class="item" v-for="(item, index) in col" :key="index" :style="[cmpPickerItemStyle]">
                    {{ item }}
                </view>
            </picker-view-column>
        </picker-view>
    </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import propsData from './props';
import utils from '../../utils/utils.js';

const componentName = `ste-picker`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

interface ChangeEventDetail {
    value: number[];
}

interface ChangeEvent {
    detail: ChangeEventDetail;
}

const props = defineProps(propsData);

const emit = defineEmits<{
    (e: 'change', changeObj: any): void;
    (e: 'cancel'): void;
    (e: 'confirm'): void;
}>();

const lastIndex = ref<number[]>([]);
const innerIndex = ref<number[]>([]);
const innerColumns = ref<string[][]>([]);
const columnIndex = ref<number>(0);

const cmpIndicatorStyle = computed(() => {
    return `height: ${props.itemHeight}px`;
});

const cmpPickerViewStyle = computed(() => {
    const borderRadius = utils.formatPx('12rpx');
    return {
        height: Number(props.visibleItemCount) * Number(props.itemHeight) + 'px',
        '--border-radius': props.showToolbar ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius,
    };
});

const cmpPickerItemStyle = computed(() => {
    return {
        height: `${props.itemHeight}px`,
    };
});

const setIndexs = (index: number[], setLastIndex = false) => {
    innerIndex.value = utils.deepClone(index);
    if (setLastIndex) {
        setLastIndexFn(index);
    }
};

const setLastIndexFn = (index: number[]) => {
    lastIndex.value = utils.deepClone(index);
};

const setColumns = (columns: string[][]) => {
    innerColumns.value = utils.deepClone(columns);
    if (innerIndex.value.length === 0) {
        innerIndex.value = new Array(columns.length).fill(0);
    }
};

const change = (e: ChangeEvent) => {
    const { value } = e.detail;
    let index = 0;
    let columnIdx = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] !== (lastIndex.value[i] || 0)) {
            columnIdx = i;
            index = value[i];
            break;
        }
    }
    columnIndex.value = columnIdx;
    const values = innerColumns.value;
    setLastIndexFn(value);
    setIndexs(value);

    const changeObj = {
        value: innerColumns.value.map((item, index) => item[value[index]]),
        index,
        indexs: value,
        values,
        columnIndex: columnIdx,
    };
    emit('change', changeObj);
};

const cancel = () => {
    emit('cancel');
};

const confirm = () => {
    emit('confirm');
};

watch(
    () => props.defaultIndex,
    newVal => {
        setIndexs(newVal, true);
    },
    { immediate: true }
);

watch(
    () => props.columns,
    newVal => {
        setColumns(newVal);
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped>
.ste-picker-root {
    width: 100%;
    background-color: #fff;
    border-radius: 12rpx;

    &.ste-date-picker-view {
        padding: 0 38rpx;

        .ste-picker-toolbar {
            padding-left: 0;
            padding-right: 0;
        }
    }

    .ste-picker-view {
        width: 100%;
        border-radius: var(--border-radius);

        :deep(.uni-picker-view-wrapper) {
            border-radius: var(--border-radius);
        }

        :deep(.ste-picker-column) {
            border-radius: var(--border-radius);
        }
    }

    .ste-picker-toolbar {
        padding: 30rpx 40rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: var(--font-size-28, 28rpx);

        .cancel {
            cursor: pointer;
        }

        .title {
            font-size: var(--font-size-32, 32rpx);
        }

        .confirm {
            cursor: pointer;
        }
    }

    .item {
        font-size: var(--font-size-26, 26rpx);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
