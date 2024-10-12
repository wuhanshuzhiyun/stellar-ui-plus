<template>
    <view class="ste-date-picker-root">
        <ste-picker
            :columns="columns"
            :title="title"
            :showToolbar="showToolbar"
            :cancelText="cancelText"
            :cancelColor="cancelColor"
            :confirmText="confirmText"
            :confirmColor="confirmColor"
            :visibleItemCount="visibleItemCount"
            :defaultIndex="innerDefaultIndex"
            :itemHeight="itemHeight"
            @change="change"
            @cancel="cancel"
            @confirm="confirm"
            rootClass="ste-date-picker-view"
        ></ste-picker>
    </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineComponent, defineOptions } from 'vue';
import propsData from './props';
import type { CloumnType } from './types';
import dayjs from 'dayjs';

const componentName = 'ste-date-picker';
defineOptions({
    name: componentName,
});

const DEFAULT_DATE = dayjs(new Date(1970, 1, 1, 0, 0, 0));
const padZero = (value: string | number) => `00${value}`.slice(-2);

const times = (n: number, iteratee: (index: number) => string): string[] => {
    let index = -1;
    const result = Array(n < 0 ? 0 : n);
    while (++index < n) {
        result[index] = iteratee(index);
    }
    return result;
};

interface ChangeObj {
    value: string | number;
    index: number[];
}

const props = defineProps(propsData);
const emits = defineEmits<{
    (e: 'change', changeObj: any): void;
    (e: 'cancel'): void;
    (e: 'confirm', value: string | number): void;
}>();

const columns = ref<string[][]>([]);
const innerValue = ref<string | number>('');
const innerDefaultIndex = ref<number[]>([]);
const innerFormatter = (type: string, value: string) => value;

const init = () => {
    innerValue.value = correctValue(props.value);
    updateColumnValue(innerValue.value);
};

const updateColumnValue = (value: string | number) => {
    innerValue.value = value;
    updateColumns();
    updateIndexs();
};

const updateColumns = () => {
    const formatter = props.formatter || innerFormatter;
    const result = getOriginColumns().map(column => column.values.map(value => formatter(column.type, value)));
    columns.value = result;
};

const updateIndexs = () => {
    let value = innerValue.value;
    let values: string[] = [];
    const formatter = props.formatter || innerFormatter;

    values.push(
        formatter('year', `${dayjs(value).year()}` as string),
        formatter('month', padZero(dayjs(value).month() + 1) as string),
        formatter('day', padZero(dayjs(value).date()) as string),
        formatter('hour', padZero(dayjs(value).hour()) as string),
        formatter('minute', padZero(dayjs(value).minute()) as string),
        formatter('second', padZero(dayjs(value).second()) as string)
    );

    let startFlag = 0;
    switch (props.mode) {
        case 'month-day':
            startFlag = 1;
            break;
        case 'time':
        case 'hour-minute':
            startFlag = 3;
            break;
        case 'minute-second':
            startFlag = 4;
    }

    const indexs = columns.value.map((column, index) => {
        return Math.max(
            0,
            column.findIndex(item => item === values[index + startFlag])
        );
    });

    innerDefaultIndex.value = indexs;
};

const getOriginColumns = () => {
    const results = getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, (index: number) => {
            let value: string = (range[0] + index).toString();
            value = type === 'year' ? `${value}` : padZero(value);
            return value;
        });
        if (props.filter) {
            values = props.filter(type, values);
        }
        return { type, values };
    });
    return results;
};

