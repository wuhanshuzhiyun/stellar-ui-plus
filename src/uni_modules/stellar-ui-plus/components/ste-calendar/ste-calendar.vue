<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();
import { formatDate, type DateType, type WeekType } from './date';
import type { Dayjs } from '../../types/index';
import utils from '../../utils/utils';
import useData from './useData';
import propsData from './props';
import { getCalendarData } from './date';

const props = defineProps(propsData);

const cmpShowSigns = computed(() => {
    return Object.keys(props.signs).length > 0;
});
const cmpDates = computed(() => getCalendarData(props.minDate, props.maxDate, viewDate.value, props.monthCount, props.formatter, props.signs));

const cmpRootStyle = computed(() => {
    const rowHeight = cmpShowSigns.value ? utils.formatPx(180, 'num') : utils.formatPx(126, 'num');
    const color = props.color ? props.color : getColor().steThemeColor;
    return {
        '--calendar-width': utils.formatPx(props.width),
        '--calendar-height': utils.formatPx(props.height),
        '--calendar-color': color,
        '--calendar-weekend-color': props.weekendColor ? props.weekendColor : color,
        '--calendar-bg-color': utils.Color.formatColor(color, 0.1),
        '--calendar-range-color': utils.Color.formatColor(color, 0.2),
        '--calendar-disabled-color': utils.Color.formatColor(color, 0.3),
        '--calendar-sign-color': utils.Color.formatColor(color, 0.7),
        '--calendar-start-text': `"${props.startText}"`,
        '--calendar-end-text': `"${props.endText}"`,
        '--calendar-line-height': `${rowHeight}px`,
        rowHeight,
    };
});

const cmpMonthTops = computed(() => {
    const datas = cmpDates.value.monthDatas;
    const rowHeight = cmpRootStyle.value.rowHeight;
    const tops: { [key: string]: { top?: number; end?: number } } = {};
    let end = 0;
    for (let i = 0; i < datas.length; i++) {
        const month = datas[i];
        tops[month.key] = { top: end };
        end += utils.formatPx(80, 'num');
        end += rowHeight * month.weeks.length;
        tops[month.key].end = end;
    }
    return tops;
});

const cmpShowConfirm = computed(() => props.showConfirm && !props.readonly);

const { initing, startDate, setStartDate, endDate, setEndDate, dataList, setDataList, contentScrollTop, scrollTop, viewDate, viewMonth } = useData();

