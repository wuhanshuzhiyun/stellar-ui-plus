import { propsDefault } from '../../Charts/propsDefault';

// 组件默认配置
const props = Object.assign(propsDefault, { color: { type: Array as any, default: () => ['#165DFF', '#14C9C9', '#F7BA1E', '#3491FA', '#722ED1', '#9FDB1D'] } });

export default props;
