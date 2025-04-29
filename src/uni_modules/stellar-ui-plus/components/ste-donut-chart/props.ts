import type { PropType } from 'vue';
import { propsDefault } from '../../Charts/propsDefault';
import utils from '../../utils/utils';
import type { ChartsSerie } from '../../Charts/types';
// 组件默认配置
export const propsData = utils.deepClone(
    utils.deepMerge(propsDefault(), {
        // 图表宽度
        width: { type: [Number, String], default: '750' },
        // 图表高度
        height: { type: [Number, String], default: '200' },
        // 是否显示图表区域内数据点上方的数据文案
        dataLabel: { type: [Boolean], default: false },
        // 图表数据
        series: {
            type: Object as PropType<ChartsSerie<'ring'>>,
            default: () => ({}),
        },
    })
);

export const propsComponent = {
    legend: {
        show: false,
    },
    title: {
        fontSize: 28,
        color: '#bbbbbb',
    },
    // 额外配置
    extra: {
        ring: {
            ringWidth: 6,
            customRadius: 32,
            offsetAngle: -90,
            linearType: 'none',
        },
    },
};
