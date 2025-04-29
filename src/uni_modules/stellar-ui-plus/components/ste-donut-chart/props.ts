import { propsDefault } from '../../Charts/propsDefault';
import utils from '../../utils/utils';
// 组件默认配置
export const propsData = utils.deepClone(
    utils.deepMerge(utils.deepClone(propsDefault), {
        // 图表宽度
        width: { type: [Number, String], default: '750' },
        // 图表高度
        height: { type: [Number, String], default: '200' },
        // 是否显示图表区域内数据点上方的数据文案
        dataLabel: { type: [Boolean], default: false },
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
