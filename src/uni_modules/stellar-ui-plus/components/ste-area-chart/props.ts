import type { PropType } from 'vue';
import { propsDefault } from '../../Charts/propsDefault';
import utils from '../../utils/utils';
import type { ChartsOptions, ChartsSerie, ChartsType } from '../../Charts/types/index';
// 组件默认配置
export const propsData = utils.deepMerge(propsDefault(), {
    color: { type: Array as PropType<ChartsOptions<ChartsType>['color']>, default: () => ['#165DFF', '#14C9C9', '#F7BA1E', '#3491FA', '#F53F3F'] },
    // 图表宽度
    width: { type: [Number, String], default: '750' },
    // 图表高度
    height: { type: [Number, String], default: '500' },
    // 是否显示图表区域内数据点上方的数据文案
    dataLabel: { type: [Boolean], default: false },
    // 图表数据
    series: {
        type: Object as PropType<ChartsSerie<'area'>[]>,
        default: () => [],
    },
    categories: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    padding: [15, 15, 0, 5],
});

export const propsComponent: () => Partial<ChartsOptions<'area'>> = () => ({
    legend: {
        show: false,
    },
    title: {
        fontSize: 12,
        color: '#666666',
    },
    subtitle: {
        fontSize: 14,
        color: '#1D2129',
    },
    xAxis: {
        disableGrid: true,
    },
    yAxis: {
        gridType: 'dash',
        dashLength: 8,
        data: [
            {
                min: 0,
                disabled: false,
                axisLine: false,
            },
        ],
    },
    // 额外配置
    extra: {
        area: {
            type: 'straight',
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: true,
            activeType: 'hollow',
        },
    },
});
