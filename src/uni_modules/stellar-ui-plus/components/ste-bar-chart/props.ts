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
        type: Array as PropType<ChartsSerie<'bar'>[]>,
        default: () => [],
    },
    // 图表数据集
    categories: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
});

export const propsComponent: () => Partial<ChartsOptions<'bar'>> = () => ({
    legend: {},
    padding: [10, 30, 0, 5],
    title: {
        fontSize: 28,
        color: '#bbbbbb',
    },
    xAxis: {
        boundaryGap: 'justify',
        disableGrid: false,
        min: 0,
        axisLine: false,
        max: 40,
    },
    yAxis: {},
    // 额外配置
    extra: {
        bar: {
            type: 'group',
            width: 30,
            meterBorde: 1,
            meterFillColor: '#FFFFFF',
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
            linearType: 'custom',
            barBorderCircle: true,
            seriesGap: 2,
            categoryGap: 2,
        },
    },
});
