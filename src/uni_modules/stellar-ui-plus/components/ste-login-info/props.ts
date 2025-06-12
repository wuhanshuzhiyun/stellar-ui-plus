import type { PropType } from 'vue';
import type { LoginStatus } from './type';

const loginInfoProps = {
    /** 头像 */
    avatar: { type: String, default: '' },
    /** 昵称 */
    nickname: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    subTitleIcon: { type: String, default: '' },
    fontFamily: { type: String, default: 'ste-iconfont-1709689042473' },
    /** 登录状态 0未登录 1已登录 */
    loginStatus: { type: Number as PropType<LoginStatus>, default: 1 },
    /** 未登录头像 */
    loginSrc: { type: String, default: '' },
    /** 未登录标题 */
    loginTitle: { type: String, default: '' },
};

export const loginInfoEmits = {
    'avatar-click': () => true,
    'user-click': () => true,
    'login-title-click': () => true,
};

export default loginInfoProps;
