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
};