const getRanges = () => {
    const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSecond } = getBoundary('max', innerValue.value);
    const { minYear, minDate, minMonth, minHour, minMinute, minSecond } = getBoundary('min', innerValue.value);

    const result: { type: CloumnType; range: [number, number] }[] = [
        { type: 'year', range: [minYear, maxYear] },
        { type: 'month', range: [minMonth, maxMonth] },
        { type: 'day', range: [minDate, maxDate] },
        { type: 'hour', range: [minHour, maxHour] },
        { type: 'minute', range: [minMinute, maxMinute] },
        { type: 'second', range: [minSecond, maxSecond] },
    ];

    let temp = result;
    if (props.mode === 'datetime') temp = result.splice(0, 5);
    if (props.mode === 'date') temp = result.splice(0, 3);
    if (props.mode === 'year-month') temp = result.splice(0, 2);
    if (props.mode === 'month-day') temp = result.splice(1, 2);
    if (props.mode === 'time') temp = result.splice(3, 3);
    if (props.mode === 'hour-minute') temp = result.splice(3, 2);
    if (props.mode === 'minute-second') temp = result.splice(4, 2);
    return temp;
};

const getBoundary = (type: 'min' | 'max', innerValue: string | number) => {
    const value = dayjs(innerValue);

    const boundary = type === 'min' ? dayjs(props.minDate) : dayjs(props.maxDate);
    const year = boundary.year();
    let month = 1;
    let date = 1;
    let hour = 0;
    let minute = 0;

    if (type === 'max') {
        month = 12;
        date = dayjs(value).daysInMonth();
        hour = 23;
        minute = 59;
    }

    let second = minute;
    if (value.year() === year) {
        month = boundary.month() + 1;
        if (value.month() + 1 === month) {
            date = boundary.date();
            if (value.date() === date) {
                hour = boundary.hour();
                if (value.hour() === hour) {
                    minute = boundary.minute();
                    if (value.minute() === minute) second = boundary.second();
                }
            }
        }
    }

    return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute,
        [`${type}Second`]: second,
    };
};

const correctValue = (value: string | number) => {
    let date = dayjs(value);
    if (date.isValid()) {
        if (date.isBefore(dayjs(props.minDate))) {
            date = dayjs(props.minDate);
        } else if (date.isAfter(dayjs(props.maxDate))) {
            date = dayjs(props.maxDate);
        }
    } else {
        date = dayjs();
    }
    return date.valueOf();
};

const change = (e: { indexs: number[]; values: string[][] }) => {
    const { indexs, values } = e;
    let selectValue: string | number = '';

    let dateArr = [DEFAULT_DATE.year(), DEFAULT_DATE.month() + 1, DEFAULT_DATE.day(), DEFAULT_DATE.hour(), DEFAULT_DATE.minute(), DEFAULT_DATE.second()];

    let startFlag = 0;
    switch (props.mode) {
        case 'month-day':
            startFlag = 1;
            break;
        case 'time':
        case 'hour-minute':
            startFlag = 3;
            break;
        case 'minute-second':
            startFlag = 4;
    }

    values.forEach((value, index) => {
        switch (index + startFlag) {
            case 0:
                dateArr[0] = +value[indexs[index]];
                break;
            case 1:
                dateArr[1] = +value[indexs[index]];
                break;
            case 2:
                dateArr[2] = +value[indexs[index]];
                break;
            case 3:
                dateArr[3] = +value[indexs[index]];
                break;
            case 4:
                dateArr[4] = +value[indexs[index]];
                break;
            case 5:
                dateArr[5] = +value[indexs[index]];
        }
    });

    // 此月份的最大天数
    const maxDay = dayjs(`${dateArr[0]}-${dateArr[1]}`).daysInMonth();
    dateArr[2] = Math.min(maxDay, dateArr[2]) || 1;

    selectValue = dayjs(`${dateArr[0]}/${padZero(dateArr[1])}/${padZero(dateArr[2])} ${padZero(dateArr[3])}:${padZero(dateArr[4])}:${padZero(dateArr[5])}`).valueOf();

    updateColumnValue(selectValue);
    emits('change', { value: selectValue, columnIndexs: indexs });
};

const cancel = () => {
    emits('cancel');
};

const confirm = () => {
    emits('confirm', innerValue.value);
};

onMounted(init);
</script>

<style scoped>
.ste-date-picker-root {
    width: 100%;
}

.ste-date-picker-view {
    width: 100%;
}
</style>
