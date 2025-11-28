<script setup lang="ts">
import { ref, watch, nextTick, type PropType } from 'vue';
import { getDateOptions, getNowDate, type DateMode } from './defaultDate';
import utils from '../../utils/utils';

const props = defineProps({
    modelValue: { type: [String, Number, Array] as PropType<string | number | (string | number)[]>, default: () => [] },
    mode: { type: String, default: () => 'date' },
    minDate: { type: [Number, String, Date], default: () => null },
    maxDate: { type: [Number, String, Date], default: () => null },
    dateUnit: { type: Boolean, default: () => true },
});

const dataOptions = ref<{ value: number; title: string }[][]>([]);
const setDataOptions = (options: { value: number; title: string }[][]) => {
    dataOptions.value = options;
};

const selectedValue = ref<number[]>([]);
const setSelectValue = (value: number[]) => {
    selectedValue.value = value;
};

const selectedIndex = ref<number[]>([]);
const setSelectIndex = (index: number[]) => {
    selectedIndex.value = index;
};

const emits = defineEmits<{
    (e: 'change', selectedValue: number[]): void;
    (e: 'update:modelValue', selectedValue: string | number | number[]): void;
}>();

watch(
    () => props.modelValue,
    v => {
        let values: (number | string)[] = [];
        if (Array.isArray(v)) {
            values = [...v];
        } else {
            const str = ['date', 'datetime', 'month'].includes(props.mode) ? 'YYYY MM DD HH mm ss' : 'HH mm ss';
            const value: string[] = utils.dayjs(v).format(str).split(' ');
            values = value.map(item => Number(item));
        }
        setSelectValue(values as number[]);
    },
    { immediate: true }
);

const initOptions = (values = selectedValue.value) => {
    const { options } = getDateOptions(values, props.mode as DateMode, props.minDate, props.maxDate);
    setDataOptions(options);
};

const viewloading = ref(false);

const initSelectIndex = (values = selectedValue.value, callback?: () => void) => {
    viewloading.value = true;
    nextTick(() => {
        const indexs: number[] = [];
        const _values = getNowDate(values, props.mode as DateMode);
        dataOptions.value.forEach((item, index) => {
            let i = item.map(({ value }) => value).indexOf(_values[index]);
            if (i === -1) {
                i = _values[index] > item[item.length - 1].value ? item.length - 1 : 0;
            }
            indexs.push(i);
        });
        setSelectIndex(indexs);
        setSelectValue(indexs.map((i, index) => dataOptions.value[index][i].value));
        emits('change', selectedValue.value);
        emits('update:modelValue', selectedValue.value);
        viewloading.value = false;
        if (callback) callback();
    });
};

let changeTimeout: any = 0;
const onChange = (e: any) => {
    clearTimeout(changeTimeout);
    changeTimeout = setTimeout(() => {
        const indexs: number[] = e.detail.value;
        const newValues = indexs.map((i, index) => dataOptions.value[index][i].value);
        initSelectIndex(newValues, () => {
            initOptions();
            initSelectIndex();
        });
    }, 100);
};

watch([() => props.minDate, () => props.maxDate], () => {
    initOptions();
    initSelectIndex();
});

initOptions();
initSelectIndex();
</script>
<template>
    <picker-view v-if="!viewloading" style="height: 450rpx; width: 100%" indicator-style="height: 43px" immediate-change :value="selectedIndex" @change="onChange">
        <picker-view-column v-for="(col, index) in dataOptions" :key="index">
            <view class="time-item" v-for="(item, i) in col" style="height: 43px" :key="item.title">
                <text>
                    {{ dateUnit ? item.title : item.value }}
                </text>
            </view>
        </picker-view-column>
    </picker-view>
</template>

<style scoped lang="scss">
.time-item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--ste-select-font-size);
}
</style>
