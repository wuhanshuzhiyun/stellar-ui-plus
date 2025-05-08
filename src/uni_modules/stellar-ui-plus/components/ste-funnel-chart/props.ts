import { propsDefault } from '../../Charts/propsDefault';
import type { PropType } from 'vue';
import type { ChartsSerie, ChartsOptions } from '../../Charts/types/index';
import utils from '../../utils/utils';

// 组件默认配置
export const propsData = utils.deepMerge(propsDefault(), {
    // 图表数据
    series: {
        type: Object as PropType<ChartsSerie<'funnel'>[]>,
        default: () => ({}),
    },
    // 自定义配置
    color: { type: Array as PropType<string[]>, default: () => ['#0E42D2', '#165DFF', '#4080FF', '#6AA1FF', '#94BFFF'] },
});

export const propsComponent: () => Partial<ChartsOptions<'funnel'>> = () => ({
    legend: {
        show: false,
    },
    title: {
        fontSize: 28,
        color: '#bbbbbb',
    },
    // 额外配置
    extra: {
        funnel: {
            ringWidth: 6,
            customRadius: 32,
            offsetAngle: -90,
            linearType: 'none',
            minSize: 20,
        },
    },
});
