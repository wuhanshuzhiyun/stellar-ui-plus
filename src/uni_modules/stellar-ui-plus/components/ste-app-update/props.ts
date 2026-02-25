// 添加严格的类型定义
export interface AppUpdateProps {
    clientId: string;
    clientSecret: string;
    apiUrl: string;
    appType: string;
    btnText: string;
    appVersion: string;
}

export default {
    clientId: {
        type: String,
        required: true,
        default: '',
        validator: (value: string) => {
            return typeof value === 'string' && value.length > 0;
        }
    },
    clientSecret: {
        type: String,
        required: true,
        default: '',
        validator: (value: string) => {
            return typeof value === 'string' && value.length > 0;
        }
    },
    apiUrl: {
        type: String,
        default: 'https://zboa.whzb.com/inte-cloud-dev/blade-system/api/inte/client/ver/currentDetail',
        validator: (value: string) => {
            if (typeof value !== 'string' || value.length === 0) return false;
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        }
    },
    appType: {
        type: String,
        default: '',
        validator: (value: string) => {
            return typeof value === 'string';
        }
    },
    btnText: {
        type: String,
        default: '立即体验',
        validator: (value: string) => {
            return typeof value === 'string' && value.length > 0;
        }
    },
    appVersion: {
        type: String,
        default: '',
        validator: (value: string) => {
            return typeof value === 'string';
        }
    }
} satisfies Record<keyof AppUpdateProps, any>;