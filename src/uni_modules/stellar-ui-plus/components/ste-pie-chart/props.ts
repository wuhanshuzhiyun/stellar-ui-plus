import type { PropType } from 'vue';
import type { ChartsOptions, ChartsType } from '../../Charts/types';

export interface ChartsProps<T extends ChartsType> {
    id: string;
    width: string | number;
    height: string | number;
    data: Partial<ChartsOptions<T>>;
}

const props = {
    // 图表ID
    id: { type: String, default: () => Date.now().toString() + Math.floor(Math.random() * 10000).toString() },
    // 图表宽度
    width: { type: [Number, String], default: () => '100%' },
    // 图表高度
    height: { type: [Number, String], default: () => '100%' },
    // 图表数据
    data: { type: Object as any, default: () => ({}) },
};

export default props;