const emits = defineEmits<{
    (e: 'select', days: (string | number)[], day: string | number): void;
    (e: 'confirm', days: (string | number)[]): void;
    (e: 'view-month', month: string): void;
}>();
let viewTimer = 0;
const showMonth = (date?: DateType) => {
    const newDate: Dayjs = date ? utils.dayjs(date) : viewDate.value;
    if (newDate.format('YYYY-MM-DD') !== viewDate.value.format('YYYY-MM-DD')) {
        viewDate.value = newDate;
    }
    clearTimeout(viewTimer);
    viewTimer = setTimeout(() => {
        const _viewMonth = viewDate.value.format('YYYY-MM');
        const tops = cmpMonthTops.value;
        const top = tops[_viewMonth]?.top || 0;
        if (top === undefined || scrollTop.value === top) {
            initing.value = false;
            return;
        }
        contentScrollTop.value = scrollTop.value;
        nextTick(() => {
            contentScrollTop.value = top;
            scrollTop.value = top;
            viewMonth.value = _viewMonth;
            initing.value = false;
        });
    }, 10);
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
watch(
    () => props.defaultDate,
    v => {
        viewDate.value = v ? utils.dayjs(v) : utils.dayjs();
        showMonth();
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
const onShowMonth = (scrollTop: number) => {
    clearTimeout(viewTimer);
    viewTimer = setTimeout(() => {
        for (let month in cmpMonthTops.value) {
            const { top = 0, end = 0 } = cmpMonthTops.value[month];
            if (scrollTop >= top && scrollTop < end) {
                if (viewMonth.value === month) return;
                viewMonth.value = month;
                emits('view-month', month);
                return;
            }
        }
    }, 100);
};
const onScroll = (e: any) => {
    scrollTop.value = e.detail.scrollTop;
    onShowMonth(e.detail.scrollTop);
};
</script>
<template>
    <view class="ste-calendar-root" :style="[cmpRootStyle, { opacity: initing ? 0 : 1 }]">
        <view v-if="showTitle" class="calendar-title">{{ title }}</view>
        <view class="week-head">
            <view class="week-row">
                <view class="week-item" :class="{ weekend: index === 0 || index === 6 }" v-for="(w, index) in cmpDates.weekTexts" :key="index">
                    {{ w }}
                </view>
            </view>
        </view>
        <scroll-view class="date-content" :class="{ 'show-confirm': cmpShowConfirm, 'show-title': showTitle }" scroll-y :scroll-top="contentScrollTop" @scroll="onScroll">
            <view class="month-item" v-for="m in cmpDates.monthDatas" :key="m.key" :id="`month-${m.key}`">
                <view class="month-bg" v-if="showMark">
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
                            range: mode === 'range',
                            signs: cmpShowSigns,
                            active: dataList.indexOf(d.key) >= 0,
                            start: startDate === d.key,
                            end: endDate === d.key,
                            disabled: d.disabled,
                            not: !d.dayText,
                            today: d.today,
                        }"
                    >
                        <block v-if="d.dayText">
                            <view class="day-range-head" v-if="mode === 'range'"></view>
                            <view class="day-content">{{ d.dayText }}</view>
                            <view class="day-range-foot" v-if="mode === 'range'"></view>
                            <view class="day-signs" v-if="cmpShowSigns">
                                <block v-if="d.signs">
                                    <view class="day-sign" v-for="sign in d.signs" :key="sign.key" :style="[sign.style]" :class="sign.className">
                                        {{ sign.content }}
                                    </view>
                                </block>
                            </view>
                        </block>
                    </view>
                </view>
            </view>
        </scroll-view>
        <view v-if="cmpShowConfirm" class="confirm-button" @click="confirm">确定</view>
    </view>
</template>

<style lang="scss" scoped>
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
                color: var(--calendar-weekend-color);
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
        height: var(--font-size-80, 80rpx);
        line-height: var(--font-size-80, 80rpx);
        font-size: var(--font-size-32, 32rpx);
        border-bottom: 1px solid #ddd;
        box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    .date-content {
        width: 100%;
        overflow-y: auto;
        height: calc(100% - var(--font-size-80, 80rpx));
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

            .week-row {
                height: var(--calendar-line-height);

                .day-item {
                    position: relative;
                    height: 100%;
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
                        &.range {
                            background-color: var(--calendar-color);
                            color: #fff;
                        }

                        &:not(.signs):not(.range) {
                            background-color: var(--calendar-color);
                            color: #fff;
                        }

                        &.signs {
                            .day-content {
                                background-color: var(--calendar-color);
                                color: #fff;
                                border-radius: 6rpx;
                            }
                        }
                    }

                    &.start,
                    &.end {
                        .day-range-head,
                        .day-range-foot {
                            display: block;
                        }

                        .day-signs {
                            display: none;
                        }
                    }

                    &.today {
                        font-weight: bold;

                        &:not(.active):not(.start):not(.end) {
                            color: var(--calendar-color);
                        }
                    }

                    &.active.range:not(.start):not(.end) {
                        background-color: var(--calendar-range-color);
                        color: var(--calendar-color);

                        .day-content {
                            background-color: transparent;
                            color: inherit;
                            border-radius: 0;
                        }
                    }

                    &.start {
                        .day-range-head::before {
                            content: '';
                        }

                        .day-range-foot::before {
                            content: var(--calendar-start-text);
                        }
                    }

                    &.end {
                        .day-range-head::before {
                            content: '';
                        }

                        .day-range-foot::before {
                            content: var(--calendar-end-text);
                        }
                    }

                    &.start.end {
                        .day-range-head::before {
                            content: var(--calendar-start-text);
                        }
                    }

                    &.disabled {
                        background-color: initial !important;
                        color: #bbb !important;
                    }

                    &.signs {
                        .day-content {
                            height: 72rpx;
                            line-height: 72rpx;
                        }
                    }

                    .day-content {
                        width: 100%;
                        height: 48rpx;
                        line-height: 48rpx;
                        font-size: var(--font-size-32, 32rpx);
                    }

                    .day-range-head,
                    .day-range-foot {
                        width: 100%;
                        height: 24rpx;
                        line-height: 24rpx;
                        font-size: var(--font-size-24, 24rpx);
                    }

                    .day-range-head,
                    .day-range-foot {
                        display: none;
                    }

                    .day-signs {
                        width: 100%;
                        height: 102rpx;
                        padding: 0 4rpx;
                        display: flex;
                        flex-direction: column;

                        .day-sign {
                            width: 100%;
                            height: 24rpx;
                            line-height: 24rpx;
                            font-size: var(--font-size-24, 24rpx);
                            overflow: hidden;
                            margin-top: 6rpx;
                        }
                    }
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
        // #ifdef H5
        cursor: pointer;

        // #endif
        &.disabled {
            background-color: var(--calendar-disabled-color);
        }
    }
}
</style>
