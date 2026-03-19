import type { PropType, CSSProperties } from 'vue';

export default {
    date: {
        type: [String, Number, Date] as PropType<string | number | Date>,
        default: () => Date.now(),
    },
    formatter: {
        type: String,
        default: () => 'YYYY年M月',
    },
    weekTexts: {
        type: Array as PropType<string[]>,
        default: () => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    },
    color: {
        type: String,
        default: () => '#000000',
    },
    showCalendar: {
        type: Boolean,
        default: () => true,
    },
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({}),
    },
    customClass: {
        type: String,
        default: () => '',
    },
};
