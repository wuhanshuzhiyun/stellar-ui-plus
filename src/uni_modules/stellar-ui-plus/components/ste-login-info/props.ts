import type { PropType } from 'vue';
import type { InfoUser } from './type';
import { title } from 'process';

const loginInfoProps = {
    mainColor: { type: String, default: '' },
    showAvatar: { type: Boolean, default: true },
    avatarUrl: { type: String, default: '' },
    // infoUser: { type: Object as PropType<InfoUser>, default: () => ({}) },
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
};

export const loginInfoEmits = {
    'avatar-click': () => true,
    'user-click': () => true,
};

export default loginInfoProps;
