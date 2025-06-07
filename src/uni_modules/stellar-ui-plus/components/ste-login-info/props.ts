const loginInfoProps = {
    mainColor: { type: String, default: '' },
    showAvatar: { type: Boolean, default: true },
    avatarUrl: { type: String, default: '' },
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    subTitleIcon: { type: String, default: '' },
};

export const loginInfoEmits = {
    'avatar-click': () => true,
    'user-click': () => true,
};

export default loginInfoProps;
