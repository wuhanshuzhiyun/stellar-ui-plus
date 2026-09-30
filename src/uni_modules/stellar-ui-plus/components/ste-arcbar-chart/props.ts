import type { PropType } from 'vue';
import { propsDefault } from '../../Charts/propsDefault';
import utils from '../../utils/utils';
import type { ChartsSerie, ChartsOptions } from '../../Charts/types/index';
// 组件默认配置
export const propsData = utils.deepMerge(propsDefault(), {
    // 图表宽度
    width: { type: [Number, String], default: '200' },
    // 图表高度
    height: { type: [Number, String], default: '200' },
    // 是否显示图表区域内数据点上方的数据文案
    dataLabel: { type: [Boolean], default: false },
    // 图表数据，data 取值 0~1
    series: {
        type: Array as PropType<ChartsSerie<'arcbar'>[]>,
        default: () => [],
    },
    // 高亮的圆弧索引（对应 series 下标），-1 不高亮
    activeIndex: { type: Number, default: -1 },
    // 高亮时非激活圆弧的透明度
    inactiveOpacity: { type: Number, default: 0.3 },
});

export const propsComponent: () => Partial<ChartsOptions<'arcbar'>> = () => ({
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
    // 额外配置
    extra: {
        arcbar: {
            type: 'circle',
            width: 8,
            gap: 4,
            lineCap: 'round',
            startAngle: 1.5,
            backgroundColor: '#E9E9E9',
        },
    },
});
