<script setup lang="ts">
import { watch, onMounted, computed } from 'vue';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();
import { formatDate, type WeekType } from './date';
import utils from '../../utils/utils';
import useData from './useData';
import propsData from './props';
import { getCalendarData } from './date';

const props = defineProps(propsData);

const cmpRootStyle = computed(() => ({
    '--calendar-width': utils.formatPx(props.width),
    '--calendar-height': utils.formatPx(props.height),
    '--calendar-color': props.color ? props.color : getColor().steThemeColor,
    '--calendar-bg-color': utils.Color.formatColor(props.color ? props.color : getColor().steThemeColor, 0.1),
    '--calendar-range-color': utils.Color.formatColor(props.color ? props.color : getColor().steThemeColor, 0.2),
    '--calendar-disabled-color': utils.Color.formatColor(props.color ? props.color : getColor().steThemeColor, 0.3),
    '--calendar-start-text': `"${props.startText}"`,
    '--calendar-end-text': `"${props.endText}"`,
}));

const cmpDates = computed(() => getCalendarData(props.minDate, props.maxDate, props.formatter));

const cmpShowConfirm = computed(() => props.showConfirm && !props.readonly);

const { initing, setIniting, startDate, setStartDate, endDate, setEndDate, dataList, setDataList, contentScrollTop, setContentScrollTop } = useData();

const emits = defineEmits<{
    (e: 'select', days: (string | number)[], day: string | number): void;
    (e: 'confirm', days: (string | number)[]): void;
}>();

const showMonth = (date = props.defaultMonth) => {
    const showDate = date ? utils.dayjs(date).format('YYYY-MM') : null;
    if (!showDate) return setIniting(false);
    if (!cmpDates.value.monthDatas?.length) return setIniting(false);
    let height = 0;
    let show = false;
    for (let i = 0; i < cmpDates.value.monthDatas.length; i++) {
        const month = cmpDates.value.monthDatas[i];
        if (month.key === showDate) {
            show = true;
            break;
        }
        height += utils.formatPx(80, 'num');
        height += utils.formatPx(126, 'num') * month.weeks.length;
    }
    if (!height || !show) return setIniting(false);
    setContentScrollTop(0);
    setTimeout(() => {
        setContentScrollTop(height);
        setIniting(false);
    }, 25);
};

const onMultiple = (day: WeekType) => {
    const index = dataList.value.indexOf(day.key);
    if (index === -1) {
        if (props.maxCount && dataList.value.length >= (props.maxCount as number)) return;
        dataList.value.push(day.key);
    } else {
        dataList.value.splice(index, 1);
    }
};

const rangeDates = () => {
    if (!startDate.value || !endDate.value) return;
    const start = formatDate(startDate.value);
    const end = formatDate(endDate.value);
    let list: (string | number)[] = [];
    for (let i = new Date(start); i <= new Date(end); i.setDate(i.getDate() + 1)) {
        list.push(formatDate(i, props.formatter));
    }
    if (list.length < 2) {
        list = [startDate.value, endDate.value];
    }
    if (props.maxRange !== null && list.length > props.maxRange) {
        setEndDate(null);
        if (props.showRangePrompt) {
            uni.showModal({
                title: '提示',
                content: props.rangePrompt ? props.rangePrompt : `选择天数不能超过${props.maxRange}天`,
                showCancel: false,
            });
        }
        return;
    }
    setDataList(list);
};

const onRange = (day: WeekType) => {
    setDataList([]);
    if (!startDate.value) {
        setStartDate(day.key);
    } else if (!endDate.value) {
        if ((props.allowSameDay && day.key === startDate.value) || day.key > startDate.value) {
            setEndDate(day.key);
        } else if (day.key < startDate.value) {
            setEndDate(startDate.value);
            setStartDate(day.key);
        }
    } else {
        setStartDate(day.key);
        setEndDate(null);
    }
    rangeDates();
};

const onSelect = (day: WeekType) => {
    if (props.readonly || !day.dayText || day.disabled) return;
    if (props.mode === 'single') {
        setDataList([day.key]);
    } else if (props.mode === 'multiple') {
        onMultiple(day);
    } else if (props.mode === 'range') {
        onRange(day);
    }
    emits('select', dataList.value, day.key);
};

watch(
    () => props.list,
    v => {
        dataList.value = (v || []).map(d => formatDate(d, props.formatter));
        if (props.mode === 'range' && dataList.value.length >= 2) {
            startDate.value = dataList.value[0];
            endDate.value = dataList.value[dataList.value.length - 1];
            rangeDates();
        }
    },
    { immediate: true }
);

const confirm = () => {
    emits('confirm', dataList.value);
};
onMounted(() => {
    showMonth();
});

