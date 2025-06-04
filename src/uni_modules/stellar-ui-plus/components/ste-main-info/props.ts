import type { PropType } from 'vue';
import type { InfoItem, InfoUser } from './type';

const mainInfoProps = {
    mainColor: { type: String, default: '' },
    showAvatar: { type: Boolean, default: true },
    avatarUrl: { type: String, default: '' },
    infoUser: { type: Object as PropType<InfoUser>, default: () => ({}) },
    infoData: { type: Array as PropType<InfoItem[]>, default: () => [] },
    infoCode: { type: Object as PropType<InfoItem>, default: () => ({}) },
};

export const mainInfoEmits = {
    'data-click': (item: InfoItem) => !!item,
    'avatar-click': () => true,
    'user-click': () => true,
};

export default mainInfoProps;
