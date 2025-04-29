import type { PropType } from 'vue';
import { propsDefault } from '../../Charts/propsDefault';
import utils from '../../utils/utils';
import type { ChartsOptions, ChartsSerie } from '../../Charts/types';
// 组件默认配置
export const propsData = utils.deepMerge(propsDefault(), {
    // 图表宽度
    width: { type: [Number, String], default: '750' },
    // 图表高度
    height: { type: [Number, String], default: '200' },
    // 是否显示图表区域内数据点上方的数据文案
    dataLabel: { type: [Boolean], default: false },
    // 图表数据
    series: {
        type: Array as PropType<ChartsSerie<'pie'>[]>,
        default: () => [],
    },
});

export const propsComponent: () => Partial<ChartsOptions<'pie'>> = () => ({
    legend: {
        show: false,
    },
    title: {
        fontSize: 28,
        color: '#bbbbbb',
    },
    // 额外配置
    extra: {
        pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: '#FFFFFF',
        },
    },
});
