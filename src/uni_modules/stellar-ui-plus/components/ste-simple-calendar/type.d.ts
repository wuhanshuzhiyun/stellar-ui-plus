/** 日期信息对象 */
export interface DateInfo {
    /** 完整日期字符串，格式为 YYYY-MM-DD */
    date: string;
    /** 年份 */
    year: number;
    /** 月份，1-12 */
    month: number;
    /** 日期，1-31 */
    day: number;
    /** 星期几，0-6（0=周日） */
    weekday: number;
    /** 星期文本 */
    weekText: string;
    /** 时间戳 */
    timestamp: number;
}

/** 组件 Emits 类型定义 */
export interface SimpleCalendarEmits {
    (e: 'click', dateInfo: DateInfo): void;
    (e: 'date-change', dateInfo: DateInfo): void;
}

/** 组件暴露的方法 */
export interface SimpleCalendarExpose {
    setDate: (date: string | number | Date) => void;
    getDateInfo: () => DateInfo;
    today: () => void;
}
