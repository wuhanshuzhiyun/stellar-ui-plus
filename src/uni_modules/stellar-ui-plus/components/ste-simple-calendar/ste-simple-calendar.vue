<script setup lang="ts">
import { computed, ref } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';
import { useSimpleCalendar } from './useData';
import type { SimpleCalendarEmits, SimpleCalendarExpose } from './type.d';

const componentName = 'ste-simple-calendar';

defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);

const emit = defineEmits<SimpleCalendarEmits>();

const { dateInfo, formattedMonth, setDate, getDateInfo, today } = useSimpleCalendar(props, emit);

// 获取安全区域信息
const { safeArea } = utils.System.getWindowInfo();

// 控制日历弹窗显示
const showPopup = ref(false);

// 日历选中的日期列表
const calendarList = computed(() => {
    return [pendingSelectedDate.value];
});

// 日历默认日期（格式化为时间戳）
const calendarDefaultDate = computed(() => {
    return utils.dayjs(pendingSelectedDate.value).valueOf();
});

// 弹窗中待确认的日期
const pendingSelectedDate = ref<string | number>(dateInfo.value.date);

// 根节点样式
const rootStyle = computed(() => {
    return {
        ...props.customStyle,
    };
});

// 日期数字样式
const dayStyle = computed(() => {
    return {
        color: props.color,
    };
});

// 星期文本样式
const weekStyle = computed(() => {
    return {
        color: props.color,
    };
});

// 年月文本样式
const monthStyle = computed(() => {
    return {
        color: props.color,
    };
});

// 底部按钮区域样式（包含安全距离）
const actionBoxStyle = computed(() => {
    const bottomSafeArea = safeArea.bottom || 0;
    const screenHeight = utils.System.getWindowInfo().screenHeight || 0;
    const safeAreaInsetBottom = screenHeight - bottomSafeArea;

    return {
        paddingBottom: `calc(20rpx + ${safeAreaInsetBottom}px)`,
    };
});

// 点击组件
const handleClick = () => {
    emit('click', dateInfo.value);
    if (props.showCalendar) {
        pendingSelectedDate.value = dateInfo.value.date;
        showPopup.value = true;
    }
};

// 重置日历
const handleReset = () => {
    setDate(Date.now());
    pendingSelectedDate.value = utils.dayjs().format('YYYY-MM-DD');
    showPopup.value = false;
};

// 日历选择日期
const handleCalendarSelect = (days: (string | number)[], day: string | number) => {
    pendingSelectedDate.value = day || days?.[0] || pendingSelectedDate.value;
};

// 日历确认选择
const handleCalendarConfirm = () => {
    setDate(pendingSelectedDate.value);
    showPopup.value = false;
};

// 暴露方法
defineExpose<SimpleCalendarExpose>({
    setDate,
    getDateInfo,
    today,
});
</script>

<template>
    <view :class="['ste-simple-calendar', customClass]" :style="rootStyle" @click="handleClick">
        <!-- 日期数字 -->
        <view class="ste-simple-calendar__day-box">
            <text class="ste-simple-calendar__day" :style="dayStyle">{{ dateInfo.day }}</text>
        </view>

        <!-- 星期标签 -->
        <view class="ste-simple-calendar__week-box">
            <text v-for="(char, index) in dateInfo.weekText" :key="index" class="ste-simple-calendar__week-text" :style="weekStyle">
                {{ char }}
            </text>
        </view>

        <!-- 年月文本 -->
        <view class="ste-simple-calendar__month-box">
            <text class="ste-simple-calendar__month" :style="monthStyle">
                {{ formattedMonth }}
            </text>
        </view>
    </view>

    <!-- 日历弹窗 -->
    <ste-popup v-model:show="showPopup" height="60vh" position="bottom" :showClose="false">
        <view class="calendar-popup">
            <view class="calendar-wrapper">
                <ste-calendar :list="calendarList" :defaultDate="calendarDefaultDate" :showConfirm="false" :show-title="false" @select="handleCalendarSelect" />
            </view>
            <view class="action-box" :style="actionBoxStyle">
                <view class="btn reset" @click="handleReset">
                    <text class="btn-text">重置</text>
                </view>
                <view class="btn confirm" @click="handleCalendarConfirm">
                    <text class="btn-text">确认</text>
                </view>
            </view>
        </view>
    </ste-popup>
</template>

<style lang="scss" scoped>
.ste-simple-calendar {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    height: 45rpx;

    &__day-box {
        background-color: var(--simple-calendar-day-bg, #f3f3f3);
        border-radius: 2rpx;
        padding: 0 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-right: 6rpx;
    }

    &__day {
        font-size: var(--simple-calendar-day-font-size, 32rpx);
        font-weight: bold;
        color: var(--simple-calendar-day-color, #000000);
        line-height: 1;
    }

    &__week-box {
        background-color: var(--simple-calendar-week-bg, #f3f3f3);
        border-radius: 2rpx;
        padding: 0 10rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-right: 6rpx;
    }

    &__week-text {
        font-size: var(--simple-calendar-week-font-size, 16rpx);
        color: var(--simple-calendar-week-color, #333333);
        line-height: 1.1;
    }

    &__month-box {
        background-color: var(--simple-calendar-month-bg, #f3f3f3);
        border-radius: 2rpx;
        padding: 0 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    &__month {
        font-size: var(--simple-calendar-month-font-size, 24rpx);
        color: var(--simple-calendar-month-color, #333333);
        line-height: 1;
    }
}

.calendar-popup {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .calendar-wrapper {
        flex: 1;
        overflow: hidden;
    }

    .action-box {
        flex-shrink: 0;
        display: flex;
        padding: 20rpx 32rpx;
        background-color: #fff;
        border-top: 1rpx solid #f0f0f0;

        .btn {
            flex: 1;
            height: 80rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8rpx;
            cursor: pointer;

            &.reset {
                background-color: #f5f5f5;
                margin-right: 20rpx;

                .btn-text {
                    color: #666;
                    font-size: 28rpx;
                }
            }

            &.confirm {
                background-color: var(--ste-theme-color, #0090ff);

                .btn-text {
                    color: #fff;
                    font-size: 28rpx;
                }
            }
        }
    }
}
</style>
