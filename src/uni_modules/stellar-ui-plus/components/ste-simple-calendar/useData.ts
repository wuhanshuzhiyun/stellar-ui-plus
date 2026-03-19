import { computed, ref, watch } from 'vue';
import utils from '../../utils/utils';
import type { DateInfo } from './type.d';

export const useSimpleCalendar = (props: any, emit: any) => {
    const currentDate = ref<any>(props.date);

    // 计算日期信息
    const dateInfo = computed<DateInfo>(() => {
        const d = utils.dayjs(currentDate.value);
        return {
            date: d.format('YYYY-MM-DD'),
            year: d.year(),
            month: d.month() + 1,
            day: d.date(),
            weekday: d.day(),
            weekText: props.weekTexts[d.day()],
            timestamp: d.valueOf(),
        };
    });

    // 格式化年月
    const formattedMonth = computed(() => {
        return utils.dayjs(currentDate.value).format(props.formatter);
    });

    // 监听 date 属性变化
    watch(
        () => props.date,
        (newVal) => {
            currentDate.value = newVal;
            emit('date-change', dateInfo.value);
        }
    );

    // 设置日期
    const setDate = (date: string | number | Date) => {
        currentDate.value = date;
        emit('date-change', dateInfo.value);
    };

    // 获取日期信息
    const getDateInfo = (): DateInfo => {
        return dateInfo.value;
    };

    // 回到今天
    const today = () => {
        currentDate.value = Date.now();
        emit('date-change', dateInfo.value);
    };

    return {
        dateInfo,
        formattedMonth,
        setDate,
        getDateInfo,
        today,
    };
};