defineExpose({ showMonth });
</script>
<template>
    <view class="ste-calendar-root" :style="[cmpRootStyle, { opacity: initing ? 0 : 1 }]">
        <view v-if="props.showTitle" class="calendar-title">{{ props.title }}</view>
        <view class="week-head">
            <view class="week-row">
                <view class="week-item" :class="{ weekend: index === 0 || index === 6 }" v-for="(w, index) in cmpDates.weekTexts" :key="index">
                    {{ w }}
                </view>
            </view>
        </view>
        <scroll-view class="date-content" :class="{ 'show-confirm': cmpShowConfirm, 'show-title': props.showTitle }" scroll-y :scroll-top="contentScrollTop">
            <view class="month-item" v-for="m in cmpDates.monthDatas" :key="m.key" :id="`month-${m.key}`">
                <view class="month-bg" v-if="props.showMark">
                    {{ m.month }}
                </view>
                <view class="month-text">{{ m.monthText }}</view>
                <view class="week-row" v-for="(w, index) in m.weeks" :key="index">
                    <view
                        class="week-item day-item"
                        v-for="d in w"
                        :key="d.key"
                        @click="onSelect(d)"
                        :class="{
                            weekend: d.weekend,
                            range: props.mode === 'range',
                            active: dataList.indexOf(d.key) >= 0,
                            start: startDate === d.key,
                            end: endDate === d.key,
                            disabled: d.disabled,
                            not: !d.dayText,
                        }"
                    >
                        <block v-if="d.dayText">
                            <view class="day-head"></view>
                            <view class="day-content">{{ d.dayText }}</view>
                            <view class="day-foot"></view>
                        </block>
                    </view>
                </view>
            </view>
        </scroll-view>
        <view v-if="cmpShowConfirm" class="confirm-button" @click="confirm">确定</view>
    </view>
</template>
<style scoped lang="scss">
.ste-calendar-root {
    width: var(--calendar-width);
    height: var(--calendar-height);
    color: #252525;

    .week-row {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 0;

        .week-item {
            text-align: center;

            &.weekend {
                color: var(--calendar-color);
            }
        }

        & + .week-row {
            margin-top: 0;
        }
    }

    .calendar-title {
        height: 90rpx;
        font-size: var(--font-size-32, 32rpx);
        line-height: 44rpx;
        padding-top: 30rpx;

        text-align: center;
    }

    .week-head {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: var(--font-size-32, 32rpx);
        border-bottom: 1px solid #ddd;
        box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    .date-content {
        width: 100%;
        overflow-y: auto;
        height: calc(100% - 80rpx);
        padding-bottom: 12rpx;

        &.show-title {
            height: calc(100% - 142rpx);
        }

        &.show-confirm {
            height: calc(100% - 132rpx);

            &.show-title {
                height: calc(100% - 242rpx);
            }
        }

        .month-item {
            padding: 20rpx 0;
            position: relative;

            .month-bg {
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 360rpx;
                color: var(--calendar-bg-color);
                font-weight: bold;
            }

            .month-text {
                position: relative;
                z-index: 2;
                width: 100%;
                text-align: center;
                height: 44rpx;
                line-height: 44rpx;
                font-size: var(--font-size-32, 32rpx);
            }

            .day-item {
                position: relative;
                height: 126rpx;
                z-index: 2;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                // #ifdef H5
                cursor: pointer;

                &.not {
                    cursor: default !important;
                }

                // #endif

                &.active,
                &.start,
                &.end {
                    background-color: var(--calendar-color);
                    color: #fff;
                }

                &.active.range:not(.start):not(.end) {
                    background-color: var(--calendar-range-color);
                    color: var(--calendar-color);
                }

                &.start {
                    .day-head::before {
                        content: '';
                    }

                    .day-foot::before {
                        content: var(--calendar-start-text);
                    }
                }

                &.end {
                    .day-head::before {
                        content: '';
                    }

                    .day-foot::before {
                        content: var(--calendar-end-text);
                    }
                }

                &.start.end {
                    .day-head::before {
                        content: var(--calendar-start-text);
                    }
                }

                &.disabled {
                    background-color: initial !important;
                    color: #bbb !important;
                }

                .day-head,
                .day-foot {
                    width: 100%;
                    height: 20rpx;
                    line-height: 20rpx;
                    font-size: var(--font-size-24, 24rpx);
                }

                .day-content {
                    width: 100%;
                    height: 48rpx;
                    line-height: 48rpx;
                    font-size: var(--font-size-32, 32rpx);
                }
            }
        }
    }

    .confirm-button {
        width: 100%;
        height: 72rpx;
        line-height: 72rpx;
        border-radius: 36rpx;
        background-color: var(--calendar-color);
        color: #fff;
        text-align: center;
        font-size: var(--font-size-32, 32rpx);
        // #ifdef H5
        cursor: pointer;

        // #endif
        &.disabled {
            background-color: var(--calendar-disabled-color);
        }
    }
}
</style>
