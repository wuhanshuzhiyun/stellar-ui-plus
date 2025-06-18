import type { PropType } from 'vue';

type TextSpace = 'ensp' | 'emsp' | 'nbsp';

export default {
    selectable: { type: Boolean, default: false },
    space: { type: String as PropType<TextSpace>, default: undefined },
    decode: { type: Boolean, default: false },
    lines: { type: Number, default: undefined },
    value: { type: String, default: '' },
};
