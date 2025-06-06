export default {
    avatar: { type: String, default: '' },
    nickname: { type: String, default: '' },
    showUserInfo: { type: Boolean, default: true },
    list: { type: Array, default: () => [] },
    codeSrc: { type: String, default: '' },
    codeTitle: { type: String, default: '' },
    codeTitleColor: { type: String, default: '' },
    showCode: { type: Boolean, default: true },
};
