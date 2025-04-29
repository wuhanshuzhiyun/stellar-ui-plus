import { propsDefault } from '../../Charts/propsDefault';
import type { PropType } from 'vue';

// 组件默认配置
const props = {
    ...propsDefault,
    // 自定义配置
    color: { type: Array as PropType<string[]>, default: () => ['#0E42D2', '#165DFF', '#4080FF', '#6AA1FF', '#94BFFF'] },
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
};

export default props;
