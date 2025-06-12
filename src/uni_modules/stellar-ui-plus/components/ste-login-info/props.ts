import type { PropType } from 'vue';
import type { LoginStatus } from './type';

const loginInfoProps = {
    fontFamily: { type: String, default: 'ste-iconfont-1709689042473' },
    /** 头像 */
    avatar: { type: String, default: '' },
    /** 昵称 */
    nickname: { type: String, default: '' },
    /** 登录状态 0未登录 1已登录 */
    loginStatus: { type: Number as PropType<LoginStatus>, default: 0 },
    /** 未登录头像 */
    loginSrc: { type: String, default: '' },
    /** 未登录标题 */
    loginTitle: { type: String, default: '' },
    /** 未登录提示语 */
    loginInfo: { type: String, default: '' },
    showTitleIcon: { type: Boolean, default: false },
};

export const loginInfoEmits = {
    'avatar-click': () => true,
    'user-click': () => true,
    'login-title-click': () => true,
};

export default loginInfoProps;
