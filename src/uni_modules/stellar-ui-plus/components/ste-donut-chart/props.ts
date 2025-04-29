import { propsDefault } from '../../Charts/propsDefault';
import utils from '../../utils/utils';
// 组件默认配置
const props = utils.deepClone(
    Object.assign(utils.deepClone(propsDefault), {
        // 是否显示图表区域内数据点上方的数据文案
        dataLabel: { type: [Boolean], default: false },
        // 图例配置
        legend: {
            type: Object as any,
            default: () => ({
                show: false,
            }),
        },
        // 额外配置
        extra: {
            type: Object as any,
            default: () => ({
                ring: {
                    ringWidth: 30,
                    activeOpacity: 0.5,
                    activeRadius: 10,
                    offsetAngle: 0,
                    labelWidth: 15,
                    border: true,
                    borderWidth: 3,
                    borderColor: '#FFFFFF',
                    centerColor: '#FFFFFF',
                    customRadius: 0,
                    linearType: 'none',
                },
            }),
        },
    })
);

export default props;
