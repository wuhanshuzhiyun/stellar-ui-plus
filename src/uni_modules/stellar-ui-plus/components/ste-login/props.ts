import type { PropType } from 'vue';
import type { LoginMode, ProtocolItem, BtnItem, LoginGroupItem, BaseConfigItem } from './type';

const loginProps = {
    mode: { type: String as PropType<LoginMode>, default: 'base' },
    // 是否勾选协议
    protocolCheck: { type: Boolean, default: false },
    baseProtocol: { type: String, default: '' },
    protocolData: { type: Array as PropType<ProtocolItem[]>, default: () => [] },
    // 基础登录模式下是logo图url，复杂模式下是背景图url
    loginImgUrl: { type: String, default: '' },
    // 主要按钮配置
    primaryBtn: { type: Array as PropType<BtnItem[]>, default: () => [] },
    // 次要按钮配置
    secondaryBtn: { type: Array as PropType<BtnItem[]>, default: () => [] },
    // 登录表单配置
    loginGroup: { type: Array as PropType<LoginGroupItem[]>, default: () => [] },
    //登录框背景图
    loginBackground: { type: String, default: '' },
    // 底部提示
    bottomTip: { type: String, default: '' },
};

export const loginEmits = {
    'update:protocolCheck': (checked: boolean) => typeof checked === 'boolean',
    protocolClick: (item: ProtocolItem) => item,
    primaryBtnClick: (item: BtnItem) => item,
    secondaryBtnClick: (item: BtnItem) => item,
    tabChange: (item: BaseConfigItem) => item,
    formDataChange: (data: Record<string, any>) => data,
};

export default loginProps;
