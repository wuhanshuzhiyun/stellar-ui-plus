import type { PropType } from 'vue';

export default {
    title: { type: String },
    hideTitleIcon: { type: Boolean, default: () => false },
    titleIcon: { type: String },
    titleStyle: { type: Object, default: () => ({}) },
    data: { type: Array as PropType<{ label: string; value: string }[]>, default: () => [] },
};
