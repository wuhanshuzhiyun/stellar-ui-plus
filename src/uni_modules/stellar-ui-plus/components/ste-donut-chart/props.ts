import { propsDefault } from '../../Charts/propsDefault';

// 组件默认配置
const props = Object.assign(propsDefault, {
    legend: {
        type: Object as any,
        default: () => ({
            show: false,
        }),
    },
    extra: {
        type: Object as any,
        default: () => ({
            ring: {
                ringWidth: 60,
                activeOpacity: 0.5,
                activeRadius: 10,
                offsetAngle: 0,
                labelWidth: 15,
                border: true,
                borderWidth: 3,
                borderColor: '#FFFFFF',
                linearType: 'custom',
            },
        }),
    },
});

export default props;
