import type { PropType } from 'vue';
import type { ChartsOptions, ChartsType } from '../../Charts/types';

export interface ChartsProps<T extends ChartsType> {
    id: string;
    width: string | number;
    height: string | number;
    data: Partial<ChartsOptions<T>>;
}

const props = {
    // 图表宽度
    width: { type: [Number, String], default: () => '600' },
    // 图表高度
    height: { type: [Number, String], default: () => '500' },
    // 图表数据
    data: { type: Object as any, default: () => ({}) },
    // 主题颜色，16进制颜色格式
    color: { type: Array as any, default: () => ['#165DFF', '#14C9C9', '#F7BA1E', '#3491FA', '#722ED1', '#9FDB1D'] },
};

export default props;
