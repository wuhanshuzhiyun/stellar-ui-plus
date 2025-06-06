import { propsDefault } from '../../Charts/propsDefault';
import type { PropType } from 'vue';
import type { ChartsSerie, ChartsOptions } from '../../Charts/types/index';
import utils from '../../utils/utils';

// 组件默认配置
export const propsData = utils.deepMerge(propsDefault(), {
    // 图表数据
    series: {
        type: Object as PropType<ChartsSerie<'line'>>,
        default: () => ({}),
    },
    // 自定义配置
    color: { type: Array as PropType<string[]>, default: () => ['#165DFF', '#14C9C9', '#F7BA1E'] },
    categories: {
        type: Object as any,
        default: () => [],
    },
    dataPointShape: { type: Boolean, default: false },
});

export const propsComponent: () => Partial<ChartsOptions<'line'>> = () => ({
    legend: {
        show: false,
    },
    title: {
        fontSize: 28,
        color: '#bbbbbb',
    },
    xAxis: {
        disableGrid: true,
        gridType: 'dash',
    },
    yAxis: {
        gridType: 'dash',
        dashLength: 2,
        data: [{ axisLine: false }],
    },
    // 额外配置
    extra: {
        line: {
            type: 'straight',
            width: 2,
            activeType: 'none',
        },
    },
});
