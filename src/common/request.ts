import config from './config.js';
import { getToken, removeToken } from './token.js';
interface RequestSuccessCallbackResult {
    /**
     * 开发者服务器返回的数据
     */
    data: string | AnyObject | ArrayBuffer;
    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
    /**
     * 开发者服务器返回的 HTTP Response Header
     */
    header: any;
    /**
     * 开发者服务器返回的 cookies，格式为字符串数组
     */
    cookies: string[];
}

export default function (url: string, data?: any, method: 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' = 'GET', header = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        const token = getToken();

        const _header: { [key: string]: string } = {};
        if (token) _header.token = token;
        uni.request({
            url: `${config.BASE_URL}${url}`,
            method,
            header: Object.assign(_header, header),
            data,
            success(res: RequestSuccessCallbackResult) {
                const data = res.data as { code: number; message: string; data: any };
                if (data.code === 200) {
                    resolve(data.data);
                    return;
                } else if (data.code === 401) {
                    removeToken();
                } else if (data.code === 402) {
                    uni.showToast({
                        title: `内容涉及${data.message}信息，请修改后重新评论`,
                        icon: 'none',
                    });
                }
                reject(data.message);
            },
            fail(e) {
                reject(e);
            },
        });
    });
}
