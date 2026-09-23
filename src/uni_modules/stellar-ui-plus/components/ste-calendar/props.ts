/**
 * ste-calendar 日历组件 Props 属性定义
 * 包含日历的基础配置、模式控制、文本标签、颜色主题、日期限制与区间选择等参数
 */
import type { PropType } from 'vue';
import type { DateType, SignType } from './date';

export default {
    title: { type: String, default: () => '日期选择' },
    showTitle: { type: Boolean, default: () => true },
    list: { type: Array as PropType<DateType[]>, default: () => [] },
    mode: { type: String, default: () => 'single' },
    startText: { type: String, default: () => '开始' },
    endText: { type: String, default: () => '结束' },
    /** 是否展示范围选择器的起止文案（如“开始”、“结束”），默认为 true。若为 false 则隐藏文案并释放上下预留占位 */
    showRangeText: { type: Boolean, default: () => true },
    /** 主题颜色（选中日期背景、周末文日期颜色和确定按钮） */
    color: { type: String, default: () => '' },
    /** 范围选择器中间区间的背景色（不含起止日期，起止日期仍使用 color 主题色）。无值时自动取主题色 0.2 透明度 */
    rangeColor: { type: String, default: () => '' },
    minDate: { type: [String, Number, Date], default: () => 0 },
    maxDate: { type: [String, Number, Date], default: () => 0 },
    viewStart: { type: [String, Number, Date], default: () => 0 },
    viewEnd: { type: [String, Number, Date], default: () => 0 },
    maxCount: { type: [Number, String], default: () => 0 },
    formatter: { type: String, default: () => 'YYYY-MM-DD' },
    showMark: { type: Boolean, default: () => true },
    readonly: { type: Boolean, default: () => false },
    maxRange: { type: Number, default: () => null },
    rangePrompt: { type: String, default: () => null },
    showRangePrompt: { type: Boolean, default: () => true },
    allowSameDay: { type: Boolean, default: () => false },
    showConfirm: { type: Boolean, default: () => true },
    width: { type: [Number, String], default: () => '100%' },
    height: { type: [Number, String], default: () => '100%' },
    signs: { type: Object as PropType<{ [key: string]: SignType }>, default: () => ({}) },
    defaultDate: { type: [String, Number, Date], default: () => 0 },
    monthCount: { type: Number, default: () => 12 },
    weekendColor: { type: String, default: () => '' },
    showScrollbar: { type: Boolean, default: () => true },
};
