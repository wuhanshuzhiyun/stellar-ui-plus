export default {
    /** 应用编码 */
    clientId: {
        type: String,
        default: () => '',
    },
    /** 应用密钥 */
    clientSecret: {
        type: String,
        default: () => '',
    },
    /** API地址 */
    apiUrl: {
        type: String,
        default: () => 'https://zboa.whzb.com/inte-cloud-dev/blade-system/api/inte/client/ver/currentDetail',
    },
    /** APP环境,版本号的最后一位为环境标识 */
    appType: {
        type: String,
        default: () => '',
    },
    /** 立即体验按钮文本 */
    btnText: {
        type: String,
        default: () => '立即体验',
    },
    /** 当前应用版本 */
    appVersion: {
        type: String,
        default: () => ''
    }
};
