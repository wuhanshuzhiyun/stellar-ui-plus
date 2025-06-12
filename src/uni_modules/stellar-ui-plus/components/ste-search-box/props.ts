import type { PropType } from 'vue';
import type { InputConfirmType } from '@uni-helper/uni-app-types';
type InputType = 'date' | 'dateRange'; //

const props = {
    // 当前值（支持v-model双向绑定）
    value: { type: [String, Number], default: '' },
    // 头部操作类型
    type: {
        type: String as PropType<InputType>,
        default: 'date' as InputType,
    },
    headerValue: {
        type: [String, Number, Array] as unknown as PropType<string | number | (string | number)[]>,
        default: '',
    },
    // 占位符
    placeholder: { type: String, default: '请输入' },
    // 高度
    height: [Number, String],
    // 文字颜色
    textColor: { type: String, default: '' },
    // 占位符颜色
    placeholderColor: { type: String, default: '' },
    // 是否有清空按钮
    clearable: { type: Boolean, default: true },

    confirmType: { type: String as PropType<InputConfirmType>, default: 'done' },
};

export const searchBoxEmits = {
    // 输入框值改变时触发
    'update:value': (value: string) => typeof value === 'string',
    // 头部操作值改变时触发
    'update:headerValue': (_value: any) => true,
    search: (value: string) => typeof value === 'string',
};

export default props;
